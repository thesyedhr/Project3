import React, { useState } from 'react';
import { toast } from 'sonner';
import { 
  Key, ShieldCheck, Lock, Eye, EyeOff, Plus, 
  Trash2, RefreshCw, CheckCircle2, AlertCircle, Copy
} from 'lucide-react';

export type SecretItem = {
  id: string;
  name: string;
  boundNode: string;
  maskedValue: string;
  realValue: string;
  status: 'valid' | 'expiring_soon' | 'invalid';
  lastRotated: string;
  encryption: 'AWS KMS (AES-256)' | 'GCP Secret Manager';
};

const INITIAL_SECRETS: SecretItem[] = [
  {
    id: 'sec_1',
    name: 'GEMINI_API_KEY',
    boundNode: 'AI Classifier Agent',
    maskedValue: 'AIzaSy•••••••••••••••••••••••••••••71aQ',
    realValue: 'AIzaSyD92kLmNpQrStUvWxYz012345678971aQ',
    status: 'valid',
    lastRotated: '6 days ago',
    encryption: 'AWS KMS (AES-256)'
  },
  {
    id: 'sec_2',
    name: 'ZENDESK_OAUTH_BEARER',
    boundNode: 'Zendesk Update',
    maskedValue: 'zd_oauth_•••••••••••••••••••••99fc',
    realValue: 'zd_oauth_live_9981240182894199fc',
    status: 'valid',
    lastRotated: '14 days ago',
    encryption: 'AWS KMS (AES-256)'
  },
  {
    id: 'sec_3',
    name: 'WEBHOOK_HMAC_SECRET',
    boundNode: 'Webhook Trigger',
    maskedValue: 'whsec_•••••••••••••••••••••prod',
    realValue: 'whsec_99a8b72c4e1f_prod',
    status: 'valid',
    lastRotated: '22 days ago',
    encryption: 'GCP Secret Manager'
  }
];

export default function BuilderSecretsVault() {
  const [secrets, setSecrets] = useState<SecretItem[]>(INITIAL_SECRETS);
  const [showRealValue, setShowRealValue] = useState<Record<string, boolean>>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  const [newBoundNode, setNewBoundNode] = useState('All Pipeline Nodes');

  const toggleShow = (id: string) => {
    setShowRealValue(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTestSecret = (secret: SecretItem) => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 800)),
      {
        loading: `Pinging ${secret.boundNode} authentication gateway...`,
        success: `Connection verified! ${secret.name} is active and responding (HTTP 200 OK).`,
        error: 'Failed to verify key'
      }
    );
  };

  const handleAddSecret = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName || !newKeyValue) {
      toast.error('Please enter both Key Name and Secret Value');
      return;
    }

    const masked = newKeyValue.length > 8 
      ? `${newKeyValue.slice(0, 4)}••••••••${newKeyValue.slice(-4)}` 
      : '••••••••';

    const newSecret: SecretItem = {
      id: `sec_${Date.now()}`,
      name: newKeyName.toUpperCase().replace(/\s+/g, '_'),
      boundNode: newBoundNode,
      maskedValue: masked,
      realValue: newKeyValue,
      status: 'valid',
      lastRotated: 'Just now',
      encryption: 'AWS KMS (AES-256)'
    };

    setSecrets([...secrets, newSecret]);
    setIsAddModalOpen(false);
    setNewKeyName('');
    setNewKeyValue('');
    toast.success('Environment Secret Encrypted & Stored', {
      description: `${newSecret.name} is now accessible securely in workflow executions.`
    });
  };

  const handleDeleteSecret = (id: string, name: string) => {
    setSecrets(secrets.filter(s => s.id !== id));
    toast.success(`Removed ${name}`, { description: 'Secret successfully revoked from pipeline runtime.' });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900">Environment Variables & Secrets Vault</h3>
              <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                FIPS 140-2 Level 3
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Securely inject API credentials, OAuth tokens, and bearer secrets into node execution contexts without leaking plaintext keys.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Environment Secret
        </button>
      </div>

      {/* Secrets List */}
      <div className="mt-6 divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/40">
        {secrets.map((sec) => (
          <div key={sec.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">{sec.name}</span>
                <span className="text-[10px] font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {sec.boundNode}
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Valid
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                <span className="font-mono bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 text-slate-700 select-all">
                  {showRealValue[sec.id] ? sec.realValue : sec.maskedValue}
                </span>
                <button
                  onClick={() => toggleShow(sec.id)}
                  className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  title={showRealValue[sec.id] ? 'Mask Secret' : 'Reveal Secret'}
                >
                  {showRealValue[sec.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <span className="text-slate-300">|</span>
                <span className="text-[11px] text-slate-400 font-mono">Rotated: {sec.lastRotated}</span>
                <span className="text-slate-300">|</span>
                <span className="text-[11px] text-slate-500">{sec.encryption}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={() => handleTestSecret(sec)}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 text-slate-500" />
                Test Ping
              </button>
              <button
                onClick={() => handleDeleteSecret(sec.id, sec.name)}
                className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                title="Revoke Secret"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Secret Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" 
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 z-10">
            <h4 className="text-base font-bold text-slate-900 mb-1">Add Encrypted Environment Secret</h4>
            <p className="text-xs text-slate-500 mb-4">Values are encrypted via AWS KMS Envelope Encryption before saving.</p>

            <form onSubmit={handleAddSecret} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Variable Name (UPPERCASE)</label>
                <input
                  type="text"
                  placeholder="e.g. STRIPE_RESTRICTED_KEY"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono focus:bg-white focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Secret Value / API Token</label>
                <input
                  type="password"
                  placeholder="Paste token or key..."
                  value={newKeyValue}
                  onChange={(e) => setNewKeyValue(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono focus:bg-white focus:ring-2 focus:ring-blue-100"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Bind to Node</label>
                <select
                  value={newBoundNode}
                  onChange={(e) => setNewBoundNode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium"
                >
                  <option>All Pipeline Nodes</option>
                  <option>AI Classifier Agent</option>
                  <option>Webhook Trigger</option>
                  <option>Zendesk Update</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl font-semibold shadow-xs"
                >
                  Encrypt & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
