import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  ShieldCheck, 
  Key, 
  Lock, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Plus, 
  Users, 
  Globe, 
  Eye, 
  ExternalLink,
  Shield,
  Layers,
  Clock,
  Terminal,
  Server,
  Database,
  X,
  ChevronDown
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import { useScrollLock } from '../utils/useScrollLock';
import SecurityArchitectureDiagrams from '../components/security/SecurityArchitectureDiagrams';
import SecurityDlpEngine from '../components/security/SecurityDlpEngine';
import SecurityThreatRadar from '../components/security/SecurityThreatRadar';
import SecurityVulnerabilityMatrix from '../components/security/SecurityVulnerabilityMatrix';
import SecurityCertificationsVault from '../components/security/SecurityCertificationsVault';
import SecurityIncidentPlaybook from '../components/security/SecurityIncidentPlaybook';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

type AuditEvent = {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  resource: string;
  ipAddress: string;
  location: string;
  status: 'Success' | 'Blocked' | 'Warning';
  riskLevel: 'Low' | 'Medium' | 'High';
  details: Record<string, any>;
};

const INITIAL_AUDIT_LOGS: AuditEvent[] = [
  {
    id: 'evt_99812a',
    timestamp: '2 mins ago (14:32:10 UTC)',
    actor: 'sarah.chen@enterprise.io',
    actorRole: 'Workflow Author',
    action: 'workflow.publish',
    resource: 'wf_lead_enrichment_v3',
    ipAddress: '198.51.100.42',
    location: 'San Francisco, US',
    status: 'Success',
    riskLevel: 'Low',
    details: {
      commit_hash: 'c8f102a9',
      environment: 'Production',
      nodes_modified: 4,
      approved_by: 'Automated CI Policy Check'
    }
  },
  {
    id: 'evt_99811b',
    timestamp: '18 mins ago (14:16:04 UTC)',
    actor: 'service-account-stripe-sync',
    actorRole: 'Machine API Principal',
    action: 'secret.access',
    resource: 'sec_stripe_restricted_key',
    ipAddress: '54.210.12.88',
    location: 'AWS us-east-1',
    status: 'Success',
    riskLevel: 'Low',
    details: {
      scope_requested: 'disputes.read, charges.read',
      token_ttl_seconds: 900,
      kms_cloudhsm_verified: true
    }
  },
  {
    id: 'evt_99810c',
    timestamp: '42 mins ago (13:52:19 UTC)',
    actor: '185.220.101.5',
    actorRole: 'Anonymous Ingress',
    action: 'auth.attempt_unauthorized',
    resource: '/api/v1/internal/workflows',
    ipAddress: '185.220.101.5',
    location: 'Frankfurt, DE (Tor Exit Node)',
    status: 'Blocked',
    riskLevel: 'High',
    details: {
      blocked_reason: 'Untrusted IP range not in CIDR allowlist; missing Bearer JWT',
      waf_rule_id: 'WAF_RULE_GEO_TOR_BLOCK'
    }
  },
  {
    id: 'evt_99809d',
    timestamp: '1 hr ago (13:30:00 UTC)',
    actor: 'kms-rotator-daemon',
    actorRole: 'Security Automation',
    action: 'encryption.key_scheduled_rotation',
    resource: 'kms_arn_aws_vault_prod_master',
    ipAddress: '10.0.4.12 (VPC Private)',
    location: 'Internal VPC',
    status: 'Success',
    riskLevel: 'Low',
    details: {
      algorithm: 'AES-256-GCM',
      previous_key_id: 'kms_k9921',
      new_key_id: 'kms_k9922',
      zero_downtime_reencrypt: true
    }
  },
  {
    id: 'evt_99808e',
    timestamp: '3 hrs ago (11:15:44 UTC)',
    actor: 'marcus.v@nexaflow.internal',
    actorRole: 'Security Admin',
    action: 'policy.ip_allowlist_updated',
    resource: 'perimeter.inbound_webhooks',
    ipAddress: '136.24.88.19',
    location: 'Austin, US',
    status: 'Success',
    riskLevel: 'Medium',
    details: {
      cidr_added: '52.88.102.0/24 (Salesforce Webhook Ingress)',
      two_person_rule_approved: true
    }
  },
];

type IpRule = {
  id: string;
  label: string;
  cidr: string;
  type: 'Inbound Webhook' | 'Outbound Worker' | 'Admin Console';
  status: 'Active';
  addedBy: string;
};

const INITIAL_IP_RULES: IpRule[] = [
  { id: 'ip-1', label: 'Salesforce US Inbound Webhooks', cidr: '13.110.6.0/24', type: 'Inbound Webhook', status: 'Active', addedBy: 'Admin' },
  { id: 'ip-2', label: 'Zendesk Production Webhook Pool', cidr: '192.161.144.0/20', type: 'Inbound Webhook', status: 'Active', addedBy: 'Admin' },
  { id: 'ip-3', label: 'Stripe Webhook Gateway Delivery', cidr: '54.187.174.169/32', type: 'Inbound Webhook', status: 'Active', addedBy: 'System' },
  { id: 'ip-4', label: 'Enterprise HQ VPN Gateway', cidr: '198.51.100.0/24', type: 'Admin Console', status: 'Active', addedBy: 'Security Lead' },
];

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState<'posture' | 'threats' | 'dlp' | 'audit' | 'vuln' | 'perimeter' | 'compliance' | 'playbooks'>('posture');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);
  const [isKeyRotationModalOpen, setIsKeyRotationModalOpen] = useState(false);
  const [isAddIpModalOpen, setIsAddIpModalOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  // New IP form state
  const [newIpLabel, setNewIpLabel] = useState('');
  const [newIpCidr, setNewIpCidr] = useState('');
  const [newIpType, setNewIpType] = useState<IpRule['type']>('Inbound Webhook');
  const [ipRules, setIpRules] = useState<IpRule[]>(INITIAL_IP_RULES);

  // Toggles
  const [zeroDataRetention, setZeroDataRetention] = useState(true);
  const [enforceMfa, setEnforceMfa] = useState(true);
  const [ssoEnforced, setSsoEnforced] = useState(true);

  // Background scroll lock when modal or detail drawer is open
  useScrollLock(isKeyRotationModalOpen || isAddIpModalOpen || selectedEvent !== null);

  const filteredLogs = INITIAL_AUDIT_LOGS.filter(log => {
    const q = searchQuery.toLowerCase();
    return (
      log.actor.toLowerCase().includes(q) ||
      log.action.toLowerCase().includes(q) ||
      log.resource.toLowerCase().includes(q) ||
      log.ipAddress.toLowerCase().includes(q)
    );
  });

  const handleRotateKeys = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
      setIsKeyRotationModalOpen(false);
      toast.success('Envelope Encryption Key Rotated', {
        description: 'New master key generated via AWS CloudHSM KMS (AES-256-GCM). All secrets securely re-wrapped with zero downtime.'
      });
    }, 1800);
  };

  const handleAddIp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIpLabel || !newIpCidr) {
      toast.error('Please enter a description and valid CIDR.');
      return;
    }
    const newRule: IpRule = {
      id: `ip-${Date.now()}`,
      label: newIpLabel,
      cidr: newIpCidr,
      type: newIpType,
      status: 'Active',
      addedBy: 'Current User'
    };
    setIpRules([newRule, ...ipRules]);
    setNewIpLabel('');
    setNewIpCidr('');
    setIsAddIpModalOpen(false);
    toast.success('Trusted CIDR Range Added', {
      description: `Traffic from ${newIpCidr} is now allowed through perimeter firewalls.`
    });
  };

  const tabs = [
    { id: 'posture', label: 'Security Controls & RBAC', icon: ShieldCheck, hasPing: false, hasRoseDot: false },
    { id: 'threats', label: 'Threat Radar & SIEM', icon: AlertTriangle, hasPing: true, hasRoseDot: false },
    { id: 'dlp', label: 'DLP & PII Sanitizer', icon: Eye, hasPing: false, hasRoseDot: false },
    { id: 'audit', label: 'Immutable Audit Trail', icon: Database, hasPing: false, hasRoseDot: false },
    { id: 'vuln', label: 'Pen-Test & SBOM', icon: Shield, hasPing: false, hasRoseDot: false },
    { id: 'perimeter', label: 'Perimeter & IP Whitelists', icon: Globe, hasPing: false, hasRoseDot: false },
    { id: 'compliance', label: 'Compliance Vault', icon: FileText, hasPing: false, hasRoseDot: false },
    { id: 'playbooks', label: 'Incident Runbooks', icon: Layers, hasPing: false, hasRoseDot: true },
  ];

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-6 py-10 md:py-12 min-h-[70vh] relative">
        
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
          className="mb-10 text-center max-w-3xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-800 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Enterprise Security Posture: Grade A+ (SOC 2 Type II Certified)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3 text-center">
            Security & Compliance Center
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-center">
            Inspect immutable audit trails, rotate KMS envelope encryption keys, enforce role-based access control, and manage trusted perimeter CIDR ranges.
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setIsKeyRotationModalOpen(true)}
              className="px-4 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-2xs hover:scale-[1.02] cursor-pointer"
            >
              <Key className="w-3.5 h-3.5 text-blue-900" />
              <span>Rotate Encryption Keys</span>
            </button>
            <button
              onClick={() => {
                toast.success('Audit Log Export Initiated', {
                  description: 'Immutable security log snapshot downloaded in CSV format.'
                });
              }}
              className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs hover:scale-[1.02] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit Trail</span>
            </button>
          </div>
        </motion.div>

        {/* Security Quick Posture Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-500 block">Security Health Score</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">99.4 / 100</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Zero Critical Vulnerabilities
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center mb-3">
              <Key className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-500 block">Data Encryption Status</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">AES-256 GCM</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Next rotation in <span className="font-semibold text-slate-700">14 days</span>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center mb-3">
              <Lock className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-500 block">SSO & MFA Governance</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">Enforced</span>
            </div>
            <p className="text-[11px] text-blue-700 font-semibold mt-2">
              Okta SAML 2.0 + FIDO2
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 border border-purple-100 flex items-center justify-center mb-3">
              <Server className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-slate-500 block">Zero-Retention Mode</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-slate-900">Active</span>
            </div>
            <p className="text-[11px] text-purple-700 font-semibold mt-2">
              Prompts flushed post-execution
            </p>
          </div>
        </div>

        {/* Interactive Architecture & Threat Flow Diagrams */}
        <SecurityArchitectureDiagrams />

        {/* Main Content Layout - Accordion Sections */}
        <div className="flex flex-col gap-5 mt-12 w-full max-w-5xl mx-auto pb-20 relative">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isExpanded = activeTab === tab.id;

            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: LUXURY_EASE }}
                className={`border overflow-hidden transition-all duration-300 ${isExpanded ? 'bg-white rounded-3xl border-slate-200 shadow-sm' : 'bg-white/60 rounded-2xl border-slate-100 hover:border-slate-200 hover:bg-white cursor-pointer'}`}
              >
                <div
                  onClick={() => setActiveTab(isExpanded ? (null as any) : tab.id as any)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left select-none"
                >
                  <span className="flex items-center gap-4">
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isExpanded ? 'bg-blue-50 text-blue-700 border border-blue-100/50' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>
                       <Icon className="w-5 h-5" />
                    </span>
                    <span className={`text-sm sm:text-base font-bold transition-colors ${isExpanded ? 'text-slate-900' : 'text-slate-700'}`}>
                      {tab.label}
                    </span>
                    <span className="relative flex items-center h-full">
                      {(tab.hasPing || tab.hasRoseDot) && (
                        <span className="absolute ml-2.5 flex items-center justify-center">
                          <span className="absolute w-4 h-4 rounded-full bg-blue-500/30 blur-[2px] animate-pulse" />
                          <span className="relative w-1.5 h-1.5 rounded-full bg-[#1e3a8a]" />
                        </span>
                      )}
                    </span>
                  </span>
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: LUXURY_EASE }}
                    className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: LUXURY_EASE }}
                    >
                      <div className="p-5 sm:p-6 pt-0 border-t border-slate-50 mt-2">
                        
                        {/* TAB 1: POSTURE & RBAC CONTROLS */}
                        {tab.id === 'posture' && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              
                              {/* Security Policy Enforcements */}
                              <div className="p-6 rounded-3xl bg-slate-50/50 border border-slate-100 space-y-5">
                                <div>
                                  <h3 className="text-base font-bold text-slate-900">Security Governance Policies</h3>
                                  <p className="text-xs text-slate-500">Fine-tune organizational guardrails and credential lifecycles</p>
                                </div>

                                <div className="space-y-4 divide-y divide-slate-100">
                                  <div className="flex items-center justify-between pt-3">
                                    <div className="pr-4">
                                      <span className="text-sm font-semibold text-slate-900 block">Zero-Retention Mode for AI Prompts</span>
                                      <p className="text-xs text-slate-500 mt-0.5">Workflow execution variables & customer payloads are immediately purged from memory</p>
                                    </div>
                                    <button
                                      onClick={() => {
                                        setZeroDataRetention(!zeroDataRetention);
                                        toast.success(zeroDataRetention ? 'Zero-Retention Disabled' : 'Zero-Retention Mode Activated');
                                      }}
                                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                                        zeroDataRetention ? 'bg-blue-900' : 'bg-slate-200'
                                      }`}
                                    >
                                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                        zeroDataRetention ? 'translate-x-5' : 'translate-x-0'
                                      }`} />
                                    </button>
                                  </div>

                                  <div className="flex items-center justify-between pt-4">
                                    <div className="pr-4">
                                      <span className="text-sm font-semibold text-slate-900 block">Mandatory Hardware Security Keys (FIDO2)</span>
                                      <p className="text-xs text-slate-500 mt-0.5">Require YubiKey or WebAuthn biometrics for all admin & editor logins</p>
                                    </div>
                                    <button
                                      onClick={() => {
                                        setEnforceMfa(!enforceMfa);
                                        toast.success(enforceMfa ? 'FIDO2 MFA Optional' : 'Hardware MFA Enforced');
                                      }}
                                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                                        enforceMfa ? 'bg-blue-900' : 'bg-slate-200'
                                      }`}
                                    >
                                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                        enforceMfa ? 'translate-x-5' : 'translate-x-0'
                                      }`} />
                                    </button>
                                  </div>

                                  <div className="flex items-center justify-between pt-4">
                                    <div className="pr-4">
                                      <span className="text-sm font-semibold text-slate-900 block">Enterprise SAML 2.0 / Okta SSO Enforcement</span>
                                      <p className="text-xs text-slate-500 mt-0.5">Bypass password credentials entirely and route logins through your corporate IdP</p>
                                    </div>
                                    <button
                                      onClick={() => {
                                        setSsoEnforced(!ssoEnforced);
                                        toast.success(ssoEnforced ? 'SSO Enforcement Relaxed' : 'SAML 2.0 SSO Enforced');
                                      }}
                                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                                        ssoEnforced ? 'bg-blue-900' : 'bg-slate-200'
                                      }`}
                                    >
                                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                        ssoEnforced ? 'translate-x-5' : 'translate-x-0'
                                      }`} />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* RBAC Active Principals */}
                              <div className="p-6 rounded-3xl bg-slate-50/50 border border-slate-100 space-y-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h3 className="text-base font-bold text-slate-900">Role-Based Access Control (RBAC)</h3>
                                    <p className="text-xs text-slate-500">Active team members with delegated workspace authority</p>
                                  </div>
                                  <span className="text-xs font-semibold px-2.5 py-1 bg-white text-slate-700 rounded-md border border-slate-200">
                                    4 Active
                                  </span>
                                </div>

                                <div className="space-y-3 divide-y divide-slate-100">
                                  <div className="pt-2 flex items-center justify-between">
                                    <div>
                                      <span className="text-xs font-bold text-slate-900 block">sarah.chen@enterprise.io</span>
                                      <span className="text-[11px] text-slate-500">Joined via Okta Directory Sync • Last active 2m ago</span>
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-100">
                                      Workflow Author
                                    </span>
                                  </div>

                                  <div className="pt-3 flex items-center justify-between">
                                    <div>
                                      <span className="text-xs font-bold text-slate-900 block">alex.morrison@enterprise.io</span>
                                      <span className="text-[11px] text-slate-500">Security Team Lead • Last active 1h ago</span>
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-900 border border-purple-100">
                                      Super Admin
                                    </span>
                                  </div>

                                  <div className="pt-3 flex items-center justify-between">
                                    <div>
                                      <span className="text-xs font-bold text-slate-900 block">compliance-auditor@external.pwc.com</span>
                                      <span className="text-[11px] text-slate-500">Auditor Read-Only Lease (Expires Sep 30)</span>
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-100">
                                      Security Auditor
                                    </span>
                                  </div>

                                  <div className="pt-3 flex items-center justify-between">
                                    <div>
                                      <span className="text-xs font-bold text-slate-900 block">service-account-stripe-sync</span>
                                      <span className="text-[11px] text-slate-500">Machine API Principal • HMAC authenticated</span>
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                                      Service Account
                                    </span>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        )}

                        {/* TAB: THREAT RADAR & SIEM */}
                        {tab.id === 'threats' && (
                           <SecurityThreatRadar />
                        )}

                        {/* TAB: DLP & PII SANITIZER */}
                        {tab.id === 'dlp' && (
                           <SecurityDlpEngine />
                        )}

                        {/* TAB 2: AUDIT TRAIL */}
                        {tab.id === 'audit' && (
                          <div className="space-y-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div>
                                <h3 className="text-base font-bold text-slate-900">Immutable Audit Trail</h3>
                                <p className="text-xs text-slate-500">Append-only cryptographic event ledger recorded for SOC 2 Type II compliance</p>
                              </div>

                              <div className="relative w-full sm:w-64">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                  type="text"
                                  placeholder="Filter actor, action, IP..."
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>

                            <div className="overflow-x-auto bg-slate-50/50 rounded-2xl border border-slate-100 p-2">
                              <table className="w-full text-left text-sm">
                                <thead>
                                  <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <th className="pb-3 pl-3 pt-2">Timestamp & Event</th>
                                    <th className="pb-3 pt-2">Actor / Principal</th>
                                    <th className="pb-3 pt-2">Target Resource</th>
                                    <th className="pb-3 pt-2">IP Address</th>
                                    <th className="pb-3 pt-2">Outcome</th>
                                    <th className="pb-3 text-right pr-3 pt-2">Action</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 font-medium">
                                  {filteredLogs.map((evt) => (
                                    <tr key={evt.id} className="hover:bg-white transition-colors rounded-xl">
                                      <td className="py-3.5 pl-3">
                                        <div className="font-bold text-slate-900 text-xs">{evt.action}</div>
                                        <span className="text-[10px] text-slate-400">{evt.timestamp}</span>
                                      </td>
                                      <td className="py-3.5 text-xs">
                                        <span className="font-semibold text-slate-800 block truncate max-w-[180px]">{evt.actor}</span>
                                        <span className="text-[10px] text-slate-400">{evt.actorRole}</span>
                                      </td>
                                      <td className="py-3.5 font-mono text-[11px] text-slate-600">
                                        {evt.resource}
                                      </td>
                                      <td className="py-3.5 text-xs text-slate-600">
                                        <span className="font-mono text-[11px] block">{evt.ipAddress}</span>
                                        <span className="text-[10px] text-slate-400">{evt.location}</span>
                                      </td>
                                      <td className="py-3.5">
                                        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                                          evt.status === 'Success'
                                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                            : evt.status === 'Blocked'
                                            ? 'bg-red-50 text-red-800 border border-red-200'
                                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                                        }`}>
                                          <span className={`w-1.5 h-1.5 rounded-full ${
                                            evt.status === 'Success' ? 'bg-emerald-500' : 'bg-red-500'
                                          }`} />
                                          {evt.status}
                                        </span>
                                      </td>
                                      <td className="py-3.5 text-right pr-3">
                                        <button
                                          onClick={() => setSelectedEvent(evt)}
                                          className="px-2.5 py-1 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                                        >
                                          Details
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* TAB: PEN-TEST & SBOM */}
                        {tab.id === 'vuln' && (
                           <SecurityVulnerabilityMatrix />
                        )}

                        {/* TAB 3: PERIMETER & IP WHITELISTS */}
                        {tab.id === 'perimeter' && (
                          <div className="space-y-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div>
                                <h3 className="text-base font-bold text-slate-900">Perimeter Firewall & Trusted CIDRs</h3>
                                <p className="text-xs text-slate-500">Only authorized IP ranges are permitted to trigger webhooks or access the internal worker cluster</p>
                              </div>

                              <button
                                onClick={() => setIsAddIpModalOpen(true)}
                                className="px-3.5 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Trusted Range</span>
                              </button>
                            </div>

                            <div className="overflow-x-auto bg-slate-50/50 rounded-2xl border border-slate-100 p-2">
                              <table className="w-full text-left text-sm">
                                <thead>
                                  <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <th className="pb-3 pl-3 pt-2">Description / Service</th>
                                    <th className="pb-3 pt-2">CIDR Block</th>
                                    <th className="pb-3 pt-2">Traffic Type</th>
                                    <th className="pb-3 pt-2">Policy Status</th>
                                    <th className="pb-3 pt-2 text-right pr-3">Added By</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 font-medium">
                                  {ipRules.map((rule) => (
                                    <tr key={rule.id} className="hover:bg-white transition-colors">
                                      <td className="py-3.5 pl-3 font-bold text-slate-900 text-xs">{rule.label}</td>
                                      <td className="py-3.5 font-mono text-xs text-blue-900 font-semibold">{rule.cidr}</td>
                                      <td className="py-3.5 text-xs text-slate-600">{rule.type}</td>
                                      <td className="py-3.5">
                                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                          Enforced
                                        </span>
                                      </td>
                                      <td className="py-3.5 text-right pr-3 text-xs text-slate-400">{rule.addedBy}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* TAB 7: COMPLIANCE & CERTIFICATIONS VAULT */}
                        {tab.id === 'compliance' && (
                           <SecurityCertificationsVault />
                        )}

                        {/* TAB 8: INCIDENT PLAYBOOKS & RUNBOOKS */}
                        {tab.id === 'playbooks' && (
                           <SecurityIncidentPlaybook />
                        )}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FLOATING SECTION 1: KEY ROTATION MODAL (With Scroll Lock)                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isKeyRotationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isRotating && setIsKeyRotationModalOpen(false)}
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
                  <Key className="w-4 h-4 text-blue-900" />
                  <h3 className="text-base font-bold text-slate-900">Rotate Master Encryption Key</h3>
                </div>
                {!isRotating && (
                  <button onClick={() => setIsKeyRotationModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                    ✕
                  </button>
                )}
              </div>

              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  You are about to initiate an on-demand envelope key rotation via AWS CloudHSM KMS:
                </p>
                <ul className="text-xs text-slate-600 space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <li className="flex items-center gap-2 text-slate-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Generates a new AES-256-GCM hardware key
                  </li>
                  <li className="flex items-center gap-2 text-slate-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Zero downtime: existing encrypted payloads decrypted on-the-fly
                  </li>
                  <li className="flex items-center gap-2 text-slate-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Signed audit event written to immutable trail
                  </li>
                </ul>
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50/60 flex items-center justify-end gap-2.5">
                <button
                  disabled={isRotating}
                  onClick={() => setIsKeyRotationModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  disabled={isRotating}
                  onClick={handleRotateKeys}
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-blue-950 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
                  <span>{isRotating ? 'Rotating CloudHSM Key...' : 'Confirm Key Rotation'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FLOATING SECTION 2: ADD IP RANGE MODAL (With Scroll Lock)                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isAddIpModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddIpModalOpen(false)}
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
                  <Globe className="w-4 h-4 text-blue-900" />
                  <h3 className="text-base font-bold text-slate-900">Add Trusted Perimeter CIDR</h3>
                </div>
                <button onClick={() => setIsAddIpModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddIp} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Identifier</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Salesforce Webhook Ingress West"
                    value={newIpLabel}
                    onChange={(e) => setNewIpLabel(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CIDR Notation Range</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 52.88.102.0/24 or 192.0.2.1/32"
                    value={newIpCidr}
                    onChange={(e) => setNewIpCidr(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Traffic Category</label>
                  <select
                    value={newIpType}
                    onChange={(e) => setNewIpType(e.target.value as IpRule['type'])}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Inbound Webhook">Inbound Webhook</option>
                    <option value="Outbound Worker">Outbound Worker Egress</option>
                    <option value="Admin Console">Admin Console Access</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsAddIpModalOpen(false)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-blue-950 transition-colors"
                  >
                    Authorize IP Range
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FLOATING SECTION 3: AUDIT EVENT DETAIL MODAL (Centered with Scroll Lock)  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 z-10 flex flex-col max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-900">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{selectedEvent.action}</h3>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {selectedEvent.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">Verified cryptographic audit trail ledger entry</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
                {/* Event Summary Card */}
                <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 divide-y divide-slate-200/60 shadow-2xs space-y-3">
                  <div className="grid grid-cols-2 gap-3 pb-1">
                    <div>
                      <span className="text-slate-500 text-[11px] block">Timestamp</span>
                      <span className="font-semibold text-slate-900 text-xs mt-0.5 block">{selectedEvent.timestamp}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Execution Outcome</span>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded border mt-0.5 ${
                        selectedEvent.status === 'Success'
                          ? 'text-emerald-700 bg-emerald-50 border-emerald-200/80'
                          : selectedEvent.status === 'Blocked'
                          ? 'text-red-700 bg-red-50 border-red-200/80'
                          : 'text-amber-700 bg-amber-50 border-amber-200/80'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          selectedEvent.status === 'Success' ? 'bg-emerald-500' : 'bg-red-500'
                        }`} />
                        {selectedEvent.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <div>
                      <span className="text-slate-500 text-[11px] block">Actor & Principal</span>
                      <span className="font-semibold text-slate-900 text-xs mt-0.5 block truncate">{selectedEvent.actor}</span>
                      <span className="text-slate-400 text-[10px]">{selectedEvent.actorRole}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Target Resource</span>
                      <span className="font-mono text-blue-900 font-semibold text-xs mt-0.5 block truncate">
                        {selectedEvent.resource}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3">
                    <div>
                      <span className="text-slate-500 text-[11px] block">IP Address & Origin</span>
                      <span className="font-mono text-slate-800 text-xs mt-0.5 block">{selectedEvent.ipAddress}</span>
                      <span className="text-slate-400 text-[10px]">{selectedEvent.location}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Risk Classification</span>
                      <span className={`inline-flex items-center text-[11px] font-semibold mt-0.5 px-2 py-0.5 rounded ${
                        selectedEvent.riskLevel === 'High' 
                          ? 'text-red-700 bg-red-50 border border-red-200' 
                          : selectedEvent.riskLevel === 'Medium'
                          ? 'text-amber-700 bg-amber-50 border border-amber-200'
                          : 'text-slate-700 bg-slate-100 border border-slate-200'
                      }`}>
                        {selectedEvent.riskLevel} Risk Level
                      </span>
                    </div>
                  </div>
                </div>

                {/* Structured Verification Details (Clean Aesthetic, No Raw Code/Program) */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-900" /> Audit Verification Parameters
                  </h4>
                  <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 divide-y divide-slate-200/60 space-y-2.5">
                    {Object.entries(selectedEvent.details).map(([key, val]) => {
                      const formattedKey = key
                        .split('_')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                      const displayVal = typeof val === 'boolean' 
                        ? (val ? 'Verified / Active' : 'False') 
                        : String(val);

                      return (
                        <div key={key} className="pt-2.5 first:pt-0 flex items-center justify-between text-xs gap-3">
                          <span className="text-slate-500 font-medium">{formattedKey}</span>
                          <span className="font-semibold text-slate-800 text-right bg-white px-2.5 py-1 rounded-md border border-slate-200/80 shadow-2xs">
                            {displayVal}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50/60 flex items-center justify-end gap-2.5">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
