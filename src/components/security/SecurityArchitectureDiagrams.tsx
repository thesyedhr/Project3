import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Shield, Database, Server, Cpu, Lock, Key, 
  CheckCircle2, ArrowRight, ShieldAlert, Zap, Terminal, 
  Activity, Layers, Eye, RefreshCw, Radio, Network, FileCheck, ShieldCheck
} from 'lucide-react';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

type DiagramType = 'zero-trust' | 'threat-shield' | 'envelope-kms' | 'zk-sandbox' | 'vpc-isolation' | 'tokenization-dlp' | 'pqc-lattice';

export default function SecurityArchitectureDiagrams() {
  const [activeDiagram, setActiveDiagram] = useState<DiagramType>('zero-trust');
  const [selectedNode, setSelectedNode] = useState<string | null>('node-waf');

  return (
    <div className="mb-12 bg-white border border-slate-200 rounded-[32px] p-6 sm:p-10 shadow-sm overflow-hidden relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-900 px-2.5 py-1 rounded-full font-bold border border-blue-100">
              Interactive System Topology
            </span>
            <span className="text-xs font-mono text-slate-400">• Cryptographic Verifications</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Security Architecture & Defense Diagrams
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Click any node in the interactive schematics below to inspect operational protocols, cryptographic algorithms, and runtime invariants.
          </p>
        </div>
      </div>

      {/* Diagram Switcher Tabs - Single row, no awkward wrapping or orphan tabs */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl overflow-x-auto no-scrollbar mb-8">
        <button
          onClick={() => { setActiveDiagram('zero-trust'); setSelectedNode('node-waf'); }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
            activeDiagram === 'zero-trust'
              ? 'bg-white text-blue-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Zero-Trust Pipeline
        </button>
        <button
          onClick={() => { setActiveDiagram('threat-shield'); setSelectedNode('node-prompt-guard'); }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
            activeDiagram === 'threat-shield'
              ? 'bg-white text-blue-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          WAF & Threat Shield
        </button>
        <button
          onClick={() => { setActiveDiagram('envelope-kms'); setSelectedNode('node-root-kms'); }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
            activeDiagram === 'envelope-kms'
              ? 'bg-white text-blue-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Envelope KMS Hierarchy
        </button>
        <button
          onClick={() => { setActiveDiagram('zk-sandbox'); setSelectedNode('node-microvm'); }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
            activeDiagram === 'zk-sandbox'
              ? 'bg-white text-blue-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Confidential MicroVM
        </button>
        <button
          onClick={() => { setActiveDiagram('vpc-isolation'); setSelectedNode('node-vpc-peering'); }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
            activeDiagram === 'vpc-isolation'
              ? 'bg-white text-blue-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          VPC Peering & Isolation
        </button>
        <button
          onClick={() => { setActiveDiagram('tokenization-dlp'); setSelectedNode('node-hsm-vault'); }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
            activeDiagram === 'tokenization-dlp'
              ? 'bg-white text-blue-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          FIPS Tokenization Vault
        </button>
        <button
          onClick={() => { setActiveDiagram('pqc-lattice'); setSelectedNode('node-kyber'); }}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
            activeDiagram === 'pqc-lattice'
              ? 'bg-white text-blue-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Post-Quantum Mesh
        </button>
      </div>

      {/* DIAGRAM 1: ZERO TRUST PIPELINE */}
      {activeDiagram === 'zero-trust' && (
        <div>
          <div className="overflow-x-auto pb-4 no-scrollbar">
            <div className="min-w-[840px] p-6 bg-slate-50/70 rounded-3xl border border-slate-200 flex items-center justify-between gap-3">
              
              {/* Node 1: Client Edge */}
              <button
                onClick={() => setSelectedNode('node-client')}
                className={`flex-1 p-4 rounded-2xl border text-center transition-all cursor-pointer shadow-2xs ${
                  selectedNode === 'node-client'
                    ? 'bg-blue-50 text-blue-900 border-blue-200 ring-2 ring-blue-500/20'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-blue-200 hover:bg-slate-50/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-2.5 ${
                  selectedNode === 'node-client' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Edge Transport</h4>
                <p className={`text-[10px] mt-1 ${selectedNode === 'node-client' ? 'text-blue-700' : 'text-slate-500'}`}>
                  TLS 1.3 / HTTP/3
                </p>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full mt-2 inline-block border ${
                  selectedNode === 'node-client' ? 'bg-blue-100/50 text-blue-800 border-blue-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  mTLS Optional
                </span>
              </button>

              <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />

              {/* Node 2: Cloudflare WAF */}
              <button
                onClick={() => setSelectedNode('node-waf')}
                className={`flex-1 p-4 rounded-2xl border text-center transition-all cursor-pointer shadow-2xs ${
                  selectedNode === 'node-waf'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200 ring-2 ring-emerald-500/20'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-200 hover:bg-slate-50/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-2.5 ${
                  selectedNode === 'node-waf' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Cloudflare Magic WAF</h4>
                <p className={`text-[10px] mt-1 ${selectedNode === 'node-waf' ? 'text-emerald-700' : 'text-slate-500'}`}>
                  L3–L7 DDoS Scrubber
                </p>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full mt-2 inline-block border ${
                  selectedNode === 'node-waf' ? 'bg-emerald-100/50 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  192 Tbps Defended
                </span>
              </button>

              <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />

              {/* Node 3: Envoy Gateway */}
              <button
                onClick={() => setSelectedNode('node-gateway')}
                className={`flex-1 p-4 rounded-2xl border text-center transition-all cursor-pointer shadow-2xs ${
                  selectedNode === 'node-gateway'
                    ? 'bg-blue-50 text-blue-900 border-blue-200 ring-2 ring-blue-500/20'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-blue-200 hover:bg-slate-50/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-2.5 ${
                  selectedNode === 'node-gateway' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Server className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Envoy VPC Gateway</h4>
                <p className={`text-[10px] mt-1 ${selectedNode === 'node-gateway' ? 'text-blue-700' : 'text-slate-500'}`}>
                  SPIFFE / SPIRE Identity
                </p>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full mt-2 inline-block border ${
                  selectedNode === 'node-gateway' ? 'bg-blue-100/50 text-blue-800 border-blue-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  OAuth/JWT Auth
                </span>
              </button>

              <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />

              {/* Node 4: Isolated Worker Enclave */}
              <button
                onClick={() => setSelectedNode('node-worker')}
                className={`flex-1 p-4 rounded-2xl border text-center transition-all cursor-pointer shadow-2xs ${
                  selectedNode === 'node-worker'
                    ? 'bg-purple-50 text-purple-900 border-purple-200 ring-2 ring-purple-500/20'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-purple-200 hover:bg-slate-50/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-2.5 ${
                  selectedNode === 'node-worker' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Firecracker MicroVM</h4>
                <p className={`text-[10px] mt-1 ${selectedNode === 'node-worker' ? 'text-purple-700' : 'text-slate-500'}`}>
                  Seccomp / cgroups v2
                </p>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full mt-2 inline-block border ${
                  selectedNode === 'node-worker' ? 'bg-purple-100/50 text-purple-800 border-purple-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  Ephemeral &lt;5ms
                </span>
              </button>

              <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />

              {/* Node 5: Vault Cluster */}
              <button
                onClick={() => setSelectedNode('node-vault')}
                className={`flex-1 p-4 rounded-2xl border text-center transition-all cursor-pointer shadow-2xs ${
                  selectedNode === 'node-vault'
                    ? 'bg-amber-50 text-amber-900 border-amber-200 ring-2 ring-amber-500/20'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-amber-200 hover:bg-slate-50/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-2.5 ${
                  selectedNode === 'node-vault' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Database className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">FIPS 140-3 Vault</h4>
                <p className={`text-[10px] mt-1 ${selectedNode === 'node-vault' ? 'text-amber-700' : 'text-slate-500'}`}>
                  AES-256 GCM Envelope
                </p>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full mt-2 inline-block border ${
                  selectedNode === 'node-vault' ? 'bg-amber-100/50 text-amber-800 border-amber-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  Sharded Keys
                </span>
              </button>

            </div>
          </div>

          {/* Node Detail Inspector Box */}
          <div className="mt-5 p-5 bg-slate-50 rounded-2xl border border-slate-200">
            {selectedNode === 'node-client' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Ciphers & Protocols</span>
                  <p className="text-slate-600">TLS 1.3 only, enforcing ChaCha20-Poly1305 and AES-256-GCM. Legacy TLS 1.0/1.1 strictly rejected.</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Certificate Authority</span>
                  <p className="text-slate-600">ECDSA P-384 root certificates with automated 60-day rotation via Let's Encrypt / DigiCert.</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Mutual TLS (mTLS)</span>
                  <p className="text-slate-600">Enterprise customers can require client certificates for all webhook and API execution endpoints.</p>
                </div>
              </div>
            )}

            {selectedNode === 'node-waf' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block mb-1">DDoS Mitigation Engine</span>
                  <p className="text-slate-600">Anycast global network inspecting 192 Tbps of inbound traffic. Automatic SYN flood and UDP amplification suppression.</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Threat Intelligence Matrix</span>
                  <p className="text-slate-600">Real-time IP reputation tracking blocking Tor exit nodes, malicious VPNs, and residential botnets.</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Rate Limiting Token Buckets</span>
                  <p className="text-slate-600">Per-token leaky bucket algorithms capping unauthorized brute-force and credential stuffing attempts.</p>
                </div>
              </div>
            )}

            {selectedNode === 'node-gateway' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Identity & Tokens</span>
                  <p className="text-slate-600">Cryptographically verified Ed25519 JWT signatures. Internal microservices communicate via SPIFFE SVIDs.</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Traffic Isolation</span>
                  <p className="text-slate-600">Private VPC subnets with zero public internet route tables. AWS PrivateLink used for database connections.</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">RBAC Enforcer</span>
                  <p className="text-slate-600">Open Policy Agent (OPA) policy engine checking principal roles before invoking node endpoints.</p>
                </div>
              </div>
            )}

            {selectedNode === 'node-worker' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block mb-1">MicroVM Isolation</span>
                  <p className="text-slate-600">Each custom workflow script executes in an isolated AWS Firecracker jail with dedicated Linux namespaces.</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Seccomp System Call Filters</span>
                  <p className="text-slate-600">Over 320 dangerous syscalls blocked (e.g., ptrace, reboot, mount). Zero privilege escalation paths.</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">RAM-Only Execution</span>
                  <p className="text-slate-600">Worker memory is zeroized and destroyed upon pipeline completion. No residual state on host disk.</p>
                </div>
              </div>
            )}

            {selectedNode === 'node-vault' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Hardware Security Modules</span>
                  <p className="text-slate-600">AWS CloudHSM clusters evaluated to FIPS 140-3 Level 3 tamper-resistance standards.</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Envelope Cryptography</span>
                  <p className="text-slate-600">Every customer secret encrypted with an ephemeral Data Encryption Key (DEK) wrapped by the master HSM key.</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-1">Zero-Knowledge Key Storage</span>
                  <p className="text-slate-600">NexaFlow engineers have zero access to plaintext credentials or customer workflow parameters.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DIAGRAM 2: WAF & THREAT SHIELD */}
      {activeDiagram === 'threat-shield' && (
        <div>
          <div className="overflow-x-auto pb-4 no-scrollbar">
            <div className="min-w-[840px] p-6 bg-slate-50/70 rounded-3xl border border-slate-200 flex items-center justify-between gap-3 text-slate-800">
              
              {/* Step 1: Inbound Attack Vector */}
              <div className="flex-1 p-4 bg-white border border-rose-200 shadow-2xs rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 mx-auto flex items-center justify-center mb-2">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Hostile Ingress</h4>
                <p className="text-[10px] text-slate-500 mt-1">DDoS, SQLi, Prompt Injection</p>
                <span className="text-[9px] font-mono text-rose-800 mt-2 inline-block bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-semibold">
                  Untrusted Payloads
                </span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

              {/* Step 2: Layer 7 WAF Scrubber */}
              <div className="flex-1 p-4 bg-white border border-slate-200 shadow-2xs rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 mx-auto flex items-center justify-center mb-2">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Cloudflare WAF</h4>
                <p className="text-[10px] text-slate-500 mt-1">OWASP ModSecurity Core</p>
                <span className="text-[9px] font-mono text-emerald-800 mt-2 inline-block bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                  99.9% Scrubbed
                </span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

              {/* Step 3: LLM Prompt Injection Guard */}
              <div className="flex-1 p-4 bg-white border-2 border-blue-900 shadow-sm ring-2 ring-blue-900/10 rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-blue-900 text-white mx-auto flex items-center justify-center mb-2">
                  <Terminal className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-blue-950">Prompt Guard Engine</h4>
                <p className="text-[10px] text-slate-600 mt-1">Jailbreak / System Defiance</p>
                <span className="text-[9px] font-mono text-blue-900 mt-2 inline-block bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                  Semantic Filter
                </span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

              {/* Step 4: Automated IP Jail Isolation */}
              <div className="flex-1 p-4 bg-white border border-amber-200 shadow-2xs rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center mb-2">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Automated IP Jail</h4>
                <p className="text-[10px] text-slate-500 mt-1">24h Dynamic Quarantine</p>
                <span className="text-[9px] font-mono text-amber-800 mt-2 inline-block bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                  Tarpit & Drop
                </span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

              {/* Step 5: Clean Sanitized Stream */}
              <div className="flex-1 p-4 bg-white border border-emerald-200 shadow-2xs rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Sanitized Stream</h4>
                <p className="text-[10px] text-slate-500 mt-1">Verified Clean Input</p>
                <span className="text-[9px] font-mono text-emerald-800 mt-2 inline-block bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                  Safe Execution
                </span>
              </div>

            </div>
          </div>

          <div className="mt-4 p-4 bg-white text-slate-700 text-xs rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Real-Time Defense Active: <strong className="text-slate-900 font-bold">14,210</strong> threats neutralized in the last 24 hours across global edge nodes.</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Latency Overhead: &lt; 0.8ms</span>
          </div>
        </div>
      )}

      {/* DIAGRAM 3: ENVELOPE KMS HIERARCHY */}
      {activeDiagram === 'envelope-kms' && (
        <div>
          <div className="overflow-x-auto pb-4 no-scrollbar">
            <div className="min-w-[840px] p-6 bg-slate-50/70 rounded-3xl border border-slate-200 flex items-center justify-between gap-4">
              
              {/* Layer 1: Master Root Key */}
              <div className="flex-1 p-5 bg-white rounded-2xl border border-slate-200 text-center shadow-2xs">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-3">
                  <Key className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-xs">CloudHSM Master Root Key</h4>
                <p className="text-[10px] text-slate-500 mt-1">FIPS 140-3 Level 3 Hardware</p>
                <div className="mt-3 p-2 bg-slate-50 rounded-xl font-mono text-[10px] text-slate-700 border border-slate-200">
                  Never leaves HSM boundary
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[9px] font-bold text-blue-900 uppercase">Signs KEK</span>
                <ArrowRight className="w-4 h-4 text-slate-400 mt-1" />
              </div>

              {/* Layer 2: Key Encryption Key (KEK) */}
              <div className="flex-1 p-5 bg-white rounded-2xl border border-slate-200 text-center shadow-2xs">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-900 mx-auto flex items-center justify-center mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-xs">Key Encryption Key (KEK)</h4>
                <p className="text-[10px] text-slate-500 mt-1">Workspace-Isolated Secret</p>
                <div className="mt-3 p-2 bg-slate-50 rounded-xl font-mono text-[10px] text-slate-700 border border-slate-200">
                  Rotated every 30 days
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[9px] font-bold text-blue-900 uppercase">Wraps DEK</span>
                <ArrowRight className="w-4 h-4 text-slate-400 mt-1" />
              </div>

              {/* Layer 3: Data Encryption Key (DEK) */}
              <div className="flex-1 p-5 bg-white rounded-2xl border border-slate-200 text-center shadow-2xs">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 mx-auto flex items-center justify-center mb-3">
                  <Layers className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-xs">Data Encryption Key (DEK)</h4>
                <p className="text-[10px] text-slate-500 mt-1">Ephemeral Per-Field AES-GCM</p>
                <div className="mt-3 p-2 bg-slate-50 rounded-xl font-mono text-[10px] text-slate-700 border border-slate-200">
                  Unique per DB record
                </div>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[9px] font-bold text-emerald-800 uppercase">Encrypts Data</span>
                <ArrowRight className="w-4 h-4 text-slate-400 mt-1" />
              </div>

              {/* Layer 4: Sharded Storage */}
              <div className="flex-1 p-5 bg-white rounded-2xl border border-slate-200 text-center shadow-2xs">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center mb-3">
                  <Database className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-xs">Encrypted DB Shard</h4>
                <p className="text-[10px] text-slate-500 mt-1">Multi-Region PostgreSQL</p>
                <div className="mt-3 p-2 bg-slate-50 rounded-xl font-mono text-[10px] text-slate-700 border border-slate-200">
                  Ciphertext + Auth Tag
                </div>
              </div>

            </div>
          </div>

          <div className="mt-4 p-4 bg-white text-slate-700 text-xs rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs">
            <span className="font-medium">
              Zero-Exposure Cryptographic Standard: Compromise of the physical storage disk yields only cryptographically randomized AES-256 blocks without the HSM-isolated KEK.
            </span>
            <span className="font-bold text-[11px] text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 shrink-0">
              NIST FIPS 140-3
            </span>
          </div>
        </div>
      )}

      {/* DIAGRAM 4: CONFIDENTIAL MICROVM SANDBOX */}
      {activeDiagram === 'zk-sandbox' && (
        <div>
          <div className="overflow-x-auto pb-4 no-scrollbar">
            <div className="min-w-[840px] p-6 bg-slate-50/70 rounded-3xl border border-slate-200 flex items-center justify-between gap-4 text-slate-800">
              
              {/* Step 1: Inbound Execution Job */}
              <div className="flex-1 p-4 bg-white border border-slate-200 shadow-2xs rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 mx-auto flex items-center justify-center mb-2">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Workflow Trigger</h4>
                <p className="text-[10px] text-slate-500 mt-1">Webhook / API Call</p>
                <span className="text-[9px] font-mono text-slate-700 mt-2 inline-block bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  Raw Customer Payload
                </span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

              {/* Step 2: DLP Sanitizer */}
              <div className="flex-1 p-4 bg-white border border-slate-200 shadow-2xs rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 mx-auto flex items-center justify-center mb-2">
                  <Eye className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">DLP PII Stripper</h4>
                <p className="text-[10px] text-slate-500 mt-1">NER Regex / Heuristics</p>
                <span className="text-[9px] font-mono text-emerald-800 mt-2 inline-block bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                  PII Replaced w/ Tokens
                </span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

              {/* Step 3: AMD SEV-SNP Enclave */}
              <div className="flex-1 p-4 bg-white border-2 border-blue-900 shadow-sm ring-2 ring-blue-900/10 rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-blue-900 text-white mx-auto flex items-center justify-center mb-2">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-blue-950">AMD SEV-SNP Enclave</h4>
                <p className="text-[10px] text-slate-600 mt-1">Hardware RAM Encryption</p>
                <span className="text-[9px] font-mono text-blue-900 mt-2 inline-block bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                  Host OS Cannot Read
                </span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

              {/* Step 4: RAM Wipe & Destroy */}
              <div className="flex-1 p-4 bg-white border border-emerald-200 shadow-2xs rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center mb-2">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Cryptographic Teardown</h4>
                <p className="text-[10px] text-slate-500 mt-1">RAM Zeroize in &lt;1ms</p>
                <span className="text-[9px] font-mono text-emerald-800 mt-2 inline-block bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                  Zero Persistence
                </span>
              </div>

            </div>
          </div>

          <div className="mt-4 p-4 bg-white text-slate-700 text-xs rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs">
            <span>Confidential Computing Attestation: Cryptographic verification hash signed by AMD hardware PCR registers before workflow dispatch.</span>
            <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">Attestation: PASS (0x8F9B..2A)</span>
          </div>
        </div>
      )}

      {/* DIAGRAM 5: VPC PEERING & ENTERPRISE TENANT ISOLATION */}
      {activeDiagram === 'vpc-isolation' && (
        <div>
          <div className="overflow-x-auto pb-4 no-scrollbar">
            <div className="min-w-[860px] p-6 bg-slate-50/70 rounded-3xl border border-slate-200 flex items-center justify-between gap-3">
              {/* Customer VPC */}
              <button
                onClick={() => setSelectedNode('node-customer-vpc')}
                className={`flex-1 p-4 rounded-2xl border text-center transition-all cursor-pointer shadow-2xs ${
                  selectedNode === 'node-customer-vpc'
                    ? 'bg-blue-50 text-blue-900 border-blue-200 ring-2 ring-blue-500/20'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-blue-200 hover:bg-slate-50/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-2.5 ${
                  selectedNode === 'node-customer-vpc' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Network className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Customer Enterprise VPC</h4>
                <p className={`text-[10px] mt-1 ${selectedNode === 'node-customer-vpc' ? 'text-blue-700' : 'text-slate-500'}`}>
                  AWS / GCP PrivateLink
                </p>
                <span className={`text-[9px] font-mono mt-2 inline-block px-2 py-0.5 rounded border ${
                  selectedNode === 'node-customer-vpc' ? 'bg-blue-100/50 text-blue-800 border-blue-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  10.128.0.0/16
                </span>
              </button>

              <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />

              {/* PrivateLink Endpoint */}
              <button
                onClick={() => setSelectedNode('node-privatelink')}
                className={`flex-1 p-4 rounded-2xl border text-center transition-all cursor-pointer shadow-2xs ${
                  selectedNode === 'node-privatelink'
                    ? 'bg-blue-50 text-blue-900 border-blue-200 ring-2 ring-blue-500/20'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-blue-200 hover:bg-slate-50/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-2.5 ${
                  selectedNode === 'node-privatelink' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">PrivateLink Interface</h4>
                <p className={`text-[10px] mt-1 ${selectedNode === 'node-privatelink' ? 'text-blue-700' : 'text-slate-500'}`}>
                  No Public Internet Route
                </p>
                <span className={`text-[9px] font-mono mt-2 inline-block px-2 py-0.5 rounded border ${
                  selectedNode === 'node-privatelink' ? 'bg-blue-100/50 text-blue-800 border-blue-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  Zero Egress Gateway
                </span>
              </button>

              <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />

              {/* Envoy Service Mesh */}
              <button
                onClick={() => setSelectedNode('node-envoy-mesh')}
                className={`flex-1 p-4 rounded-2xl border text-center transition-all cursor-pointer shadow-2xs ${
                  selectedNode === 'node-envoy-mesh'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200 ring-2 ring-emerald-500/20'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-200 hover:bg-slate-50/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-2.5 ${
                  selectedNode === 'node-envoy-mesh' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Envoy mTLS 1.3 Mesh</h4>
                <p className={`text-[10px] mt-1 ${selectedNode === 'node-envoy-mesh' ? 'text-emerald-700' : 'text-slate-500'}`}>
                  SPIFFE / SPIRE Identity
                </p>
                <span className={`text-[9px] font-mono mt-2 inline-block px-2 py-0.5 rounded border ${
                  selectedNode === 'node-envoy-mesh' ? 'bg-emerald-100/50 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  ECDSA-P384 Handshake
                </span>
              </button>

              <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />

              {/* Isolated Tenant Postgres */}
              <button
                onClick={() => setSelectedNode('node-rls-db')}
                className={`flex-1 p-4 rounded-2xl border text-center transition-all cursor-pointer shadow-2xs ${
                  selectedNode === 'node-rls-db'
                    ? 'bg-purple-50 text-purple-900 border-purple-200 ring-2 ring-purple-500/20'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-purple-200 hover:bg-slate-50/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-2.5 ${
                  selectedNode === 'node-rls-db' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Database className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Isolated Tenant DB</h4>
                <p className={`text-[10px] mt-1 ${selectedNode === 'node-rls-db' ? 'text-purple-700' : 'text-slate-500'}`}>
                  Postgres Row-Level Security
                </p>
                <span className={`text-[9px] font-mono mt-2 inline-block px-2 py-0.5 rounded border ${
                  selectedNode === 'node-rls-db' ? 'bg-purple-100/50 text-purple-800 border-purple-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}>
                  AES-256 Per-Schema Key
                </span>
              </button>
            </div>
          </div>

          {/* Active Node Detail Card */}
          <div className="mt-4 p-5 bg-slate-50 text-slate-800 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold border border-emerald-200">
                  Tenant Boundary Check
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {selectedNode === 'node-customer-vpc' ? 'Customer Private Cloud Anchor' :
                   selectedNode === 'node-privatelink' ? 'AWS / GCP PrivateLink Tunnel' :
                   selectedNode === 'node-envoy-mesh' ? 'SPIFFE/SPIRE Microsegmentation' :
                   'PostgreSQL Row-Level Security & Encrypted Tablespaces'}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {selectedNode === 'node-customer-vpc' ? 'Workflows communicate with on-premises and enterprise cloud clusters through VPC peering, avoiding public internet routing entirely.' :
                 selectedNode === 'node-privatelink' ? 'Direct endpoint interfaces with zero internet gateway or public IP exposure, guaranteeing strictly unroutable internal traffic.' :
                 selectedNode === 'node-envoy-mesh' ? 'Every microservice authenticates via short-lived X.509 SVID certificates rotated automatically every 60 minutes.' :
                 'Tenant data resides in cryptographically isolated schemas enforced by kernel-level PostgreSQL RLS policies and tenant-specific AES-256 keys.'}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] font-mono text-emerald-800 block font-bold">Isolation Level: HARDWARE ENCLAVE</span>
              <span className="text-[10px] font-mono text-slate-500">Egress Filtering: STRICT DENY-ALL</span>
            </div>
          </div>
        </div>
      )}

      {/* DIAGRAM 6: FIPS 140-3 TOKENIZATION & DLP FLOW */}
      {activeDiagram === 'tokenization-dlp' && (
        <div>
          <div className="overflow-x-auto pb-4 no-scrollbar">
            <div className="min-w-[860px] p-6 bg-slate-50/70 text-slate-800 rounded-3xl border border-slate-200 flex items-center justify-between gap-3">
              {/* Step 1: Raw Webhook Inbound */}
              <div className="flex-1 p-4 bg-white border border-slate-200 shadow-2xs rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 mx-auto flex items-center justify-center mb-2">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Customer Payload</h4>
                <p className="text-[10px] text-slate-500 mt-1">Incoming Webhook / JSON</p>
                <span className="text-[9px] font-mono text-rose-800 mt-2 inline-block bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-semibold">
                  Contains SSN / Card
                </span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

              {/* Step 2: FIPS 140-3 HSM Vault */}
              <div className="flex-1 p-4 bg-white border-2 border-blue-900 shadow-sm ring-2 ring-blue-900/10 rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-blue-900 text-white mx-auto flex items-center justify-center mb-2">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-blue-950">FIPS 140-3 HSM Vault</h4>
                <p className="text-[10px] text-slate-600 mt-1">Hardware Cryptographic Core</p>
                <span className="text-[9px] font-mono text-blue-900 mt-2 inline-block bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                  HMAC-SHA256 Tokenizer
                </span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

              {/* Step 3: Sanitized LLM Inference */}
              <div className="flex-1 p-4 bg-white border border-slate-200 shadow-2xs rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 mx-auto flex items-center justify-center mb-2">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">AI Agent Inference</h4>
                <p className="text-[10px] text-slate-500 mt-1">Gemini 1.5 Pro / Flash</p>
                <span className="text-[9px] font-mono text-emerald-800 mt-2 inline-block bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                  Receives Surrogate Tokens
                </span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />

              {/* Step 4: Secure Detokenizer */}
              <div className="flex-1 p-4 bg-white border border-emerald-200 shadow-2xs rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center mb-2">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Secure Detokenizer</h4>
                <p className="text-[10px] text-slate-500 mt-1">Rehydrates Outbound API</p>
                <span className="text-[9px] font-mono text-emerald-800 mt-2 inline-block bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                  Zero LLM Retention
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-white text-slate-700 text-xs rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs">
            <span>FIPS 140-3 HSM Level 3 Verified: No customer plaintext credit cards or credentials ever enter LLM context windows.</span>
            <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">Attestation: FIPS-140-3 CERT #4192</span>
          </div>
        </div>
      )}

      {/* DIAGRAM 7: POST-QUANTUM LATTICE CRYPTOGRAPHY MESH */}
      {activeDiagram === 'pqc-lattice' && (
        <div>
          <div className="overflow-x-auto pb-4 no-scrollbar">
            <div className="min-w-[860px] p-6 bg-slate-50/70 rounded-3xl border border-slate-200 flex items-center justify-between gap-3 text-slate-800">
              {/* Node 1: Kyber-1024 */}
              <div className="flex-1 p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 mx-auto flex items-center justify-center mb-2">
                  <Key className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">ML-KEM (Kyber-1024)</h4>
                <p className="text-[10px] text-slate-500 mt-1">Lattice Key Encapsulation</p>
                <span className="text-[9px] font-mono text-blue-800 mt-2 inline-block bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                  NIST FIPS 203 Standard
                </span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />

              {/* Node 2: Dilithium Signatures */}
              <div className="flex-1 p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 mx-auto flex items-center justify-center mb-2">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">ML-DSA (Dilithium-5)</h4>
                <p className="text-[10px] text-slate-500 mt-1">Digital Signatures</p>
                <span className="text-[9px] font-mono text-blue-800 mt-2 inline-block bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                  NIST FIPS 204 Standard
                </span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />

              {/* Node 3: AES-256-GCM Session Key */}
              <div className="flex-1 p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-900 mx-auto flex items-center justify-center mb-2">
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Ephemeral AES-256-GCM</h4>
                <p className="text-[10px] text-slate-500 mt-1">Symmetric Session Pipe</p>
                <span className="text-[9px] font-mono text-emerald-800 mt-2 inline-block bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                  128-bit Perfect Forward Secrecy
                </span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />

              {/* Node 4: Merkle Tree Audit Anchor */}
              <div className="flex-1 p-4 bg-white border border-slate-200 rounded-2xl text-center shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-900 mx-auto flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs text-slate-900">Merkle Tree Ledger</h4>
                <p className="text-[10px] text-slate-500 mt-1">Immutable Hash Chains</p>
                <span className="text-[9px] font-mono text-purple-800 mt-2 inline-block bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-semibold">
                  SHA3-512 Root Proofs
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-white text-slate-700 text-xs rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs">
            <span>Post-Quantum Ready: Protected against harvest-now, decrypt-later (HNDL) attacks by nation-state quantum computing adversaries.</span>
            <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">Quantum Security: Level 5 (256-bit quantum)</span>
          </div>
        </div>
      )}

    </div>
  );
}
