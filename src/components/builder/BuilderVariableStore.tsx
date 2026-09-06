import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  Database, Plus, Trash2, Edit2, Check, Copy, Sliders, 
  Sparkles, Code2, Lock, Eye, EyeOff
} from 'lucide-react';

type WorkflowVariable = {
  id: string;
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  isSecret: boolean;
  description: string;
};

const INITIAL_VARS: WorkflowVariable[] = [
  {
    id: 'var-1',
    key: 'DEFAULT_CURRENCY',
    value: 'USD',
    type: 'string',
    isSecret: false,
    description: 'ISO currency symbol for auto-categorizing invoice and charge disputes.'
  },
  {
    id: 'var-2',
    key: 'SLA_TIMEOUT_SEC',
    value: '45',
    type: 'number',
    isSecret: false,
    description: 'Maximum permitted response latency before triggering emergency human escalation.'
  },
  {
    id: 'var-3',
    key: 'ESCALATION_EMAIL',
    value: 'incident-response@enterprise.io',
    type: 'string',
    isSecret: false,
    description: 'Dispatch inbox for high-priority ticket routing.'
  },
  {
    id: 'var-4',
    key: 'STRIPE_WEBHOOK_SIGNING_SECRET',
    value: 'whsec_99342bbf189a4242901ce',
    type: 'string',
    isSecret: true,
    description: 'HMAC-SHA256 signature key for verifying incoming Stripe events.'
  },
  {
    id: 'var-5',
    key: 'FALLBACK_MODEL_TIER',
    value: 'gemini-1.5-flash',
    type: 'string',
    isSecret: false,
    description: 'Fallback model used when primary reasoning model experiences API rate-limiting.'
  }
];

export default function BuilderVariableStore() {
  const [variables, setVariables] = useState<WorkflowVariable[]>(INITIAL_VARS);
  const [showSecretIds, setShowSecretIds] = useState<Record<string, boolean>>({});
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newType, setNewType] = useState<'string' | 'number' | 'boolean' | 'json'>('string');
  const [newIsSecret, setNewIsSecret] = useState(false);
  const [newDesc, setNewDesc] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const toggleShowSecret = (id: string) => {
    setShowSecretIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = (id: string) => {
    setVariables(prev => prev.filter(v => v.id !== id));
    toast.success('Variable Removed', { description: 'Variable no longer accessible by pipeline nodes.' });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey.trim() || !newValue.trim()) {
      toast.error('Key and value cannot be empty');
      return;
    }
    const formattedKey = newKey.toUpperCase().replace(/\s+/g, '_');
    const newVar: WorkflowVariable = {
      id: `var-${Date.now()}`,
      key: formattedKey,
      value: newValue,
      type: newType,
      isSecret: newIsSecret,
      description: newDesc || 'User-defined environment constant'
    };
    setVariables([...variables, newVar]);
    setNewKey('');
    setNewValue('');
    setNewDesc('');
    setIsAdding(false);
    toast.success('Workflow Variable Saved', {
      description: `Access in nodes via {{vars.${formattedKey}}}`
    });
  };

  const copyRef = (key: string) => {
    navigator.clipboard.writeText(`{{vars.${key}}}`);
    toast.success('Reference Copied', { description: `Copied {{vars.${key}}} to clipboard.` });
  };

  return (
    <div className="mt-8 bg-white border border-slate-200 rounded-[28px] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-900 px-2.5 py-0.5 rounded-full font-bold border border-blue-200">
              State & Configuration
            </span>
            <span className="text-xs text-slate-400">• Dynamic Template Context</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Workflow Environment Variables & State Store
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Global constants and runtime variables accessible across all nodes using standard mustache syntax <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-900 font-mono text-xs">{`{{vars.KEY}}`}</code>.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer hover:scale-[1.02] self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Cancel' : 'Add Variable'}</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">New Workflow Variable</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Variable Key (e.g. API_TIMEOUT):</label>
              <input
                type="text"
                placeholder="MY_CONSTANT_KEY"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="w-full bg-white border border-slate-200 text-xs rounded-lg px-3 py-2 font-mono uppercase text-slate-900 outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Value:</label>
              <input
                type={newIsSecret ? "password" : "text"}
                placeholder="Value..."
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full bg-white border border-slate-200 text-xs rounded-lg px-3 py-2 text-slate-900 outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Type:</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="w-full bg-white border border-slate-200 text-xs rounded-lg px-3 py-2 text-slate-900 outline-none"
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="json">JSON Object</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isSecretCheckbox"
                checked={newIsSecret}
                onChange={(e) => setNewIsSecret(e.target.checked)}
                className="rounded border-slate-300 text-blue-900 focus:ring-blue-500"
              />
              <label htmlFor="isSecretCheckbox" className="text-xs text-slate-700 font-medium cursor-pointer">
                Mask as encrypted secret (masked in audit logs)
              </label>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              Save Variable
            </button>
          </div>
        </form>
      )}

      {/* Variables Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="pb-3 pl-2">Variable Key</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Current Value</th>
              <th className="pb-3">Description</th>
              <th className="pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {variables.map((v) => {
              const isRevealed = showSecretIds[v.id];
              return (
                <tr key={v.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 pl-2 font-mono font-bold text-slate-900 flex items-center gap-2">
                    {v.isSecret && <Lock className="w-3 h-3 text-amber-600" />}
                    <span>{v.key}</span>
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] border border-slate-200">
                      {v.type}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-slate-700">
                    {v.isSecret && !isRevealed ? (
                      <span className="tracking-widest text-slate-400">••••••••••••••••</span>
                    ) : (
                      <span className="bg-slate-50 px-2 py-1 rounded border border-slate-200 text-slate-900">
                        {v.value}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 text-slate-500 max-w-xs truncate">
                    {v.description}
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <div className="flex items-center justify-end gap-1.5">
                      {v.isSecret && (
                        <button
                          onClick={() => toggleShowSecret(v.id)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                          title={isRevealed ? "Hide Secret" : "Show Secret"}
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      )}
                      <button
                        onClick={() => copyRef(v.key)}
                        className="p-1 text-slate-400 hover:text-blue-900 rounded hover:bg-slate-100 cursor-pointer"
                        title="Copy Mustache Tag"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
