import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useScrollLock } from '../utils/useScrollLock';
import { 
  Zap, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight,
  MoreHorizontal,
  Activity,
  PlayCircle,
  Cpu,
  Database,
  ShieldCheck,
  Server,
  X,
  Terminal,
  FileJson,
  Sliders,
  Sparkles,
  Download,
  Bell,
  Filter,
  Check,
  ShieldAlert,
  Network
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
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import { CURRENT_USER_SUBSCRIPTION } from '../utils/userSubscription';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

const executionData7d = [
  { name: 'Mon', runs: 1200 },
  { name: 'Tue', runs: 1800 },
  { name: 'Wed', runs: 2400 },
  { name: 'Thu', runs: 2100 },
  { name: 'Fri', runs: 2800 },
  { name: 'Sat', runs: 1400 },
  { name: 'Sun', runs: 1900 },
];

const executionData30d = Array.from({ length: 30 }, (_, i) => ({
  name: `Day ${i + 1}`,
  runs: Math.floor(Math.random() * 2000) + 1000,
}));

const executionDataAllTime = [
  { name: 'Jan', runs: 12000 },
  { name: 'Feb', runs: 18000 },
  { name: 'Mar', runs: 24000 },
  { name: 'Apr', runs: 21000 },
  { name: 'May', runs: 28000 },
  { name: 'Jun', runs: 34000 },
  { name: 'Jul', runs: 42000 },
  { name: 'Aug', runs: 39000 },
  { name: 'Sep', runs: 45000 },
];

const distributionData = [
  { name: 'Salesforce Sync', value: 45, color: '#1e3a8a' }, // blue-900
  { name: 'Slack Alerts', value: 25, color: '#3b82f6' }, // blue-500
  { name: 'GitHub CI/CD', value: 20, color: '#93c5fd' }, // blue-300
  { name: 'Jira Triage', value: 10, color: '#e2e8f0' }, // slate-200
];

type RunRecord = {
  id: string;
  name: string;
  status: 'Success' | 'Failed';
  time: string;
  duration: string;
  httpStatus: string;
  httpStatusCode: number;
  recordId: string;
  stat1: { label: string; value: string; highlight?: boolean };
  stat2: { label: string; value: string; highlight?: boolean };
  stat3: { label: string; value: string; highlight?: boolean };
  contextFields: { label: string; value: string }[];
  timeline: { step: string; detail: string; time: string; status?: 'success' | 'failed' }[];
  rawPayload: Record<string, any>;
};

const recentRuns: RunRecord[] = [
  { 
    id: 'run-1', 
    name: 'Lead Enrichment (Clearbit)', 
    status: 'Success', 
    time: '2 mins ago', 
    duration: '1.2s',
    httpStatus: '200 OK',
    httpStatusCode: 200,
    recordId: 'ld_99283xa',
    stat1: { label: 'Enriched', value: 'Yes' },
    stat2: { label: 'Confidence', value: '98%', highlight: true },
    stat3: { label: 'Mapped Fields', value: '14 fields' },
    contextFields: [
      { label: 'Identified Account', value: 'Stripe, Inc. (7,000+ employees)' },
      { label: 'Downstream Sync', value: 'Salesforce Contact #cnt_88291a' },
      { label: 'Lead Score', value: '96/100 (Tier 1 Enterprise AE Routed)' },
    ],
    timeline: [
      { step: 'Inbound Webhook Received', detail: 'Received lead signup payload from demo form', time: '0.00s' },
      { step: 'Data Extraction & Sanitization', detail: 'Agent parsed 14 firmographic fields from Apollo & Clearbit', time: '0.32s' },
      { step: 'Gemini Qualification Agent', detail: 'Scored fit: 96/100, verified B2B corporate domain', time: '0.78s' },
      { step: 'Salesforce & Slack Dispatch', detail: 'Synced record to CRM & notified #sales-tier1 in Slack', time: '1.20s' },
    ],
    rawPayload: {
      status: 200,
      timestamp: "2026-09-05T05:38:12.441Z",
      workflow_id: "wf_lead_enrichment_v3",
      data: {
        lead_id: "ld_99283xa",
        company_name: "Stripe, Inc.",
        domain: "stripe.com",
        headcount_range: "5,000-10,000",
        industry: "Financial Infrastructure",
        estimated_arr: "$1.4B+",
        enriched: true,
        confidence_score: 0.984,
        mapped_fields: 14,
        routing: {
          destination: "Salesforce_CRM",
          contact_id: "cnt_88291a",
          assigned_owner: "jordan.s@nexaflow.com"
        }
      }
    }
  },
  { 
    id: 'run-2', 
    name: 'Zendesk Ticket Triage', 
    status: 'Success', 
    time: '15 mins ago', 
    duration: '0.8s',
    httpStatus: '200 OK',
    httpStatusCode: 200,
    recordId: 'zd_448102',
    stat1: { label: 'Classified Intent', value: 'Billing Dispute' },
    stat2: { label: 'Urgency Score', value: 'High (-0.85)', highlight: true },
    stat3: { label: 'Action Taken', value: 'Escalated Tier 2' },
    contextFields: [
      { label: 'Customer Account', value: 'Sarah Chen (sarah.chen@enterprise.io)' },
      { label: 'Customer Tier', value: 'Enterprise ($120k ARR Platinum SLA)' },
      { label: 'AI Resolution Draft', value: 'Refund draft & itemized discrepancy auto-generated' },
    ],
    timeline: [
      { step: 'Zendesk Ingest Webhook', detail: 'Captured incoming ticket #448102 from customer portal', time: '0.00s' },
      { step: 'Gemini 1.5 Flash Intent Model', detail: 'Classified intent: "Billing Dispute" with -0.85 negative sentiment', time: '0.22s' },
      { step: 'SLA Escalation Policy Check', detail: 'Rule: Enterprise Tier && Negative Sentiment -> Escalate Priority', time: '0.45s' },
      { step: 'Zendesk Tagging & AI Draft', detail: 'Attached #billing_escalation, assigned to Senior Triage, auto-drafted response', time: '0.80s' },
    ],
    rawPayload: {
      status: 200,
      timestamp: "2026-09-05T05:25:01.120Z",
      workflow_id: "wf_zendesk_triage_v1",
      data: {
        ticket_id: "zd_448102",
        customer_email: "sarah.chen@enterprise.io",
        account_tier: "Enterprise_Platinum",
        arr_value: 120000,
        classified_intent: "billing_dispute",
        urgency: "HIGH",
        sentiment_score: -0.85,
        resolution_draft_prepared: true,
        sla_target_minutes: 30,
        assigned_group: "Tier 2 Billing Escalations"
      }
    }
  },
  { 
    id: 'run-3', 
    name: 'Nightly Database Backup', 
    status: 'Failed', 
    time: '1 hr ago', 
    duration: '45.0s',
    httpStatus: '504 Timeout',
    httpStatusCode: 504,
    recordId: 'snap_prod_db_0904',
    stat1: { label: 'Cluster Volume', value: '1.42 TB' },
    stat2: { label: 'Error Cause', value: 'I/O Lock Timeout', highlight: true },
    stat3: { label: 'Remediation', value: 'Failover Engaged' },
    contextFields: [
      { label: 'Target Database', value: 'us-east-1-prod-postgres-main' },
      { label: 'Failure Reason', value: 'AWS RDS Snapshot storage lock exceeded 45.0s SLA' },
      { label: 'Automatic Recovery', value: 'PagerDuty incident #PD-9921 fired & read-replica backup scheduled' },
    ],
    timeline: [
      { step: 'Cron Backup Trigger', detail: 'Initiated 03:00 UTC nightly snapshot window', time: '0.00s' },
      { step: 'RDS Snapshot Storage Lock', detail: 'Requested point-in-time snapshot on Aurora Primary', time: '2.10s' },
      { step: 'Block Storage Sync', detail: 'Streaming dirty write buffers to S3 Glacier Vault', time: '21.40s' },
      { step: 'Gateway SLA Timeout', detail: '504 Timeout: RDS snapshot I/O freeze exceeded 45.0s limit', time: '45.00s', status: 'failed' },
    ],
    rawPayload: {
      status: 504,
      error: "GATEWAY_TIMEOUT",
      timestamp: "2026-09-05T04:30:45.002Z",
      workflow_id: "wf_nightly_db_backup",
      data: {
        snapshot_id: "snap_prod_db_0904",
        cluster: "us-east-1-prod-postgres-main",
        volume_size_bytes: 1420000000000,
        error_details: "AWS RDS Snapshot storage buffer lock exceeded SLA threshold (45.0s)",
        remediation: {
          pagerduty_alert_dispatched: true,
          incident_id: "PD-9921",
          failover_cluster: "us-east-1-prod-postgres-replica-01",
          next_retry_at: "04:00 UTC"
        }
      }
    }
  },
  { 
    id: 'run-4', 
    name: 'New Employee Onboarding', 
    status: 'Success', 
    time: '3 hrs ago', 
    duration: '2.4s',
    httpStatus: '200 OK',
    httpStatusCode: 200,
    recordId: 'emp_91823',
    stat1: { label: 'Employee', value: 'Marcus Vance' },
    stat2: { label: 'Accounts Created', value: '6 of 6 Active', highlight: true },
    stat3: { label: 'Hardware Track', value: 'FedEx Active' },
    contextFields: [
      { label: 'Role & Department', value: 'Staff Data Engineer (Core Platform)' },
      { label: 'Access Provisioned', value: 'Google Workspace, Okta, GitHub (Data-Team), 1Password, Jira' },
      { label: 'Hardware Dispatch', value: 'Apple MacBook Pro 16" M3 Max (FedEx #7849102941)' },
    ],
    timeline: [
      { step: 'HR System Ingest', detail: 'BambooHR employee signed agreement processed', time: '0.00s' },
      { step: 'Okta Identity Provisioning', detail: 'Created marcus.v@nexaflow.internal with enforced FIDO2 MFA', time: '0.70s' },
      { step: 'Access & Role Grants', detail: 'Granted repo access to github.com/nexaflow/core-platform', time: '1.55s' },
      { step: 'Slack Welcome & Packet', detail: 'Invited to #welcome-marcus and sent onboarding roadmap', time: '2.40s' },
    ],
    rawPayload: {
      status: 200,
      timestamp: "2026-09-05T02:15:22.812Z",
      workflow_id: "wf_employee_onboarding_v2",
      data: {
        employee_id: "emp_91823",
        name: "Marcus Vance",
        email: "marcus.v@nexaflow.internal",
        department: "Core Platform Engineering",
        role: "Staff Data Engineer",
        services_provisioned: [
          "Google Workspace",
          "Okta Directory",
          "GitHub Org (Data Platform)",
          "1Password Vault",
          "Jira & Confluence",
          "Slack Enterprise Grid"
        ],
        hardware_shipment: {
          asset: "MacBook Pro 16-inch M3 Max",
          carrier: "FedEx",
          tracking_number: "7849102941",
          status: "IN_TRANSIT"
        }
      }
    }
  },
];

const roiDataAll = [
  { month: 'Jan', sales: 120, support: 80, engineering: 45 },
  { month: 'Feb', sales: 140, support: 95, engineering: 55 },
  { month: 'Mar', sales: 180, support: 110, engineering: 70 },
  { month: 'Apr', sales: 210, support: 140, engineering: 85 },
  { month: 'May', sales: 250, support: 165, engineering: 110 },
  { month: 'Jun', sales: 310, support: 190, engineering: 135 },
];

const roiData30d = [
  { month: 'Week 1', sales: 30, support: 20, engineering: 10 },
  { month: 'Week 2', sales: 40, support: 25, engineering: 15 },
  { month: 'Week 3', sales: 60, support: 30, engineering: 20 },
  { month: 'Week 4', sales: 80, support: 45, engineering: 35 },
];

const roiData7d = [
  { month: 'Mon', sales: 5, support: 3, engineering: 2 },
  { month: 'Tue', sales: 8, support: 4, engineering: 3 },
  { month: 'Wed', sales: 12, support: 6, engineering: 5 },
  { month: 'Thu', sales: 15, support: 8, engineering: 7 },
  { month: 'Fri', sales: 20, support: 12, engineering: 9 },
  { month: 'Sat', sales: 10, support: 5, engineering: 4 },
  { month: 'Sun', sales: 8, support: 4, engineering: 2 },
];

const aiMetricsData = [
  { metric: 'Extraction', score: 98, avg: 80 },
  { metric: 'Routing', score: 95, avg: 75 },
  { metric: 'Resolution', score: 88, avg: 70 },
  { metric: 'Sentiment', score: 92, avg: 75 },
  { metric: 'Handoffs', score: 96, avg: 65 },
];

const resourceUsage = [
  { name: 'Monthly Task Executions', used: 13.6, limit: 50, unit: 'K Runs (Scale Tier)', color: 'bg-emerald-600', icon: Zap },
  { name: 'OpenAI GPT-4o & Gemini Pro', used: 8.2, limit: 50, unit: 'M Tokens', color: 'bg-blue-600', icon: Cpu },
  { name: 'Connected API & Webhook Calls', used: 45, limit: 250, unit: 'K Calls', color: 'bg-indigo-600', icon: Database },
  { name: 'Serverless MicroVM Compute', used: 380, limit: 500, unit: 'GB-s', color: 'bg-purple-600', icon: Server },
];

export default function YourSpacePage() {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState<'runDetails' | 'logs' | 'quotas' | 'feedOptions' | 'upgrade' | null>(null);
  const [selectedRun, setSelectedRun] = useState<(typeof recentRuns)[0] | null>(null);
  const [showRawPayload, setShowRawPayload] = useState(false);
  const [feedStatusFilter, setFeedStatusFilter] = useState<'All' | 'Success' | 'Failed'>('All');
  const [feedAutoRefresh, setFeedAutoRefresh] = useState<'5s' | '15s' | '30s' | 'Off'>('15s');
  const [feedAlertsEnabled, setFeedAlertsEnabled] = useState(true);

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');
  
  const currentExecutionData = timeRange === '7d' ? executionData7d : timeRange === '30d' ? executionData30d : executionDataAllTime;
  const currentRoiData = timeRange === '7d' ? roiData7d : timeRange === '30d' ? roiData30d : roiDataAll;

  // Background scroll lock when any floating drawer/modal is open
  useScrollLock(activePanel !== null);

  const openRunDetails = (run: typeof recentRuns[0]) => {
    setSelectedRun(run);
    setShowRawPayload(false);
    setActivePanel('runDetails');
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-6 py-10 md:py-12 min-h-[60vh] relative">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-lg text-slate-600 mb-3">
              Welcome back, PRINCE. Here is how your autonomous workflows are performing.
            </p>

            {/* Paid Scale Plan Subscription Badge */}
            <div className="inline-flex flex-wrap items-center gap-2.5 p-1.5 px-3 rounded-full bg-slate-100/90 border border-slate-200/80 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-900 text-white font-bold text-[11px] shadow-2xs">
                <Sparkles className="w-3 h-3 text-blue-200" />
                Scale Plan • Paid Annually
              </span>
              <span className="text-slate-600 font-medium">
                $1,428/yr paid • Renews {CURRENT_USER_SUBSCRIPTION.renewsAt} • 50k runs/mo
              </span>
              <button
                onClick={() => setActivePanel('quotas')}
                className="font-semibold text-blue-900 hover:text-blue-950 underline cursor-pointer"
              >
                Invoices & Quotas
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setActivePanel('quotas')}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-50 border border-emerald-200/80 text-emerald-900 hover:bg-emerald-100/80 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Scale Subscribed
            </button>
            <button 
              onClick={() => setActivePanel('logs')}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              Logs
            </button>
            <button 
              onClick={() => navigate('/builder')}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-900 text-white hover:bg-blue-950 transition-colors shadow-sm flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              New Workflow
            </button>
          </div>
        </motion.div>

        {/* Top KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {[
            { label: 'Total Executions', value: '13,600', trend: '+12.5%', icon: <Zap className="w-5 h-5 text-blue-700" />, color: 'bg-blue-100 border-blue-200' },
            { label: 'Success Rate', value: '99.9%', trend: '+0.1%', icon: <CheckCircle2 className="w-5 h-5 text-emerald-700" />, color: 'bg-emerald-100 border-emerald-200' },
            { label: 'Hours Saved', value: '342h', trend: '+24h', icon: <Clock className="w-5 h-5 text-purple-700" />, color: 'bg-purple-100 border-purple-200' },
            { label: 'Active Workflows', value: '24', trend: 'Stable', icon: <TrendingUp className="w-5 h-5 text-blue-700" />, color: 'bg-blue-100 border-blue-200' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: LUXURY_EASE }}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Main Area Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: LUXURY_EASE }}
            className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Workflow Executions</h3>
                <p className="text-sm text-slate-500">Total automated runs over the {timeRange === '7d' ? 'last 7 days' : timeRange === '30d' ? 'last 30 days' : 'all time'}</p>
              </div>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | 'all')}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="all">All time</option>
              </select>
            </div>
            
            <div className="w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentExecutionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRuns" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#1e3a8a', fontWeight: 600 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="runs" 
                    stroke="#1e3a8a" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRuns)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: LUXURY_EASE }}
            className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col"
          >
            <div className="mb-2">
              <h3 className="text-lg font-bold text-slate-900">Task Distribution</h3>
              <p className="text-sm text-slate-500">By workflow volume</p>
            </div>
            
            <div className="flex-1 w-full flex items-center justify-center min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    itemStyle={{ fontWeight: 600 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-4">
              {distributionData.map(item => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium text-slate-600 truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Row 2: Value Realization & AI Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Stacked Bar Chart for ROI */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: LUXURY_EASE }}
            className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Value Realization</h3>
                <p className="text-sm text-slate-500">Hours saved by department over time</p>
              </div>
              <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">
                +42% YoY
              </div>
            </div>
            
            <div className="w-full h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentRoiData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="sales" name="Sales" stackId="a" fill="#1e3a8a" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="support" name="Support" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="engineering" name="Engineering" stackId="a" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Radar Chart for AI Metrics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: LUXURY_EASE }}
            className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col"
          >
            <div className="mb-2">
              <h3 className="text-lg font-bold text-slate-900">Agent Autonomy Score</h3>
              <p className="text-sm text-slate-500">Platform performance vs. industry baseline</p>
            </div>
            
            <div className="flex-1 w-full flex items-center justify-center min-h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={aiMetricsData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Your Agents" dataKey="score" stroke="#1e3a8a" strokeWidth={2} fill="#1e3a8a" fillOpacity={0.2} />
                  <Radar name="Industry Avg" dataKey="avg" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" fill="transparent" />
                  <Legend iconType="plainline" wrapperStyle={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>

        {/* System Health & Active Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: LUXURY_EASE }}
          className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm mb-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">System Health & Notifications</h3>
              <p className="text-sm text-slate-500">Real-time alerts from your automated infrastructure</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-4">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">API Throttling Warning</h4>
                <p className="text-xs text-slate-600 mt-1">Zendesk API limits are approaching 80% utilization for the hour.</p>
                <span className="text-[10px] text-slate-400 mt-2 block">12 mins ago</span>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-4">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Auto-Scaling Activated</h4>
                <p className="text-xs text-slate-600 mt-1">Spun up 3 additional compute nodes to handle incoming webhook spike.</p>
                <span className="text-[10px] text-slate-400 mt-2 block">45 mins ago</span>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-start gap-4">
              <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Model Updated</h4>
                <p className="text-xs text-slate-600 mt-1">Gemini 1.5 Pro inference engine successfully updated to latest patch.</p>
                <span className="text-[10px] text-slate-400 mt-2 block">2 hours ago</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Row 3: Infrastructure & Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Resource Limits (Visual Progress Bars) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: LUXURY_EASE }}
            className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col h-full"
          >
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Resource Utilization</h3>
              <p className="text-sm text-slate-500">Current billing cycle usage</p>
            </div>

            <div className="space-y-6 flex-1">
              {resourceUsage.map((resource) => (
                <div key={resource.name} className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                        <resource.icon className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sm text-slate-900">{resource.name}</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      <strong className="text-slate-900">{resource.used}</strong> / {resource.limit} {resource.unit}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200/60">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(resource.used / resource.limit) * 100}%` }}
                      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full ${resource.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-5 border-t border-slate-100">
              <button 
                onClick={() => setActivePanel('quotas')}
                className="text-sm font-semibold text-blue-900 flex items-center gap-1.5 group"
              >
                Manage API quotas 
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: LUXURY_EASE }}
            className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full"
          >
            <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">Recent Workflow Runs</h3>
                  {feedStatusFilter !== 'All' && (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 border border-blue-200 font-semibold">
                      Filtered: {feedStatusFilter}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500">Live feed of your autonomous agent activity</p>
              </div>
              <button 
                onClick={() => setActivePanel('feedOptions')}
                className="text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                title="Feed and Stream Options"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            <div className="divide-y divide-slate-100 flex-1 overflow-auto hover-group">
              {recentRuns
                .filter(run => feedStatusFilter === 'All' || run.status === feedStatusFilter)
                .map((run) => (
                <div key={run.id} className="hover-item p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border shrink-0 ${
                      run.status === 'Success' 
                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                        : 'bg-red-50 border-red-100 text-red-600'
                    }`}>
                      <PlayCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{run.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-500">{run.time}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-xs text-slate-500">Duration: {run.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                      run.status === 'Success' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {run.status}
                    </span>
                    <button 
                      onClick={() => openRunDetails(run)}
                      className="text-sm font-medium text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>

      {/* Floating Side Panel for Details/Logs */}
      <AnimatePresence>
        {activePanel && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePanel(null)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[100]"
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="w-full max-w-2xl bg-white shadow-2xl border border-slate-200 rounded-2xl flex flex-col overflow-hidden max-h-[90vh] pointer-events-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                    {activePanel === 'runDetails' ? <Activity className="w-5 h-5" /> : 
                     activePanel === 'logs' ? <Terminal className="w-5 h-5" /> : 
                     activePanel === 'quotas' ? <Database className="w-5 h-5" /> :
                     activePanel === 'feedOptions' ? <Sliders className="w-5 h-5" /> :
                     <Sparkles className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      {activePanel === 'runDetails' ? 'Execution Trace' : 
                       activePanel === 'logs' ? 'System Logs' : 
                       activePanel === 'quotas' ? 'API Quota Management' :
                       activePanel === 'feedOptions' ? 'Feed & Stream Controls' :
                       'Enterprise Capacity Upgrade'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {activePanel === 'runDetails' && selectedRun ? `Trace details for ${selectedRun.name}` : 
                       activePanel === 'logs' ? 'Real-time server output' : 
                       activePanel === 'quotas' ? 'Manage and monitor your billing limits' :
                       activePanel === 'feedOptions' ? 'Configure real-time stream filters, polling, and alert policies' :
                       'Scale autonomous execution bandwidth and concurrent AI agents'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setActivePanel(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body Content based on active panel */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                
                {activePanel === 'runDetails' && selectedRun && (
                  <div className="space-y-6">
                    {/* Status Banner */}
                    <div className={`p-4 rounded-xl border ${
                      selectedRun.status === 'Success' 
                        ? 'bg-emerald-50 border-emerald-100' 
                        : 'bg-red-50 border-red-100'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {selectedRun.status === 'Success' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <X className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`font-semibold text-sm ${
                          selectedRun.status === 'Success' ? 'text-emerald-800' : 'text-red-800'
                        }`}>
                          Run {selectedRun.status}
                        </span>
                      </div>
                      <p className={`text-xs ${selectedRun.status === 'Success' ? 'text-emerald-600' : 'text-red-600'}`}>
                        Execution took {selectedRun.duration} • Triggered {selectedRun.time}
                      </p>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[19px] before:w-px before:bg-slate-200">
                      {selectedRun.timeline.map((evt, i) => (
                        <div key={i} className="relative flex gap-4">
                          <div className={`w-10 h-10 rounded-full bg-white border shadow-sm flex items-center justify-center shrink-0 z-10 ${
                            evt.status === 'failed' ? 'border-red-300 text-red-600' : 'border-slate-200 text-slate-500'
                          }`}>
                            <span className="text-xs font-bold">{i + 1}</span>
                          </div>
                          <div className="pt-2">
                            <h4 className="text-sm font-semibold text-slate-900">{evt.step}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">{evt.detail}</p>
                            <span className="text-[10px] font-medium text-slate-400 mt-1 inline-block">{evt.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Execution Output */}
                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <FileJson className="w-4 h-4 text-slate-500" /> Execution Results
                        </h4>
                        <button
                          onClick={() => setShowRawPayload(!showRawPayload)}
                          className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                        >
                          {showRawPayload ? 'Show Clean Summary' : 'View Raw JSON'}
                        </button>
                      </div>

                      {!showRawPayload ? (
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 divide-y divide-slate-100 shadow-sm">
                          {/* Top Row: HTTP Status & Record ID */}
                          <div className="grid grid-cols-2 gap-3 pb-3">
                            <div>
                              <span className="text-xs text-slate-500 block">HTTP Status</span>
                              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded border mt-1 ${
                                selectedRun.httpStatusCode === 200 
                                  ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                                  : 'text-red-700 bg-red-50 border-red-200'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  selectedRun.httpStatusCode === 200 ? 'bg-emerald-500' : 'bg-red-500'
                                }`}></span> 
                                {selectedRun.httpStatus}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs text-slate-500 block">Record ID</span>
                              <span className="text-xs font-semibold text-slate-800 font-mono mt-1 inline-block select-all">
                                {selectedRun.recordId}
                              </span>
                            </div>
                          </div>

                          {/* Middle Row: Relevant Metric Stats */}
                          <div className="grid grid-cols-3 gap-3 py-3">
                            <div>
                              <span className="text-xs text-slate-500 block">{selectedRun.stat1.label}</span>
                              <span className="text-xs font-semibold text-slate-800 mt-1 inline-block">
                                {selectedRun.stat1.value}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs text-slate-500 block">{selectedRun.stat2.label}</span>
                              <span className={`text-xs font-semibold mt-1 inline-block ${
                                selectedRun.stat2.highlight 
                                  ? (selectedRun.status === 'Success' ? 'text-emerald-600' : 'text-red-600') 
                                  : 'text-slate-800'
                              }`}>
                                {selectedRun.stat2.value}
                              </span>
                            </div>
                            <div>
                              <span className="text-xs text-slate-500 block">{selectedRun.stat3.label}</span>
                              <span className="text-xs font-semibold text-slate-800 mt-1 inline-block">
                                {selectedRun.stat3.value}
                              </span>
                            </div>
                          </div>

                          {/* Bottom Row: Context Attributes */}
                          {selectedRun.contextFields && selectedRun.contextFields.length > 0 && (
                            <div className="pt-3 space-y-2">
                              {selectedRun.contextFields.map((ctx, idx) => (
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
                            {JSON.stringify(selectedRun.rawPayload, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activePanel === 'logs' && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-5 min-h-[400px] border border-slate-200 font-mono text-[11px] leading-loose text-slate-800 shadow-2xs overflow-auto no-scrollbar">
                      <div className="text-blue-700 mb-4 font-semibold">Initializing stream... connected to production cluster.</div>
                      <div className="mb-2"><span className="text-slate-500">[14:02:45]</span> <span className="text-emerald-700 font-bold">INFO</span> Request handled by worker_44a</div>
                      <div className="mb-2"><span className="text-slate-500">[14:02:47]</span> <span className="text-amber-700 font-bold">WARN</span> API rate limit approaching (85%)</div>
                      <div className="mb-2"><span className="text-slate-500">[14:03:12]</span> <span className="text-emerald-700 font-bold">INFO</span> Batch job #9201 completed successfully</div>
                      <div className="mb-2"><span className="text-slate-500">[14:04:05]</span> <span className="text-emerald-700 font-bold">INFO</span> Webhook received from github.com</div>
                      <div className="mt-8 flex items-center gap-2 text-slate-600 font-medium">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Awaiting new events...
                      </div>
                    </div>
                  </div>
                )}

                {activePanel === 'quotas' && (
                  <div className="space-y-6">
                    {/* Active Subscription Summary Card */}
                    <div className="bg-gradient-to-b from-blue-50/70 to-white rounded-2xl border-2 border-blue-900/20 p-6 shadow-sm">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 pb-4 border-b border-slate-200/80">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                            <Sparkles className="w-6 h-6 text-blue-200" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-lg font-bold text-slate-900">Scale Plan (Annual)</h4>
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                Active Paid
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                              $1,428.00 / annum ($119/mo effective) • Renews {CURRENT_USER_SUBSCRIPTION.renewsAt}
                            </p>
                          </div>
                        </div>

                        <button 
                          onClick={() => setActivePanel('upgrade')}
                          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer hover:scale-[1.02]"
                        >
                          Enterprise Options
                        </button>
                      </div>

                      {/* Payment Method & Renewal Details */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
                        <div className="bg-white/80 p-3 rounded-xl border border-slate-200/80">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Billing Cycle</span>
                          <span className="font-bold text-slate-900">Annual (Per Annum)</span>
                        </div>
                        <div className="bg-white/80 p-3 rounded-xl border border-slate-200/80">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Payment Method</span>
                          <span className="font-bold text-slate-900">Mastercard •••• 4242</span>
                        </div>
                        <div className="bg-white/80 p-3 rounded-xl border border-slate-200/80">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Monthly Task Cap</span>
                          <span className="font-bold text-slate-900">50,000 runs/mo</span>
                        </div>
                        <div className="bg-white/80 p-3 rounded-xl border border-slate-200/80">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">SLA Guarantee</span>
                          <span className="font-bold text-emerald-700">24/7 Dedicated SLA</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Real-Time Entitlements & Metric Consumptions */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 text-sm">Scale Plan Resource Entitlements</h4>
                        <span className="text-xs text-slate-500">27.2% cycle utilized</span>
                      </div>
                      
                      {resourceUsage.map((resource) => (
                        <div key={resource.name} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-sm text-slate-900">{resource.name}</span>
                            <span className="text-xs text-slate-500 font-medium">
                              <strong className="text-slate-900">{resource.used}</strong> / {resource.limit} {resource.unit}
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full ${resource.color}`} 
                              style={{ width: `${(resource.used / resource.limit) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Paid Tax Invoices */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">Paid Invoices & Receipts</h4>
                          <p className="text-xs text-slate-500">Annual Scale plan invoices and VAT tax compliance records</p>
                        </div>
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          All Paid (Current)
                        </span>
                      </div>

                      <div className="space-y-2 pt-2">
                        {CURRENT_USER_SUBSCRIPTION.invoices.map((inv) => (
                          <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/70 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-white border border-slate-200 text-blue-900">
                                <FileJson className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-xs font-bold text-slate-900 block">{inv.id} • {inv.amount}</span>
                                <span className="text-[11px] text-slate-500">{inv.plan} ({inv.period})</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                                {inv.status}
                              </span>
                              <button
                                onClick={() => {
                                  toast.success('Invoice Downloaded', {
                                    description: `Saved ${inv.pdfName} to downloads.`
                                  });
                                }}
                                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs cursor-pointer hover:scale-[1.02]"
                              >
                                <Download className="w-3 h-3 text-blue-900" />
                                PDF
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* FEED OPTIONS PANEL */}
                {activePanel === 'feedOptions' && (
                  <div className="space-y-6">
                    {/* Filter by Status */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Filter className="w-3.5 h-3.5 text-blue-900" /> Filter Execution Stream
                        </label>
                        <span className="text-xs text-slate-500">Live filter</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {(['All', 'Success', 'Failed'] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => setFeedStatusFilter(status)}
                            className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border ${
                              feedStatusFilter === status
                                ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Auto-Refresh Cadence */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue-900" /> Auto-Refresh Interval
                        </label>
                        <span className="text-xs text-slate-500">WebSocket / SSE sync</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {(['5s', '15s', '30s', 'Off'] as const).map((interval) => (
                          <button
                            key={interval}
                            onClick={() => setFeedAutoRefresh(interval)}
                            className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all border ${
                              feedAutoRefresh === interval
                                ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {interval}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notification Dispatch */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                          <Bell className="w-4 h-4 text-blue-900" /> SLA Failure Alerts
                        </span>
                        <p className="text-xs text-slate-500">Trigger instantaneous Slack & webhook dispatch on run error</p>
                      </div>
                      <button
                        onClick={() => setFeedAlertsEnabled(!feedAlertsEnabled)}
                        className={`w-11 h-6 rounded-full transition-colors relative ${
                          feedAlertsEnabled ? 'bg-blue-900' : 'bg-slate-200'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                          feedAlertsEnabled ? 'left-6' : 'left-1'
                        }`} />
                      </button>
                    </div>

                    {/* Export Actions */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Export Run History</span>
                        <span className="text-[11px] text-slate-500">Download formatted telemetry and execution traces</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toast.success('JSON exported', { description: 'audit-runs-telemetry.json downloaded.' })}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1 shadow-2xs"
                        >
                          <Download className="w-3.5 h-3.5" /> JSON
                        </button>
                        <button
                          onClick={() => toast.success('CSV exported', { description: 'audit-runs-telemetry.csv downloaded.' })}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1 shadow-2xs"
                        >
                          <Download className="w-3.5 h-3.5" /> CSV
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* UPGRADE / TIER MANAGEMENT MODAL */}
                {activePanel === 'upgrade' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Current Tier: Scale Plan (Annual) */}
                      <div className="bg-gradient-to-b from-blue-50/50 via-white to-white p-5 rounded-2xl border-2 border-blue-900 shadow-sm space-y-3 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">Your Active Plan</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Paid Annually
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900">Scale Plan</h4>
                        <div className="text-2xl font-bold text-slate-900">$119 <span className="text-xs font-normal text-slate-500">/mo ($1,428/yr paid)</span></div>
                        <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                          <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> 50,000 monthly task executions</li>
                          <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Unlimited autonomous AI workflows</li>
                          <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> Unlimited 180+ Enterprise connectors</li>
                          <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> 90-day telemetry retention & traces</li>
                          <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-600" /> 24/7 Priority SLA support</li>
                        </ul>
                        <div className="pt-2">
                          <button
                            onClick={() => {
                              toast.info('Scale Subscription Active', {
                                description: `Your Scale Plan is paid through ${CURRENT_USER_SUBSCRIPTION.renewsAt}. Billed to Mastercard ending in 4242.`
                              });
                            }}
                            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Current Plan Details
                          </button>
                        </div>
                      </div>

                      {/* Enterprise Sovereign Dedicated Tier */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 relative overflow-hidden">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Custom Enterprise Cluster</span>
                        <h4 className="text-xl font-bold text-slate-900">Dedicated Sovereign Cloud</h4>
                        <div className="text-2xl font-bold text-blue-900">Custom <span className="text-xs font-normal text-slate-500">/ SLA contract</span></div>
                        <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                          <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-700" /> 500,000+ monthly task executions</li>
                          <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-700" /> Hardware-isolated microVM execution cluster</li>
                          <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-700" /> Dedicated AWS/GCP VPC peering & on-premise proxy</li>
                          <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-700" /> HIPAA BAA & custom SOC-2 Type II attestation</li>
                          <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-blue-700" /> 1-year telemetry & immutable audit retention</li>
                        </ul>
                        <button
                          onClick={() => {
                            toast.success('Enterprise Consultation Requested', { 
                              description: 'Your dedicated enterprise architect has been assigned and will reach out to itzmeshr0001@gmail.com.' 
                            });
                            setActivePanel(null);
                          }}
                          className="w-full mt-3 py-2.5 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-950 transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02]"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Request Dedicated Cluster
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
              
              {/* Footer */}
              <div className="p-4 border-t border-slate-100 bg-white flex justify-end shrink-0">
                <button 
                  onClick={() => setActivePanel(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
