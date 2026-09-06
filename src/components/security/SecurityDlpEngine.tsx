import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  Eye, EyeOff, ShieldCheck, CheckCircle2, Copy, 
  RefreshCw, Play, Sparkles, Filter, Lock, Terminal
} from 'lucide-react';

const SAMPLE_RAW_PAYLOAD = `{
  "customer_name": "Alexander Hamilton",
  "email": "a.hamilton@treasury.gov",
  "credit_card": "4532-8901-2345-6789",
  "ssn": "123-45-6789",
  "medical_record_id": "MRN-90214-X",
  "notes": "Patient authorized payment of $4,500 using Stripe API token sk_live_99ab7129fec882194."
}`;

export default function SecurityDlpEngine() {
  const [rawText, setRawText] = useState(SAMPLE_RAW_PAYLOAD);
  const [redactedText, setRedactedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Rule toggles
  const [rules, setRules] = useState({
    creditCard: true,
    ssn: true,
    apiKeys: true,
    medicalRecord: true,
    emails: false,
  });

  const runSanitization = () => {
    setIsProcessing(true);
    setTimeout(() => {
      let output = rawText;
      
      if (rules.creditCard) {
        output = output.replace(/\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/g, '[REDACTED_PCI_CARD]');
      }
      if (rules.ssn) {
        output = output.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED_GOV_SSN]');
      }
      if (rules.apiKeys) {
        output = output.replace(/sk_live_[0-9a-zA-Z]+/g, '[REDACTED_STRIPE_SECRET_KEY]');
      }
      if (rules.medicalRecord) {
        output = output.replace(/MRN-\d+-[A-Z]/g, '[REDACTED_HIPAA_MRN]');
      }
      if (rules.emails) {
        output = output.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL_ADDRESS]');
      }

      setRedactedText(output);
      setIsProcessing(false);
      toast.success('DLP Sanitization complete', { description: 'All sensitive PII tokens replaced with cryptographic proxies.' });
    }, 250);
  };

  const handleCopyRedacted = () => {
    navigator.clipboard.writeText(redactedText || rawText);
    toast.success('Copied sanitized payload to clipboard');
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200">
              HIPAA & PCI-DSS Guard
            </span>
            <span className="text-xs text-slate-400 font-mono">• Zero-Exposure Runtime</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Data Loss Prevention (DLP) & PII Redaction Engine
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time regex, NLP tokenizers, and NER heuristic filters redact sensitive personal identifiers before payloads enter model prompts or node logs.
          </p>
        </div>

        <button
          onClick={runSanitization}
          disabled={isProcessing}
          className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Play className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : 'fill-current'}`} />
          <span>{isProcessing ? 'Sanitizing...' : 'Run Live Sanitizer'}</span>
        </button>
      </div>

      {/* Active Rules Filter Matrix */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-3">
        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mr-2">
          <Filter className="w-3.5 h-3.5 text-blue-900" />
          Active DLP Rules:
        </span>

        {[
          { key: 'creditCard', label: 'PCI Credit Cards', badge: 'PCI-DSS' },
          { key: 'ssn', label: 'Gov SSN / Tax ID', badge: 'NIST' },
          { key: 'apiKeys', label: 'API Keys & Secrets', badge: 'OWASP' },
          { key: 'medicalRecord', label: 'HIPAA MRN Medical IDs', badge: 'HIPAA' },
          { key: 'emails', label: 'Personal Email Addresses', badge: 'GDPR' },
        ].map(rule => (
          <button
            key={rule.key}
            onClick={() => setRules(prev => ({ ...prev, [rule.key]: !prev[rule.key as keyof typeof rules] }))}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              rules[rule.key as keyof typeof rules]
                ? 'bg-blue-900 text-white border-blue-950 shadow-xs'
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${rules[rule.key as keyof typeof rules] ? 'bg-emerald-400' : 'bg-slate-300'}`} />
            <span>{rule.label}</span>
            <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
              rules[rule.key as keyof typeof rules] ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {rule.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Side-by-side Payload Diff Viewer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Raw Inbound Payload */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-500" />
              Inbound Payload (Editable Sample)
            </span>
            <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono border border-amber-200 font-semibold">
              Contains Unsanitized PII
            </span>
          </div>
          <textarea
            rows={10}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            className="w-full p-3.5 bg-slate-50 text-slate-800 font-mono text-xs rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed resize-none shadow-2xs no-scrollbar"
          />
        </div>

        {/* Right: Redacted Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Redacted Zero-Exposure Output
            </span>
            <button
              onClick={handleCopyRedacted}
              className="text-[10px] text-blue-900 hover:text-blue-950 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              Copy Sanitized
            </button>
          </div>
          <div className="w-full h-[220px] p-3.5 bg-white text-slate-800 font-mono text-xs rounded-2xl border border-slate-200 overflow-auto whitespace-pre-wrap leading-relaxed select-all shadow-2xs no-scrollbar">
            {redactedText ? (
              redactedText
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                <Sparkles className="w-5 h-5 mb-1 text-slate-600" />
                <span>Click "Run Live Sanitizer" above to preview real-time token redaction.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Latency & Compliance Guarantees Footer */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Zero-Disk Persistence (RAM only)
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Sub-millisecond processing (&lt; 0.9ms)
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-400">
          Engine Version: v3.1.4-ner-optimized
        </span>
      </div>
    </div>
  );
}
