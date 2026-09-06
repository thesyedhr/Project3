import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, Clock, DollarSign, Sparkles, ArrowRight } from 'lucide-react';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

interface Preset {
  id: string;
  name: string;
  teamSize: number;
  hoursPerWeek: number;
  hourlyRate: number;
}

const PRESETS: Preset[] = [
  { id: 'support', name: 'Customer Support', teamSize: 20, hoursPerWeek: 12, hourlyRate: 35 },
  { id: 'sales', name: 'Sales & GTM', teamSize: 15, hoursPerWeek: 8, hourlyRate: 60 },
  { id: 'engineering', name: 'Engineering Ops', teamSize: 12, hoursPerWeek: 6, hourlyRate: 95 },
  { id: 'finance', name: 'Finance & Invoicing', teamSize: 8, hoursPerWeek: 10, hourlyRate: 70 },
];

export default function RoiCalculator({ onOpenAuth }: { onOpenAuth?: () => void }) {
  const [teamSize, setTeamSize] = useState<number>(15);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(8);
  const [hourlyRate, setHourlyRate] = useState<number>(55);
  const [selectedPreset, setSelectedPreset] = useState<string>('sales');

  const applyPreset = (preset: Preset) => {
    setSelectedPreset(preset.id);
    setTeamSize(preset.teamSize);
    setHoursPerWeek(preset.hoursPerWeek);
    setHourlyRate(preset.hourlyRate);
  };

  // Calculations: Assuming 70% of repetitive work is eliminated by NexaFlow
  const metrics = useMemo(() => {
    const WEEKS_PER_MONTH = 4.33;
    const AUTOMATION_FACTOR = 0.72; // 72% automation efficacy
    
    const monthlyManualHours = teamSize * hoursPerWeek * WEEKS_PER_MONTH;
    const monthlyHoursSaved = Math.round(monthlyManualHours * AUTOMATION_FACTOR);
    const monthlyDollarsSaved = Math.round(monthlyHoursSaved * hourlyRate);
    const annualDollarsSaved = monthlyDollarsSaved * 12;

    // Estimated NexaFlow cost benchmark (~$79/mo starter, or ~$399 for pro team)
    const estimatedCost = teamSize > 20 ? 399 : 149;
    const roiMultiplier = ((monthlyDollarsSaved / estimatedCost)).toFixed(1);

    return {
      monthlyHoursSaved,
      monthlyDollarsSaved,
      annualDollarsSaved,
      roiMultiplier,
    };
  }, [teamSize, hoursPerWeek, hourlyRate]);

  // Contextual distribution of recaptured time based on preset and actual computed hours
  const distributionBreakdown = useMemo(() => {
    const configs: Record<string, { label: string; pct: number }[]> = {
      support: [
        { label: 'Ticket Triage & Sync', pct: 45 },
        { label: 'Auto-Resolves & Macros', pct: 35 },
        { label: 'CRM Updates & Handoffs', pct: 20 },
      ],
      sales: [
        { label: 'CRM Sync & Enrichment', pct: 45 },
        { label: 'Lead Routing & Cadence', pct: 35 },
        { label: 'Proposal & Quote Drafting', pct: 20 },
      ],
      engineering: [
        { label: 'CI/CD & Alert Sync', pct: 40 },
        { label: 'Issue & Backlog Triage', pct: 35 },
        { label: 'Release Notes & Docs', pct: 25 },
      ],
      finance: [
        { label: 'Invoice & Ledger Sync', pct: 45 },
        { label: 'Expense Approval Routing', pct: 35 },
        { label: 'Audit Trail Reporting', pct: 20 },
      ],
    };

    const current = configs[selectedPreset] || [
      { label: 'Cross-App Data Sync', pct: 45 },
      { label: 'Workflow Triage & Routing', pct: 35 },
      { label: 'Document & Report Prep', pct: 20 },
    ];

    // Refined tonal palette in harmony with NexaFlow's navy and cool slate aesthetic
    const styles = [
      { bg: 'bg-[#13318c]', dot: 'bg-[#13318c]', text: 'text-[#13318c]' },
      { bg: 'bg-slate-600', dot: 'bg-slate-600', text: 'text-slate-700' },
      { bg: 'bg-slate-300', dot: 'bg-slate-400', text: 'text-slate-600' },
    ];

    return current.map((item, idx) => ({
      ...item,
      hours: Math.round(metrics.monthlyHoursSaved * (item.pct / 100)),
      style: styles[idx],
    }));
  }, [selectedPreset, metrics.monthlyHoursSaved]);

  return (
    <section id="roi-calculator" className="w-full py-24 md:py-32 px-6 relative bg-slate-50/75 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100/80 text-xs font-semibold text-blue-900 mb-4"
          >
            <Calculator className="w-3.5 h-3.5 text-blue-800" />
            <span>Operational ROI Simulator</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05, ease: LUXURY_EASE }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4 md:mb-5"
          >
            Quantify your automation return
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
            className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Calculate the exact hours and budget your organization recaptures by eliminating manual, repetitive workflows.
          </motion.p>
        </div>

        {/* Preset Selector Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          <span className="text-xs font-semibold text-slate-400 mr-1 uppercase tracking-wider">Quick Presets:</span>
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                selectedPreset === preset.id
                  ? 'bg-blue-900 text-white hover:bg-blue-950 shadow-xs'
                  : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200/80'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Calculator Main Panel */}
        <div className="max-w-5xl mx-auto glass-panel no-hover overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Input Sliders Side (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 border-b lg:border-b-0 lg:border-r border-slate-200/80">
              
              {/* Slider 1: Team Size */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-900">Team Members Involved</label>
                  <span className="px-3 py-1 bg-slate-100 rounded-lg text-slate-900 font-bold">
                    {teamSize} people
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="150"
                  value={teamSize}
                  onChange={(e) => {
                    setTeamSize(Number(e.target.value));
                    setSelectedPreset('');
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>2 members</span>
                  <span>150 members</span>
                </div>
              </div>

              {/* Slider 2: Manual Hours per Week */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-900">Repetitive Task Hours / Person / Week</label>
                  <span className="px-3 py-1 bg-slate-100 rounded-lg text-slate-900 font-bold">
                    {hoursPerWeek} hrs/wk
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="25"
                  value={hoursPerWeek}
                  onChange={(e) => {
                    setHoursPerWeek(Number(e.target.value));
                    setSelectedPreset('');
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>2 hours</span>
                  <span>25 hours</span>
                </div>
              </div>

              {/* Slider 3: Hourly Rate */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-900">Average Loaded Cost / Hour</label>
                  <span className="px-3 py-1 bg-slate-100 rounded-lg text-slate-900 font-bold">
                    ${hourlyRate}/hr
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="180"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => {
                    setHourlyRate(Number(e.target.value));
                    setSelectedPreset('');
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>$20/hr</span>
                  <span>$180/hr</span>
                </div>
              </div>

              {/* Reclaimed Focus Visual */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-semibold text-slate-700">Automated Time Distribution</span>
                  <span className="text-[11px] font-semibold text-blue-900 bg-blue-50 border border-blue-100/80 px-2.5 py-0.5 rounded-full">
                    {metrics.monthlyHoursSaved.toLocaleString()} hrs/mo recaptured
                  </span>
                </div>

                {/* Cohesive Tonal Bar */}
                <div className="h-2.5 w-full rounded-full bg-slate-100 flex overflow-hidden p-0.5 gap-0.5 ring-1 ring-slate-200/80">
                  {distributionBreakdown.map((item, index) => (
                    <div
                      key={item.label}
                      className={`h-full ${item.style.bg} transition-all duration-300 ${
                        index === 0 ? 'rounded-l-full' : ''
                      } ${index === distributionBreakdown.length - 1 ? 'rounded-r-full' : ''}`}
                      style={{ width: `${item.pct}%` }}
                      title={`${item.label}: ${item.hours} hrs/mo (${item.pct}%)`}
                    />
                  ))}
                </div>

                {/* Relevant Workflow Breakdown Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                  {distributionBreakdown.map((item) => (
                    <div
                      key={item.label}
                      className="p-2.5 rounded-xl bg-white border border-slate-200/70 shadow-2xs flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className={`w-2 h-2 rounded-full ${item.style.dot} shrink-0`} />
                        <span className="text-[11px] font-semibold text-slate-700 truncate" title={item.label}>
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-slate-400 font-medium text-[11px]">{item.pct}%</span>
                        <span className="font-bold text-slate-900">{item.hours} hrs/mo</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Results Output Metrics Side (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-10 bg-slate-50/70 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center text-white">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Projected Operational Gain</h3>
                    <p className="text-xs text-slate-500">Real-time dynamic estimate</p>
                  </div>
                </div>

                <div className="space-y-4">
                  
                  {/* Metric 1: Monthly Cost Saved */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
                      <DollarSign className="w-3.5 h-3.5 text-blue-800" />
                      <span>MONTHLY VALUE CREATED</span>
                    </div>
                    <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                      ${metrics.monthlyDollarsSaved.toLocaleString()}
                      <span className="text-xs text-slate-400 font-medium ml-1">/ month</span>
                    </div>
                  </div>

                  {/* Metric 2: Hours Recaptured */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
                      <Clock className="w-3.5 h-3.5 text-blue-800" />
                      <span>HOURS RECAPTURED</span>
                    </div>
                    <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                      {metrics.monthlyHoursSaved.toLocaleString()}
                      <span className="text-xs text-slate-400 font-medium ml-1">hrs / mo</span>
                    </div>
                  </div>

                  {/* Metric 3: Annual ROI Multiplier */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200/80">
                      <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">Annual Value</span>
                      <span className="text-lg font-bold text-slate-900">
                        ${Math.round(metrics.annualDollarsSaved / 1000)}k/yr
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200/80">
                      <span className="text-[11px] font-semibold text-slate-500 block mb-0.5">Projected ROI</span>
                      <span className="text-lg font-bold text-slate-900">
                        {metrics.roiMultiplier}x return
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Call to action */}
              <div className="mt-8 pt-4">
                <button
                  onClick={onOpenAuth}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-900 text-white font-semibold text-sm hover:bg-blue-950 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-slate-300" />
                  <span>Start Recapturing Hours</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  Based on validated cross-industry benchmarks with NexaFlow AI.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
