import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  Play, Link as LinkIcon, Settings, Sparkles, Database, Plus, X, 
  Search, Sliders, Shield, Clock, Mail, Send, Globe, FileJson, 
  Cpu, Copy, Check, Layers, AlertCircle, Trash2, CheckCircle2,
  Share2, ArrowRight, RefreshCw, ZoomIn, ZoomOut, Maximize2, Minimize2, RotateCcw,
  BookOpen, Terminal, CheckCircle, Workflow
} from 'lucide-react';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import { useScrollLock } from '../utils/useScrollLock';
import BuilderExecutionTraces from '../components/builder/BuilderExecutionTraces';
import BuilderRevisionHistory from '../components/builder/BuilderRevisionHistory';
import BuilderSecretsVault from '../components/builder/BuilderSecretsVault';
import BuilderIntegrationCode from '../components/builder/BuilderIntegrationCode';
import BuilderPolicyGuardrails from '../components/builder/BuilderPolicyGuardrails';
import BuilderVariableStore from '../components/builder/BuilderVariableStore';
import BuilderPayloadTransformer from '../components/builder/BuilderPayloadTransformer';
import BuilderSlaMonitor from '../components/builder/BuilderSlaMonitor';
import BuilderCanvasStudio from '../components/builder/BuilderCanvasStudio';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

type NodeData = {
  id: string;
  title: string;
  subtitle: string;
  type: 'trigger' | 'ai' | 'action';
  x: number;
  y: number;
  config?: {
    model?: string;
    systemPrompt?: string;
    temperature?: number;
    endpointUrl?: string;
    targetSystem?: string;
    actionType?: string;
  };
};

const initialNodes: NodeData[] = [
  { 
    id: 'node-1', 
    title: 'Webhook Trigger', 
    subtitle: 'Listens for POST /ticket', 
    type: 'trigger', 
    x: 60, 
    y: 80,
    config: {
      endpointUrl: 'https://api.nexaflow.com/hook/xt782q',
    }
  },
  { 
    id: 'node-2', 
    title: 'AI Classifier Agent', 
    subtitle: 'Analyze intent & sentiment', 
    type: 'ai', 
    x: 60, 
    y: 240,
    config: {
      model: 'Gemini 1.5 Pro',
      systemPrompt: 'You are an expert customer support triage agent. Analyze the incoming ticket and output a structured JSON categorization with sentiment and urgency.',
      temperature: 20
    }
  },
  { 
    id: 'node-3', 
    title: 'Zendesk Update', 
    subtitle: 'Create ticket & assign', 
    type: 'action', 
    x: 60, 
    y: 400,
    config: {
      targetSystem: 'Zendesk Support',
      actionType: 'Create Ticket & Tag Priority'
    }
  },
];

type CatalogItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Triggers' | 'AI Agents' | 'Actions' | 'Logic';
  type: 'trigger' | 'ai' | 'action';
  icon: typeof Sparkles;
  badge: string;
  accent: {
    bg: string;
    text: string;
    border: string;
  };
};

const NODE_CATALOG: CatalogItem[] = [
  {
    id: 'webhook-trigger',
    title: 'Inbound Webhook',
    subtitle: 'Listens for POST /payload',
    description: 'Trigger the workflow instantaneously when external systems send an HTTP webhook payload.',
    category: 'Triggers',
    type: 'trigger',
    icon: LinkIcon,
    badge: 'Real-time',
    accent: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' }
  },
  {
    id: 'schedule-trigger',
    title: 'Scheduled Cron Timer',
    subtitle: 'Runs periodically on schedule',
    description: 'Execute workflows on a recurring cron schedule, hourly, daily, or custom intervals.',
    category: 'Triggers',
    type: 'trigger',
    icon: Clock,
    badge: 'Cron Job',
    accent: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' }
  },
  {
    id: 'email-trigger',
    title: 'Inbound Email Parser',
    subtitle: 'Watches inbound inbox',
    description: 'Captures incoming messages from Gmail, Outlook, or support inboxes and parses attachments.',
    category: 'Triggers',
    type: 'trigger',
    icon: Mail,
    badge: 'Email Inbox',
    accent: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' }
  },
  {
    id: 'gemini-agent',
    title: 'Gemini 1.5 Pro Reasoning',
    subtitle: 'Complex agent reasoning & tools',
    description: 'Deep reasoning, multi-turn task resolution, and tool execution with Google Gemini.',
    category: 'AI Agents',
    type: 'ai',
    icon: Sparkles,
    badge: 'Gemini 1.5 Pro',
    accent: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' }
  },
  {
    id: 'ai-classifier',
    title: 'Intent & Sentiment Classifier',
    subtitle: 'Analyze category & urgency',
    description: 'Classifies customer queries into priority buckets, sentiment scores, and routing tags.',
    category: 'AI Agents',
    type: 'ai',
    icon: Cpu,
    badge: 'Flash Model',
    accent: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' }
  },
  {
    id: 'entity-extractor',
    title: 'Structured Field Extractor',
    subtitle: 'Pull JSON entities from text',
    description: 'Transforms free-form text or documents into strictly typed schema payloads.',
    category: 'AI Agents',
    type: 'ai',
    icon: FileJson,
    badge: 'Structured Data',
    accent: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' }
  },
  {
    id: 'zendesk-action',
    title: 'Zendesk Ticket Sync',
    subtitle: 'Create ticket & assign priority',
    description: 'Dispatches tickets to customer service teams with AI summaries and category tags.',
    category: 'Actions',
    type: 'action',
    icon: Database,
    badge: 'Support',
    accent: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' }
  },
  {
    id: 'slack-action',
    title: 'Slack Channel Alert',
    subtitle: 'Send rich block notifications',
    description: 'Broadcast triage results, escalations, or summary digests to team Slack channels.',
    category: 'Actions',
    type: 'action',
    icon: Send,
    badge: 'Chat Message',
    accent: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' }
  },
  {
    id: 'db-action',
    title: 'PostgreSQL Query',
    subtitle: 'Execute SQL insert or query',
    description: 'Persist record updates or enrich workflow payloads with relational database records.',
    category: 'Actions',
    type: 'action',
    icon: Database,
    badge: 'SQL Database',
    accent: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' }
  },
  {
    id: 'http-action',
    title: 'Custom REST API Request',
    subtitle: 'Invoke external endpoints',
    description: 'Send GET, POST, PUT, or DELETE requests with dynamic headers and authentication.',
    category: 'Actions',
    type: 'action',
    icon: Globe,
    badge: 'REST API',
    accent: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' }
  },
  {
    id: 'condition-logic',
    title: 'Conditional Router (If/Else)',
    subtitle: 'Branch workflow logic',
    description: 'Evaluate payload rules and route execution down separate branches.',
    category: 'Logic',
    type: 'action',
    icon: Layers,
    badge: 'Flow Control',
    accent: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' }
  }
];

// Workflow Template Recipes
const WORKFLOW_RECIPES = [
  {
    id: 'recipe-support',
    name: 'Zendesk VIP Intent & Priority Triage',
    desc: 'Analyzes inbound customer requests, checks ARR tier, and auto-drafts responses.',
    nodes: [
      { id: 'node-1', title: 'Webhook Trigger', subtitle: 'Listens for POST /ticket', type: 'trigger' as const, x: 60, y: 80 },
      { id: 'node-2', title: 'Gemini 1.5 Pro Classifier', subtitle: 'Classify intent & sentiment', type: 'ai' as const, x: 60, y: 240 },
      { id: 'node-3', title: 'Zendesk Update', subtitle: 'Create ticket & assign SLA', type: 'action' as const, x: 60, y: 400 },
    ]
  },
  {
    id: 'recipe-lead',
    name: 'Inbound Lead Enrichment (Apollo + Clearbit)',
    desc: 'Extracts company domain, fetches firmographics, scores fit, and updates Salesforce CRM.',
    nodes: [
      { id: 'node-1', title: 'Signup Form Webhook', subtitle: 'Listens for POST /leads', type: 'trigger' as const, x: 60, y: 80 },
      { id: 'node-2', title: 'Clearbit & Apollo Scraper', subtitle: 'Fetch 14 firmographic fields', type: 'action' as const, x: 60, y: 240 },
      { id: 'node-3', title: 'Gemini Lead Scorer', subtitle: 'Score 0-100 & Enterprise fit', type: 'ai' as const, x: 60, y: 400 },
      { id: 'node-4', title: 'Salesforce Contact Sync', subtitle: 'Create Lead record & alert AE', type: 'action' as const, x: 60, y: 560 },
    ]
  },
  {
    id: 'recipe-dispute',
    name: 'Stripe Chargeback & Dispute Evidence Synthesizer',
    desc: 'Collects order logs, user IP, delivery tracking, and synthesizes a PDF evidence packet.',
    nodes: [
      { id: 'node-1', title: 'Stripe Dispute Webhook', subtitle: 'charge.dispute.created', type: 'trigger' as const, x: 60, y: 80 },
      { id: 'node-2', title: 'Database Audit Query', subtitle: 'Fetch login logs & receipt', type: 'action' as const, x: 60, y: 240 },
      { id: 'node-3', title: 'Gemini Defense Drafter', subtitle: 'Compile bank defense memo', type: 'ai' as const, x: 60, y: 400 },
    ]
  }
];

// Test Mock Payloads
const TEST_PAYLOADS = [
  {
    id: 'payload-zendesk',
    name: 'Zendesk Enterprise Ticket (#zd_448102)',
    httpStatus: '200 OK',
    httpStatusCode: 200,
    recordId: 'zd_448102',
    stat1: { label: 'Classified Intent', value: 'Billing Dispute' },
    stat2: { label: 'Urgency Score', value: 'High (-0.85)', highlight: true },
    stat3: { label: 'Action Taken', value: 'Escalated Tier 2' },
    contextFields: [
      { label: 'Customer Account', value: 'Sarah Chen (sarah.chen@enterprise.io)' },
      { label: 'Account ARR', value: '$120,000 / yr (Platinum SLA)' },
      { label: 'Auto-Draft Prepared', value: 'Refund explanation & credit memo drafted' },
    ],
    timeline: [
      { step: 'Webhook Ingest & HMAC Verified', detail: 'Signature verified against whsec_99a8b', time: '0.04s' },
      { step: 'Gemini 1.5 Pro Reasoning', detail: 'Classified: "Billing Dispute" with -0.85 urgency', time: '0.48s' },
      { step: 'Zendesk Ticket Dispatched', detail: 'Tagged #urgent_tier2 & queued agent reply', time: '0.82s' },
    ],
    rawJson: {
      status: 200,
      timestamp: "2026-09-05T05:25:01.120Z",
      ticket_id: "zd_448102",
      customer: {
        email: "sarah.chen@enterprise.io",
        tier: "Enterprise Platinum",
        arr: 120000
      },
      classification: {
        intent: "billing_dispute",
        confidence: 0.984,
        sentiment: -0.85,
        urgency: "HIGH",
        recommended_action: "Escalate to Tier 2 Billing and issue credit voucher"
      },
      execution_time_ms: 820
    }
  },
  {
    id: 'payload-lead',
    name: 'Lead Enrichment Signup (#ld_99283xa)',
    httpStatus: '200 OK',
    httpStatusCode: 200,
    recordId: 'ld_99283xa',
    stat1: { label: 'Enriched', value: 'Yes' },
    stat2: { label: 'Confidence', value: '98%', highlight: true },
    stat3: { label: 'Mapped Fields', value: '14 fields' },
    contextFields: [
      { label: 'Target Company', value: 'Stripe, Inc. (7,000+ staff)' },
      { label: 'CRM Destination', value: 'Salesforce Contact #cnt_88291a' },
      { label: 'Lead Score', value: '96/100 (Tier 1 Enterprise AE)' },
    ],
    timeline: [
      { step: 'Webhook Inbound Lead Hook', detail: 'Received signup from demo page', time: '0.03s' },
      { step: 'Firmographic Data Fetch', detail: 'Apollo & Clearbit matched 14 attributes', time: '0.38s' },
      { step: 'Salesforce Contact Synced', detail: 'Created Lead record & notified Slack #sales', time: '0.74s' },
    ],
    rawJson: {
      status: 200,
      lead_id: "ld_99283xa",
      company: "Stripe, Inc.",
      domain: "stripe.com",
      headcount: "7,000+",
      enriched: true,
      confidence_score: 0.98,
      mapped_fields: 14,
      salesforce_synced: true
    }
  }
];

export default function BuilderPage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<NodeData[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<string | null>('node-2');
  const [isRunning, setIsRunning] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isCanvasExpanded, setIsCanvasExpanded] = useState(false);
  const [testingNodeId, setTestingNodeId] = useState<string | null>(null);

  // Floating Sections State (ALL protected by useScrollLock)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNodeLibraryOpen, setIsNodeLibraryOpen] = useState(false);
  const [isTestRunnerOpen, setIsTestRunnerOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Escape key to close expanded canvas
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCanvasExpanded) {
        setIsCanvasExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCanvasExpanded]);

  // Test Runner State
  const [selectedPayloadIndex, setSelectedPayloadIndex] = useState(0);
  const [testExecutionProgress, setTestExecutionProgress] = useState<number>(0);
  const [showRawJsonInTest, setShowRawJsonInTest] = useState(false);

  // Workflow Settings State
  const [workflowName, setWorkflowName] = useState('Ticket Triage & Enrichment');
  const [workflowDesc, setWorkflowDesc] = useState('Automatically inspect incoming customer tickets with Gemini 1.5 Pro, classify intent and sentiment, and dispatch SLA escalations.');
  const [workflowStatus, setWorkflowStatus] = useState<'Active' | 'Draft' | 'Paused'>('Active');
  const [workflowEnv, setWorkflowEnv] = useState<'Production' | 'Staging'>('Production');
  const [timeoutSeconds, setTimeoutSeconds] = useState(30);
  const [maxConcurrency, setMaxConcurrency] = useState(5);
  const [retryPolicy, setRetryPolicy] = useState('Exponential Backoff (3 retries)');
  const [alertEmail, setAlertEmail] = useState('ops-triage@nexaflow.internal');
  const [copiedSecret, setCopiedSecret] = useState(false);

  // Node Library State
  const [librarySearch, setLibrarySearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Triggers' | 'AI Agents' | 'Actions' | 'Logic'>('All');

  // Background Scroll Lock when ANY floating modal or expanded canvas is open
  useScrollLock(
    isSettingsOpen || 
    isNodeLibraryOpen || 
    isTestRunnerOpen || 
    isTemplateModalOpen || 
    isPublishModalOpen ||
    isCanvasExpanded
  );

  const activeTestPayload = TEST_PAYLOADS[selectedPayloadIndex];

  const handleStartTestRun = () => {
    setIsRunning(true);
    setTestExecutionProgress(1);
    
    // Simulate step 1
    setTimeout(() => {
      setTestExecutionProgress(2);
    }, 450);

    // Simulate step 2
    setTimeout(() => {
      setTestExecutionProgress(3);
    }, 900);

    // Complete
    setTimeout(() => {
      setIsRunning(false);
      setTestExecutionProgress(4);
      toast.success('Test Run Complete', { 
        description: `Executed in 0.82s. HTTP 200 OK recorded.` 
      });
    }, 1300);
  };

  const handleOpenTestModal = () => {
    setIsTestRunnerOpen(true);
    if (testExecutionProgress === 0) {
      handleStartTestRun();
    }
  };

  const handleCopySecret = () => {
    navigator.clipboard.writeText('whsec_99a8b72c4e1f_prod');
    setCopiedSecret(true);
    toast.success('Copied secret key to clipboard');
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  const handleAddNodeFromLibrary = (item: CatalogItem) => {
    const newNode: NodeData = {
      id: `node-${Date.now()}`,
      title: item.title,
      subtitle: item.subtitle,
      type: item.type,
      x: 60 + (nodes.length * 30) % 150,
      y: 80 + (nodes.length * 80) % 360,
      config: {
        model: 'Gemini 1.5 Pro',
        systemPrompt: item.description,
        temperature: 20,
        endpointUrl: item.type === 'trigger' ? 'https://api.nexaflow.com/hook/xt782q' : undefined,
        targetSystem: item.type === 'action' ? 'Zendesk Support' : undefined,
        actionType: item.type === 'action' ? 'Create Ticket & Tag Priority' : undefined
      }
    };
    setNodes([...nodes, newNode]);
    setSelectedNode(newNode.id);
    setIsNodeLibraryOpen(false);
    toast.success('Node Added', { description: `Added "${item.title}" to canvas.` });
  };

  const handleDeleteNode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes(nodes.filter(n => n.id !== id));
    if (selectedNode === id) {
      setSelectedNode(null);
    }
    toast.success('Node Removed', { description: 'Component removed from canvas.' });
  };

  const handleDuplicateNode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const source = nodes.find(n => n.id === id);
    if (!source) return;
    const duplicate: NodeData = {
      ...source,
      id: `node-${Date.now()}`,
      title: `${source.title} (Clone)`,
      x: source.x + 30,
      y: source.y + 50,
      config: { ...source.config }
    };
    setNodes([...nodes, duplicate]);
    setSelectedNode(duplicate.id);
    toast.success('Node Cloned', { description: `Created working clone of "${source.title}".` });
  };

  const handleAutoAlign = () => {
    const aligned = nodes.map((node, index) => ({
      ...node,
      x: 60,
      y: 70 + index * 170
    }));
    setNodes(aligned);
    toast.success('Canvas Auto-Aligned', { description: 'All nodes sequenced with standardized grid coordinates.' });
  };

  const handleTestSingleNode = (nodeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    setTestingNodeId(nodeId);
    setTimeout(() => {
      setTestingNodeId(null);
      toast.success(`Node Verified: ${node.title}`, {
        description: node.type === 'trigger' 
          ? 'Inbound Webhook listener verified: HTTP 200 OK (14ms)'
          : node.type === 'ai'
          ? `Inference generated via ${node.config?.model || 'Gemini 1.5 Pro'}: 0.24s (248 tokens)`
          : `Dispatch validated: Destination [${node.config?.targetSystem || 'Zendesk'}] acknowledged`
      });
    }, 650);
  };

  const updateSelectedNode = (partial: Partial<NodeData> | { config: Partial<NonNullable<NodeData['config']>> }) => {
    if (!selectedNode) return;
    setNodes(prev => prev.map(n => {
      if (n.id !== selectedNode) return n;
      if ('config' in partial && partial.config) {
        return {
          ...n,
          config: {
            ...n.config,
            ...partial.config
          }
        };
      }
      return { ...n, ...partial };
    }));
  };

  const handleLoadRecipe = (recipe: typeof WORKFLOW_RECIPES[0]) => {
    setNodes(recipe.nodes);
    setSelectedNode(recipe.nodes[1]?.id || recipe.nodes[0]?.id);
    setWorkflowName(recipe.name);
    setWorkflowDesc(recipe.desc);
    setIsTemplateModalOpen(false);
    toast.success('Workflow Recipe Loaded', {
      description: `Canvas initialized with "${recipe.name}".`
    });
  };

  const filteredCatalog = NODE_CATALOG.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(librarySearch.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(librarySearch.toLowerCase()) ||
      item.description.toLowerCase().includes(librarySearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedNodeObj = nodes.find(n => n.id === selectedNode);

  return (
    <>
      <div className="w-full max-w-[1440px] mx-auto px-6 py-8 md:py-10 min-h-[calc(100vh-80px)] flex flex-col">
        
        {/* Top Control Bar - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: LUXURY_EASE }}
          className="mb-8 text-center max-w-3xl mx-auto flex flex-col items-center shrink-0"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-900 mb-3">
            <Workflow className="w-3.5 h-3.5 text-blue-700" />
            <span>Visual Pipeline Architect • Graph Execution Engine</span>
          </div>

          {/* Workflow Title & Version */}
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-center">
              {workflowName}
            </h1>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
              v1.4
            </span>
          </div>

          {/* Workflow Description */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto text-center mb-3">
            {workflowDesc}
          </p>

          {/* Status & Metadata Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 mb-6">
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold ${
              workflowStatus === 'Active' 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                : 'bg-amber-50 text-amber-700 border border-amber-200/60'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${workflowStatus === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              Status: {workflowStatus}
            </span>
            <span>•</span>
            <span className="font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
              Env: {workflowEnv}
            </span>
            <span>•</span>
            <span className="text-slate-600 font-medium">{nodes.length} nodes connected</span>
          </div>
          
          {/* Action Buttons - Centered Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button 
              onClick={() => setIsTemplateModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-2xs flex items-center gap-1.5 hover:scale-[1.02] cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-900" />
              Templates
            </button>

            <button 
              id="workflow-settings-button"
              onClick={() => setIsSettingsOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-2xs flex items-center gap-1.5 hover:scale-[1.02] cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-slate-500" />
              Settings
            </button>

            <button 
              id="workflow-run-test-button"
              onClick={handleOpenTestModal}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-900 text-white hover:bg-blue-950 transition-all shadow-xs flex items-center gap-1.5 hover:scale-[1.02] cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" fill="currentColor" />
              Run Test / Inspect
            </button>

            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-all shadow-xs flex items-center gap-1.5 hover:scale-[1.02] cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              Publish v1.5
            </button>
          </div>
        </motion.div>

        {/* Builder Canvas Area & Studio Portal */}
        <BuilderCanvasStudio
          nodes={nodes}
          setNodes={setNodes}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          zoomLevel={zoomLevel}
          setZoomLevel={setZoomLevel}
          isCanvasExpanded={isCanvasExpanded}
          setIsCanvasExpanded={setIsCanvasExpanded}
          testingNodeId={testingNodeId}
          handleAutoAlign={handleAutoAlign}
          handleTestSingleNode={handleTestSingleNode}
          handleDuplicateNode={handleDuplicateNode}
          handleDeleteNode={handleDeleteNode}
          updateSelectedNode={updateSelectedNode}
          setIsNodeLibraryOpen={setIsNodeLibraryOpen}
          handleOpenTestModal={handleOpenTestModal}
          workflowName={workflowName}
        />

        {/* ========================================================================= */}
        {/* NEW RELEVANT BUILDER SECTIONS: Observability, Releases, Secrets, API Hub   */}
        {/* Policy Guardrails, Variables, Payload Transformers, and SLO Monitoring    */}
        {/* ========================================================================= */}
        <BuilderExecutionTraces />
        <BuilderRevisionHistory />
        <BuilderSecretsVault />
        <BuilderIntegrationCode />
        <BuilderPolicyGuardrails />
        <BuilderVariableStore />
        <BuilderPayloadTransformer />
        <BuilderSlaMonitor />
      </div>

      {/* ========================================================================= */}
      {/* FLOATING SECTION 1: INTERACTIVE TEST RUNNER & EXECUTION INSPECTOR          */}
      {/* (With Scroll Lock & Relevant Execution Results Card)                       */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isTestRunnerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isRunning && setIsTestRunnerOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 z-10 flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-900">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Pipeline Execution Inspector</h3>
                    <p className="text-[11px] text-slate-500">Simulate end-to-end webhook ingest, AI inference, and action dispatch</p>
                  </div>
                </div>
                {!isRunning && (
                  <button onClick={() => setIsTestRunnerOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                    ✕
                  </button>
                )}
              </div>

              {/* Scrollable Inspector Body */}
              <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
                
                {/* Payload Chooser & Execute Trigger */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex-1">
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">Select Inbound Mock Payload:</label>
                    <select
                      value={selectedPayloadIndex}
                      onChange={(e) => {
                        setSelectedPayloadIndex(Number(e.target.value));
                        setTestExecutionProgress(0);
                      }}
                      className="w-full bg-white border border-slate-200 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 outline-none font-medium"
                    >
                      {TEST_PAYLOADS.map((p, idx) => (
                        <option key={p.id} value={idx}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    disabled={isRunning}
                    onClick={handleStartTestRun}
                    className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-lg font-semibold flex items-center gap-1.5 self-end sm:self-auto disabled:opacity-60 shadow-xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                    <span>{isRunning ? 'Executing...' : 'Re-Execute Run'}</span>
                  </button>
                </div>

                {/* Stepped Execution Timeline */}
                <div>
                  <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-900" /> Real-Time Pipeline Progress
                  </h4>
                  <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[15px] before:w-px before:bg-slate-200">
                    {activeTestPayload.timeline.map((item, idx) => {
                      const isCompleted = testExecutionProgress > idx;
                      const isCurrent = testExecutionProgress === idx + 1 && isRunning;
                      return (
                        <div key={idx} className="relative flex gap-3 items-start">
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 z-10 text-xs font-bold transition-all ${
                            isCompleted 
                              ? 'bg-emerald-500 border-emerald-600 text-white' 
                              : isCurrent
                              ? 'bg-blue-50 border-blue-600 text-blue-900 animate-pulse'
                              : 'bg-white border-slate-200 text-slate-400'
                          }`}>
                            {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                          </div>
                          <div className="pt-1">
                            <h5 className="font-bold text-slate-900 text-xs">{item.step}</h5>
                            <p className="text-[11px] text-slate-500 mt-0.5">{item.detail}</p>
                            <span className="text-[10px] font-mono text-slate-400">{item.time}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Relevant Execution Results Card (Matching User Screenshot) */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FileJson className="w-4 h-4 text-slate-500" /> Execution Results
                    </h4>
                    <button
                      onClick={() => setShowRawJsonInTest(!showRawJsonInTest)}
                      className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                    >
                      {showRawJsonInTest ? 'Show Clean Summary' : 'View Raw JSON'}
                    </button>
                  </div>

                  {!showRawJsonInTest ? (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 divide-y divide-slate-100 shadow-sm">
                      {/* Top Row: HTTP Status & Record ID */}
                      <div className="grid grid-cols-2 gap-3 pb-3">
                        <div>
                          <span className="text-xs text-slate-500 block">HTTP Status</span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> 
                            {activeTestPayload.httpStatus}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 block">Record ID</span>
                          <span className="text-xs font-semibold text-slate-800 font-mono mt-1 inline-block select-all">
                            {activeTestPayload.recordId}
                          </span>
                        </div>
                      </div>

                      {/* Middle Row: Relevant Metric Stats */}
                      <div className="grid grid-cols-3 gap-3 py-3">
                        <div>
                          <span className="text-xs text-slate-500 block">{activeTestPayload.stat1.label}</span>
                          <span className="text-xs font-semibold text-slate-800 mt-1 inline-block">
                            {activeTestPayload.stat1.value}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 block">{activeTestPayload.stat2.label}</span>
                          <span className="text-xs font-semibold text-emerald-600 mt-1 inline-block">
                            {activeTestPayload.stat2.value}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 block">{activeTestPayload.stat3.label}</span>
                          <span className="text-xs font-semibold text-slate-800 mt-1 inline-block">
                            {activeTestPayload.stat3.value}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Row: Context Attributes */}
                      {activeTestPayload.contextFields && (
                        <div className="pt-3 space-y-2">
                          {activeTestPayload.contextFields.map((ctx, idx) => (
                            <div key={idx} className="flex items-start justify-between text-xs gap-3">
                              <span className="text-slate-500 shrink-0">{ctx.label}:</span>
                              <span className="font-medium text-slate-800 text-right truncate">{ctx.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white text-slate-800 rounded-xl p-4 overflow-x-auto border border-slate-200 shadow-2xs">
                      <pre className="text-xs font-mono leading-relaxed text-slate-800 whitespace-pre no-scrollbar">
                        {JSON.stringify(activeTestPayload.rawJson, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50/60 flex items-center justify-end gap-2.5">
                <button
                  onClick={() => setIsTestRunnerOpen(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold"
                >
                  Close Inspector
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FLOATING SECTION 2: WORKFLOW SETTINGS MODAL (With Scroll Lock)            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 z-10 flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                    <Settings className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Workflow Settings</h3>
                    <p className="text-xs text-slate-500">Configure runtime limits, triggers, error policies, and environment</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto flex-1">
                {/* General Section */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-blue-900" /> General Configuration
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Workflow Name</label>
                      <input 
                        type="text" 
                        value={workflowName} 
                        onChange={(e) => setWorkflowName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Status & Environment</label>
                      <div className="grid grid-cols-2 gap-2">
                        <select 
                          value={workflowStatus}
                          onChange={(e) => setWorkflowStatus(e.target.value as any)}
                          className="bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg px-2.5 py-2 outline-none"
                        >
                          <option value="Active">Active</option>
                          <option value="Draft">Draft</option>
                          <option value="Paused">Paused</option>
                        </select>
                        <select 
                          value={workflowEnv}
                          onChange={(e) => setWorkflowEnv(e.target.value as any)}
                          className="bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg px-2.5 py-2 outline-none"
                        >
                          <option value="Production">Production</option>
                          <option value="Staging">Staging</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Description</label>
                    <textarea 
                      rows={2}
                      value={workflowDesc}
                      onChange={(e) => setWorkflowDesc(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="border-t border-slate-100" />

                {/* Execution & Limits */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-900" /> Execution & Reliability Limits
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Timeout Limit</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          min={5}
                          max={300}
                          value={timeoutSeconds}
                          onChange={(e) => setTimeoutSeconds(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none"
                        />
                        <span className="text-xs text-slate-500">sec</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Max Concurrency</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          min={1}
                          max={50}
                          value={maxConcurrency}
                          onChange={(e) => setMaxConcurrency(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none"
                        />
                        <span className="text-xs text-slate-500">runs</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Retry Policy</label>
                      <select 
                        value={retryPolicy}
                        onChange={(e) => setRetryPolicy(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg px-2.5 py-2 outline-none"
                      >
                        <option>Exponential Backoff (3 retries)</option>
                        <option>Linear Retry (2 retries)</option>
                        <option>No Automatic Retry</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100" />

                {/* Security Secret */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-blue-900" /> Webhook Authentication & Secret
                  </h4>
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-900 block">HMAC Signature Secret</span>
                        <span className="text-[11px] text-slate-500">Sign payload headers using this key to guarantee authenticity</span>
                      </div>
                      <button 
                        onClick={handleCopySecret}
                        className="px-2.5 py-1 text-xs font-medium text-blue-900 bg-white border border-slate-200 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1.5"
                      >
                        {copiedSecret ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedSecret ? 'Copied' : 'Copy Key'}
                      </button>
                    </div>
                    <div className="font-mono text-xs text-slate-700 bg-white px-3 py-2 rounded-lg border border-slate-200 select-all">
                      whsec_99a8b72c4e1f_prod
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50/60 flex items-center justify-end gap-2.5">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsSettingsOpen(false);
                    toast.success('Workflow Settings Saved');
                  }}
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-blue-950 transition-colors shadow-xs"
                >
                  Save Settings
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FLOATING SECTION 3: NODE COMPONENT LIBRARY (With Scroll Lock)             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isNodeLibraryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNodeLibraryOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 z-10 flex flex-col max-h-[85vh] overflow-hidden"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Node Component Library</h3>
                    <p className="text-xs text-slate-500">Select an autonomous agent, inbound trigger, or enterprise action to drop onto canvas</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsNodeLibraryOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search & Filter Bar */}
              <div className="px-6 pt-4 pb-3 border-b border-slate-100 bg-white flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text"
                    value={librarySearch}
                    onChange={(e) => setLibrarySearch(e.target.value)}
                    placeholder="Search triggers, AI models, connectors..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 outline-none"
                  />
                </div>
                <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {(['All', 'Triggers', 'AI Agents', 'Actions', 'Logic'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                        selectedCategory === cat 
                          ? 'bg-blue-900 text-white shadow-xs' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Node Cards Grid */}
              <div className="p-6 overflow-y-auto flex-1">
                {filteredCatalog.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {filteredCatalog.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleAddNodeFromLibrary(item)}
                          className="group p-4 bg-white hover:bg-slate-50/80 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between hover:scale-[1.015]"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2.5">
                              <div className="flex items-center gap-2.5">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.accent.bg} ${item.accent.text} border ${item.accent.border}`}>
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-blue-900 transition-colors">
                                    {item.title}
                                  </h4>
                                  <p className="text-[11px] text-slate-500">{item.subtitle}</p>
                                </div>
                              </div>
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${item.accent.bg} ${item.accent.text} ${item.accent.border}`}>
                                {item.badge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[11px] text-slate-400 font-medium">{item.category}</span>
                            <span className="text-xs font-semibold text-blue-900 flex items-center gap-1 group-hover:underline">
                              <Plus className="w-3.5 h-3.5" /> Add to Canvas
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <Search className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="text-sm font-medium text-slate-700">No components match "{librarySearch}"</p>
                    <p className="text-xs text-slate-400 mt-1">Try searching for "Gemini", "Webhook", or "Slack".</p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50/60 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Showing {filteredCatalog.length} available components
                </span>
                <button
                  onClick={() => setIsNodeLibraryOpen(false)}
                  className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FLOATING SECTION 4: WORKFLOW RECIPE TEMPLATES (With Scroll Lock)          */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isTemplateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTemplateModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 z-10 flex flex-col overflow-hidden"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-blue-900" />
                  <h3 className="text-base font-bold text-slate-900">Battle-Tested Workflow Recipes</h3>
                </div>
                <button onClick={() => setIsTemplateModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-3.5 overflow-y-auto max-h-[70vh]">
                {WORKFLOW_RECIPES.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => handleLoadRecipe(recipe)}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-slate-50/80 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                        {recipe.name}
                      </h4>
                      <span className="text-[11px] font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {recipe.nodes.length} Nodes
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {recipe.desc}
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>Click to load onto canvas</span>
                      <span className="font-semibold text-blue-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Load Pipeline <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50/60 flex justify-end">
                <button
                  onClick={() => setIsTemplateModalOpen(false)}
                  className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FLOATING SECTION 5: PUBLISH TO PRODUCTION MODAL (With Scroll Lock)        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isPublishModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPublishModalOpen(false)}
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
                  <Share2 className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-base font-bold text-slate-900">Publish Pipeline v1.5</h3>
                </div>
                <button onClick={() => setIsPublishModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                  ✕
                </button>
              </div>

              <div className="p-5 space-y-4 text-xs">
                <p className="text-slate-600">
                  Ready to deploy <span className="font-bold text-slate-900">"{workflowName}"</span> to production runtime:
                </p>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 font-medium text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Schema verification passed for all {nodes.length} nodes</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>HMAC secret signature bound & encrypted</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zero-downtime hot swap enabled</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50/60 flex items-center justify-end gap-2.5">
                <button
                  onClick={() => setIsPublishModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsPublishModalOpen(false);
                    toast.success('Workflow v1.5 Published', {
                      description: 'Now live across global edge worker nodes.'
                    });
                  }}
                  className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors"
                >
                  Confirm Publish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </>
  );
}
