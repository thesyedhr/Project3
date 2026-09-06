import React, { useState } from 'react';
import { toast } from 'sonner';
import { 
  Code, Copy, Check, Terminal, Play, 
  Layers, CheckCircle2, ArrowRight
} from 'lucide-react';

export default function BuilderIntegrationCode() {
  const [selectedLang, setSelectedLang] = useState<'curl' | 'typescript' | 'python' | 'go'>('curl');
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const SNIPPETS = {
    curl: `curl -X POST https://api.nexaflow.com/v1/workflows/wf_lead_enrichment/execute \\
  -H "Authorization: Bearer nxf_live_9981a7b2c" \\
  -H "Content-Type: application/json" \\
  -d '{
    "ticket_id": "TCK-99014",
    "customer_email": "alex@enterprise.io",
    "subject": "Enterprise SLA escalation for billing webhook",
    "priority": "HIGH"
  }'`,
    typescript: `import { NexaFlow } from '@nexaflow/sdk';

const client = new NexaFlow({ 
  apiKey: process.env.NEXAFLOW_API_KEY 
});

// Trigger pipeline asynchronously with telemetry tracking
const execution = await client.workflows.execute('wf_lead_enrichment', {
  payload: {
    ticket_id: 'TCK-99014',
    customer_email: 'alex@enterprise.io',
    subject: 'Enterprise SLA escalation for billing webhook',
    priority: 'HIGH'
  },
  waitForCompletion: true,
  timeoutMs: 10000
});

console.log('Execution Status:', execution.status); // "SUCCESS"
console.log('AI Sentiment Score:', execution.outputs.urgency_score);
console.log('Zendesk Ticket ID:', execution.outputs.zendesk_ticket_id);`,
    python: `import os
from nexaflow import NexaFlowClient

client = NexaFlowClient(api_key=os.environ.get("NEXAFLOW_API_KEY"))

response = client.workflows.trigger(
    workflow_id="wf_lead_enrichment",
    payload={
        "ticket_id": "TCK-99014",
        "customer_email": "alex@enterprise.io",
        "subject": "Enterprise SLA escalation for billing webhook",
        "priority": "HIGH"
    },
    sync=True
)

print(f"Executed in {response.latency_ms}ms with status: {response.http_status}")
print("Extracted Entities:", response.data["extracted_entities"])`,
    go: `package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

func main() {
	payload := map[string]interface{}{
		"ticket_id":       "TCK-99014",
		"customer_email":  "alex@enterprise.io",
		"subject":         "Enterprise SLA escalation for billing webhook",
		"priority":        "HIGH",
	}
	body, _ := json.Marshal(payload)

	req, _ := http.NewRequest("POST", "https://api.nexaflow.com/v1/workflows/wf_lead_enrichment/execute", bytes.NewBuffer(body))
	req.Header.Set("Authorization", "Bearer "+os.Getenv("NEXAFLOW_API_KEY"))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("Triggered NexaFlow Pipeline. HTTP Response Code:", resp.StatusCode)
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(SNIPPETS[selectedLang]);
    setCopied(true);
    toast.success('Code Snippet Copied', { description: `Ready to integrate with your ${selectedLang.toUpperCase()} codebase.` });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateCall = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      toast.success('HTTP 200 OK Received', {
        description: 'Pipeline triggered successfully. Trace #tr_sim_8901 registered.'
      });
    }, 750);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Developer API & Webhook Ingestion Hub</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Trigger this workflow programmatically from your backend, microservices, or external CI/CD hooks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateCall}
            disabled={isSimulating}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Sending Request...' : 'Test Send Webhook'}</span>
          </button>
        </div>
      </div>

      {/* Code Header with Lang Tabs & Copy */}
      <div className="mt-6 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-1">
            {(['curl', 'typescript', 'python', 'go'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedLang === lang 
                    ? 'bg-blue-900 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {lang === 'curl' ? 'cURL' : lang === 'typescript' ? 'TypeScript / Node' : lang === 'python' ? 'Python' : 'Go'}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer border border-slate-200 shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code Box */}
        <div className="p-5 overflow-x-auto">
          <pre className="text-xs font-mono text-slate-800 leading-relaxed no-scrollbar">
            {SNIPPETS[selectedLang]}
          </pre>
        </div>

        {/* Live endpoint footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Ingress Gateway: <strong className="font-mono text-slate-700">https://api.nexaflow.com/v1/workflows/wf_lead_enrichment/execute</strong>
          </span>
          <span className="font-mono text-slate-500">Rate Limit: 5,000 req/min (Soft)</span>
        </div>
      </div>
    </div>
  );
}
