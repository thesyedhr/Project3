import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  ShieldCheck, FileText, Download, CheckCircle2, Award, 
  ExternalLink, Clock, RefreshCw, Lock, Search, Eye
} from 'lucide-react';

type Certification = {
  id: string;
  name: string;
  authority: string;
  validThrough: string;
  status: 'Certified' | 'Continuous Audit' | 'Annual Renewal';
  scope: string;
  badgeColor: string;
  reportRef: string;
  controlsPassing: number;
  totalControls: number;
};

const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-soc2',
    name: 'AICPA SOC 2 Type II',
    authority: 'PricewaterhouseCoopers LLP',
    validThrough: 'December 2026',
    status: 'Certified',
    scope: 'Security, Availability, Confidentiality, and Processing Integrity of NexaFlow Cloud MicroVMs and Workflow Orchestration.',
    badgeColor: 'bg-blue-50 text-blue-900 border-blue-200',
    reportRef: 'SOC2-TYPE-II-2026-NEXAFLOW-FINAL.pdf',
    controlsPassing: 128,
    totalControls: 128
  },
  {
    id: 'cert-iso27001',
    name: 'ISO/IEC 27001:2022',
    authority: 'BSI Assurance UK',
    validThrough: 'October 2027',
    status: 'Certified',
    scope: 'Information Security Management System (ISMS) governing infrastructure, developer access, and automated AI reasoning pipelines.',
    badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    reportRef: 'BSI-ISMS-ISO27001-CERT-884192.pdf',
    controlsPassing: 93,
    totalControls: 93
  },
  {
    id: 'cert-hipaa',
    name: 'HIPAA & HITECH Security Rule',
    authority: 'Coalfire Systems Inc.',
    validThrough: 'Continuous Monitoring',
    status: 'Continuous Audit',
    scope: 'Protection of electronic Protected Health Information (ePHI) with automated zero-knowledge PII masking & BAA execution.',
    badgeColor: 'bg-blue-50 text-blue-900 border-blue-200',
    reportRef: 'HIPAA-SECURITY-ATTESTATION-2026.pdf',
    controlsPassing: 64,
    totalControls: 64
  },
  {
    id: 'cert-pci',
    name: 'PCI-DSS v4.0 Level 1 Service Provider',
    authority: 'Trustwave QSA',
    validThrough: 'November 2026',
    status: 'Certified',
    scope: 'Tokenized ingest and processing of credit card numbers, payment dispute payloads, and FIPS 140-3 HSM key storage.',
    badgeColor: 'bg-purple-50 text-purple-900 border-purple-200',
    reportRef: 'PCI-DSS-V4-AOC-LEVEL1.pdf',
    controlsPassing: 312,
    totalControls: 312
  },
  {
    id: 'cert-gdpr',
    name: 'EU GDPR & UK Data Protection Act',
    authority: 'Bird & Bird Privacy Audit',
    validThrough: 'Annual Attestation',
    status: 'Certified',
    scope: 'Article 28 Data Processing Agreements (DPA), Standard Contractual Clauses (SCCs), and sovereign Frankfurt/Dublin data centers.',
    badgeColor: 'bg-slate-50 text-slate-900 border-slate-200',
    reportRef: 'GDPR-ARTICLE-28-DPA-COMPLIANCE.pdf',
    controlsPassing: 48,
    totalControls: 48
  },
  {
    id: 'cert-csa',
    name: 'CSA STAR Level 2 Attestation',
    authority: 'Cloud Security Alliance',
    validThrough: 'August 2027',
    status: 'Certified',
    scope: 'Cloud Controls Matrix (CCM v4.0) comprehensive evaluation of virtualization security, cryptographic lifecycle, and threat response.',
    badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
    reportRef: 'CSA-STAR-LEVEL2-REGISTRY-REPORT.pdf',
    controlsPassing: 197,
    totalControls: 197
  }
];

export default function SecurityCertificationsVault() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const handleDownload = (cert: Certification) => {
    toast.success('Auditor Package Downloaded', {
      description: `Encrypted executive summary for ${cert.name} generated.`
    });
  };

  const handleRequestNDA = () => {
    toast.success('NDA Auditor Pack Requested', {
      description: 'Your enterprise compliance contact will receive the full unredacted SOC 2 Type II and ISO 27001 packages within 15 minutes.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-900 px-2.5 py-1 rounded-full font-bold border border-blue-200">
              Enterprise Trust & Compliance
            </span>
            <span className="text-xs text-slate-400">• Continuous Automated Audits</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Compliance Vault & Certified Attestations
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            NexaFlow undergoes continuous third-party evaluations by accredited AICPA, BSI, and Coalfire QSAs. All controls are tested daily against live production telemetry.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="px-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <span className="text-xs text-slate-500 block">Controls Health</span>
            <span className="text-lg font-bold text-emerald-600 font-mono">842 / 842 (100%)</span>
          </div>
          <button
            onClick={handleRequestNDA}
            className="px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" />
            <span>Request Full NDA Auditor Pack</span>
          </button>
        </div>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CERTIFICATIONS.map((cert) => (
          <div
            key={cert.id}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all hover:scale-[1.01]"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${cert.badgeColor}`}>
                  {cert.status}
                </span>
                <span className="text-[11px] font-mono text-slate-400">Valid: {cert.validThrough}</span>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-1">{cert.name}</h4>
              <p className="text-xs font-semibold text-slate-600 mb-2">Auditor: {cert.authority}</p>
              
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                {cert.scope}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Passing Automated Controls:</span>
                <span className="font-mono font-bold text-emerald-600">
                  {cert.controlsPassing}/{cert.totalControls}
                </span>
              </div>

              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-full" />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="text-xs font-semibold text-blue-900 hover:text-blue-950 flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" /> View Scope Details
                </button>
                <button
                  onClick={() => handleDownload(cert)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Download Auditor Letter"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scope Details Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{selectedCert.name}</h3>
                    <p className="text-xs text-slate-500">Certified by {selectedCert.authority}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedCert(null)} className="p-1.5 text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block mb-1">Attestation Scope:</span>
                  <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                    {selectedCert.scope}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Audit Period</span>
                    <span className="font-bold text-slate-900">Annual Type II (365 days)</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Exceptions Noted</span>
                    <span className="font-bold text-emerald-600">0 Exceptions (Clean Opinion)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDownload(selectedCert);
                    setSelectedCert(null);
                  }}
                  className="px-4 py-2 bg-blue-900 text-white text-xs font-semibold rounded-xl hover:bg-blue-950 flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Download Executive Summary
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
