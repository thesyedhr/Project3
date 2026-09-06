import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  Cpu, ShieldCheck, Zap, RefreshCw, CheckCircle2, Play, 
  Terminal, Lock, ArrowRight, ShieldAlert, Sparkles, Layers
} from 'lucide-react';

export default function InteractiveFeatureLab() {
  const [activeDemo, setActiveDemo] = useState<'consensus' | 'drift' | 'zksnark' | 'kyber'>('consensus');
  
  // Byzantine Consensus Simulator State
  const [isVoting, setIsVoting] = useState(false);
  const [consensusOutcome, setConsensusOutcome] = useState<string | null>(null);
  const [agentVotes, setAgentVotes] = useState<Record<string, { vote: 'PASS' | 'FLAG'; confidence: number }>>({});

  // Schema Drift Simulator State
  const [isRepairing, setIsRepairing] = useState(false);
  const [schemaStatus, setSchemaStatus] = useState<'original' | 'drifted' | 'repaired'>('original');

  // zk-SNARK State
  const [isProving, setIsProving] = useState(false);
  const [proofResult, setProofResult] = useState<{ proofTime: string; proofSize: string; verified: boolean } | null>(null);

  // Run Consensus Simulation
  const runConsensusSimulation = () => {
    setIsVoting(true);
    setConsensusOutcome(null);
    setAgentVotes({});
    toast.info('Initiating Byzantine Multi-Agent Swarm Voting...');

    setTimeout(() => {
      setAgentVotes({
        'Agent 1 (AML & KYC Policy)': { vote: 'PASS', confidence: 99.4 },
        'Agent 2 (Fraud Detection NER)': { vote: 'PASS', confidence: 98.7 },
        'Agent 3 (Balance & Ledger Check)': { vote: 'PASS', confidence: 100.0 },
        'Agent 4 (Sanctions List Audit)': { vote: 'PASS', confidence: 99.8 },
        'Agent 5 (Anomaly Heuristics)': { vote: 'PASS', confidence: 97.5 },
      });
      setIsVoting(false);
      setConsensusOutcome('QUORUM_REACHED (5/5 Votes PASS • Byzantine Hash 0x9c3f..18 signed)');
      toast.success('Consensus Verified! Action authorized with 0% hallucination risk.');
    }, 900);
  };

  // Run Schema Drift Simulation
  const runDriftSimulation = () => {
    setSchemaStatus('drifted');
    setIsRepairing(true);
    toast.warning('Upstream Stripe API Payload Schema Drift Detected!');

    setTimeout(() => {
      setIsRepairing(false);
      setSchemaStatus('repaired');
      toast.success('Auto-Repair Shim Generated in 118ms!', {
        description: 'Transformed deprecated `charges.data[0].fee` -> `balance_transactions[0].net`'
      });
    }, 1000);
  };

  // Run zk-SNARK Simulation
  const runZkSnark = () => {
    setIsProving(true);
    setProofResult(null);
    toast.info('Generating Groth16 zk-SNARK Witness Proof (BN254 curve)...');

    setTimeout(() => {
      setIsProving(false);
      setProofResult({
        proofTime: '3.8ms',
        proofSize: '128 bytes',
        verified: true
      });
      toast.success('Zero-Knowledge Proof Verified Off-Chain!', {
        description: 'Proof validates policy compliance without revealing input prompt or tenant data.'
      });
    }, 850);
  };

  return (
    <div className="mb-14 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-900 px-2.5 py-1 rounded-full font-bold border border-blue-200">
              Interactive Lab & Sandbox
            </span>
            <span className="text-xs text-slate-400 font-mono">• Live Prototype Sandbox</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Next-Gen Technology Demonstrator
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Test and inspect prototype engines scheduled for release in upcoming 2026–2027 milestone rollouts.
          </p>
        </div>

        {/* Demo Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl self-start md:self-auto">
          <button
            onClick={() => setActiveDemo('consensus')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeDemo === 'consensus' ? 'bg-white text-blue-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Byzantine Consensus
          </button>
          <button
            onClick={() => setActiveDemo('drift')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeDemo === 'drift' ? 'bg-white text-blue-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Self-Healing Schema
          </button>
          <button
            onClick={() => setActiveDemo('zksnark')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeDemo === 'zksnark' ? 'bg-white text-blue-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            zk-SNARK Verifier
          </button>
        </div>
      </div>

      {/* DEMO 1: BYZANTINE CONSENSUS */}
      {activeDemo === 'consensus' && (
        <div className="mt-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Scenario: High-Stakes Financial Payout Authorization</span>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulate 5 specialized AI sub-agents validating a $4,500 vendor payout with zero human intervention and Byzantine fault tolerance.
              </p>
            </div>
            <button
              onClick={runConsensusSimulation}
              disabled={isVoting}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer hover:scale-[1.02] disabled:opacity-50 shrink-0"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isVoting ? 'Deliberating...' : 'Trigger Multi-Agent Swarm'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              'Agent 1 (AML & KYC Policy)',
              'Agent 2 (Fraud Detection NER)',
              'Agent 3 (Balance & Ledger Check)',
              'Agent 4 (Sanctions List Audit)',
              'Agent 5 (Anomaly Heuristics)'
            ].map((agentName, idx) => {
              const res = agentVotes[agentName];
              return (
                <div key={idx} className="p-3.5 rounded-2xl border bg-white border-slate-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">Node #{idx + 1}</span>
                    {res ? (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200">
                        {res.vote}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Idle</span>
                    )}
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 leading-snug">{agentName}</h5>
                  {res && (
                    <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Confidence:</span>
                      <span className="font-mono font-bold text-emerald-600">{res.confidence}%</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {consensusOutcome && (
            <div className="p-4 bg-emerald-50 text-emerald-900 rounded-2xl flex items-center justify-between text-xs border border-emerald-200 shadow-2xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-mono font-bold">{consensusOutcome}</span>
              </div>
              <span className="text-[10px] bg-white border border-emerald-200 px-2 py-0.5 rounded text-emerald-700 font-mono font-semibold shadow-xs">
                Dispute Tolerance: 100%
              </span>
            </div>
          )}
        </div>
      )}

      {/* DEMO 2: SCHEMA DRIFT AUTO-REPAIR */}
      {activeDemo === 'drift' && (
        <div className="mt-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Scenario: Upstream Webhook Breaking Schema Shift</span>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulate a breaking API update where payment fee structures migrate to sub-arrays without notice.
              </p>
            </div>
            <button
              onClick={runDriftSimulation}
              disabled={isRepairing}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer hover:scale-[1.02] disabled:opacity-50 shrink-0"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRepairing ? 'animate-spin' : ''}`} />
              <span>{isRepairing ? 'Synthesizing Hot-Patch...' : 'Inject Payload Drift'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 font-mono text-xs space-y-2 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                {schemaStatus === 'drifted' ? '⚠️ Inbound Broken Payload (Drifted)' : 'Inbound Webhook Payload'}
              </span>
              <pre className="text-[11px] text-slate-800 overflow-x-auto no-scrollbar">
{schemaStatus === 'drifted' 
  ? `// Stripe v2026-08 breaking schema:
{
  "id": "evt_991823",
  "data": {
    "balance_transactions": [
      { "net": 42000, "currency": "usd" } // Field moved!
    ]
  }
}`
  : `// Standard legacy schema:
{
  "id": "evt_991823",
  "data": {
    "charge": { "fee": 120, "amount": 42000 }
  }
}`}
              </pre>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-blue-100 text-slate-800 font-mono text-xs space-y-2 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-blue-700 block">
                Generated Runtime Shim (AST Transformer)
              </span>
              <pre className="text-[11px] text-blue-900 overflow-x-auto no-scrollbar">
{schemaStatus === 'repaired'
  ? `// Self-healing in-memory transformer generated in 118ms:
function adaptPayload(input) {
  return {
    fee: input.data.balance_transactions?.[0]?.net ?? 0,
    amount: input.data.amount ?? 42000,
    _adaptedBy: "NexaFlow-AutoRepair-v2"
  };
}`
  : `// Awaiting schema drift anomaly trigger...`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* DEMO 3: ZK-SNARK VERIFICATION */}
      {activeDemo === 'zksnark' && (
        <div className="mt-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-900 block">Scenario: Non-Interactive Zero-Knowledge Compliance Witness</span>
              <p className="text-xs text-slate-500 mt-0.5">
                Generate cryptographic proofs certifying model inference executed compliant guardrails without revealing prompts or raw outputs.
              </p>
            </div>
            <button
              onClick={runZkSnark}
              disabled={isProving}
              className="px-4 py-2 bg-purple-900 hover:bg-purple-950 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer hover:scale-[1.02] disabled:opacity-50 shrink-0"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isProving ? 'Generating Proof...' : 'Generate zk-SNARK Proof'}</span>
            </button>
          </div>

          {proofResult && (
            <div className="p-5 bg-white text-slate-800 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-700 flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Cryptographic Witness Certified Valid

                </span>
                <span className="text-[10px] font-mono text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                  Groth16 / BN254 Curve
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[10px] text-slate-500 uppercase block">Verification Time</span>
                  <span className="text-sm font-bold font-mono text-emerald-700">{proofResult.proofTime}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[10px] text-slate-500 uppercase block">Proof Payload Size</span>
                  <span className="text-sm font-bold font-mono text-blue-700">{proofResult.proofSize}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-[10px] text-slate-500 uppercase block">Prompt Confidentiality</span>
                  <span className="text-sm font-bold font-mono text-purple-700">100% Zero Knowledge</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
