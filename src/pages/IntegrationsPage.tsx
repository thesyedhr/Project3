import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  Search, CheckCircle2, ShieldCheck, Zap, Settings, X, 
  Globe, Key, Check, RefreshCw, Lock, Building, Plus, Send, Sparkles,
  Info, Layers, ArrowRight, Workflow, Activity, Clock, FileCode, CheckCircle
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import { useScrollLock } from '../utils/useScrollLock';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

type IntegrationItem = {
  id: string;
  name: string;
  category: string;
  status: 'connected' | 'disconnected';
  desc: string;
  logo: string;
  authType: string;
  syncType: string;
  latency: string;
  activeFlows?: number;
  templateCount: number;
  triggers: { name: string; desc: string }[];
  actions: { name: string; desc: string }[];
  features: string[];
  endpoint?: string;
  scopes?: string[];
  recipes: { title: string; desc: string; steps: string[] }[];
};

const initialIntegrations: IntegrationItem[] = [
  { 
    id: 'slack', 
    name: 'Slack', 
    category: 'Communication', 
    status: 'connected', 
    desc: 'Send interactive alerts, request approvals, and initiate AI war-rooms directly in team channels.', 
    logo: 'S', 
    authType: 'OAuth 2.0 (Bot Token)',
    syncType: 'Instant Webhook',
    latency: '< 45ms',
    activeFlows: 6,
    templateCount: 14,
    triggers: [
      { name: 'Channel Mention', desc: 'Fires when bot or keyword is mentioned in public/private channels' },
      { name: 'Reaction Added', desc: 'Trigger approvals or task handoffs when emojis (e.g. :white_check_mark:) are applied' },
      { name: 'Slash Command', desc: 'Executes custom NexaFlow commands directly from message composition' }
    ],
    actions: [
      { name: 'Send Interactive Card', desc: 'Posts formatted Block Kit messages with one-click approve/reject buttons' },
      { name: 'Create War-Room Channel', desc: 'Spins up temporary triage channels and invites incident responders automatically' },
      { name: 'Update Thread Reply', desc: 'Appends real-time diagnostic outputs directly into the original conversation thread' }
    ],
    features: ['Real-time Webhook', 'Block Kit UI', 'Thread Persistence', 'SOC 2 Ready'],
    endpoint: 'https://slack.com/api/chat.postMessage', 
    scopes: ['chat:write', 'channels:read', 'incoming-webhook', 'commands'],
    recipes: [
      { title: 'Incident War-Room Dispatch', desc: 'Auto-create Slack channels and notify on-call leads when high-severity errors trigger in Datadog.', steps: ['Datadog alert', 'Spin up #incident-live', 'Invite DevOps lead'] },
      { title: 'Interactive Spend Approval', desc: 'Route software purchase requests over $500 to department heads with approve/deny buttons.', steps: ['Form submitted', 'Slack approval card', 'Update QuickBooks'] }
    ]
  },
  { 
    id: 'salesforce', 
    name: 'Salesforce', 
    category: 'CRM', 
    status: 'connected', 
    desc: 'Sync leads, accounts, and opportunities with real-time bi-directional streaming event architecture.', 
    logo: 'SF', 
    authType: 'OAuth 2.0 (REST & Bulk API)',
    syncType: 'Bi-directional Streaming',
    latency: '< 90ms',
    activeFlows: 4,
    templateCount: 18,
    triggers: [
      { name: 'Opportunity Stage Changed', desc: 'Detects when deals transition to Closed-Won, Proposal, or Discovery' },
      { name: 'New Inbound Lead', desc: 'Fires immediately upon web-to-lead or marketing campaign submission' },
      { name: 'Account Status Updated', desc: 'Detects enterprise tier changes or churn indicator adjustments' }
    ],
    actions: [
      { name: 'Enrich Account & Contacts', desc: 'Injects verified firmographic data, technographics, and employee headcount' },
      { name: 'Create Task for Account Exec', desc: 'Assigns follow-up SLA checklists with calendar due dates' },
      { name: 'Sync Contract & Provision', desc: 'Passes closed contract terms to Stripe billing and provisioning queues' }
    ],
    features: ['Bi-directional Sync', 'Bulk Data V2', 'Custom Object Mapping', 'CDC Streaming'],
    endpoint: 'https://nexaflow.my.salesforce.com/services/data/v59.0', 
    scopes: ['api', 'refresh_token', 'offline_access', 'id'],
    recipes: [
      { title: 'Closed-Won Automated Onboarding', desc: 'When an opportunity moves to Closed-Won, provision workspace seats and send welcome materials.', steps: ['Deal closed', 'Generate contract PDF', 'Send Slack celebration'] },
      { title: 'Inbound Lead AI Triage', desc: 'Classify lead intent with AI and assign directly to the regional sales team.', steps: ['Lead form', 'Score lead score > 80', 'Route to SDR'] }
    ]
  },
  { 
    id: 'github', 
    name: 'GitHub', 
    category: 'Dev Tools', 
    status: 'connected', 
    desc: 'Automate release pipelines, triage PR reviews, and enforce security policies across repositories.', 
    logo: 'GH', 
    authType: 'GitHub App / OAuth 2.0',
    syncType: 'Instant Webhook',
    latency: '< 35ms',
    activeFlows: 5,
    templateCount: 12,
    triggers: [
      { name: 'Pull Request Opened', desc: 'Triggers automated code compliance checks and reviewer assignment' },
      { name: 'Workflow Run Failed', desc: 'Detects CI/CD pipeline crashes and test failures on staging or main' },
      { name: 'Issue Labeled Critical', desc: 'Fires when bug reports receive high-priority or P0 vulnerability tags' }
    ],
    actions: [
      { name: 'Post Triage Review Comment', desc: 'Injects AI code diff summary and automated risk checklist on PR' },
      { name: 'Trigger Deploy Dispatch', desc: 'Dispatches targeted repository dispatch events to custom runner pools' },
      { name: 'Create Milestone Issue', desc: 'Generates structured issues with linked reproduction steps from user reports' }
    ],
    features: ['Fine-grained Permissions', 'Branch Protection', 'Commit Verification', 'Webhook Signatures'],
    endpoint: 'https://api.github.com/repos/nexaflow/core', 
    scopes: ['repo', 'workflow', 'read:org', 'pull_requests:write'],
    recipes: [
      { title: 'Automated PR Triage & Summary', desc: 'Generate high-level architectural impact summaries for newly opened pull requests.', steps: ['PR submitted', 'Evaluate git diff', 'Post markdown summary'] },
      { title: 'Failed CI War-Room Notification', desc: 'Instantly notify repository owners with logs when master build fails.', steps: ['Actions failed', 'Extract error logs', 'Notify committer'] }
    ]
  },
  { 
    id: 'jira', 
    name: 'Jira', 
    category: 'Dev Tools', 
    status: 'disconnected', 
    desc: 'Create and sync sprint tickets, prioritize backlogs, and link incidents to engineering tasks.', 
    logo: 'J', 
    authType: 'Atlassian OAuth 2.0',
    syncType: 'Real-time Webhook',
    latency: '< 80ms',
    templateCount: 16,
    triggers: [
      { name: 'Issue Created / Assigned', desc: 'Detects newly submitted bug tickets or sprint feature assignments' },
      { name: 'Status Changed to Blocked', desc: 'Alerts project managers when dependencies or blockers are flagged' },
      { name: 'Sprint Completed', desc: 'Triggers retrospective report compilation and unresolved issue roll-over' }
    ],
    actions: [
      { name: 'Create Bug Ticket with Logs', desc: 'Generates structured Jira issue with stack traces and user device details' },
      { name: 'Transition Workflow State', desc: 'Moves tickets through In Progress, QA Review, and Released states' },
      { name: 'Link Customer Feedback', desc: 'Associates Zendesk tickets or Gong call snippets directly to engineering epics' }
    ],
    features: ['Custom JQL Filter', 'Sprint Automation', 'Sub-task Generation', 'Field Auto-fill'],
    endpoint: 'https://nexaflow.atlassian.net/rest/api/3', 
    scopes: ['read:jira-work', 'write:jira-work', 'offline_access'],
    recipes: [
      { title: 'High-Priority Bug Escalation', desc: 'When customer support flags a severity-1 bug, create a Jira issue with stack trace.', steps: ['Support ticket escalated', 'Auto-fill Jira issue', 'Assign on-call engineer'] },
      { title: 'Release Notes Generator', desc: 'Compile completed Jira tickets in the sprint into clean customer release notes.', steps: ['Sprint closed', 'Extract ticket titles', 'Draft release post'] }
    ]
  },
  { 
    id: 'zendesk', 
    name: 'Zendesk', 
    category: 'Support', 
    status: 'disconnected', 
    desc: 'Automate ticket routing, draft agent responses, and escalate urgent enterprise customer issues.', 
    logo: 'Z', 
    authType: 'OAuth 2.0 / API Token',
    syncType: 'Instant Webhooks',
    latency: '< 75ms',
    templateCount: 10,
    triggers: [
      { name: 'Urgent Ticket Created', desc: 'Identifies incoming inquiries with negative sentiment or high priority' },
      { name: 'SLA Breach Approaching', desc: 'Fires 15 minutes before first-response SLA targets are missed' },
      { name: 'Customer Satisfaction Rated', desc: 'Captures CSAT survey results for quality assurance auditing' }
    ],
    actions: [
      { name: 'Generate AI Response Draft', desc: 'Drafts comprehensive, knowledge-grounded solutions for support reps' },
      { name: 'Apply VIP Priority Tag', desc: 'Elevates customer tier based on Stripe ARR and contract SLA commitments' },
      { name: 'Escalate to Tier-3 On-Call', desc: 'Pings emergency engineering pager when multiple similar outages appear' }
    ],
    features: ['SLA Timers', 'Sentiment Analysis', 'Knowledge Base Search', 'Macro Automation'],
    endpoint: 'https://nexaflow.zendesk.com/api/v2', 
    scopes: ['tickets:read', 'tickets:write', 'users:read'],
    recipes: [
      { title: 'VIP Customer VIP Routing', desc: 'Instantly route tickets from enterprise accounts (> $50k ARR) to senior support specialists.', steps: ['New ticket', 'Lookup Stripe MRR', 'Reassign to VIP queue'] },
      { title: 'Auto-Tagging & Deflection', desc: 'Use AI to categorize billing vs bug inquiries and suggest instant doc articles.', steps: ['Customer email', 'AI classification', 'Suggest help article'] }
    ]
  },
  { 
    id: 'stripe', 
    name: 'Stripe', 
    category: 'Finance', 
    status: 'disconnected', 
    desc: 'Listen to payment events, automate dunning recovery, and adjust enterprise usage quotas.', 
    logo: 'ST', 
    authType: 'Restricted Secret Key & Webhooks',
    syncType: 'Real-time Event Stream',
    latency: '< 55ms',
    templateCount: 15,
    triggers: [
      { name: 'Payment Failed', desc: 'Triggers automated invoice retry schedules and grace period notices' },
      { name: 'Subscription Canceled / Downgraded', desc: 'Alerts customer success team for churn prevention outreach' },
      { name: 'Invoice Paid Successfully', desc: 'Fires when corporate wire transfers or card charges settle' }
    ],
    actions: [
      { name: 'Adjust Workspace Quotas', desc: 'Increases compute or seat allocations immediately upon plan purchase' },
      { name: 'Send Dunning Email Series', desc: 'Dispatches personalized payment update links with zero friction' },
      { name: 'Issue Prorated Refund', desc: 'Automates customer billing adjustments within pre-approved thresholds' }
    ],
    features: ['PCI-DSS Compliant', 'Idempotent Webhooks', 'Zero Raw Data Retention', 'Event Replay'],
    endpoint: 'https://api.stripe.com/v1', 
    scopes: ['read_write', 'charges:read', 'customers:write'],
    recipes: [
      { title: 'Dunning & Churn Prevention', desc: 'Send personalized recovery reminders when credit card renewals fail before locking access.', steps: ['Charge declined', 'Send SMS & email link', 'Retry in 48h'] },
      { title: 'Seat Expansion Notification', desc: 'Notify account manager when a company adds 10+ seats in a billing cycle.', steps: ['Invoice updated', 'Calculate seat expansion', 'Alert sales lead'] }
    ]
  },
  { 
    id: 'notion', 
    name: 'Notion', 
    category: 'Productivity', 
    status: 'disconnected', 
    desc: 'Auto-generate documentation, synchronize project databases, and maintain company wikis.', 
    logo: 'N', 
    authType: 'Notion OAuth 2.0',
    syncType: 'Real-time API',
    latency: '< 110ms',
    templateCount: 9,
    triggers: [
      { name: 'Database Page Added', desc: 'Detects new specs, meeting notes, or employee onboarding records' },
      { name: 'Status Property Changed', desc: 'Fires when roadmap projects transition to In Progress or Done' },
      { name: 'Checklist Item Checked', desc: 'Signals release readiness when all pre-flight items are completed' }
    ],
    actions: [
      { name: 'Append Meeting Summary', desc: 'Transcribes recorded executive calls into formatted Notion call notes' },
      { name: 'Create Project Database Row', desc: 'Generates structured spec sheets with pre-populated template blocks' },
      { name: 'Sync Milestone Deliverables', desc: 'Keeps team dashboards in lockstep with engineering git tags' }
    ],
    features: ['Database Schema Sync', 'Markdown Block Builder', 'Multi-Workspace Token', 'Workspace Permissions'],
    endpoint: 'https://api.notion.com/v1', 
    scopes: ['read_content', 'insert_content', 'update_content'],
    recipes: [
      { title: 'Standup to Notion Wiki Sync', desc: 'Compile asynchronous team standups from Slack into a weekly consolidated Notion table.', steps: ['Collect Slack replies', 'Format markdown table', 'Publish to Notion'] },
      { title: 'Customer Feedback Aggregator', desc: 'Push tagged customer quotes from Zendesk into a centralized product feedback database.', steps: ['Ticket tagged #feedback', 'Extract quote', 'Add to Product DB'] }
    ]
  },
  { 
    id: 'hubspot', 
    name: 'HubSpot', 
    category: 'CRM', 
    status: 'disconnected', 
    desc: 'Enrich lead contact profiles, manage marketing email sequences, and synchronize pipeline stages.', 
    logo: 'HS', 
    authType: 'HubSpot OAuth 2.0',
    syncType: '2-Way Webhook Sync',
    latency: '< 100ms',
    templateCount: 12,
    triggers: [
      { name: 'Form Submission Received', desc: 'Fires when prospects fill demo forms, contact requests, or asset downloads' },
      { name: 'Deal Pipeline Stage Moved', desc: 'Tracks sales cycle progression from Lead to Qualified to Contract' },
      { name: 'Contact Lifecycle Updated', desc: 'Monitors when leads transition into Marketing Qualified or Customer status' }
    ],
    actions: [
      { name: 'Enrich Contact Properties', desc: 'Appends firmographic revenue, industry, and tech stack details' },
      { name: 'Enroll in Drip Sequence', desc: 'Adds prospective buyers to personalized onboarding email cadences' },
      { name: 'Create Sales Activity Note', desc: 'Logs recorded product usage milestones directly into customer timeline' }
    ],
    features: ['Contact Deduplication', 'Form Event Capture', 'Custom Property Types', 'GDPR Compliant'],
    endpoint: 'https://api.hubapi.com/crm/v3', 
    scopes: ['contacts:read', 'contacts:write', 'timeline:write'],
    recipes: [
      { title: 'Inbound Form Enrichment', desc: 'Enrich inbound demo requests with company data and notify SDR within 60 seconds.', steps: ['Form filled', 'Enrich company data', 'Notify SDR on Slack'] },
      { title: 'Product Milestone Lead Score', desc: 'Increase lead score when prospect invites 3 team members during free trial.', steps: ['Trial member joined', 'Add +20 lead points', 'Notify account executive'] }
    ]
  }
];

export default function IntegrationsPage() {
  const [integrationsList, setIntegrationsList] = useState<IntegrationItem[]>(initialIntegrations);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Floating Sections State (with background scroll lock)
  const [configuringApp, setConfiguringApp] = useState<IntegrationItem | null>(null);
  const [connectingApp, setConnectingApp] = useState<IntegrationItem | null>(null);
  const [viewingDetailsApp, setViewingDetailsApp] = useState<IntegrationItem | null>(null);
  const [detailsTab, setDetailsTab] = useState<'triggers' | 'actions' | 'recipes' | 'specs'>('triggers');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestAppName, setRequestAppName] = useState('');
  const [requestAppCategory, setRequestAppCategory] = useState('CRM');
  const [requestAppDesc, setRequestAppDesc] = useState('');
  const [isTestingApi, setIsTestingApi] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [subdomainInput, setSubdomainInput] = useState('');

  // Enable scroll lock on background whenever ANY floating modal/section is open
  useScrollLock(Boolean(configuringApp || connectingApp || viewingDetailsApp || isRequestModalOpen));

  const categories = ['All', 'Connected', 'CRM', 'Communication', 'Dev Tools', 'Support'];

  const filteredIntegrations = integrationsList.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' ? true : 
                          activeFilter === 'Connected' ? app.status === 'connected' : 
                          app.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleTestConnection = () => {
    setIsTestingApi(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTestingApi(false);
      setTestResult('Latency: 64ms • Status 200 OK • Token valid');
      toast.success('Connection verified', { description: 'All OAuth credentials are authenticated.' });
    }, 1200);
  };

  const handleDisconnectApp = (id: string) => {
    setIntegrationsList(prev => prev.map(item => item.id === id ? { ...item, status: 'disconnected' } : item));
    setConfiguringApp(null);
    if (viewingDetailsApp?.id === id) {
      setViewingDetailsApp(prev => prev ? { ...prev, status: 'disconnected' } : null);
    }
    toast.success('Integration Disconnected', { description: 'API credentials removed.' });
  };

  const handleCompleteConnection = () => {
    if (!connectingApp) return;
    setIntegrationsList(prev => prev.map(item => item.id === connectingApp.id ? { ...item, status: 'connected' } : item));
    if (viewingDetailsApp?.id === connectingApp.id) {
      setViewingDetailsApp(prev => prev ? { ...prev, status: 'connected' } : null);
    }
    toast.success(`${connectingApp.name} Connected`, { description: 'Secure OAuth handshake completed successfully.' });
    setConnectingApp(null);
    setSubdomainInput('');
  };

  const handleDeployRecipe = (recipeTitle: string, appName: string) => {
    toast.success('Recipe Deployed to Active Workflows', {
      description: `"${recipeTitle}" is now active in your NexaFlow automation pipeline.`
    });
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-16 min-h-[70vh]">
        
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
          className="mb-10 text-center max-w-3xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-semibold text-blue-900 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>Native Connectors & Event Streaming</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3 text-center">
            App Directory & Integrations
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto text-center">
            Connect NexaFlow to your daily SaaS stack. Explore available event triggers, automated actions, pre-built recipes, and OAuth credentials.
          </p>
          <button 
            onClick={() => setIsRequestModalOpen(true)}
            className="mt-6 px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-900 text-white hover:bg-blue-950 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            Request Integration
          </button>
        </motion.div>

        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: LUXURY_EASE }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 p-2 bg-slate-50/80 border border-slate-200/80 rounded-2xl"
        >
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === cat 
                    ? 'text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {activeFilter === cat && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs border border-slate-200/90 -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search apps by name, triggers, or actions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-colors text-slate-900 placeholder-slate-400"
            />
          </div>
        </motion.div>

        {/* Apps Grid with Rich Details, Magnetic Hover and Zero-Lag Filtering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 hover-group">
          {filteredIntegrations.map((app, idx) => (
            <motion.div
              key={`${activeFilter}-${app.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.22, 
                delay: Math.min(idx * 0.025, 0.12), 
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } }}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-slate-300 hover-item transition-all duration-200 flex flex-col justify-between h-full group relative overflow-hidden"
            >
              <div>
                {/* Card Header: Logo, Name, Category & Status Badge */}
                <div className="flex items-center justify-between gap-3 mb-4 relative z-10">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold border shadow-2xs shrink-0 ${
                      app.status === 'connected' ? 'bg-blue-50 border-blue-200/80 text-blue-900' : 'bg-slate-100/90 border-slate-200 text-slate-800'
                    }`}>
                      {app.logo}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors truncate">
                        {app.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium truncate">
                        {app.category}
                      </p>
                    </div>
                  </div>

                  {app.status === 'connected' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 shrink-0 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      Connected
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-xs font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/80 shrink-0 whitespace-nowrap">
                      Available
                    </span>
                  )}
                </div>
                
                {/* Description with normalized 2-line height for uniform baseline */}
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 h-10 mb-4 relative z-10">
                  {app.desc}
                </p>

                {/* Structured Capabilities Panel (Cleanly aligned rows, matching site aesthetic) */}
                <div className="bg-slate-50/75 border border-slate-200/70 rounded-xl p-3.5 space-y-2 mb-4 relative z-10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5 shrink-0">
                      <Zap className="w-3.5 h-3.5 text-blue-800 shrink-0" />
                      Event Trigger
                    </span>
                    <span className="text-slate-900 font-semibold text-right truncate max-w-[170px]" title={app.triggers[0].name}>
                      {app.triggers[0].name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5 shrink-0">
                      <Workflow className="w-3.5 h-3.5 text-blue-800 shrink-0" />
                      Automated Action
                    </span>
                    <span className="text-slate-900 font-semibold text-right truncate max-w-[170px]" title={app.actions[0].name}>
                      {app.actions[0].name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Sync Protocol
                    </span>
                    <span className="text-slate-700 font-medium text-right font-mono text-[11px] truncate max-w-[170px]">
                      {app.syncType.split(' ')[0]} ({app.latency})
                    </span>
                  </div>
                </div>

                {/* Security & Pre-built Templates Meta */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-5 px-0.5 relative z-10">
                  <span className="flex items-center gap-1.5 font-medium text-slate-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-800 shrink-0" />
                    SOC 2 Type II
                  </span>
                  <span className="text-slate-500 text-[11px] font-medium">
                    {app.templateCount} Pre-Built Recipes
                  </span>
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="pt-3.5 border-t border-slate-100 relative z-10 grid grid-cols-2 gap-2.5">
                <button 
                  onClick={() => {
                    setViewingDetailsApp(app);
                    setDetailsTab('triggers');
                  }}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200/90 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  Specs & Recipes
                </button>

                {app.status === 'connected' ? (
                  <button 
                    onClick={() => {
                      setConfiguringApp(app);
                      setTestResult(null);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-blue-900 text-white hover:bg-blue-950 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                    Configure API
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setConnectingApp(app);
                      setSubdomainInput('');
                    }}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-blue-900 text-white hover:bg-blue-950 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Zap className="w-3.5 h-3.5 text-blue-200 shrink-0" />
                    Connect
                  </button>
                )}
              </div>

              {/* Ambient Hover Accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}

          {filteredIntegrations.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.2 }}
              className="col-span-full py-20 flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No apps found</h3>
              <p className="text-slate-500">We couldn't find any integrations matching "{searchQuery}"</p>
            </motion.div>
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* FLOATING SECTION 0: FULL SPECS & RECIPES INSPECTOR MODAL                  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {viewingDetailsApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingDetailsApp(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Centered Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 z-10 flex flex-col max-h-[88vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/60 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold border shadow-xs ${
                    viewingDetailsApp.status === 'connected' ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-white border-slate-200 text-slate-700'
                  }`}>
                    {viewingDetailsApp.logo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-xl font-bold text-slate-900">{viewingDetailsApp.name} Integration Guide</h2>
                      {viewingDetailsApp.status === 'connected' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                          Disconnected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {viewingDetailsApp.category} Connector • {viewingDetailsApp.authType} • {viewingDetailsApp.syncType} ({viewingDetailsApp.latency})
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setViewingDetailsApp(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Interactive Tabs */}
              <div className="flex border-b border-slate-200 px-6 bg-white overflow-x-auto hide-scrollbar gap-2">
                {[
                  { id: 'triggers', label: `Triggers (${viewingDetailsApp.triggers.length})`, icon: Zap },
                  { id: 'actions', label: `Actions (${viewingDetailsApp.actions.length})`, icon: Workflow },
                  { id: 'recipes', label: `Pre-Built Recipes (${viewingDetailsApp.recipes.length})`, icon: Sparkles },
                  { id: 'specs', label: 'Security & Scopes', icon: ShieldCheck },
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = detailsTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setDetailsTab(tab.id as any)}
                      className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'border-blue-900 text-blue-900'
                          : 'border-transparent text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                {detailsTab === 'triggers' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-900 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Triggers continuously listen to event hooks via webhooks and automatically initiate workflow runs.</span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {viewingDetailsApp.triggers.map((trig, i) => (
                        <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-bold text-slate-900">{trig.name}</span>
                            <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                              event.hook
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">{trig.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {detailsTab === 'actions' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50/70 border border-blue-200/70 rounded-xl text-xs text-blue-900 flex items-center gap-2">
                      <Workflow className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Actions represent automated tasks NexaFlow can perform within {viewingDetailsApp.name} during workflow execution.</span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {viewingDetailsApp.actions.map((act, i) => (
                        <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-bold text-slate-900">{act.name}</span>
                            <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                              api.execute
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">{act.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {detailsTab === 'recipes' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Pre-configured automation templates designed for instant production deployment with zero code.</span>
                    </div>

                    <div className="space-y-3">
                      {viewingDetailsApp.recipes.map((rec, i) => (
                        <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs hover:border-slate-300 transition-colors space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h4 className="text-sm font-bold text-slate-900">{rec.title}</h4>
                              <p className="text-xs text-slate-600 mt-1">{rec.desc}</p>
                            </div>
                            <button
                              onClick={() => handleDeployRecipe(rec.title, viewingDetailsApp.name)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-900 text-white hover:bg-blue-950 transition-colors shrink-0 cursor-pointer shadow-2xs"
                            >
                              Deploy Recipe
                            </button>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto text-[11px]">
                            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Pipeline:</span>
                            {rec.steps.map((step, sIdx) => (
                              <React.Fragment key={sIdx}>
                                <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-medium whitespace-nowrap">
                                  {step}
                                </span>
                                {sIdx < rec.steps.length - 1 && (
                                  <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {detailsTab === 'specs' && (
                  <div className="space-y-4">
                    {/* Security Highlights */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Authentication Protocol</span>
                        <p className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-blue-800" />
                          {viewingDetailsApp.authType}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Synchronization Engine</span>
                        <p className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-700" />
                          {viewingDetailsApp.syncType} ({viewingDetailsApp.latency})
                        </p>
                      </div>
                    </div>

                    {/* OAuth Scopes */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5 text-blue-900" /> Required OAuth Permissions
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {(viewingDetailsApp.scopes || ['read', 'write', 'events']).map(scope => (
                          <span key={scope} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-mono text-slate-700 flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-600" />
                            {scope}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Enterprise Compliance Notice */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Zero-Data Retention Policy Guaranteed</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        NexaFlow operates strictly as an in-memory event orchestrator. Payload contents are streamed through AES-256 encrypted channels and purged immediately upon action execution completion.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50/60 flex items-center justify-between">
                <button
                  onClick={() => setViewingDetailsApp(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                >
                  Close Guide
                </button>

                <div className="flex items-center gap-2">
                  {viewingDetailsApp.status === 'connected' ? (
                    <button
                      onClick={() => {
                        const app = viewingDetailsApp;
                        setViewingDetailsApp(null);
                        setConfiguringApp(app);
                        setTestResult(null);
                      }}
                      className="px-4 py-2 text-xs font-semibold bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-500" />
                      Configure API
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const app = viewingDetailsApp;
                        setViewingDetailsApp(null);
                        setConnectingApp(app);
                        setSubdomainInput('');
                      }}
                      className="px-4 py-2 text-xs font-semibold bg-blue-900 text-white hover:bg-blue-950 rounded-lg transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-blue-200" />
                      Connect {viewingDetailsApp.name}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FLOATING SECTION 1: CONFIGURE API MODAL (Centered with relevant details)  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {configuringApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfiguringApp(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Centered Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 z-10 flex flex-col max-h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-base text-blue-900">
                    {configuringApp.logo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900">{configuringApp.name} API Settings</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Connected
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">OAuth token status, active scopes, and target API endpoints</p>
                  </div>
                </div>
                <button 
                  onClick={() => setConfiguringApp(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 overflow-y-auto flex-1">
                {/* Endpoint */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-900" /> Target API Base URL
                  </label>
                  <input 
                    readOnly
                    value={configuringApp.endpoint || `https://api.${configuringApp.id}.com/v1`}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 font-mono text-xs rounded-lg px-3 py-2 outline-none select-all"
                  />
                </div>

                {/* Scopes */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-blue-900" /> Authorized OAuth Scopes
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {(configuringApp.scopes || ['read', 'write', 'events']).map((scope) => (
                      <span key={scope} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-mono text-slate-700 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" />
                        {scope}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Health & Test Connection */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Connection Health</span>
                      <span className="text-[11px] text-slate-500">Live ping against endpoint to verify token validity</span>
                    </div>
                    <button
                      onClick={handleTestConnection}
                      disabled={isTestingApi}
                      className="px-3 py-1.5 bg-white border border-slate-200 text-blue-900 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isTestingApi ? 'animate-spin text-blue-900' : ''}`} />
                      {isTestingApi ? 'Testing...' : 'Test Connection'}
                    </button>
                  </div>
                  {testResult && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200/70 rounded-lg text-xs text-emerald-800 font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      {testResult}
                    </div>
                  )}
                </div>

                {/* Webhook Delivery Mode */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white border border-slate-200 rounded-xl">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Environment</span>
                    <span className="text-sm font-bold text-slate-900">Production v2.4</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Signature Mode</span>
                    <span className="text-sm font-bold text-slate-900">HMAC-SHA256</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50/60 flex items-center justify-between">
                <button
                  onClick={() => handleDisconnectApp(configuringApp.id)}
                  className="px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                >
                  Disconnect App
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setConfiguringApp(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FLOATING SECTION 2: CONNECT APP MODAL (Centered OAuth authorization)       */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {connectingApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConnectingApp(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Centered Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 z-10 flex flex-col max-h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 text-center bg-slate-50/60 relative">
                <button 
                  onClick={() => setConnectingApp(null)}
                  className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm mx-auto flex items-center justify-center font-bold text-xl text-blue-900 mb-3">
                  {connectingApp.logo}
                </div>
                <h3 className="text-xl font-bold text-slate-900">Connect {connectingApp.name}</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Authorize NexaFlow to securely connect with your {connectingApp.name} organization.
                </p>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 overflow-y-auto flex-1">
                {/* Workspace Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-blue-900" /> Organization Subdomain or Workspace
                  </label>
                  <div className="flex">
                    <input 
                      type="text"
                      placeholder="acme-corp"
                      value={subdomainInput}
                      onChange={(e) => setSubdomainInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-l-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                    />
                    <span className="px-3 bg-slate-100 border border-l-0 border-slate-200 rounded-r-lg text-xs font-medium text-slate-500 flex items-center">
                      .{connectingApp.id}.com
                    </span>
                  </div>
                </div>

                {/* Requested Permissions */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    Permissions Requested
                  </label>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 block">Read & Query Data</span>
                        <span>Access ticket fields, channel messages, or CRM records to trigger workflows.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 block">Dispatch Actions & Comments</span>
                        <span>Post replies, update ticket status, and assign SLA priority tags automatically.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 block">Webhook Subscription</span>
                        <span>Receive real-time event notifications via TLS 1.3 encrypted webhooks.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compliance badge */}
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-blue-50/60 p-2.5 rounded-lg border border-blue-100">
                  <Lock className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                  <span>Tokens are stored with hardware-backed AES-256 envelope encryption.</span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50/60 flex items-center justify-end gap-2.5">
                <button
                  onClick={() => setConnectingApp(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCompleteConnection}
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" /> Authorize & Connect
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* ========================================================================= */}
      {/* FLOATING SECTION 3: REQUEST CUSTOM INTEGRATION (Centered Modal)            */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isRequestModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRequestModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Centered Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 z-10 flex flex-col max-h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Request Integration</h3>
                    <p className="text-xs text-slate-500">Need a tool not listed? Our team builds connectors on demand.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsRequestModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Tool / Platform Name</label>
                  <input 
                    type="text"
                    placeholder="e.g., Snowflake, Linear, Asana"
                    value={requestAppName}
                    onChange={(e) => setRequestAppName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Category</label>
                  <select 
                    value={requestAppCategory}
                    onChange={(e) => setRequestAppCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg px-2.5 py-2 outline-none"
                  >
                    <option value="CRM">CRM & Sales</option>
                    <option value="Dev Tools">Developer & CI/CD</option>
                    <option value="Support">Customer Support</option>
                    <option value="Finance">Finance & Billing</option>
                    <option value="Productivity">Productivity & Docs</option>
                    <option value="Database">Data Warehouse & SQL</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Workflow Use Case</label>
                  <textarea 
                    rows={3}
                    placeholder="Describe what triggers or actions you want automated with this service..."
                    value={requestAppDesc}
                    onChange={(e) => setRequestAppDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 resize-none"
                  />
                </div>

                <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100 flex items-start gap-2 text-xs text-blue-900">
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <span>Enterprise integrations typically take 3-5 business days from API specification review to sandbox validation.</span>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50/60 flex items-center justify-end gap-2.5">
                <button
                  onClick={() => setIsRequestModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success('Request Submitted', { description: `We have registered your request for ${requestAppName || 'the integration'}.` });
                    setIsRequestModalOpen(false);
                    setRequestAppName('');
                    setRequestAppDesc('');
                  }}
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Request
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
