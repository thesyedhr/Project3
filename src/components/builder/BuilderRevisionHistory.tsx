import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  GitBranch, History, RotateCcw, CheckCircle2, 
  ArrowUpRight, Tag, User, Clock, ShieldCheck, FileDiff
} from 'lucide-react';

export type Revision = {
  version: string;
  releasedAt: string;
  author: string;
  authorEmail: string;
  environment: 'Production' | 'Staging' | 'Rollback';
  isCurrent: boolean;
  changes: string[];
  nodesCount: number;
};

const INITIAL_REVISIONS: Revision[] = [
  {
    version: 'v1.4 (Latest)',
    releasedAt: 'Today at 09:42 UTC',
    author: 'PRINCE',
    authorEmail: 'prince@nexaflow.ai',
    environment: 'Production',
    isCurrent: true,
    nodesCount: 3,
    changes: [
      'Upgraded Gemini 1.5 Pro system prompt for high-urgency ticket extraction',
      'Configured HMAC SHA-256 signature verification on /ticket webhook',
      'Refined temperature slider parameter to 0.2 for deterministic categorization'
    ]
  },
  {
    version: 'v1.3',
    releasedAt: 'Yesterday at 16:15 UTC',
    author: 'PRINCE',
    authorEmail: 'prince@nexaflow.ai',
    environment: 'Production',
    isCurrent: false,
    nodesCount: 3,
    changes: [
      'Added Zendesk Support action destination binding',
      'Enabled automated ticket priority tagging based on sentiment scores'
    ]
  },
  {
    version: 'v1.2',
    releasedAt: '3 days ago',
    author: 'Sarah Chen (DevOps)',
    authorEmail: 'sarah.chen@enterprise.io',
    environment: 'Staging',
    isCurrent: false,
    nodesCount: 2,
    changes: [
      'Initial prototype: Webhook Trigger linked to Flash-Lite model',
      'Added CORS allowlist for inbound enterprise webhooks'
    ]
  }
];

export default function BuilderRevisionHistory({ onRollback }: { onRollback?: (version: string) => void }) {
  const [revisions, setRevisions] = useState<Revision[]>(INITIAL_REVISIONS);

  const handleRollback = (rev: Revision) => {
    toast.success(`Rolled back to ${rev.version}`, {
      description: `Canvas configuration successfully reverted to snapshot from ${rev.releasedAt}.`
    });
    if (onRollback) onRollback(rev.version);
  };

  const handleSnapshot = () => {
    const newVersion = `v1.5 (Draft)`;
    const newRev: Revision = {
      version: newVersion,
      releasedAt: 'Just now',
      author: 'PRINCE',
      authorEmail: 'prince@nexaflow.ai',
      environment: 'Production',
      isCurrent: true,
      nodesCount: 3,
      changes: ['Manual checkpoint snapshot created from active canvas session']
    };
    setRevisions([newRev, ...revisions.map(r => ({ ...r, isCurrent: false }))]);
    toast.success('Snapshot Created', { description: `Saved current state as ${newVersion}.` });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Workflow Version History & Deployments</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Immutable audit history of all published pipeline releases with instant one-click rollback capabilities.
            </p>
          </div>
        </div>

        <button
          onClick={handleSnapshot}
          className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-colors"
        >
          <Tag className="w-3.5 h-3.5" />
          Create Snapshot
        </button>
      </div>

      {/* Revisions Timeline */}
      <div className="mt-6 space-y-4">
        {revisions.map((rev) => (
          <div 
            key={rev.version}
            className={`p-5 rounded-2xl border transition-all ${
              rev.isCurrent 
                ? 'bg-blue-50/40 border-blue-200 ring-1 ring-blue-100' 
                : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-slate-900 text-sm">{rev.version}</span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                  rev.isCurrent 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {rev.isCurrent ? 'Active in Production' : rev.environment}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> {rev.releasedAt}
                </span>
              </div>

              {!rev.isCurrent && (
                <button
                  onClick={() => handleRollback(rev)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-900 text-xs font-semibold flex items-center gap-1.5 shadow-2xs self-start sm:self-auto transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-blue-700" />
                  Rollback to this Version
                </button>
              )}
            </div>

            {/* Author info */}
            <div className="flex items-center gap-2 text-xs text-slate-600 mb-3 font-medium">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Released by <strong className="text-slate-900">{rev.author}</strong> ({rev.authorEmail})</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">{rev.nodesCount} connected nodes</span>
            </div>

            {/* Change log list */}
            <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-200/80">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">Release Highlights:</span>
              <ul className="space-y-1 text-xs text-slate-700">
                {rev.changes.map((change, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
