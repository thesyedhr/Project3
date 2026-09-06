import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  AlertTriangle, ShieldAlert, Play, CheckCircle2, Clock, 
  Terminal, RotateCcw, Flame, Radio, UserCheck, Lock, RefreshCw
} from 'lucide-react';

type IncidentPlaybook = {
  id: string;
  severity: 'Sev-1' | 'Sev-2' | 'Sev-3';
  title: string;
  triggerCondition: string;
  mttrTarget: string;
  steps: {
    title: string;
    action: string;
    automated: boolean;
    description: string;
  }[];
};

const PLAYBOOKS: IncidentPlaybook[] = [
  {
    id: 'pb-jailbreak',
    severity: 'Sev-1',
    title: 'Adversarial Prompt Injection & Exfiltration Attempt',
    triggerCondition: 'Heuristic anomaly score > 0.95 or 3+ jailbreak patterns intercepted within 60s.',
    mttrTarget: '< 90 seconds',
    steps: [
      {
        title: 'Step 1: Automated Pipeline Freeze',
        action: 'WAF drops IP range & halts tenant MicroVM execution',
        automated: true,
        description: 'Terminates all active in-flight reasoning tasks and detaches API credentials.'
      },
      {
        title: 'Step 2: Ephemeral Secret Rotation',
        action: 'AWS KMS / HashiCorp Vault invalidates session bearer tokens',
        automated: true,
        description: 'Rotates API keys and invalidates OAuth tokens across all integrated connectors.'
      },
      {
        title: 'Step 3: Forensic Snapshot Capture',
        action: 'Write memory core dump to air-gapped forensic S3 bucket',
        automated: true,
        description: 'Generates immutable cryptographic SHA3-512 hash chain of attack payload for legal audit.'
      },
      {
        title: 'Step 4: Security Lead PagerDuty Dispatch',
        action: 'Escalate to enterprise SecOps On-Call with live telemetry dossier',
        automated: false,
        description: 'Requires human verification before lifting tenant pipeline freeze.'
      }
    ]
  },
  {
    id: 'pb-key-leak',
    severity: 'Sev-1',
    title: 'Compromised Machine API Key or HMAC Signature Failure',
    triggerCondition: '3 consecutive HMAC verification failures or leaked secret reported via GitHub secret scan.',
    mttrTarget: '< 2 minutes',
    steps: [
      {
        title: 'Step 1: Immediate Key Invalidation',
        action: 'Revoke Machine Principal credentials in Postgres auth table',
        automated: true,
        description: 'Instantly rejects all incoming requests bearing the revoked credential.'
      },
      {
        title: 'Step 2: Active Connection Severing',
        action: 'Envoy proxy severs active WebSocket & HTTP/2 connection pools',
        automated: true,
        description: 'Forces all client runtimes to perform clean mTLS 1.3 re-handshake.'
      },
      {
        title: 'Step 3: Issue Replacement Key Pair',
        action: 'Generate FIPS 140-3 HSM key pair and push to enterprise customer KMS',
        automated: true,
        description: 'Provisioned with strictly scoped least-privilege RBAC role.'
      }
    ]
  },
  {
    id: 'pb-cloud-failover',
    severity: 'Sev-2',
    title: 'Regional Cloud Outage & Multi-Cloud Failover',
    triggerCondition: 'AWS us-east-1 p99 latency > 4000ms or 503 error rate > 5% across 2 minutes.',
    mttrTarget: '< 15 seconds',
    steps: [
      {
        title: 'Step 1: Edge DNS Traffic Reroute',
        action: 'Cloudflare Anycast shifts 100% ingress to GCP europe-west3',
        automated: true,
        description: 'Global routing table updates via BGP health checks without dropping webhooks.'
      },
      {
        title: 'Step 2: Postgres Read-Replica Promotion',
        action: 'Promote hot-standby database in Frankfurt to active primary',
        automated: true,
        description: 'RPO (Recovery Point Objective) = 0 seconds via synchronous physical replication.'
      },
      {
        title: 'Step 3: Webhook Backlog Replay',
        action: 'Replay in-memory Kafka queue from offset checkpoints',
        automated: true,
        description: 'Guarantees exactly-once processing for all customer tasks.'
      }
    ]
  }
];

export default function SecurityIncidentPlaybook() {
  const [activePlaybookId, setActivePlaybookId] = useState<string>('pb-jailbreak');
  const [executingStepIdx, setExecutingStepIdx] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>({});

  const activePlaybook = PLAYBOOKS.find(p => p.id === activePlaybookId) || PLAYBOOKS[0];

  const handleSimulatePlaybook = () => {
    setExecutingStepIdx(0);
    setCompletedSteps(prev => ({ ...prev, [activePlaybook.id]: [] }));
    toast.info(`Executing Runbook: ${activePlaybook.title}`);

    let current = 0;
    const interval = setInterval(() => {
      setCompletedSteps(prev => ({
        ...prev,
        [activePlaybook.id]: [...(prev[activePlaybook.id] || []), current]
      }));
      current += 1;
      setExecutingStepIdx(current);

      if (current >= activePlaybook.steps.length) {
        clearInterval(interval);
        setExecutingStepIdx(null);
        toast.success(`Incident Runbook Successfully Executed`, {
          description: `All ${activePlaybook.steps.length} containment actions completed in 1.4s.`
        });
      }
    }, 700);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase bg-rose-50 text-rose-800 px-2.5 py-1 rounded-full font-bold border border-rose-200">
              Automated SecOps Runbooks
            </span>
            <span className="text-xs text-slate-400">• Mean Time to Contain: &lt; 90s</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Incident Response & Disaster Recovery Playbooks
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Pre-programmed automated containment policies executed at microsecond speeds when critical threats or infrastructural anomalies are detected.
          </p>
        </div>

        <button
          onClick={handleSimulatePlaybook}
          disabled={executingStepIdx !== null}
          className="px-5 py-2.5 bg-rose-900 hover:bg-rose-950 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer hover:scale-[1.02] disabled:opacity-50 self-start md:self-auto"
        >
          <Play className="w-4 h-4" />
          <span>{executingStepIdx !== null ? 'Simulating Runbook...' : 'Test Run Containment'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Playbook List */}
        <div className="lg:col-span-4 space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Select Threat Scenario</h4>
          {PLAYBOOKS.map((pb) => {
            const isSelected = activePlaybookId === pb.id;
            return (
              <div
                key={pb.id}
                onClick={() => setActivePlaybookId(pb.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-blue-50/70 border-blue-900 ring-2 ring-blue-900/10 shadow-xs' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    pb.severity === 'Sev-1' ? 'bg-rose-50 text-rose-800 border-rose-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {pb.severity}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">MTTR: {pb.mttrTarget}</span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 leading-snug">{pb.title}</h5>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{pb.triggerCondition}</p>
              </div>
            );
          })}
        </div>

        {/* Playbook Steps Execution Console */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                {activePlaybook.severity} Containment Procedure
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-1">{activePlaybook.title}</h4>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Target Resolution Time</span>
              <span className="text-sm font-mono font-bold text-emerald-600">{activePlaybook.mttrTarget}</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-700 block mb-3">Containment Timeline & Step Invariants:</span>
            <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[15px] before:w-px before:bg-slate-200">
              {activePlaybook.steps.map((step, idx) => {
                const isDone = completedSteps[activePlaybook.id]?.includes(idx);
                const isCurrent = executingStepIdx === idx;

                return (
                  <div key={idx} className="relative flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 z-10 text-xs font-bold transition-all ${
                      isDone 
                        ? 'bg-emerald-500 border-emerald-600 text-white' 
                        : isCurrent
                        ? 'bg-blue-50 border-blue-600 text-blue-900 animate-pulse'
                        : 'bg-white border-slate-200 text-slate-400'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    <div className="flex-1 p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-xs text-slate-900">{step.title}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                          step.automated ? 'bg-blue-50 text-blue-800 border-blue-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {step.automated ? 'Automated MicroVM Policy' : 'Manual Sign-Off'}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-blue-950 font-semibold mb-1">{step.action}</p>
                      <p className="text-[11px] text-slate-500">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl flex items-center justify-between text-xs shadow-sm">
            <span className="text-slate-600">Runbook SLA: Guaranteed zero data loss with RPO = 0s & automatic post-incident audit digest generation.</span>
            <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">STATUS: READY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
