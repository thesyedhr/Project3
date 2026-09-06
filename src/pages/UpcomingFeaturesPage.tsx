import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import InteractiveFeatureLab from '../components/roadmap/InteractiveFeatureLab';
import { 
  Rocket, Lightbulb, Workflow, Network, Cpu, ShieldAlert,
  Zap, Compass, CalendarClock, Beaker, GitBranch, CloudLightning,
  CheckCircle2, ArrowRight, ThumbsUp, Sparkles, Layers,
  Terminal, ShieldCheck, Lock, Radio, Eye, Send, Plus, Users, Globe2, Activity
} from 'lucide-react';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

type FeatureItem = {
  id: string;
  title: string;
  tagline: string;
  category: 'Autonomous Agents' | 'Resilience & Infra' | 'Generative UI' | 'Security & Crypto';
  timeline: 'Q3 2026' | 'Q4 2026' | 'Q1 2027' | 'Q2 2027';
  status: 'Alpha Testing' | 'In Development' | 'Architecture Design' | 'Public Preview';
  votes: number;
  icon: any;
  color: string;
  description: string;
  technicalSpecs: string[];
  benchmarks: { label: string; value: string }[];
};

const UPCOMING_FEATURES: FeatureItem[] = [
  {
    id: 'feat-1',
    title: 'Autonomous Multi-Agent Swarms & Consensus Engine',
    tagline: 'Dynamic teams of specialized AI agents collaborating via mathematical voting protocols.',
    category: 'Autonomous Agents',
    timeline: 'Q3 2026',
    status: 'Public Preview',
    votes: 412,
    icon: Users,
    color: 'indigo',
    description: 'Move beyond linear sequential workflows. Deploy autonomous supervisor agents that dynamically decompose enterprise goals into sub-tasks, delegate work to specialized worker agents (research, SQL generation, policy validation), and run Byzantine-fault-tolerant consensus checks before executing critical external side-effects.',
    technicalSpecs: [
      'Hierarchical Supervisor-Worker DAG generation',
      'Byzantine voting protocol to eliminate hallucinated actions',
      'Shared vector memory mesh with real-time semantic caching',
      'Dynamic sub-agent spawning based on workload complexity'
    ],
    benchmarks: [
      { label: 'Task Throughput', value: '4.8x faster' },
      { label: 'Hallucination Mitigation', value: '99.7%' },
      { label: 'Concurrent Sub-Agents', value: 'Up to 32' }
    ]
  },
  {
    id: 'feat-2',
    title: 'Self-Healing Pipelines & Dynamic Schema Adapters',
    tagline: 'Pipelines that automatically detect breaking upstream API changes and adapt payload mappings.',
    category: 'Resilience & Infra',
    timeline: 'Q3 2026',
    status: 'In Development',
    votes: 388,
    icon: ShieldAlert,
    color: 'emerald',
    description: 'When third-party APIs (Stripe, Zendesk, Salesforce) deprecate fields or alter webhook response schemas, NexaFlow’s self-healing engine automatically inspects the payload diff, generates an in-memory transformation shim, and alerts engineering while maintaining 100% operational uptime.',
    technicalSpecs: [
      'Automated semantic diff analysis of incoming webhook anomalies',
      'Runtime TypeScript/JSON-Schema auto-repair shims',
      'Multi-tier circuit breakers with automated exponential backoff',
      'Zero-downtime hot-reloading of node execution pipelines'
    ],
    benchmarks: [
      { label: 'Pipeline Uptime Guarantee', value: '99.999%' },
      { label: 'Mean Time to Repair (MTTR)', value: '< 180ms' },
      { label: 'Schema Drift Accuracy', value: '99.4%' }
    ]
  },
  {
    id: 'feat-3',
    title: 'Generative UI for Human-in-the-Loop Review',
    tagline: 'Instant React interfaces dynamically rendered on-the-fly for high-stakes decision approvals.',
    category: 'Generative UI',
    timeline: 'Q4 2026',
    status: 'In Development',
    votes: 345,
    icon: Workflow,
    color: 'fuchsia',
    description: 'High-risk business actions (refunds > $1,000, account terminations, vendor contract edits) should not happen automatically. This feature generates custom, accessible React approval screens with context diffs, risk telemetry, and one-click authorization directly in the reviewer’s email, Slack, or web portal.',
    technicalSpecs: [
      'Real-time JSX AST compilation from workflow execution state',
      'Cryptographically signed one-time approval tokens',
      'Multi-channel dispatch (Slack interactive blocks, web dashboard, mobile push)',
      'Configurable SLA escalation hierarchies with auto-delegation'
    ],
    benchmarks: [
      { label: 'Review UI Render Time', value: '< 45ms' },
      { label: 'Audit Trail Signature', value: 'ECDSA P-256' },
      { label: 'Approval Latency', value: '-72% reduction' }
    ]
  },
  {
    id: 'feat-4',
    title: 'Multi-Modal Spatial & Blueprint Perception Engine',
    tagline: 'Native ingestion and spatial reasoning over complex multi-page blueprints, CAD files, and voice audio.',
    category: 'Autonomous Agents',
    timeline: 'Q4 2026',
    status: 'Architecture Design',
    votes: 290,
    icon: Zap,
    color: 'amber',
    description: 'Analyze industrial CAD schematics, architectural blueprints, medical scans, and multichannel audio recordings directly inside your workflows. Leverage Gemini 2.0 native multimodal tokens to answer spatial questions, verify compliance tolerances, and extract tabular parameters.',
    technicalSpecs: [
      'Native handling of DWG, DXF, PDF (vector), and TIFF assets up to 2GB',
      'Spatial bounding-box coordinate anchoring and geometry reasoning',
      'Real-time streaming audio transcription and acoustic sentiment analysis',
      'Integrated OCR with table column and cell hierarchy preservation'
    ],
    benchmarks: [
      { label: 'Max Document Size', value: '2,000+ pages' },
      { label: 'Spatial Anchor Precision', value: '0.1mm optical' },
      { label: 'Audio Ingestion Latency', value: '1.2x real-time' }
    ]
  },
  {
    id: 'feat-5',
    title: 'Global Edge WASM Execution Mesh',
    tagline: 'Execute workflow triggers and lightweight AI filters at 300+ edge PoPs with sub-5ms cold starts.',
    category: 'Resilience & Infra',
    timeline: 'Q1 2027',
    status: 'In Development',
    votes: 275,
    icon: Globe2,
    color: 'cyan',
    description: 'Distribute pipeline ingress and edge verification to Cloudflare Workers and AWS Lambda@Edge nodes worldwide. Inbound webhooks are authenticated, rate-limited, and pre-processed in the user’s local geographic region before routing to dedicated regional clusters.',
    technicalSpecs: [
      'WebAssembly (WASM) runtime compiled via Rust/TypeScript',
      'Near-instant cold start times under 3 milliseconds',
      'Geographic data pinning compliant with European GDPR Article 44',
      'Distributed Edge KV cache with global sub-10ms synchronization'
    ],
    benchmarks: [
      { label: 'Cold Start Latency', value: '2.8ms' },
      { label: 'Global PoP Locations', value: '310+ cities' },
      { label: 'Ingress Bandwidth', value: '100 Gbps/sec' }
    ]
  },
  {
    id: 'feat-6',
    title: 'Post-Quantum Secret Enclaves (Kyber-1024)',
    tagline: 'Quantum-resistant cryptographic key vaults and isolated confidential compute VM enclaves.',
    category: 'Security & Crypto',
    timeline: 'Q1 2027',
    status: 'Architecture Design',
    votes: 260,
    icon: Lock,
    color: 'rose',
    description: 'Future-proof enterprise sensitive data against "Harvest Now, Decrypt Later" quantum threats. Encrypt all pipeline secrets and persistent tokens using NIST-standardized CRYSTALS-Kyber lattice cryptography executed exclusively in AMD SEV-SNP confidential hardware enclaves.',
    technicalSpecs: [
      'NIST FIPS 203 (ML-KEM / Kyber-1024) post-quantum key encapsulation',
      'Hardware-isolated memory protection via AMD SEV-SNP & Intel SGX',
      'Zero-knowledge proof verification of container integrity',
      'Automated key rotation every 30 days without service interruption'
    ],
    benchmarks: [
      { label: 'Quantum Security Level', value: 'Category 5 (AES-256)' },
      { label: 'Enclave Decryption Overhead', value: '< 1.4ms' },
      { label: 'Hardware Attestation', value: 'Cryptographic PCR' }
    ]
  },
  {
    id: 'feat-7',
    title: 'Voice & Conversational Pipeline Architect',
    tagline: 'Speak naturally to design, refactor, and query live workflows with real-time bidirectional audio.',
    category: 'Generative UI',
    timeline: 'Q2 2027',
    status: 'Alpha Testing',
    votes: 318,
    icon: Radio,
    color: 'violet',
    description: 'Use your voice to build complex software. Simply say: "Connect our Stripe webhook to an AI classifier, filter refunds over five hundred dollars, and alert the finance VP on Slack." NexaFlow translates speech into nodes, wires dependencies, and tests endpoints in real-time.',
    technicalSpecs: [
      'Gemini 2.0 Multimodal Live API bidirectional audio streaming',
      'Sub-400ms voice-to-canvas rendering feedback loop',
      'Contextual pipeline disambiguation and clarifying conversational loops',
      'Supports 48 languages and regional technical enterprise accents'
    ],
    benchmarks: [
      { label: 'Speech-to-Canvas Time', value: '380ms' },
      { label: 'Intent Recognition Accuracy', value: '98.9%' },
      { label: 'Languages Supported', value: '48 dialects' }
    ]
  },
  {
    id: 'feat-8',
    title: 'Autonomous Regulatory Compliance & EU AI Act Guardrails',
    tagline: 'Real-time auditing of model outputs against EU AI Act, HIPAA BAA, and SOC 2 Trust Principles.',
    category: 'Security & Crypto',
    timeline: 'Q2 2027',
    status: 'Public Preview',
    votes: 352,
    icon: ShieldCheck,
    color: 'blue',
    description: 'Ensure complete legal compliance for generative enterprise workflows. Every automated prompt and completion is continually evaluated against EU AI Act risk levels, copyright infringements, and PII leakage policies, generating verifiable compliance receipts on every execution.',
    technicalSpecs: [
      'Continuous EU AI Act (High-Risk System) risk tier classification',
      'Automated watermarking and cryptographic provenance hashes',
      'DLP scanner redacting 90+ varieties of PII, HIPAA, and PCI tokens',
      'One-click auditor export formatted for Big-4 compliance reviews'
    ],
    benchmarks: [
      { label: 'DLP Redaction Recall', value: '99.98%' },
      { label: 'Audit Log Immutability', value: 'SHA-256 Merkle Tree' },
      { label: 'Compliance Standards', value: 'SOC2 / HIPAA / ISO' }
    ]
  },
  {
    id: 'feat-9',
    title: 'Zero-Knowledge Proof Audit Protocol (zk-SNARKs for Verifiable AI)',
    tagline: 'Mathematically prove that reasoning models strictly executed compliance policies without revealing prompts.',
    category: 'Security & Crypto',
    timeline: 'Q3 2026',
    status: 'In Development',
    votes: 462,
    icon: Lock,
    color: 'indigo',
    description: 'Utilize Plonk / Groth16 zk-SNARK circuits to generate non-interactive zero-knowledge proofs certifying that an autonomous pipeline evaluated safety guardrails, verified tenant access boundaries, and adhered to mathematical determinism without disclosing sensitive enterprise data or intellectual property.',
    technicalSpecs: [
      'Groth16 & Plonk elliptic curve proving circuits (BN254 curve)',
      'Sub-5ms on-chain and off-chain proof verification time',
      'Tamper-proof verifiable computation receipts for financial regulators',
      'Client-side zero-knowledge witness generation'
    ],
    benchmarks: [
      { label: 'Verification Latency', value: '< 4.2ms' },
      { label: 'Proof Size', value: '128 bytes' },
      { label: 'Privacy Guarantees', value: 'Information-Theoretic' }
    ]
  },
  {
    id: 'feat-10',
    title: 'Federated Multi-Cloud Sovereign Mesh & Zero-Egress Dispatch',
    tagline: 'Run workflow nodes seamlessly across AWS, GCP, Azure, and on-premise OpenShift clusters.',
    category: 'Resilience & Infra',
    timeline: 'Q4 2026',
    status: 'Architecture Design',
    votes: 389,
    icon: Globe2,
    color: 'emerald',
    description: 'Break vendor cloud lock-in. NexaFlow automatically routes data processing steps to the lowest-cost or strictly jurisdictional cloud node (e.g., EU customer data strictly executed within AWS Frankfurt or GCP Zurich), using mTLS WireGuard tunnels with zero public internet egress fees.',
    technicalSpecs: [
      'Multi-cloud WireGuard overlay mesh with automatic peering',
      'Geo-fenced jurisdictional routing satisfying GDPR Article 44-50',
      'Spot-instance cost arbitrage reducing compute costs by up to 60%',
      'Single unified control plane with sub-millisecond failover'
    ],
    benchmarks: [
      { label: 'Egress Cost Reduction', value: '-84%' },
      { label: 'Cross-Cloud RTT', value: '< 18ms' },
      { label: 'Supported Clouds', value: 'AWS, GCP, Azure, Equinix' }
    ]
  },
  {
    id: 'feat-11',
    title: 'Autonomous Prompt Hyper-Tuner & Dynamic RL Feedback',
    tagline: 'Self-improving prompts continually optimized against regression suites and execution metrics.',
    category: 'Autonomous Agents',
    timeline: 'Q1 2027',
    status: 'Alpha Testing',
    votes: 425,
    icon: Sparkles,
    color: 'fuchsia',
    description: 'Stop manually rewriting system instructions. The Prompt Hyper-Tuner analyzes edge-case execution errors, generates candidate prompt mutations, benchmarks them against synthetic test fixtures, and safely hot-deploys Pareto-optimal prompt configurations with zero developer intervention.',
    technicalSpecs: [
      'MIPROv2 and DSPy prompt mutation synthesis engine',
      'Automated synthetic test generation from historical pipeline runs',
      'Multi-objective Pareto optimization (accuracy vs. token latency)',
      'Canary deployment with automated rollback on regression'
    ],
    benchmarks: [
      { label: 'Accuracy Improvement', value: '+18.4%' },
      { label: 'Token Consumption', value: '-32% reduction' },
      { label: 'Optimization Time', value: '< 12 minutes' }
    ]
  },
  {
    id: 'feat-12',
    title: 'Real-Time Flight Simulator & Synthetic Traffic Mirroring',
    tagline: 'Mirror 10% of production traffic through an isolated digital twin before pipeline changes go live.',
    category: 'Resilience & Infra',
    timeline: 'Q1 2027',
    status: 'Public Preview',
    votes: 374,
    icon: Activity,
    color: 'blue',
    description: 'Deploy mission-critical workflow edits with zero trepidation. The Flight Simulator asynchronously duplicates production requests, runs them against draft pipeline graphs in isolated memory sandboxes, and flags latency anomalies, breaking contract changes, or output diffs.',
    technicalSpecs: [
      'Non-blocking async request shadow mirroring via Envoy proxy',
      'Automated diff analyzer for JSON outputs and side-effect calls',
      'Chaos engineering injector for latency spikes and third-party 500s',
      'Instant pass/fail confidence score for Git PR merges'
    ],
    benchmarks: [
      { label: 'Production Overhead', value: '< 0.5% CPU' },
      { label: 'Regression Detection', value: '99.9%' },
      { label: 'Shadow Concurrency', value: 'Up to 50,000 req/s' }
    ]
  }
];

export default function UpcomingFeaturesPage() {
  const [features, setFeatures] = useState<FeatureItem[]>(UPCOMING_FEATURES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [userVotes, setUserVotes] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'features' | 'architecture' | 'lab' | 'submit'>('features');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  
  // Submit Idea Form
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDesc, setIdeaDesc] = useState('');
  const [ideaCategory, setIdeaCategory] = useState('Autonomous Agents');

  // Waitlist Form
  const [waitlistEmail, setWaitlistEmail] = useState('prince@nexaflow.ai');
  const [waitlistJoined, setWaitlistJoined] = useState(false);

  const handleVote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const hasVoted = userVotes[id];
    setUserVotes(prev => ({ ...prev, [id]: !hasVoted }));
    setFeatures(prev => prev.map(f => {
      if (f.id === id) {
        return { ...f, votes: hasVoted ? f.votes - 1 : f.votes + 1 };
      }
      return f;
    }));
    toast.success(hasVoted ? 'Vote withdrawn' : 'Vote recorded!', {
      description: hasVoted ? 'Thanks for keeping our roadmap honest.' : 'Your priority signal has been weighted by the product team.'
    });
  };

  const handleSubmitIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaTitle || !ideaDesc) {
      toast.error('Please fill in both title and description');
      return;
    }
    const newFeature: FeatureItem = {
      id: `feat-${Date.now()}`,
      title: ideaTitle,
      tagline: ideaDesc.slice(0, 80) + '...',
      category: ideaCategory as any,
      timeline: 'Q2 2027',
      status: 'In Development',
      votes: 1,
      icon: Sparkles,
      color: 'blue',
      description: ideaDesc,
      technicalSpecs: ['Community-submitted concept under evaluation', 'Targeting NexaFlow v2.0 core engine'],
      benchmarks: [{ label: 'Community Priority', value: 'High' }]
    };
    setFeatures([newFeature, ...features]);
    setIsSubmitModalOpen(false);
    setIdeaTitle('');
    setIdeaDesc('');
    toast.success('Feature Idea Submitted!', { description: 'Your proposal is now visible on the public roadmap.' });
  };

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistJoined(true);
    toast.success('VIP Early Access Confirmed!', {
      description: `Welcome aboard! Reserved seat #042 on the Autonomous Agents alpha waitlist.`
    });
    setTimeout(() => setIsWaitlistOpen(false), 1200);
  };

  const filteredFeatures = features.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="w-full bg-slate-50 -mt-28 pt-28 pb-20 min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
        {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 border border-blue-100">
              <Compass className="w-4 h-4" />
              <span>Product Engineering Roadmap 2026–2027</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Upcoming Features & Architecture
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore the cutting edge of enterprise autonomy. Vote on upcoming releases, inspect next-gen multi-agent systems, and shape the direction of NexaFlow.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsWaitlistOpen(true)}
                className="px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Rocket className="w-4 h-4" />
                <span>Join VIP Alpha Waitlist</span>
              </button>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 text-blue-700" />
                <span>Submit Feature Request</span>
              </button>
            </div>
          </motion.div>

          {/* Evolution Timeline Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: LUXURY_EASE }}
            className="mb-14 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
                  <GitBranch className="w-5 h-5 text-blue-600" />
                  Quarterly Delivery Roadmap
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Active deployment milestones with verified CI/CD releases and testing targets.
                </p>
              </div>

              <span className="text-[14px] h-[27.45px] font-semibold text-[#1e3a8a] bg-blue-50/80 px-3 rounded-full border border-blue-200/80 self-start sm:self-auto flex items-center justify-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Q3 2026 Releases on Track
              </span>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                {[
                  { phase: 'Q3 2026', title: 'Autonomous Swarms & Self-Healing', status: 'Live Beta', color: 'emerald', icon: Cpu, count: '3 Features Ready' },
                  { phase: 'Q4 2026', title: 'Generative UI & Spatial CAD Perception', status: 'In Testing', color: 'blue', icon: ShieldAlert, count: '2 In Review' },
                  { phase: 'Q1 2027', title: 'Edge WASM & Post-Quantum Enclaves', status: 'Building', color: 'purple', icon: Zap, count: '4 Sprints Left' },
                  { phase: 'Q2 2027', title: 'Conversational Voice & EU AI Act', status: 'Planned', color: 'amber', icon: Network, count: 'Architecting' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="mb-3 hidden md:block">
                        <span className="text-xs font-bold text-slate-500 font-mono">{item.phase}</span>
                      </div>
                      <div className="w-14 h-14 rounded-full bg-white border-4 border-slate-50 shadow-sm flex items-center justify-center mb-3 z-10 relative ring-4 ring-slate-100">
                        <Icon className="w-6 h-6 text-blue-900" />
                      </div>
                      <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200 w-full">
                        <span className="text-[10px] uppercase font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 inline-block mb-1">
                          {item.status}
                        </span>
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">{item.title}</h4>
                        <span className="text-[11px] text-slate-500 block mt-0.5 font-medium">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Interactive Multi-Agent Architecture Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: LUXURY_EASE }}
            className="mb-14 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm overflow-hidden relative"
          >
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-900 px-2.5 py-1 rounded-full border border-blue-100 font-bold">
                      Architecture Blueprint
                    </span>
                    <span className="text-xs text-slate-500 font-mono">• Target Protocol v2.0</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 tracking-tight">
                    Multi-Agent Consensus & Execution Topology
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    Visual topology of how NexaFlow’s next-generation autonomous supervisor orchestrates specialized agents with Byzantine dispute verification.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto">
                  <span className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Consensus Engine Active
                  </span>
                </div>
              </div>

              {/* Interactive Visual Flow Diagram */}
              <div className="mt-8 pt-2 pb-2 overflow-x-auto no-scrollbar">
                <div className="min-w-[760px] p-6 bg-slate-50/70 rounded-2xl border border-slate-200 flex items-stretch justify-between gap-3 sm:gap-4">
                  {/* Step 1: Input */}
                  <div className="flex-1 min-w-[130px] h-[190px] text-center p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between items-center">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-center justify-center my-auto">
                      <h5 className="font-bold text-slate-900 text-xs leading-tight">User Goal / Webhook</h5>
                      <p className="text-[10px] text-slate-500 mt-1 leading-tight">Prompt + Context</p>
                    </div>
                    <div className="h-[24px] flex items-center justify-center shrink-0">
                      <span className="text-[9px] font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 whitespace-nowrap">
                        Unstructured Input
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>

                  {/* Step 2: Supervisor */}
                  <div className="flex-1 min-w-[130px] h-[190px] text-center p-4 bg-white rounded-2xl border-2 border-blue-900 shadow-sm ring-2 ring-blue-900/10 flex flex-col justify-between items-center">
                    <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0">
                      <Workflow className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-center justify-center my-auto">
                      <h5 className="font-bold text-blue-950 text-xs leading-tight">Supervisor Agent</h5>
                      <p className="text-[10px] text-slate-600 mt-1 leading-tight">DAG Task Decomposition</p>
                    </div>
                    <div className="h-[24px] flex items-center justify-center shrink-0">
                      <span className="text-[9px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold whitespace-nowrap">
                        Dynamic Planner
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>

                  {/* Step 3: Swarm Workers */}
                  <div className="flex-1 min-w-[130px] h-[190px] text-center p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between items-center">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-center justify-center my-auto">
                      <h5 className="font-bold text-slate-900 text-xs leading-tight">Worker Swarm</h5>
                      <p className="text-[10px] text-slate-500 mt-1 leading-tight">Parallel Execution</p>
                    </div>
                    <div className="h-[24px] flex items-center justify-center gap-1 shrink-0">
                      <span className="text-[8px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono border border-slate-200/80">SQL</span>
                      <span className="text-[8px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono border border-slate-200/80">Policy</span>
                      <span className="text-[8px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono border border-slate-200/80">API</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>

                  {/* Step 4: Validator */}
                  <div className="flex-1 min-w-[130px] h-[190px] text-center p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between items-center">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-center justify-center my-auto">
                      <h5 className="font-bold text-slate-900 text-xs leading-tight">Validator & Guard</h5>
                      <p className="text-[10px] text-slate-500 mt-1 leading-tight">Byzantine Voting Check</p>
                    </div>
                    <div className="h-[24px] flex items-center justify-center shrink-0">
                      <span className="text-[9px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold whitespace-nowrap">
                        0-Hallucination Gate
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>

                  {/* Step 5: Action */}
                  <div className="flex-1 min-w-[130px] h-[190px] text-center p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between items-center">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                      <Rocket className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-center justify-center my-auto">
                      <h5 className="font-bold text-slate-900 text-xs leading-tight">Execution Dispatch</h5>
                      <p className="text-[10px] text-slate-500 mt-1 leading-tight">Database & APIs</p>
                    </div>
                    <div className="h-[24px] flex items-center justify-center shrink-0">
                      <span className="text-[9px] font-mono text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold whitespace-nowrap">
                        Immutable Log
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Feature Demonstrator & Technology Sandbox */}
          <InteractiveFeatureLab />

          {/* Category Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
              {['All', 'Autonomous Agents', 'Resilience & Infra', 'Generative UI', 'Security & Crypto'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <span className="text-xs font-medium text-slate-500 self-start sm:self-auto">
              Showing <strong>{filteredFeatures.length}</strong> planned releases
            </span>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              const hasVoted = userVotes[feature.id];
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05, ease: LUXURY_EASE }}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col justify-between hover:border-blue-200 transition-colors group"
                >
                  <div>
                    {/* Top Row: Category, Timeline, Upvote */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                          {feature.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 font-semibold">
                          {feature.timeline}
                        </span>
                      </div>

                      {/* Vote Button */}
                      <button
                        onClick={(e) => handleVote(feature.id, e)}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          hasVoted
                            ? 'bg-blue-900 text-white shadow-xs'
                            : 'bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-900 border border-slate-200'
                        }`}
                        title="Upvote this feature"
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-current' : ''}`} />
                        <span>{feature.votes}</span>
                      </button>
                    </div>

                    {/* Title & Tagline */}
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">
                          {feature.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Detailed Description */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-5">
                      {feature.description}
                    </p>

                    {/* Technical Specifications */}
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 mb-5 space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Technical Deliverables:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {feature.technicalSpecs.map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Benchmark Metrics Footer */}
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2">
                    {feature.benchmarks.map((b, bIdx) => (
                      <div key={bIdx} className="text-center p-2 rounded-xl bg-slate-50/60 border border-slate-100">
                        <div className="text-[10px] text-slate-400 uppercase font-semibold truncate">{b.label}</div>
                        <div className="text-xs font-bold text-slate-900 mt-0.5 font-mono">{b.value}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Submit Idea Modal */}
          {isSubmitModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div 
                onClick={() => setIsSubmitModalOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" 
              />
              <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Submit Feature Proposal</h3>
                <p className="text-xs text-slate-500 mb-5">Proposals are reviewed directly by the core engineering team.</p>

                <form onSubmit={handleSubmitIdea} className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Feature Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Distributed Cassandra Store for Step Caching"
                      value={ideaTitle}
                      onChange={(e) => setIdeaTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Category</label>
                    <select
                      value={ideaCategory}
                      onChange={(e) => setIdeaCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium"
                    >
                      <option>Autonomous Agents</option>
                      <option>Resilience & Infra</option>
                      <option>Generative UI</option>
                      <option>Security & Crypto</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Functional Description & Enterprise Use Case</label>
                    <textarea
                      rows={4}
                      placeholder="Explain what problem this solves and how it fits into autonomous workflow execution..."
                      value={ideaDesc}
                      onChange={(e) => setIdeaDesc(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 resize-none font-medium"
                      required
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSubmitModalOpen(false)}
                      className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl font-semibold shadow-xs flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Submit to Roadmap
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Waitlist Modal */}
          {isWaitlistOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div 
                onClick={() => setIsWaitlistOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" 
              />
              <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 text-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-900 mx-auto flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">VIP Early Access Program</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Get immediate access to test preview builds of Autonomous Agent Swarms and Self-Healing Pipelines before general release.
                </p>

                <form onSubmit={handleJoinWaitlist} className="space-y-4 text-xs text-left">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Work Email</label>
                    <input
                      type="email"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-100 font-medium"
                      required
                    />
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant seat reservation for verified workspace members</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    Confirm Waitlist Reservation
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
  );
}
