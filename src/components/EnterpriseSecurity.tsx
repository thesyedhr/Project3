import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Server, 
  KeyRound, 
  FileCheck2, 
  Activity, 
  CheckCircle,
  Eye,
  Cpu,
  ArrowUpRight
} from 'lucide-react';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

const COMPLIANCE_ITEMS = [
  { name: 'SOC 2 Type II', status: 'Certified', desc: 'Annual rigorous third-party auditor security review' },
  { name: 'ISO / IEC 27001', status: 'Certified', desc: 'Standardized global information security governance' },
  { name: 'GDPR & CCPA', status: 'Compliant', desc: 'Strict data sovereignty, privacy controls & zero-retention mode' },
  { name: 'HIPAA Readiness', status: 'Available', desc: 'Business Associate Agreements (BAA) for healthcare workflows' },
];

export default function EnterpriseSecurity({ onOpenAuth }: { onOpenAuth?: () => void }) {
  const [activeTab, setActiveTab] = useState<'audit' | 'encryption' | 'rbac'>('audit');

  return (
    <section id="security" className="w-full py-24 md:py-32 px-6 relative bg-slate-50/75 border-y border-slate-200/80">
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
            <ShieldCheck className="w-3.5 h-3.5 text-blue-800" />
            <span>Bank-Grade Security Architecture</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05, ease: LUXURY_EASE }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4 md:mb-5"
          >
            Engineered for uncompromising enterprise trust
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
            className="text-slate-600 text-base md:text-lg leading-relaxed"
          >
            Protect your sensitive business data with zero-trust encryption, rigorous compliance certifications, and 99.99% high-availability infrastructure.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12 hover-group">
          
          {/* Bento Card 1: Live 99.99% SLA & High Availability (Span 2 on md) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            className="md:col-span-2 p-6 sm:p-8 glass-panel flex flex-col justify-between hover-item cursor-default"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xs">
                  <Activity className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60 text-slate-900 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span>All 18 Global Regions Operational</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                99.99% Financially-Backed SLA
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-xl mb-6">
                Multi-region fault-tolerant failovers with sub-millisecond automated health rerouting, ensuring critical automated pipelines run without interruption.
              </p>
            </div>

            {/* Live Infrastructure Metrics Panel */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center sm:text-left">
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium block">Avg. Ingress Ping</span>
                <span className="text-base font-bold text-slate-900">12ms</span>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium block">Execution Uptime</span>
                <span className="text-base font-bold text-slate-900">99.995%</span>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-500 font-medium block">Event Processing</span>
                <span className="text-base font-bold text-slate-900">2.4B/day</span>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Zero-Trust Encryption */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: LUXURY_EASE }}
            className="p-6 sm:p-8 glass-panel flex flex-col justify-between hover-item cursor-default"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white mb-6 shadow-xs">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">AES-256 Cryptography</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Full end-to-end payload encryption at rest (AES-256) and in flight (TLS 1.3) with automated key rotation.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-100 text-xs text-slate-600 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-slate-600 shrink-0" />
              <span>Dedicated customer KMS encryption keys supported</span>
            </div>
          </motion.div>

          {/* Bento Card 3: Interactive Governance & SSO / SAML 2.0 (Span 3 on md) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.12, ease: LUXURY_EASE }}
            className="md:col-span-3 p-6 sm:p-8 glass-panel hover-item cursor-default"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white mb-4 shadow-xs">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="text-[25px] font-bold text-slate-900 mb-3 leading-tight">
                  Enterprise Governance & Access Controls
                </h3>
                <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
                  Maintain complete organizational control with centralized SSO via Okta, Microsoft Azure AD, Google Workspace, and fine-grained team permission tiers.
                </p>

                {/* Tab selector */}
                <div className="flex gap-2">
                  {[
                    { id: 'audit', label: 'Audit Trail' },
                    { id: 'encryption', label: 'Zero-Retention', className: 'w-[133px]' },
                    { id: 'rbac', label: 'Custom RBAC' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`h-[30px] px-3.5 rounded-full text-[14px] font-semibold transition-all cursor-pointer flex items-center justify-center ${tab.className || ''} ${
                        activeTab === tab.id
                          ? 'bg-blue-900 text-white hover:bg-blue-950 shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Governance & Audit Inspector */}
              <div className="lg:col-span-7 bg-slate-50/80 rounded-2xl p-5 sm:p-6 text-slate-900 border border-slate-200/90 shadow-xs relative">
                
                {/* Header bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 mb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-900 shadow-[0_0_8px_rgba(29,78,216,0.6)]"></span>
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Live SIEM Compliance Stream</span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 font-mono bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/60">TLS 1.3 / mTLS Verified</span>
                </div>

                {/* Fluid animated height container with buttery smooth height transitions */}
                <motion.div 
                  layout
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="relative overflow-hidden"
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                      {activeTab === 'audit' && (
                        <motion.div 
                          key="audit"
                          initial={{ opacity: 0, y: 6 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18, ease: "easeInOut" }}
                          className="space-y-3 pb-1 w-full"
                        >
                          <div className="p-4 sm:p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start sm:items-center justify-between gap-4">
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex items-center gap-2.5">
                                <span className="px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-900 font-semibold text-xs tracking-wide font-mono">AUDIT_LOG</span>
                                <span className="text-slate-500 text-xs sm:text-sm font-medium">14:22:01 UTC</span>
                              </div>
                              <p className="text-slate-900 font-bold text-sm sm:text-[15px] leading-snug">Trigger updated on Production Pipeline <span className="text-slate-600 font-semibold">#8491</span></p>
                              <p className="text-xs sm:text-sm text-blue-900">Actor: <span className="text-slate-900 font-semibold">admin@enterprise.com</span> (IP: 198.51.100.42)</p>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shrink-0">
                              <CheckCircle className="w-3.5 h-3.5 text-blue-800" /> Logged
                            </span>
                          </div>

                          <div className="p-4 sm:p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start sm:items-center justify-between gap-4">
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex items-center gap-2.5">
                                <span className="px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-900 font-semibold text-xs tracking-wide font-mono">SSO_AUTH</span>
                                <span className="text-slate-500 text-xs sm:text-sm font-medium">14:22:15 UTC</span>
                              </div>
                              <p className="text-slate-900 font-bold text-sm sm:text-[15px] leading-snug">SAML 2.0 Auth assertion verified via Okta IDP</p>
                              <p className="text-xs sm:text-sm text-blue-900">FIDO2 Hardware WebAuthn MFA confirmed</p>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shrink-0">
                              <CheckCircle className="w-3.5 h-3.5 text-blue-800" /> Passed
                            </span>
                          </div>

                          <div className="p-4 sm:p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-start sm:items-center justify-between gap-4">
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex items-center gap-2.5">
                                <span className="px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-900 font-semibold text-xs tracking-wide font-mono">KEY_ROTATION</span>
                                <span className="text-slate-500 text-xs sm:text-sm font-medium">14:23:02 UTC</span>
                              </div>
                              <p className="text-slate-900 font-bold text-sm sm:text-[15px] leading-snug">Automated customer KMS token rotation succeeded</p>
                              <p className="text-xs sm:text-sm text-blue-900">Zero downtime re-encryption pass completed</p>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shrink-0">
                              <CheckCircle className="w-3.5 h-3.5 text-blue-800" /> Rotated
                            </span>
                          </div>
                        </motion.div>
                      )}

                      {/* Zero-Retention Tab */}
                      {activeTab === 'encryption' && (
                        <motion.div 
                          key="encryption"
                          initial={{ opacity: 0, y: 6 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18, ease: "easeInOut" }}
                          className="space-y-3 pb-1 w-full"
                        >
                          <div className="p-4 sm:p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                            <div className="flex items-center justify-between gap-3">
                              <span className="font-bold text-slate-900 text-base sm:text-[16px]">Volatile RAM Decryption</span>
                              <span className="text-slate-900 text-xs sm:text-[13px] font-bold bg-slate-100 border border-slate-200 px-3 py-1 rounded-md tracking-wider shrink-0">ACTIVE</span>
                            </div>
                            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">Payloads are decrypted exclusively in isolated, secure memory enclaves and never written to disk.</p>
                          </div>

                          <div className="p-4 sm:p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                            <div className="flex items-center justify-between gap-3">
                              <span className="font-bold text-slate-900 text-base sm:text-[16px]">Zero Disk Persistence Policy</span>
                              <span className="text-slate-900 text-xs sm:text-[13px] font-bold bg-slate-100 border border-slate-200 px-3 py-1 rounded-md tracking-wider shrink-0">ENFORCED</span>
                            </div>
                            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">Execution states, variables, and outputs are purged at 0ms latency immediately upon webhook completion.</p>
                          </div>

                          <div className="p-4 sm:p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                            <div className="flex items-center justify-between gap-3">
                              <span className="font-bold text-slate-900 text-base sm:text-[16px]">Cryptographic Data Shredding</span>
                              <span className="text-slate-900 text-xs sm:text-[13px] font-bold bg-slate-100 border border-slate-200 px-3 py-1 rounded-md tracking-wider shrink-0">NIST SP 800-88</span>
                            </div>
                            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">Ephemeral keys are zeroized from memory using certified hardware cryptographic erasure.</p>
                          </div>
                        </motion.div>
                      )}

                      {/* Custom RBAC Tab */}
                      {activeTab === 'rbac' && (
                        <motion.div 
                          key="rbac"
                          initial={{ opacity: 0, y: 6 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18, ease: "easeInOut" }}
                          className="space-y-3 pb-1 w-full"
                        >
                          <div className="p-4 sm:p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-slate-900 text-base sm:text-[16px]">Role Tier: <span className="font-bold text-blue-900">Engineering Manager</span></span>
                              <span className="text-slate-600 text-xs sm:text-sm font-semibold shrink-0">14 Members Assigned</span>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-1">
                              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-900 text-xs sm:text-[13px] font-mono font-semibold">pipelines:write</span>
                              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-900 text-xs sm:text-[13px] font-mono font-semibold">deploy:staging</span>
                              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-900 text-xs sm:text-[13px] font-mono font-semibold">keys:read_masked</span>
                              <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-900 text-xs sm:text-[13px] font-mono font-semibold">audit:export</span>
                            </div>
                          </div>

                          <div className="p-4 sm:p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between gap-4">
                            <div className="min-w-0">
                              <span className="font-bold text-slate-900 text-base sm:text-[16px] block">SCIM 2.0 Auto-Provisioning</span>
                              <span className="text-slate-600 text-sm sm:text-[15px] leading-relaxed block mt-0.5">Automated de-provisioning on team offboarding</span>
                            </div>
                            <span className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shrink-0">
                              <CheckCircle className="w-3.5 h-3.5 text-blue-800" /> Synced
                            </span>
                          </div>

                          <div className="p-4 sm:p-4.5 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between gap-4">
                            <div className="min-w-0">
                              <span className="font-bold text-slate-900 text-base sm:text-[16px] block">IP CIDR Allowlisting</span>
                              <span className="text-slate-600 text-sm sm:text-[15px] leading-relaxed block mt-0.5">Enforce corporate VPN range restrictions</span>
                            </div>
                            <span className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold shrink-0">
                              Enabled
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </motion.div>

              </div>

            </div>
          </motion.div>

        </div>

        {/* Compliance Badges Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto hover-group">
          {COMPLIANCE_ITEMS.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: LUXURY_EASE }}
              className="p-5 glass-panel flex flex-col justify-between hover-item cursor-default"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-slate-900">{item.name}</span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-900 bg-blue-50/80 px-2 py-0.5 rounded-full border border-blue-100/80">
                  <CheckCircle className="w-3 h-3 text-blue-800" />
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
