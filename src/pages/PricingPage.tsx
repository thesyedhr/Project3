import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Cpu, 
  CheckCircle2, 
  ArrowUpRight, 
  Zap, 
  Download, 
  Copy, 
  Sliders, 
  ShieldCheck, 
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import { useScrollLock } from '../utils/useScrollLock';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

type TimeHorizon = '7d' | '30d' | 'q3' | 'ytd';

const HORIZON_DATA = {
  '7d': {
    periodLabel: 'Last 7 Days',
    hoursSaved: 32000,
    dollarSavings: 2140000,
    runsCount: 1125000,
    autoRate: 99.9,
    avgLatency: '1.1s',
    manualSla: '38 mins',
    chartData: [
      { name: 'Mon', savings: 280000, manualCost: 1400000, runs: 145000 },
      { name: 'Tue', savings: 320000, manualCost: 1600000, runs: 172000 },
      { name: 'Wed', savings: 350000, manualCost: 1750000, runs: 190000 },
      { name: 'Thu', savings: 290000, manualCost: 1450000, runs: 151000 },
      { name: 'Fri', savings: 380000, manualCost: 1900000, runs: 205000 },
      { name: 'Sat', savings: 240000, manualCost: 1200000, runs: 128000 },
      { name: 'Sun', savings: 280000, manualCost: 1400000, runs: 134000 },
    ]
  },
  '30d': {
    periodLabel: 'Last 30 Days (Current Cycle)',
    hoursSaved: 142000,
    dollarSavings: 9485000,
    runsCount: 4829000,
    autoRate: 99.9,
    avgLatency: '1.2s',
    manualSla: '42 mins',
    chartData: [
      { name: 'Week 1', savings: 1920000, manualCost: 9600000, runs: 980000 },
      { name: 'Week 2', savings: 2240000, manualCost: 11200000, runs: 1140000 },
      { name: 'Week 3', savings: 2510000, manualCost: 12550000, runs: 1290000 },
      { name: 'Week 4', savings: 2815000, manualCost: 14075000, runs: 1419000 },
    ]
  },
  'q3': {
    periodLabel: 'Quarter to Date (Q3)',
    hoursSaved: 389000,
    dollarSavings: 26140000,
    runsCount: 13410000,
    autoRate: 99.9,
    avgLatency: '1.2s',
    manualSla: '44 mins',
    chartData: [
      { name: 'July', savings: 7800000, manualCost: 39000000, runs: 3980000 },
      { name: 'August', savings: 8850000, manualCost: 44250000, runs: 4520000 },
      { name: 'September', savings: 9490000, manualCost: 47450000, runs: 4910000 },
    ]
  },
  'ytd': {
    periodLabel: 'Year to Date (2026)',
    hoursSaved: 1145000,
    dollarSavings: 76820000,
    runsCount: 39200000,
    autoRate: 99.9,
    avgLatency: '1.3s',
    manualSla: '45 mins',
    chartData: [
      { name: 'Q1', savings: 21500000, manualCost: 107500000, runs: 11000000 },
      { name: 'Q2', savings: 29180000, manualCost: 145900000, runs: 14790000 },
      { name: 'Q3 (YTD)', savings: 26140000, manualCost: 130700000, runs: 13410000 },
    ]
  }
};

const DEPARTMENT_BREAKDOWN = [
  { name: 'Customer Support & Triage', value: 42, color: '#1e3a8a', hours: 59600, savings: '$3,980,000' },
  { name: 'Sales Ops & Lead Enrichment', value: 28, color: '#3b82f6', hours: 39800, savings: '$2,650,000' },
  { name: 'DevOps & Infrastructure Alerting', value: 18, color: '#60a5fa', hours: 25600, savings: '$1,710,000' },
  { name: 'HR & Employee Lifecycle', value: 12, color: '#cbd5e1', hours: 17000, savings: '$1,145,000' },
];

const WORKFLOW_LEADERBOARD = [
  {
    id: 'wf-1',
    name: 'Inbound Lead Triage & Apollo Enrichment',
    category: 'Sales Ops',
    runs: '1,842,000 runs',
    hoursSaved: '46,000 hrs',
    dollarValue: '$3,082,000',
    unitCost: '$0.0001 vs $8.50 manual',
    handsFreeRate: '99.9%',
    roiMultiplier: '215.4x'
  },
  {
    id: 'wf-2',
    name: 'Zendesk VIP Ticket Intent & Escalation',
    category: 'Customer Support',
    runs: '1,489,000 runs',
    hoursSaved: '49,600 hrs',
    dollarValue: '$3,323,000',
    unitCost: '$0.0001 vs $9.80 manual',
    handsFreeRate: '99.9%',
    roiMultiplier: '198.8x'
  },
  {
    id: 'wf-3',
    name: 'Stripe Dispute Auto-Evidence Synthesizer',
    category: 'Finance Ops',
    runs: '124,000 disputes',
    hoursSaved: '20,600 hrs',
    dollarValue: '$1,648,000',
    unitCost: '$0.0002 vs $38.50 manual',
    handsFreeRate: '99.9%',
    roiMultiplier: '320.1x'
  },
  {
    id: 'wf-4',
    name: 'BambooHR to Okta / GitHub User Provisioning',
    category: 'IT / HR',
    runs: '48,000 hires',
    hoursSaved: '16,000 hrs',
    dollarValue: '$1,072,000',
    unitCost: '$0.0001 vs $22.00 manual',
    handsFreeRate: '99.9%',
    roiMultiplier: '258.2x'
  },
];

export default function PricingPage() {
  const [horizon, setHorizon] = useState<TimeHorizon>('30d');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isForecastDrawerOpen, setIsForecastDrawerOpen] = useState(false);

  // Simulator State
  const [simVolume, setSimVolume] = useState<number>(750000);
  const [simHourlyRate, setSimHourlyRate] = useState<number>(85);
  const [simMinutesPerTask, setSimMinutesPerTask] = useState<number>(20);

  useScrollLock(isExportModalOpen || isForecastDrawerOpen);

  const currentHorizonData = HORIZON_DATA[horizon];

  // Calculated simulation
  const manualHoursProjected = Math.round((simVolume * simMinutesPerTask) / 60);
  const manualCostProjected = Math.round(manualHoursProjected * simHourlyRate);
  const platformCostProjected = Math.round(simVolume * 0.0028) + 499; // $499 enterprise base
  const netAnnualSavings = (manualCostProjected - platformCostProjected) * 12;
  const roiMultiplier = Math.round((manualCostProjected / Math.max(platformCostProjected, 1)) * 10) / 10;

  const handleCopySummary = () => {
    const text = `NexaFlow ROI Report (${currentHorizonData.periodLabel}):
- Financial Savings: $${currentHorizonData.dollarSavings.toLocaleString()}
- Human Hours Saved: ${currentHorizonData.hoursSaved} hrs
- Autonomous Workflows: ${currentHorizonData.runsCount.toLocaleString()} runs (${currentHorizonData.autoRate}% hands-free)
- Turnaround Advantage: ${currentHorizonData.avgLatency} automated vs ${currentHorizonData.manualSla} manual SLA`;
    navigator.clipboard.writeText(text);
    toast.success('ROI Summary Copied', { description: 'Ready to share with leadership or board.' });
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-6 py-10 md:py-12 min-h-[70vh] relative">
        
        {/* Header Section - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
          className="mb-10 text-center max-w-3xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-900 mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-blue-700" />
            <span>Realized Value & Cost Efficiency Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3 text-center">
            ROI & Impact Dashboard
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-center">
            Track quantitative hours saved, labor costs reclaimed, and autonomous agent execution efficiency across your organization.
          </p>

          {/* Time Horizon Selector & Export - Centered Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
              {(['7d', '30d', 'q3', 'ytd'] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setHorizon(h)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    horizon === h
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {h === '7d' ? '7 Days' : h === '30d' ? '30 Days' : h === 'q3' ? 'Q3' : 'YTD'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsForecastDrawerOpen(true)}
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-2xs hover:scale-[1.02] cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              <span>Scale Forecaster</span>
            </button>

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs hover:scale-[1.02] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
          </div>
        </motion.div>

        {/* 4 Core Quantitative ROI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Card 1: Net Financial Savings */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: LUXURY_EASE }}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-slate-500 block">Net Realized Savings</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900">
                ${currentHorizonData.dollarSavings.toLocaleString()}
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> +14.2% vs prev
              </span>
              <span className="text-slate-400">{currentHorizonData.periodLabel}</span>
            </div>
          </motion.div>

          {/* Card 2: Reclaimed Labor Hours */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: LUXURY_EASE }}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-slate-500 block">Engineering & Ops Hours Reclaimed</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900">
                {currentHorizonData.hoursSaved.toLocaleString()} hrs
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">
                ~{(currentHorizonData.hoursSaved / 160).toFixed(1)} FTE equivalents
              </span>
              <span className="text-slate-400">Capacity freed</span>
            </div>
          </motion.div>

          {/* Card 3: Hands-Free Autonomous Resolution */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: LUXURY_EASE }}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-slate-500 block">Hands-Free Automation Rate</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900">
                {currentHorizonData.autoRate}%
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">
                {currentHorizonData.runsCount.toLocaleString()} total tasks
              </span>
              <span className="text-emerald-700 font-semibold">2.6% escalations</span>
            </div>
          </motion.div>

          {/* Card 4: Turnaround Velocity Advantage */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: LUXURY_EASE }}
            className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-slate-500 block">Average Velocity Advantage</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900">
                {currentHorizonData.avgLatency}
              </span>
              <span className="text-xs text-slate-400 font-normal">vs {currentHorizonData.manualSla}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-purple-700 font-semibold">99.9% faster</span>
              <span className="text-slate-400">Response SLA</span>
            </div>
          </motion.div>
        </div>

        {/* Charts Row: Cumulative Savings Comparison & Department Share */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Main Chart: Financial Value Comparison */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-900" /> Realized Savings Trend vs Manual Labor Cost
                </h3>
                <p className="text-xs text-slate-500">
                  Comparing simulated manual handling cost ($65/hr benchmark) with NexaFlow platform automated value
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-900" /> Net Savings
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-200" /> Manual Cost Benchmark
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentHorizonData.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val / 1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.75rem', color: '#fff', fontSize: '12px' }}
                    formatter={(val: any) => [`$${Number(val).toLocaleString()}`, '']}
                  />
                  <Area type="monotone" dataKey="savings" stroke="#1e3a8a" strokeWidth={2.5} fillOpacity={1} fill="url(#savingsGrad)" name="Net Savings ($)" />
                  <Area type="monotone" dataKey="manualCost" stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="4 4" fill="transparent" name="Manual Benchmark ($)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Breakdown Donut */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Value Breakdown by Department
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Allocation of hours and dollars reclaimed across business teams
              </p>

              <div className="h-44 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={DEPARTMENT_BREAKDOWN}
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {DEPARTMENT_BREAKDOWN.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center pointer-events-none">
                  <span className="text-xs font-bold text-slate-900">${(currentHorizonData.dollarSavings / 1000).toFixed(0)}k</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">Total</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              {DEPARTMENT_BREAKDOWN.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: dept.color }} />
                    <span className="text-slate-700 truncate">{dept.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-semibold text-slate-900">{dept.savings}</span>
                    <span className="text-[11px] text-slate-400">({dept.value}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workflow Leaderboard Table */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Highest ROI Workflows</h3>
              <p className="text-xs text-slate-500">Autonomous flows providing the largest multiple of cost-per-execution reduction</p>
            </div>
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Table Summary</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pl-1">Workflow Pipeline</th>
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Executions</th>
                  <th className="pb-3">Hours Reclaimed</th>
                  <th className="pb-3">Net Value</th>
                  <th className="pb-3">Cost Advantage</th>
                  <th className="pb-3 text-right pr-1">ROI Multiplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {WORKFLOW_LEADERBOARD.map((wf) => (
                  <tr key={wf.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 pl-1">
                      <span className="font-bold text-slate-900 block">{wf.name}</span>
                      <span className="text-[11px] text-slate-400">{wf.handsFreeRate} autonomous completion</span>
                    </td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {wf.category}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-600 text-xs">{wf.runs}</td>
                    <td className="py-3.5 text-slate-900 font-semibold text-xs">{wf.hoursSaved}</td>
                    <td className="py-3.5 text-emerald-700 font-bold text-xs">{wf.dollarValue}</td>
                    <td className="py-3.5 font-mono text-[11px] text-slate-500">{wf.unitCost}</td>
                    <td className="py-3.5 text-right pr-1">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                        <Sparkles className="w-3 h-3 text-blue-700" />
                        {wf.roiMultiplier}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FLOATING SECTION 1: SCALE FORECASTER DRAWER (With Scroll Lock)             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isForecastDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsForecastDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 z-10 flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Enterprise Scale Forecaster</h3>
                    <p className="text-xs text-slate-500">Project annual cost reductions as you expand workflow volume</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsForecastDrawerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto flex-1">
                {/* Simulator Controls */}
                <div className="space-y-6 bg-slate-50/70 p-6 rounded-2xl border border-slate-200/80">
                  {/* Slider 1: Monthly Task Executions */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <label className="text-slate-900">Monthly Task Executions</label>
                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-slate-900 font-bold">
                        {simVolume.toLocaleString()} runs / month
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min={10000} 
                      max={250000} 
                      step={5000}
                      value={simVolume} 
                      onChange={(e) => setSimVolume(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                      <span>10,000 runs</span>
                      <span>250,000 runs</span>
                    </div>
                  </div>

                  {/* Slider 2: Average Internal Team Hourly Rate */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <label className="text-slate-900">Average Internal Team Hourly Rate</label>
                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-slate-900 font-bold">
                        ${simHourlyRate} / hr
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min={40} 
                      max={180} 
                      step={5}
                      value={simHourlyRate} 
                      onChange={(e) => setSimHourlyRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                      <span>$40 / hr</span>
                      <span>$180 / hr</span>
                    </div>
                  </div>

                  {/* Slider 3: Manual Labor Time per Equivalent Task */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <label className="text-slate-900">Manual Labor Time per Equivalent Task</label>
                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-slate-900 font-bold">
                        {simMinutesPerTask} mins
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min={5} 
                      max={45} 
                      step={1}
                      value={simMinutesPerTask} 
                      onChange={(e) => setSimMinutesPerTask(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                      <span>5 mins</span>
                      <span>45 mins</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Outcome Highlight */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80">
                    <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">Projected Annual Savings</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-900 mt-1 block">
                      ${netAnnualSavings.toLocaleString()}
                    </span>
                    <span className="text-xs text-emerald-700 mt-1 block">Net after NexaFlow licensing</span>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/80">
                    <span className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider block">ROI Multiplier</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-blue-900 mt-1 block">
                      {roiMultiplier}x
                    </span>
                    <span className="text-xs text-blue-700 mt-1 block">{(manualHoursProjected * 12).toLocaleString()} hrs freed/yr</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50/60 flex items-center justify-end gap-3">
                <button
                  onClick={() => setIsForecastDrawerOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Close Forecaster
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FLOATING SECTION 2: EXPORT REPORT MODAL (With Scroll Lock)                */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isExportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExportModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 z-10 flex flex-col overflow-hidden"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-2.5">
                  <Download className="w-4 h-4 text-blue-900" />
                  <h3 className="text-base font-bold text-slate-900">Export Executive ROI Report</h3>
                </div>
                <button 
                  onClick={() => setIsExportModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Generate a verified executive briefing packet for internal stakeholders, finance, and leadership containing:
                </p>
                <ul className="text-xs text-slate-600 space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <li className="flex items-center gap-2 text-slate-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Hours reclaimed per department (FTE equivalents)
                  </li>
                  <li className="flex items-center gap-2 text-slate-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Unit cost comparison ($0.0022 vs manual benchmarks)
                  </li>
                  <li className="flex items-center gap-2 text-slate-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Compliance & SLA uptime performance record
                  </li>
                </ul>
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50/60 flex items-center justify-end gap-2.5">
                <button
                  onClick={() => setIsExportModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsExportModalOpen(false);
                    toast.success('Report Download Initiated', {
                      description: 'NexaFlow_Executive_ROI_Report_Q3.pdf generated successfully.'
                    });
                  }}
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-blue-950 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
