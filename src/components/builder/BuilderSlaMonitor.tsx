import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  Activity, ShieldCheck, Zap, Clock, AlertTriangle, 
  CheckCircle2, RefreshCw, BarChart2, TrendingUp, Sliders
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';

const LATENCY_DATA = [
  { time: '14:00', p50: 240, p95: 580, p99: 920 },
  { time: '14:05', p50: 220, p95: 540, p99: 880 },
  { time: '14:10', p50: 260, p95: 610, p99: 980 },
  { time: '14:15', p50: 310, p95: 750, p99: 1120 },
  { time: '14:20', p50: 230, p95: 520, p99: 890 },
  { time: '14:25', p50: 210, p95: 490, p99: 810 },
  { time: '14:30', p50: 245, p95: 560, p99: 940 },
];

export default function BuilderSlaMonitor() {
  const [maxRetries, setMaxRetries] = useState(3);
  const [circuitBreakerThreshold, setCircuitBreakerThreshold] = useState(5);
  const [autoFallback, setAutoFallback] = useState(true);

  return (
    <div className="mt-8 bg-white border border-slate-200 rounded-[28px] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-900 px-2.5 py-0.5 rounded-full font-bold border border-blue-200">
              Reliability & Circuit Breakers
            </span>
            <span className="text-xs text-slate-400">• High-Availability Telemetry</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Workflow SLO & Circuit Breaker Monitor
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time p95 latency tracking, exponential backoff policies, and automated failover circuits for this active workflow.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Circuit Closed (Healthy)
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-xs text-slate-500 font-medium">Uptime Guarantee (SLO)</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">99.98%</div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Target: 99.9%</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-xs text-slate-500 font-medium">p95 Latency</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">560ms</div>
          <span className="text-[11px] text-slate-500 mt-1 block">p99: 940ms • p50: 245ms</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-xs text-slate-500 font-medium">Mean Time to Recovery</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">1.2s</div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">Auto-healing active</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-xs text-slate-500 font-medium">Consecutive Errors</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">0 / {circuitBreakerThreshold}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Circuit trip threshold</span>
        </div>
      </div>

      {/* Chart and Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-900" /> Latency Profile (Last 30 Mins)
            </h4>
            <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-600">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-600 inline-block" /> p50</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-indigo-600 inline-block" /> p95</span>
            </div>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LATENCY_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} unit="ms" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="p95" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.15} name="p95 Latency" />
                <Area type="monotone" dataKey="p50" stroke="#2563eb" fill="#2563eb" fillOpacity={0.25} name="p50 Latency" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Circuit Breaker Controls */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Circuit Breaker Configuration</h4>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <label className="text-slate-700">Max Auto-Retries</label>
              <span className="text-blue-900 font-mono">{maxRetries} attempts</span>
            </div>
            <input 
              type="range" 
              min={1} 
              max={5} 
              value={maxRetries} 
              onChange={(e) => setMaxRetries(Number(e.target.value))}
              className="w-full accent-blue-900 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <label className="text-slate-700">Trip Failure Threshold</label>
              <span className="text-blue-900 font-mono">{circuitBreakerThreshold} errors</span>
            </div>
            <input 
              type="range" 
              min={3} 
              max={15} 
              value={circuitBreakerThreshold} 
              onChange={(e) => setCircuitBreakerThreshold(Number(e.target.value))}
              className="w-full accent-blue-900 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              <span className="text-xs font-semibold text-slate-800 block">Automatic Model Failover</span>
              <span className="text-[11px] text-slate-400">Switch to Flash if 429 received</span>
            </div>
            <button
              onClick={() => setAutoFallback(!autoFallback)}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                autoFallback ? 'bg-blue-900' : 'bg-slate-200'
              }`}
            >
              <span className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                autoFallback ? 'left-5' : 'left-1'
              }`} />
            </button>
          </div>

          <button
            onClick={() => toast.success('SLO Policies Applied', { description: 'Circuit breaker thresholds updated in cluster proxy.' })}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Save Reliability Policy
          </button>
        </div>
      </div>
    </div>
  );
}
