import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  ShieldAlert, Activity, AlertTriangle, CheckCircle2, 
  Radio, RefreshCw, XCircle, ShieldCheck, Flame, Zap, Lock
} from 'lucide-react';

type ThreatIncident = {
  id: string;
  time: string;
  vector: string;
  sourceIp: string;
  geo: string;
  targetEndpoint: string;
  actionTaken: 'Blocked & Jailed' | 'Scrubbed (ModSecurity)' | 'Rate Limited' | 'Challenge Solved';
  severity: 'Critical' | 'High' | 'Medium';
};

const LIVE_THREATS: ThreatIncident[] = [
  {
    id: 'th-901',
    time: '12s ago',
    vector: 'Prompt Injection (Ignore Previous Instructions)',
    sourceIp: '185.220.101.42',
    geo: 'DE (Tor Exit)',
    targetEndpoint: '/api/v1/agent/execute',
    actionTaken: 'Blocked & Jailed',
    severity: 'Critical'
  },
  {
    id: 'th-902',
    time: '48s ago',
    vector: 'Webhook HMAC Signature Replay Attack',
    sourceIp: '104.244.72.115',
    geo: 'US (Data Center)',
    targetEndpoint: '/api/v1/webhooks/stripe',
    actionTaken: 'Blocked & Jailed',
    severity: 'High'
  },
  {
    id: 'th-903',
    time: '2m ago',
    vector: 'Blind SQLi in Filter Query Param',
    sourceIp: '45.154.255.89',
    geo: 'NL (HostSailor)',
    targetEndpoint: '/api/v1/workflows/search',
    actionTaken: 'Scrubbed (ModSecurity)',
    severity: 'High'
  },
  {
    id: 'th-904',
    time: '5m ago',
    vector: 'Credential Stuffing Burst (>200 req/s)',
    sourceIp: '194.26.29.11',
    geo: 'RO (VPN Proxy)',
    targetEndpoint: '/api/v1/auth/token',
    actionTaken: 'Rate Limited',
    severity: 'Medium'
  }
];

export default function SecurityThreatRadar() {
  const [threats, setThreats] = useState<ThreatIncident[]>(LIVE_THREATS);
  const [isLockdownActive, setIsLockdownActive] = useState(false);

  const toggleLockdown = () => {
    setIsLockdownActive(prev => {
      const next = !prev;
      if (next) {
        toast.error('EMERGENCY LOCKDOWN ACTIVATED', {
          description: 'All public webhooks paused. Inbound traffic restricted exclusively to trusted corporate CIDRs.'
        });
      } else {
        toast.success('Lockdown Lifted', {
          description: 'Standard security posture restored across all edge clusters.'
        });
      }
      return next;
    });
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-red-50 text-red-700 px-2.5 py-0.5 rounded-full font-bold border border-red-200 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              SOC Threat Feed Live
            </span>
            <span className="text-xs text-slate-400 font-mono">• SIEM Telemetry</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Real-Time Intrusion Detection & Attack Radar
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated perimeter monitoring continuously inspecting edge packets, LLM prompt payloads, and signature validity.
          </p>
        </div>

        {/* Break Glass Button */}
        <button
          onClick={toggleLockdown}
          className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto ${
            isLockdownActive
              ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
              : 'bg-white border border-red-200 text-red-700 hover:bg-red-50'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>{isLockdownActive ? 'Emergency Lockdown ACTIVE' : 'Trigger Break-Glass Lockdown'}</span>
        </button>
      </div>

      {/* Top 4 Quick Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[11px] font-medium text-slate-500 block">Attacks Deflected (24h)</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">14,210</div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">100% neutralized at edge</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[11px] font-medium text-slate-500 block">Active IP Jails</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">84 CIDRs</div>
          <span className="text-[10px] text-slate-500 font-medium mt-1 block">24-hour quarantine lease</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[11px] font-medium text-slate-500 block">Prompt Injection Attempts</span>
          <div className="text-2xl font-extrabold text-purple-900 mt-1">342</div>
          <span className="text-[10px] text-purple-700 font-semibold mt-1 block">0 bypasses recorded</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[11px] font-medium text-slate-500 block">Mean Time to Mitigate</span>
          <div className="text-2xl font-extrabold text-emerald-800 mt-1">&lt; 14ms</div>
          <span className="text-[10px] text-slate-500 font-medium mt-1 block">Automated eBPF drops</span>
        </div>
      </div>

      {/* Live Threat Incident Feed Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 pl-1">Threat Vector</th>
              <th className="pb-3">Source IP & Origin</th>
              <th className="pb-3">Target Endpoint</th>
              <th className="pb-3">Action Taken</th>
              <th className="pb-3 text-right pr-1">Severity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {threats.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 pl-1">
                  <div className="font-bold text-slate-900 text-xs">{t.vector}</div>
                  <span className="text-[10px] text-slate-400 font-mono">{t.time}</span>
                </td>
                <td className="py-3 text-xs">
                  <span className="font-mono text-[11px] text-slate-800 block">{t.sourceIp}</span>
                  <span className="text-[10px] text-slate-400">{t.geo}</span>
                </td>
                <td className="py-3 font-mono text-[11px] text-slate-600">
                  {t.targetEndpoint}
                </td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {t.actionTaken}
                  </span>
                </td>
                <td className="py-3 text-right pr-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    t.severity === 'Critical'
                      ? 'bg-red-100 text-red-800'
                      : t.severity === 'High'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {t.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
