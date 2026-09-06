import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  Activity, CheckCircle2, AlertTriangle, XCircle, Search, 
  RefreshCw, Terminal, Eye, Clock, ArrowRight, Cpu, Copy, Check, Filter
} from 'lucide-react';

export type TraceRecord = {
  id: string;
  triggerSource: string;
  startedAt: string;
  durationMs: number;
  tokensUsed: number;
  costUsd: string;
  status: 'success' | 'warning' | 'error';
  statusCode: number;
  steps: {
    nodeTitle: string;
    type: 'trigger' | 'ai' | 'action';
    durationMs: number;
    status: 'ok' | 'failed';
    outputPreview: string;
  }[];
  payloadPreview: Record<string, any>;
};

const MOCK_TRACES: TraceRecord[] = [
  {
    id: 'tr_88192a0e',
    triggerSource: 'POST /ticket (Webhook)',
    startedAt: '12 seconds ago',
    durationMs: 342,
    tokensUsed: 420,
    costUsd: '$0.0012',
    status: 'success',
    statusCode: 200,
    steps: [
      { nodeTitle: 'Webhook Trigger', type: 'trigger', durationMs: 18, status: 'ok', outputPreview: 'Payload parsed: 1.4KB JSON' },
      { nodeTitle: 'AI Classifier Agent', type: 'ai', durationMs: 245, status: 'ok', outputPreview: 'Classified: URGENT_BILLING (98% confidence)' },
      { nodeTitle: 'Zendesk Update', type: 'action', durationMs: 79, status: 'ok', outputPreview: 'Ticket #49201 created & assigned to Tier-2' }
    ],
    payloadPreview: {
      ticket_id: 'TCK-99014',
      sender: 'cfo@acme-corp.com',
      subject: 'Urgent: Wire transfer invoice discrepancy on Plan Enterprise',
      urgency_score: 0.98,
      routing_target: 'Tier-2 Priority Queue'
    }
  },
  {
    id: 'tr_88192a0f',
    triggerSource: 'Cron Hourly Ingest',
    startedAt: '3 minutes ago',
    durationMs: 418,
    tokensUsed: 680,
    costUsd: '$0.0019',
    status: 'success',
    statusCode: 200,
    steps: [
      { nodeTitle: 'Scheduled Cron Timer', type: 'trigger', durationMs: 12, status: 'ok', outputPreview: 'Batch tick dispatched' },
      { nodeTitle: 'Entity Extractor', type: 'ai', durationMs: 298, status: 'ok', outputPreview: 'Extracted 14 invoice line items' },
      { nodeTitle: 'Database Sync', type: 'action', durationMs: 108, status: 'ok', outputPreview: 'Inserted 14 records into PostgreSQL' }
    ],
    payloadPreview: {
      batch_id: 'cron_hourly_1400',
      items_processed: 14,
      reconciliation_delta: 0.00,
      sync_status: 'SYNCED_VERIFIED'
    }
  },
  {
    id: 'tr_88192a10',
    triggerSource: 'POST /hook/xt782q',
    startedAt: '7 minutes ago',
    durationMs: 890,
    tokensUsed: 890,
    costUsd: '$0.0025',
    status: 'warning',
    statusCode: 429,
    steps: [
      { nodeTitle: 'Webhook Trigger', type: 'trigger', durationMs: 14, status: 'ok', outputPreview: 'Signature verified HMAC-SHA256' },
      { nodeTitle: 'AI Classifier Agent', type: 'ai', durationMs: 720, status: 'ok', outputPreview: 'Rate limited by upstream API, auto-retried with backoff' },
      { nodeTitle: 'Zendesk Update', type: 'action', durationMs: 156, status: 'ok', outputPreview: 'Ticket queued after retry' }
    ],
    payloadPreview: {
      notice: 'Upstream rate limit mitigated via exponential backoff (attempt 2 of 3)',
      retry_delay_ms: 500,
      outcome: 'SUCCESS_AFTER_RETRY'
    }
  },
  {
    id: 'tr_88192a11',
    triggerSource: 'Inbound Email Support',
    startedAt: '15 minutes ago',
    durationMs: 280,
    tokensUsed: 310,
    costUsd: '$0.0009',
    status: 'success',
    statusCode: 200,
    steps: [
      { nodeTitle: 'Email Trigger', type: 'trigger', durationMs: 22, status: 'ok', outputPreview: 'Parsed MIME attachments (2 files)' },
      { nodeTitle: 'AI Classifier Agent', type: 'ai', durationMs: 188, status: 'ok', outputPreview: 'Sentiment: POSITIVE (feedback)' },
      { nodeTitle: 'Slack Notification', type: 'action', durationMs: 70, status: 'ok', outputPreview: 'Sent digest to #customer-delight' }
    ],
    payloadPreview: {
      sender_domain: 'stripe.com',
      feedback_category: 'Praise & Testimonial',
      slack_channel: 'C050XYZ12'
    }
  }
];

export default function BuilderExecutionTraces() {
  const [traces, setTraces] = useState<TraceRecord[]>(MOCK_TRACES);
  const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'warning' | 'error'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrace, setSelectedTrace] = useState<TraceRecord | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Live Traces Refreshed', { description: 'Synchronized with distributed edge logs.' });
    }, 600);
  };

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success(`Copied Trace ID: ${id}`);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filteredTraces = traces.filter(trace => {
    const matchesStatus = filterStatus === 'all' || trace.status === filterStatus;
    const matchesSearch = 
      trace.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trace.triggerSource.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mt-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">Live Pipeline Execution & Observability</h3>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Ingest
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Inspect step-by-step node traces, token usage, latency breakdowns, and payload transformations in real-time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button 
            onClick={handleRefresh}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200 text-xs font-semibold flex items-center gap-1.5"
            title="Refresh stream"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Poll Stream</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Trace ID or trigger..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['all', 'success', 'warning', 'error'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize whitespace-nowrap cursor-pointer ${
                filterStatus === status 
                  ? 'bg-blue-900 text-white shadow-sm' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {status === 'all' ? 'All Executions' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Traces Table */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Trace ID</th>
                <th className="py-3 px-4">Trigger & Source</th>
                <th className="py-3 px-4">Steps Executed</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Tokens & Cost</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {filteredTraces.map((trace) => {
                return (
                  <tr 
                    key={trace.id} 
                    onClick={() => setSelectedTrace(trace)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 font-mono font-medium text-blue-900 flex items-center gap-1.5">
                      <span>{trace.id}</span>
                      <button
                        onClick={(e) => handleCopyId(trace.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-blue-50 rounded text-slate-400 hover:text-blue-900 transition-opacity"
                        title="Copy Trace ID"
                      >
                        {copiedId === trace.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{trace.triggerSource}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {trace.startedAt}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        {trace.steps.map((s, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]"
                            title={`${s.nodeTitle}: ${s.durationMs}ms`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            {s.nodeTitle.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-700 font-medium">
                      {trace.durationMs}ms
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-mono text-slate-800 font-medium">{trace.tokensUsed} tokens</div>
                      <div className="text-[10px] text-slate-400 font-mono">{trace.costUsd}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold text-[11px] border ${
                        trace.status === 'success' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : trace.status === 'warning'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          trace.status === 'success' ? 'bg-emerald-500' : trace.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                        }`} />
                        HTTP {trace.statusCode}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button 
                        onClick={() => setSelectedTrace(trace)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-900 transition-colors inline-flex items-center gap-1 text-xs font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trace Inspector Modal */}
      <AnimatePresence>
        {selectedTrace && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrace(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 z-10 flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-900">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">Trace Deep Dive: {selectedTrace.id}</h4>
                      <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                        HTTP {selectedTrace.statusCode}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">Initiated {selectedTrace.startedAt} • Total Latency: {selectedTrace.durationMs}ms</p>
                  </div>
                </div>
                <button onClick={() => setSelectedTrace(null)} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 overflow-y-auto text-xs">
                {/* Step Breakdown Timeline */}
                <div>
                  <h5 className="font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-blue-700" />
                    Distributed Execution Trace
                  </h5>
                  <div className="space-y-2.5">
                    {selectedTrace.steps.map((step, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="font-bold text-slate-900">{step.nodeTitle}</div>
                            <div className="text-[11px] text-slate-500 font-mono">{step.outputPreview}</div>
                          </div>
                        </div>
                        <span className="font-mono text-slate-700 font-semibold text-[11px] bg-white px-2 py-1 rounded border border-slate-200">
                          {step.durationMs}ms
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final State Payload */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-slate-900">Emitted JSON Context</h5>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(selectedTrace.payloadPreview, null, 2));
                        toast.success('Copied payload to clipboard');
                      }}
                      className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Copy JSON
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-50 text-slate-800 rounded-2xl font-mono text-[11px] overflow-x-auto border border-slate-200 leading-relaxed no-scrollbar shadow-2xs">
                    {JSON.stringify(selectedTrace.payloadPreview, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex justify-end">
                <button
                  onClick={() => setSelectedTrace(null)}
                  className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-semibold hover:bg-blue-950 transition-colors"
                >
                  Close Trace
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
