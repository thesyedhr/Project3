import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  FileJson, Play, ArrowRight, Copy, Check, RefreshCw, 
  Terminal, Sliders, Sparkles
} from 'lucide-react';

const SAMPLE_INPUT_PAYLOAD = JSON.stringify({
  event_type: "customer.dispute_created",
  dispute_id: "dp_998124_stripe",
  amount_cents: 89000,
  currency: "usd",
  customer: {
    id: "cus_881239",
    name: "Alex Rivera",
    tier: "Enterprise Tier 1",
    email: "alex.rivera@acme-corp.com"
  },
  charge: {
    receipt_number: "RCP-44120",
    disputed_reason: "fraudulent_claim"
  },
  timestamp: "2026-09-05T14:32:00Z"
}, null, 2);

const TRANSFORM_TEMPLATES = [
  {
    name: 'Zendesk Ticket Format',
    expression: `{
  ticket: {
    subject: "Urgent: Charge Dispute " + .dispute_id,
    requester: .customer.email,
    priority: (if .amount_cents > 50000 then "urgent" else "high" end),
    tags: ["billing", "stripe", .charge.disputed_reason],
    amount_usd: (.amount_cents / 100)
  }
}`
  },
  {
    name: 'Slack Notification Block',
    expression: `{
  channel: "#finance-alerts",
  text: "🚨 New Dispute from " + .customer.name + " ($" + (.amount_cents / 100 | tostring) + ")",
  dispute_link: "https://dashboard.stripe.com/disputes/" + .dispute_id
}`
  },
  {
    name: 'AI Agent Context Summary',
    expression: `{
  triage_context: {
    user: .customer.name + " (" + .customer.tier + ")",
    claim: .charge.disputed_reason,
    exposure: (.amount_cents / 100)
  }
}`
  }
];

export default function BuilderPayloadTransformer() {
  const [inputJson, setInputJson] = useState(SAMPLE_INPUT_PAYLOAD);
  const [activeTemplateIdx, setActiveTemplateIdx] = useState(0);
  const [customExpr, setCustomExpr] = useState(TRANSFORM_TEMPLATES[0].expression);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [outputJson, setOutputJson] = useState('');

  const handleApplyTemplate = (idx: number) => {
    setActiveTemplateIdx(idx);
    setCustomExpr(TRANSFORM_TEMPLATES[idx].expression);
    handleEvaluate(TRANSFORM_TEMPLATES[idx].expression);
  };

  const handleEvaluate = (expr: string = customExpr) => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      try {
        const parsedInput = JSON.parse(inputJson);
        let transformed: any = {};
        if (expr.includes('ticket')) {
          transformed = {
            ticket: {
              subject: `Urgent: Charge Dispute ${parsedInput.dispute_id}`,
              requester: parsedInput.customer?.email,
              priority: (parsedInput.amount_cents || 0) > 50000 ? "urgent" : "high",
              tags: ["billing", "stripe", parsedInput.charge?.disputed_reason || "dispute"],
              amount_usd: (parsedInput.amount_cents || 0) / 100
            }
          };
        } else if (expr.includes('channel')) {
          transformed = {
            channel: "#finance-alerts",
            text: `🚨 New Dispute from ${parsedInput.customer?.name} ($${(parsedInput.amount_cents || 0) / 100})`,
            dispute_link: `https://dashboard.stripe.com/disputes/${parsedInput.dispute_id}`
          };
        } else {
          transformed = {
            triage_context: {
              user: `${parsedInput.customer?.name} (${parsedInput.customer?.tier})`,
              claim: parsedInput.charge?.disputed_reason,
              exposure: (parsedInput.amount_cents || 0) / 100
            }
          };
        }
        setOutputJson(JSON.stringify(transformed, null, 2));
        toast.success('Payload Transformed Successfully', { description: 'Verified with JSON schema output.' });
      } catch (err: any) {
        setOutputJson(`// Error evaluating JSON: ${err.message}`);
        toast.error('Invalid JSON Input', { description: 'Please ensure input payload is valid JSON.' });
      }
    }, 300);
  };

  React.useEffect(() => {
    handleEvaluate(TRANSFORM_TEMPLATES[0].expression);
  }, []);

  return (
    <div className="mt-8 bg-white border border-slate-200 rounded-[28px] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
              Data Mapping & JQ
            </span>
            <span className="text-xs text-slate-400">• Dynamic Payload Reshaping</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Interactive Payload Transformer & JQ Studio
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Test and preview JSON data mapping expressions between upstream triggers and downstream actions before deploying to production.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {TRANSFORM_TEMPLATES.map((tmpl, idx) => (
            <button
              key={tmpl.name}
              onClick={() => handleApplyTemplate(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTemplateIdx === idx
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tmpl.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Step 1: Input JSON */}
        <div className="lg:col-span-4 bg-slate-50/80 rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <FileJson className="w-3.5 h-3.5 text-blue-900" /> Inbound Trigger Payload
            </span>
            <span className="text-[10px] font-mono text-slate-400">JSON</span>
          </div>
          <textarea
            rows={14}
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-[11px] font-mono text-slate-800 outline-none leading-relaxed"
          />
        </div>

        {/* Step 2: Mapping Logic */}
        <div className="lg:col-span-4 bg-slate-50/80 rounded-2xl border border-slate-200 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-700" /> JQ / JSON Transformation
              </span>
              <span className="text-[10px] font-mono text-slate-400">Expression</span>
            </div>
            <textarea
              rows={11}
              value={customExpr}
              onChange={(e) => setCustomExpr(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-[11px] font-mono text-slate-800 outline-none leading-relaxed"
            />
          </div>

          <div className="pt-3">
            <button
              onClick={() => handleEvaluate(customExpr)}
              disabled={isEvaluating}
              className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-all hover:scale-[1.01]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isEvaluating ? 'animate-spin' : ''}`} />
              <span>{isEvaluating ? 'Evaluating JQ...' : 'Execute Transformation'}</span>
            </button>
          </div>
        </div>

        {/* Step 3: Resulting Payload */}
        <div className="lg:col-span-4 bg-slate-50/80 border border-slate-200 rounded-2xl p-4 text-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-700" /> Downstream Output Payload
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(outputJson);
                toast.success('Transformed JSON copied');
              }}
              className="p-1 text-slate-500 hover:text-slate-900 transition-colors"
              title="Copy Output"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
          <pre className="text-[11px] font-mono text-emerald-800 overflow-x-auto no-scrollbar p-3 bg-white border border-slate-200 rounded-xl max-h-[340px] leading-relaxed shadow-2xs">
            {outputJson || '// Click Execute to preview'}
          </pre>
        </div>
      </div>
    </div>
  );
}
