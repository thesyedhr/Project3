import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Zap, Shield, Cpu, Activity, RefreshCw, Play, CheckCircle2, 
  AlertTriangle, ArrowRight, Lock, Server, BarChart3, Database, 
  Sliders, Layers, Terminal, ExternalLink, X, FileText, Download, Check, Copy
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import { useScrollLock } from '../utils/useScrollLock';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

interface CapabilityItem {
  id: string;
  category: 'engine' | 'ai' | 'security' | 'dx';
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  metric: string;
  metricLabel: string;
  architectureDetails: string[];
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'self-healing',
    category: 'engine',
    title: 'Autonomous Self-Healing Circuit Breakers',
    badge: 'Zero-Touch Ops',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Dynamic detection of degraded upstream APIs with automated exponential backoff, dead-letter re-routing, and state preservation.',
    metric: '99.999%',
    metricLabel: 'Pipeline Execution Reliability',
    architectureDetails: [
      'Heuristic anomaly detector tracking latency spikes and HTTP 429/5xx status bursts.',
      'Distributed circuit breaker state synchronized via Raft consensus across worker nodes.',
      'Automatic re-queuing into persistent NVMe buffer without dropping inflight payloads.'
    ]
  },
  {
    id: 'sub-ms-engine',
    category: 'engine',
    title: 'Sub-Millisecond Event Mesh',
    badge: 'High-Throughput',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Zero-copy memory mapped ring buffers capable of processing over 150,000 DAG transitions per second per core.',
    metric: '0.84ms',
    metricLabel: 'Median (p50) Node Execution Latency',
    architectureDetails: [
      'Low-overhead event loop implemented with WebAssembly and native memory pooling.',
      'Lock-free single-producer multi-consumer ring queues for inter-step messaging.',
      'Adaptive batching algorithm that dynamically optimizes throughput under burst loads.'
    ]
  },
  {
    id: 'multi-model-ai',
    category: 'ai',
    title: 'Multi-Agent Semantic Orchestration',
    badge: 'Cognitive Engine',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'Dynamic model routing with deterministic schema adherence, output guardrails, and real-time confidence grading.',
    metric: '100%',
    metricLabel: 'JSON Schema Conformance',
    architectureDetails: [
      'Context-aware router selecting between Gemini Flash, Gemini Pro, and local LLM fallbacks.',
      'Deterministic JSON grammar enforcement preventing hallucinations at token generation.',
      'Automated semantic diff analysis for human-in-the-loop review triggers.'
    ]
  },
  {
    id: 'time-travel',
    category: 'dx',
    title: 'Deterministic Time-Travel Debugger',
    badge: 'Developer Tooling',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Immutable execution state captures allowing engineers to step backwards, fork execution paths, and hot-patch nodes live.',
    metric: 'Zero-Loss',
    metricLabel: 'Historical State Reproducibility',
    architectureDetails: [
      'Copy-on-write event store capturing binary snapshots at every DAG transition point.',
      'Virtual sandbox execution environment replicating external API responses with mock recording.',
      'Interactive visual stepper with side-by-side payload diff inspections.'
    ]
  },
  {
    id: 'zero-trust',
    category: 'security',
    title: 'Zero-Trust RBAC & Enclave Execution',
    badge: 'Enterprise Security',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'Cryptographically verified worker nodes running in ephemeral hardware enclaves with envelope KMS key rotation.',
    metric: 'SOC2 Type II',
    metricLabel: 'Certified Compliant Architecture',
    architectureDetails: [
      'Hardware-isolated microVMs with strictly restricted outbound network perimeters.',
      'Dynamic short-lived credential generation via AWS KMS / Google Cloud KMS.',
      'Full append-only audit trail streamed to tamper-proof S3 Glacier storage.'
    ]
  },
  {
    id: 'wasm-extensions',
    category: 'dx',
    title: 'Custom WASM Extensibility Sandbox',
    badge: 'Universal Plugins',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Deploy custom logic compiled from Rust, Go, or TypeScript running in isolated WebAssembly runtimes with microsecond start times.',
    metric: '< 4µs',
    metricLabel: 'Cold-Start Container Latency',
    architectureDetails: [
      'Wasmtime runtime integration providing memory-safe sandboxing per execution step.',
      'Direct access to custom cryptographic libraries, binary parsers, and custom protocol decoders.',
      'Strict execution fuel limits and CPU caps preventing rogue process runaway.'
    ]
  }
];

export default function FeaturesPage() {
  // State
  const [activeTab, setActiveTab] = useState<'simulators' | 'matrix' | 'telemetry'>('simulators');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'engine' | 'ai' | 'security' | 'dx'>('all');
  
  // Selected detail modal
  const [selectedCapability, setSelectedCapability] = useState<CapabilityItem | null>(null);
  
  // Diagnostics Benchmark Modal
  const [isBenchmarkModalOpen, setIsBenchmarkModalOpen] = useState(false);
  const [benchmarkRunning, setBenchmarkRunning] = useState(false);
  const [benchmarkProgress, setBenchmarkProgress] = useState(0);
  const [benchmarkCompleted, setBenchmarkCompleted] = useState(false);

  // Background scroll lock for modals
  useScrollLock(Boolean(selectedCapability) || isBenchmarkModalOpen);

  // Simulator 1 State: Self-Healing Circuit Breaker
  const [circuitStatus, setCircuitStatus] = useState<'CLOSED' | 'TRIPPED' | 'HALF_OPEN' | 'HEALED'>('CLOSED');
  const [circuitLogs, setCircuitLogs] = useState<string[]>([
    '[System Initialized]: All downstream connectors operating nominal. Error budget: 99.99%',
    '[Health Check]: Stripe Webhook gateway p95 latency: 42ms. Buffer queue: 0 pending.'
  ]);
  const [isSimulatingFailure, setIsSimulatingFailure] = useState(false);
  const [copiedLogs, setCopiedLogs] = useState(false);
  const [schemaViewMode, setSchemaViewMode] = useState<'structured' | 'json'>('structured');
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Simulator 2 State: Multi-Model AI Routing
  const [selectedTask, setSelectedTask] = useState<'support' | 'invoice' | 'fraud'>('support');
  const [selectedModel, setSelectedModel] = useState<'gemini-flash' | 'gemini-pro' | 'claude'>('gemini-flash');
  const [aiSynthesizing, setAiSynthesizing] = useState(false);
  const [synthesizedResult, setSynthesizedResult] = useState<{
    latencyMs: number;
    tokens: number;
    confidence: number;
    schemaValid: boolean;
    extractedData: Record<string, unknown>;
  } | null>({
    latencyMs: 142,
    tokens: 420,
    confidence: 0.98,
    schemaValid: true,
    extractedData: {
      intent: 'URGENT_REFUND_ESCALATION',
      priority: 'P1_CRITICAL',
      sentiment: 'FRUSTRATED',
      orderId: 'ORD-98214-X',
      autoRoutedQueue: 'VIP_FINANCE_ESCALATION',
      recommendedAction: 'ISSUE_PROVISIONAL_CREDIT'
    }
  });

  // Simulator 3 State: Sub-Millisecond Stream Engine
  const [burstRate, setBurstRate] = useState<number>(50000);
  const [burstTesting, setBurstTesting] = useState(false);
  const [burstMetrics, setBurstMetrics] = useState({
    p50: 0.76,
    p95: 1.28,
    p99: 1.94,
    jitter: 0.11,
    eventsProcessed: 250000,
    droppedEvents: 0
  });

  // Filtered capabilities
  const filteredCapabilities = useMemo(() => {
    if (categoryFilter === 'all') return CAPABILITIES;
    return CAPABILITIES.filter(c => c.category === categoryFilter);
  }, [categoryFilter]);

  // Run Circuit Breaker Failure Simulation
  const handleTriggerFailure = (type: 'stripe' | 'rate-limit' | 'db-lock') => {
    if (isSimulatingFailure) return;
    setIsSimulatingFailure(true);
    setCircuitStatus('TRIPPED');

    const failureDesc = 
      type === 'stripe' ? 'HTTP 504 Gateway Timeout (Stripe Payments Ingress)' :
      type === 'rate-limit' ? 'HTTP 429 Too Many Requests (Salesforce API Quota Exhausted)' :
      'PostgreSQL Lock Deadlock (Concurrent transaction conflict)';

    setCircuitLogs(prev => [
      `[CRITICAL ALERT]: Detected anomaly: ${failureDesc}`,
      `[Circuit Breaker]: Tripped state from CLOSED to OPEN for connector. Isolation activated.`,
      ...prev.slice(0, 4)
    ]);

    setTimeout(() => {
      setCircuitStatus('HALF_OPEN');
      setCircuitLogs(prev => [
        `[Self-Healing Engine]: Routing payload to warm secondary replica (Region: us-east-4).`,
        `[Backoff Engine]: Exponential jitter applied (180ms delay). Re-verifying downstream handshake.`,
        ...prev.slice(0, 4)
      ]);

      setTimeout(() => {
        setCircuitStatus('HEALED');
        setIsSimulatingFailure(false);
        setCircuitLogs(prev => [
          `[HEALED]: Verification payload returned HTTP 200 OK. Dynamic auto-recovery verified.`,
          `[Circuit Breaker]: Status returned to CLOSED. 0 payloads dropped. Zero customer impact.`,
          ...prev.slice(0, 4)
        ]);
      }, 1500);
    }, 1400);
  };

  // Run AI Synthesis Simulation
  const handleRunAiSynthesis = () => {
    setAiSynthesizing(true);
    setTimeout(() => {
      let data: Record<string, unknown>;
      let latency = 120;
      let tokens = 380;
      let confidence = 0.99;

      if (selectedTask === 'support') {
        data = {
          intent: 'SERVICE_DISRUPTION_INQUIRY',
          priority: 'P2_HIGH',
          sentiment: 'CONCERNED',
          organization: 'Stripe Enterprise Account',
          autoRoutedQueue: 'INFRA_SECOPS',
          action: 'AUTO_ATTACH_STATUS_INCIDENT_REPORT'
        };
        latency = selectedModel === 'gemini-flash' ? 112 : 280;
        tokens = 340;
      } else if (selectedTask === 'invoice') {
        data = {
          documentType: 'VAT_TAX_INVOICE',
          vendor: 'Cloudflare Inc.',
          amountDueUSD: 14850.00,
          paymentTerms: 'NET_30',
          poReference: 'PO-2026-8841',
          complianceSanityCheck: 'PASSED'
        };
        latency = selectedModel === 'gemini-flash' ? 148 : 340;
        tokens = 512;
      } else {
        data = {
          fraudScore: 0.04,
          riskTier: 'LOW_RISK_VERIFIED',
          velocityCheck: '1_TRANSACTION_PER_HOUR',
          deviceFingerprintMatch: true,
          action: 'ALLOW_INSTANT_SETTLEMENT'
        };
        latency = selectedModel === 'gemini-flash' ? 98 : 240;
        tokens = 290;
      }

      setSynthesizedResult({
        latencyMs: latency,
        tokens,
        confidence,
        schemaValid: true,
        extractedData: data
      });
      setAiSynthesizing(false);
    }, 850);
  };

  // Run Stream Engine Burst Load Test
  const handleRunBurstTest = () => {
    if (burstTesting) return;
    setBurstTesting(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setBurstMetrics(prev => ({
        p50: Number((0.68 + Math.random() * 0.18).toFixed(2)),
        p95: Number((1.15 + Math.random() * 0.22).toFixed(2)),
        p99: Number((1.75 + Math.random() * 0.35).toFixed(2)),
        jitter: Number((0.08 + Math.random() * 0.05).toFixed(2)),
        eventsProcessed: prev.eventsProcessed + Math.floor(burstRate / 4),
        droppedEvents: 0
      }));

      if (step >= 6) {
        clearInterval(interval);
        setBurstTesting(false);
      }
    }, 300);
  };

  // Run Platform Diagnostics Benchmark
  const handleStartBenchmark = () => {
    setIsBenchmarkModalOpen(true);
    setBenchmarkRunning(true);
    setBenchmarkCompleted(false);
    setBenchmarkProgress(0);

    const interval = setInterval(() => {
      setBenchmarkProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setBenchmarkRunning(false);
          setBenchmarkCompleted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 flex flex-col items-center">
        
        {/* Centered Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: LUXURY_EASE }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 flex flex-col items-center"
        >
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-900 mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>Platform Capabilities • Engine Architecture & Interactive Lab</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 text-center">
            Next-Gen Automation Engine & Feature Lab
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed text-center mb-6 max-w-2xl">
            Explore and benchmark the core architectural superpowers driving NexaFlow. Test autonomous self-healing, multi-agent AI synthesis, sub-millisecond event streaming, and zero-trust policy enforcement in the live sandbox.
          </p>

          {/* Centered Action Buttons & View Mode Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleStartBenchmark}
              className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-blue-900 text-white hover:bg-blue-950 transition-all shadow-xs flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
            >
              <Activity className="w-4 h-4 text-blue-300" />
              <span>Run Engine Diagnostics</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('matrix');
                const el = document.getElementById('capabilities-matrix-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-2xs flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
            >
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Explore Capability Matrix</span>
            </button>
          </div>
        </motion.div>

        {/* View Selection Segmented Control with Sleek Pill Design */}
        <div className="w-full flex justify-center mb-12 sm:mb-14">
          <div className="inline-flex items-center justify-center p-1.5 sm:p-2 bg-slate-100/90 rounded-full border border-slate-200/90 shadow-2xs gap-1 sm:gap-2 max-w-2xl w-full sm:w-auto relative">
            {[
              { id: 'simulators', label: 'Interactive Labs', icon: Cpu, iconColor: 'text-blue-900' },
              { id: 'matrix', label: 'Capability Specs', icon: Layers, iconColor: 'text-purple-700' },
              { id: 'telemetry', label: 'Live Telemetry', icon: BarChart3, iconColor: 'text-emerald-700', isLive: true }
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="relative px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold rounded-full flex items-center justify-center gap-2.5 cursor-pointer flex-1 sm:flex-initial select-none transition-colors duration-200"
                >
                  {isActive && (
                    <motion.div
                      layoutId="featuresTabGlider"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/90 z-0"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2.5">
                    <IconComp className={`w-4 h-4 shrink-0 transition-colors ${isActive ? tab.iconColor : 'text-slate-500'}`} />
                    <span className={`transition-colors whitespace-nowrap ${isActive ? 'text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'}`}>
                      {tab.label}
                    </span>
                    {tab.isLive && (
                      <span className="relative flex h-2 w-2 ml-0.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: INTERACTIVE SIMULATORS */}
          {activeTab === 'simulators' && (
            <motion.div
              key="simulators"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: LUXURY_EASE }}
              className="w-full flex flex-col gap-10"
            >
            
            {/* Simulator 1: Autonomous Self-Healing */}
            <div className="glass-panel p-6 sm:p-8 no-hover bg-white border border-slate-200/90 rounded-3xl shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-2">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Active Feature Sandbox</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Autonomous Circuit Breaker & Self-Healing Dispatcher
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
                    Test how NexaFlow autonomously detects degraded third-party webhooks, activates exponential jitter backoff, and transparently routes payloads to warm fallbacks with zero data loss.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-medium text-slate-500">Circuit State:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    circuitStatus === 'CLOSED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    circuitStatus === 'TRIPPED' ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse' :
                    circuitStatus === 'HALF_OPEN' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    ● {circuitStatus}
                  </span>
                </div>
              </div>

              {/* Interactive Controls & Live Logs */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Inject Upstream Fault Scenario
                  </span>
                  
                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={() => handleTriggerFailure('stripe')}
                      disabled={isSimulatingFailure}
                      className="p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-50 text-left transition-all flex items-center justify-between group cursor-pointer hover:scale-[1.02] disabled:opacity-60"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                          Stripe 504 Gateway Timeout
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Payment webhook latency exceeds 4,000ms threshold
                        </div>
                      </div>
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    </button>

                    <button
                      onClick={() => handleTriggerFailure('rate-limit')}
                      disabled={isSimulatingFailure}
                      className="p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-50 text-left transition-all flex items-center justify-between group cursor-pointer hover:scale-[1.02] disabled:opacity-60"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                          Salesforce API Quota 429 Limit
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Burst ingest exhausts hourly REST API allocation
                        </div>
                      </div>
                      <Sliders className="w-4 h-4 text-purple-500 shrink-0" />
                    </button>

                    <button
                      onClick={() => handleTriggerFailure('db-lock')}
                      disabled={isSimulatingFailure}
                      className="p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-50 text-left transition-all flex items-center justify-between group cursor-pointer hover:scale-[1.02] disabled:opacity-60"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                          PostgreSQL Row Lock Deadlock
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Concurrent transaction conflict on customer ledger
                        </div>
                      </div>
                      <Database className="w-4 h-4 text-rose-500 shrink-0" />
                    </button>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                    <strong>Auto-Healing SLA:</strong> In-flight messages are automatically held in persistent memory queues during failover. Zero requests are dropped.
                  </div>
                </div>

                {/* Live Heuristic Recovery Stream */}
                <div className="lg:col-span-7 flex flex-col">
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-50/90 rounded-t-2xl border-t border-x border-slate-200 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="font-semibold text-slate-900 tracking-tight">Heuristic Recovery Monitor</span>
                      <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200/80 hidden sm:inline-block">
                        ws://engine.health
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/70">
                        Live Socket Active
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(circuitLogs.join('\n'));
                          setCopiedLogs(true);
                          setTimeout(() => setCopiedLogs(false), 2000);
                        }}
                        className="text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer hover:scale-[1.02]"
                        title="Copy logs"
                      >
                        {copiedLogs ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedLogs ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50/40 p-3.5 rounded-b-2xl border-x border-b border-slate-200 min-h-[230px] flex flex-col justify-start gap-2 overflow-y-auto max-h-[300px]">
                    {circuitLogs.map((log, idx) => {
                      const isCritical = log.includes('CRITICAL');
                      const isHealed = log.includes('HEALED');
                      const isReroute = log.includes('Self-Healing') || log.includes('Backoff');

                      return (
                        <div 
                          key={idx} 
                          className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-start gap-3 transition-all"
                        >
                          <div className="mt-0.5 shrink-0">
                            {isCritical ? (
                              <span className="w-5 h-5 rounded-md bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                                <AlertTriangle className="w-3 h-3" />
                              </span>
                            ) : isHealed ? (
                              <span className="w-5 h-5 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                                <CheckCircle2 className="w-3 h-3" />
                              </span>
                            ) : isReroute ? (
                              <span className="w-5 h-5 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                                <RefreshCw className="w-3 h-3 animate-spin" />
                              </span>
                            ) : (
                              <span className="w-5 h-5 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                                <Activity className="w-3 h-3" />
                              </span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-[11px] font-bold uppercase tracking-wider ${
                                isCritical ? 'text-rose-700' : isHealed ? 'text-emerald-700' : isReroute ? 'text-amber-700' : 'text-slate-700'
                              }`}>
                                {isCritical ? 'Circuit Fault Detected' : isHealed ? 'Self-Healing Verified' : isReroute ? 'Autonomous Reroute' : 'Health Check'}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                +{idx * 320}ms
                              </span>
                            </div>
                            <p className="text-xs text-slate-700 font-mono mt-0.5 leading-relaxed break-words">
                              {log}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    {isSimulatingFailure && (
                      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs font-medium animate-pulse">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-700 shrink-0" />
                        <span>Self-healing orchestration in progress: Holding payload buffer and rerouting to warm replica...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Simulator 2: Multi-Model AI Semantic Orchestration */}
            <div className="glass-panel p-6 sm:p-8 no-hover bg-white border border-slate-200/90 rounded-3xl shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-50 border border-purple-200/80 text-purple-800 text-xs font-semibold mb-2">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Cognitive Pipeline Node</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Multi-Model AI Semantic Router & Structured Schema Extractor
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
                    Experience zero-prompt-leakage structured schema synthesis. Ingest unstructured documents, emails, or payloads with guaranteed JSON schema validation and deterministic confidence grading.
                  </p>
                </div>

                <button
                  onClick={handleRunAiSynthesis}
                  disabled={aiSynthesizing}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-purple-900 text-white hover:bg-purple-950 transition-all shadow-xs flex items-center gap-2 hover:scale-[1.02] cursor-pointer shrink-0 disabled:opacity-60"
                >
                  {aiSynthesizing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" fill="currentColor" />}
                  <span>{aiSynthesizing ? 'Synthesizing...' : 'Synthesize Schema'}</span>
                </button>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Sample Inbound Payload
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setSelectedTask('support')}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          selectedTask === 'support'
                            ? 'bg-purple-50 border-purple-300 text-purple-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Support Ticket
                      </button>
                      <button
                        onClick={() => setSelectedTask('invoice')}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          selectedTask === 'invoice'
                            ? 'bg-purple-50 border-purple-300 text-purple-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Invoice OCR
                      </button>
                      <button
                        onClick={() => setSelectedTask('fraud')}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          selectedTask === 'fraud'
                            ? 'bg-purple-50 border-purple-300 text-purple-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Fraud Score
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Active Model Target
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setSelectedModel('gemini-flash')}
                        className={`p-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          selectedModel === 'gemini-flash'
                            ? 'bg-blue-50 border-blue-300 text-blue-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Gemini 1.5 Flash
                      </button>
                      <button
                        onClick={() => setSelectedModel('gemini-pro')}
                        className={`p-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          selectedModel === 'gemini-pro'
                            ? 'bg-blue-50 border-blue-300 text-blue-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Gemini 1.5 Pro
                      </button>
                      <button
                        onClick={() => setSelectedModel('claude')}
                        className={`p-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          selectedModel === 'claude'
                            ? 'bg-blue-50 border-blue-300 text-blue-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Claude 3.5 Fallback
                      </button>
                    </div>
                  </div>

                  {/* Benchmark Meta Pills */}
                  {synthesizedResult && (
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <div className="text-[11px] text-slate-500 font-medium">Inference Latency</div>
                        <div className="text-sm font-bold text-slate-900 mt-0.5">{synthesizedResult.latencyMs}ms</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <div className="text-[11px] text-slate-500 font-medium">Token Footprint</div>
                        <div className="text-sm font-bold text-slate-900 mt-0.5">{synthesizedResult.tokens} tok</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                        <div className="text-[11px] text-slate-500 font-medium">Confidence</div>
                        <div className="text-sm font-bold text-emerald-700 mt-0.5">{(synthesizedResult.confidence * 100).toFixed(0)}%</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Structured AST Schema Inspector */}
                <div className="lg:col-span-7 flex flex-col">
                  <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-slate-50/90 rounded-t-2xl border-t border-x border-slate-200 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-800">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-slate-900 tracking-tight">Structured AST Schema Output</span>
                      <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Schema Compliant
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Segmented View Switcher */}
                      <div className="flex items-center bg-white p-0.5 rounded-lg border border-slate-200 shadow-2xs">
                        <button
                          onClick={() => setSchemaViewMode('structured')}
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                            schemaViewMode === 'structured'
                              ? 'bg-blue-50 text-blue-900 border border-blue-200/60'
                              : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          Properties
                        </button>
                        <button
                          onClick={() => setSchemaViewMode('json')}
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                            schemaViewMode === 'json'
                              ? 'bg-blue-50 text-blue-900 border border-blue-200/60'
                              : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          Raw JSON
                        </button>
                      </div>

                      {/* Copy JSON Button */}
                      <button
                        onClick={() => {
                          if (synthesizedResult?.extractedData) {
                            navigator.clipboard.writeText(JSON.stringify(synthesizedResult.extractedData, null, 2));
                            setCopiedSchema(true);
                            setTimeout(() => setCopiedSchema(false), 2000);
                          }
                        }}
                        className="text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer hover:scale-[1.02] shadow-2xs"
                        title="Copy schema JSON"
                      >
                        {copiedSchema ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedSchema ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50/40 p-3.5 rounded-b-2xl border-x border-b border-slate-200 min-h-[220px]">
                    {schemaViewMode === 'structured' && synthesizedResult?.extractedData ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {Object.entries(synthesizedResult.extractedData).map(([key, value]) => {
                          const strVal = String(value);
                          const isHighPriority = strVal.includes('P1_') || strVal.includes('CRITICAL') || strVal.includes('URGENT') || strVal.includes('HIGH_RISK');
                          const isMediumPriority = strVal.includes('P2_') || strVal.includes('CONCERNED');
                          const isPositive = strVal.includes('PASSED') || strVal.includes('ALLOW') || strVal.includes('LOW_RISK') || strVal.includes('COMPLIANT');

                          return (
                            <div key={key} className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between transition-all">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                                {key}
                              </span>
                              <div className="mt-1.5 text-xs">
                                {typeof value === 'boolean' ? (
                                  <span className={`px-2 py-0.5 rounded-md font-mono font-bold text-[11px] ${
                                    value ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80' : 'bg-rose-50 text-rose-700 border border-rose-200/80'
                                  }`}>
                                    {value ? 'true' : 'false'}
                                  </span>
                                ) : typeof value === 'number' ? (
                                  <span className="font-mono font-bold text-blue-900 text-sm">
                                    {value}
                                  </span>
                                ) : isHighPriority ? (
                                  <span className="px-2 py-0.5 rounded-md font-semibold text-[11px] bg-rose-50 text-rose-700 border border-rose-200/80 inline-block font-mono">
                                    {strVal}
                                  </span>
                                ) : isMediumPriority ? (
                                  <span className="px-2 py-0.5 rounded-md font-semibold text-[11px] bg-amber-50 text-amber-700 border border-amber-200/80 inline-block font-mono">
                                    {strVal}
                                  </span>
                                ) : isPositive ? (
                                  <span className="px-2 py-0.5 rounded-md font-semibold text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200/80 inline-block font-mono">
                                    {strVal}
                                  </span>
                                ) : (
                                  <span className="font-semibold text-slate-800 font-mono text-xs">
                                    "{strVal}"
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="relative">
                        <pre className="p-4 bg-white text-slate-800 font-mono text-xs rounded-xl border border-slate-200/90 overflow-x-auto shadow-2xs leading-relaxed max-h-[250px]">
                          {JSON.stringify(synthesizedResult?.extractedData, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Simulator 3: Sub-Millisecond Stream Engine */}
            <div className="glass-panel p-6 sm:p-8 no-hover bg-white border border-slate-200/90 rounded-3xl shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200/80 text-blue-800 text-xs font-semibold mb-2">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Ultra-Low-Latency Engine</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Sub-Millisecond Event Mesh & Lock-Free Ring Buffer
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
                    Benchmark high-concurrency event ingestion. Observe deterministic p50, p95, and p99 microsecond latencies under sustained burst stress.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <select 
                    value={burstRate} 
                    onChange={(e) => setBurstRate(Number(e.target.value))}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-700 cursor-pointer"
                  >
                    <option value={10000}>10,000 events / sec</option>
                    <option value={50000}>50,000 events / sec</option>
                    <option value={100000}>100,000 events / sec</option>
                  </select>

                  <button
                    onClick={handleRunBurstTest}
                    disabled={burstTesting}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-900 text-white hover:bg-blue-950 transition-all shadow-xs flex items-center gap-2 hover:scale-[1.02] cursor-pointer disabled:opacity-60"
                  >
                    <Play className="w-3.5 h-3.5" fill="currentColor" />
                    <span>{burstTesting ? 'Stress Testing...' : 'Fire Load Burst'}</span>
                  </button>
                </div>
              </div>

              {/* Metrics Display */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-6">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-medium text-slate-500">p50 Latency</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{burstMetrics.p50} ms</div>
                  <div className="text-[11px] text-emerald-600 mt-1 font-semibold">Sub-millisecond median</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-medium text-slate-500">p95 Latency</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{burstMetrics.p95} ms</div>
                  <div className="text-[11px] text-emerald-600 mt-1 font-semibold">95% under 1.5ms</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-medium text-slate-500">p99 Max Latency</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{burstMetrics.p99} ms</div>
                  <div className="text-[11px] text-emerald-600 mt-1 font-semibold">Zero outlier stalls</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-medium text-slate-500">Jitter Variance</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">±{burstMetrics.jitter} ms</div>
                  <div className="text-[11px] text-slate-500 mt-1">Consistent execution</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-medium text-slate-500">Events Processed</div>
                  <div className="text-2xl font-bold text-blue-900 mt-1">
                    {(burstMetrics.eventsProcessed / 1000).toFixed(0)}k
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">In benchmark window</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-medium text-slate-500">Dropped Ingress</div>
                  <div className="text-2xl font-bold text-emerald-700 mt-1">0</div>
                  <div className="text-[11px] text-emerald-600 mt-1 font-semibold">Zero packet drop</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: CAPABILITY MATRIX & SPECS */}
        {activeTab === 'matrix' && (
          <motion.div 
            key="matrix"
            id="capabilities-matrix-section" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: LUXURY_EASE }}
            className="w-full flex flex-col gap-8"
          >
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { id: 'all', label: 'All Capabilities' },
                { id: 'engine', label: 'Core Engine' },
                { id: 'ai', label: 'AI & Cognitive Logic' },
                { id: 'security', label: 'Enterprise Security' },
                { id: 'dx', label: 'Developer DX' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    categoryFilter === cat.id
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Contextual / Magnetic Sibling Hover Grid matching Integration Cards */}
            <div className="hover-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredCapabilities.map((cap) => (
                  <motion.div
                    layout
                    key={cap.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ 
                      duration: 0.35, 
                      ease: LUXURY_EASE,
                      layout: { duration: 0.38, ease: LUXURY_EASE }
                    }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedCapability(cap)}
                    className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-slate-300 hover-item transition-all duration-200 flex flex-col justify-between h-full group relative overflow-hidden cursor-pointer"
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cap.badgeColor}`}>
                          {cap.badge}
                        </span>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-900 transition-colors" />
                      </div>

                      <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors mb-2">
                        {cap.title}
                      </h4>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                        {cap.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                      <div>
                        <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                          {cap.metricLabel}
                        </div>
                        <div className="text-xl font-bold text-slate-900 mt-0.5">
                          {cap.metric}
                        </div>
                      </div>
                      
                      <span className="text-xs font-semibold text-blue-900 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                        Spec Details <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
                      </span>
                    </div>

                    {/* Subtle background glow on hover - matching Integrations cards */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* TAB 3: REAL-TIME ENGINE TELEMETRY */}
        {activeTab === 'telemetry' && (
          <motion.div 
            key="telemetry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: LUXURY_EASE }}
            className="w-full flex flex-col gap-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase">Engine Clusters</span>
                  <Server className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">48 / 48</div>
                <div className="text-xs text-emerald-700 font-medium mt-1">100% healthy across 6 regions</div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase">Avg Global Latency</span>
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">1.18 ms</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Edge mesh round-trip</div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase">Auto-Healed Incidents</span>
                  <Shield className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">142</div>
                <div className="text-xs text-purple-700 font-medium mt-1">Resolved without human triage</div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase">Memory Pressure</span>
                  <Cpu className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900 mt-2">14.2%</div>
                <div className="text-xs text-slate-500 font-medium mt-1">High buffer headroom</div>
              </div>
            </div>

            {/* SLA Guarantee Breakdown */}
            <div className="glass-panel p-6 sm:p-8 no-hover bg-white border border-slate-200/90 rounded-3xl shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Enterprise Service Level Commitments (SLA)
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-6">
                All production deployments are backed by contractually guaranteed uptime and latency thresholds.
              </p>

              <div className="divide-y divide-slate-100">
                <div className="py-3.5 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-800">Production Availability</span>
                  <span className="font-mono font-bold text-emerald-700">99.999% SLA</span>
                </div>
                <div className="py-3.5 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-800">Maximum Ingress Webhook Latency</span>
                  <span className="font-mono font-bold text-slate-900">&lt; 15.0ms (p99)</span>
                </div>
                <div className="py-3.5 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-800">Recovery Time Objective (RTO)</span>
                  <span className="font-mono font-bold text-slate-900">&lt; 30 Seconds Instant Regional Failover</span>
                </div>
                <div className="py-3.5 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-slate-800">Recovery Point Objective (RPO)</span>
                  <span className="font-mono font-bold text-slate-900">0.0 Seconds (Zero payload loss buffer)</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* FLOATING MODAL 1: CAPABILITY ARCHITECTURAL DEEP-DIVE */}
        <AnimatePresence>
          {selectedCapability && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCapability(null)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: LUXURY_EASE }}
                className="relative z-10 w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${selectedCapability.badgeColor}`}>
                      {selectedCapability.badge}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-2">
                      {selectedCapability.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCapability(null)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-4">
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {selectedCapability.description}
                  </p>

                  <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-3">
                    Architectural Invariants & Specs
                  </h4>

                  <ul className="space-y-2.5">
                    {selectedCapability.architectureDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                        Performance Metric
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {selectedCapability.metricLabel}
                      </div>
                    </div>
                    <div className="text-xl font-bold text-blue-900">
                      {selectedCapability.metric}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setSelectedCapability(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-900 text-white hover:bg-blue-950 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* FLOATING MODAL 2: BENCHMARK DIAGNOSTICS MODAL */}
        <AnimatePresence>
          {isBenchmarkModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !benchmarkRunning && setIsBenchmarkModalOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: LUXURY_EASE }}
                className="relative z-10 w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-8"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-900" />
                    <h3 className="text-lg font-bold text-slate-900">
                      Automated Engine Diagnostics
                    </h3>
                  </div>
                  {!benchmarkRunning && (
                    <button
                      onClick={() => setIsBenchmarkModalOpen(false)}
                      className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="py-6">
                  {benchmarkRunning ? (
                    <div className="flex flex-col items-center text-center">
                      <RefreshCw className="w-8 h-8 text-blue-900 animate-spin mb-4" />
                      <h4 className="text-sm font-bold text-slate-900">
                        Running Platform Stress Benchmark ({benchmarkProgress}%)
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs">
                        Profiling memory fragmentation, event loop latency, and distributed Raft heartbeat synchronization...
                      </p>

                      <div className="w-full bg-slate-100 rounded-full h-2.5 mt-6 overflow-hidden border border-slate-200">
                        <div 
                          className="bg-blue-900 h-full transition-all duration-200" 
                          style={{ width: `${benchmarkProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">Diagnostics Passed: 100% Optimal Posture</div>
                          <div className="text-emerald-700 mt-0.5">
                            All 48 node clusters verified. Zero memory leaks detected. Circuit breakers armed and ready.
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600">
                          <span>p50 Loop Overhead:</span>
                          <span className="font-mono font-bold text-slate-900">0.78ms</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600">
                          <span>NVMe Buffer Write I/O:</span>
                          <span className="font-mono font-bold text-slate-900">1.4 GB/s</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-100 text-slate-600">
                          <span>Cross-Region Quorum Ping:</span>
                          <span className="font-mono font-bold text-slate-900">24ms</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    onClick={() => setIsBenchmarkModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  {benchmarkCompleted && (
                    <button
                      onClick={() => setIsBenchmarkModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-900 text-white hover:bg-blue-950 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Report</span>
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
