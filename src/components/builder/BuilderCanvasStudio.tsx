import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  Play, Link as LinkIcon, Sparkles, Database, Plus, X, 
  Sliders, Copy, Trash2, CheckCircle2,
  ZoomIn, ZoomOut, Maximize2, Minimize2, RotateCcw,
  Layers, Workflow
} from 'lucide-react';

export type NodeData = {
  id: string;
  title: string;
  subtitle: string;
  type: 'trigger' | 'ai' | 'action';
  x: number;
  y: number;
  config?: {
    model?: string;
    systemPrompt?: string;
    temperature?: number;
    endpointUrl?: string;
    targetSystem?: string;
    actionType?: string;
    destinationTable?: string;
  };
};

interface BuilderCanvasStudioProps {
  nodes: NodeData[];
  setNodes: React.Dispatch<React.SetStateAction<NodeData[]>>;
  selectedNode: string | null;
  setSelectedNode: (id: string | null) => void;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  isCanvasExpanded: boolean;
  setIsCanvasExpanded: (expanded: boolean) => void;
  testingNodeId: string | null;
  handleAutoAlign: () => void;
  handleTestSingleNode: (id: string, e: React.MouseEvent) => void;
  handleDuplicateNode: (id: string, e: React.MouseEvent) => void;
  handleDeleteNode: (id: string, e: React.MouseEvent) => void;
  updateSelectedNode: (updated: Partial<NodeData>) => void;
  setIsNodeLibraryOpen: (open: boolean) => void;
  handleOpenTestModal: () => void;
  workflowName: string;
}

export default function BuilderCanvasStudio({
  nodes,
  setNodes,
  selectedNode,
  setSelectedNode,
  zoomLevel,
  setZoomLevel,
  isCanvasExpanded,
  setIsCanvasExpanded,
  testingNodeId,
  handleAutoAlign,
  handleTestSingleNode,
  handleDuplicateNode,
  handleDeleteNode,
  updateSelectedNode,
  setIsNodeLibraryOpen,
  handleOpenTestModal,
  workflowName,
}: BuilderCanvasStudioProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const selectedNodeObj = nodes.find(n => n.id === selectedNode);

  // Core Canvas + Inspector UI shared across both embedded and portal fullscreen
  const renderCanvasBody = (inFullscreen: boolean) => (
    <div className="w-full h-full relative flex overflow-hidden">
      {/* Subtle Grid Dots Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

      {/* Interactive Drag Canvas */}
      <div ref={canvasRef} className="flex-1 relative z-10 overflow-hidden">
        
        {/* Canvas Zoom & Action Overlay Controls */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs p-1 rounded-xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setZoomLevel(prev => Math.min(prev + 10, 150))}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-mono font-medium text-slate-600 px-1">{zoomLevel}%</span>
          <button 
            onClick={() => setZoomLevel(prev => Math.max(prev - 10, 60))}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-slate-200 mx-0.5" />
          <button 
            onClick={() => setZoomLevel(100)}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors text-xs flex items-center gap-1 cursor-pointer"
            title="Reset Zoom to 100%"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">100%</span>
          </button>
          <div className="w-px h-4 bg-slate-200 mx-0.5" />
          <button 
            onClick={handleAutoAlign}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors text-xs flex items-center gap-1 cursor-pointer"
            title="Auto-Sequence Nodes Vertically"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Auto-Align</span>
          </button>
          <div className="w-px h-4 bg-slate-200 mx-0.5" />
          
          {/* Expand / Minimize Button */}
          <button 
            onClick={() => {
              const nextState = !isCanvasExpanded;
              setIsCanvasExpanded(nextState);
              toast.info(nextState ? 'Entered Fullscreen Studio' : 'Exited Fullscreen Studio');
            }}
            className={`p-1.5 rounded-lg transition-colors text-xs flex items-center gap-1 font-semibold cursor-pointer ${
              inFullscreen ? 'bg-blue-900 text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
            title={inFullscreen ? "Exit Fullscreen Studio (Esc)" : "Expand Canvas Studio"}
          >
            {inFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{inFullscreen ? 'Exit Fullscreen' : 'Expand Studio'}</span>
          </button>
        </div>

        {/* Quick Add Node Button */}
        <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={() => setIsNodeLibraryOpen(true)}
            className="px-3.5 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-1.5 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Component
          </button>
        </div>

        {/* Canvas Nodes Graph */}
        <div 
          className="w-full h-full relative origin-top-left transition-transform duration-100"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {nodes.map((node, i) => {
              if (i === nodes.length - 1) return null;
              const nextNode = nodes[i + 1];
              // Node width is w-72 (288px). Center is x + 144.
              const startX = node.x + 144;
              // Node height is ~104px based on padding and text sizes.
              const startY = node.y + 104;
              
              const endX = nextNode.x + 144;
              const endY = nextNode.y;
              
              return (
                <g key={`edge-${node.id}-${inFullscreen ? 'fs' : 'emb'}`}>
                  <path 
                    d={`M ${startX} ${startY} C ${startX} ${startY + 40}, ${endX} ${endY - 40}, ${endX} ${endY}`}
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="animate-[dash_20s_linear_infinite]"
                  />
                </g>
              );
            })}
          </svg>
          
          {nodes.map((node) => {
            const isSelected = selectedNode === node.id;
            const isTesting = testingNodeId === node.id;
            return (
              <motion.div
                key={`${node.id}-${inFullscreen ? 'fs' : 'emb'}`}
                drag
                dragConstraints={canvasRef}
                dragMomentum={false}
                initial={{ x: node.x, y: node.y }}
                onDragEnd={(_, info) => {
                  setNodes(prev => prev.map(n => 
                    n.id === node.id 
                      ? { ...n, x: Math.max(20, node.x + info.offset.x), y: Math.max(20, node.y + info.offset.y) }
                      : n
                  ));
                }}
                onClick={() => setSelectedNode(node.id)}
                className={`absolute w-72 bg-white shadow-sm rounded-2xl p-4 cursor-grab active:cursor-grabbing transition-shadow z-10 ${
                  isSelected 
                    ? 'ring-2 ring-blue-600 ring-offset-2 border-transparent shadow-md' 
                    : 'border border-slate-200 hover:border-slate-300'
                }`}
                style={{ touchAction: "none" }}
              >
                {node.type !== 'trigger' && (
                  <div className="w-3 h-3 rounded-full bg-slate-300 absolute -top-1.5 left-1/2 -translate-x-1/2 border-2 border-white" />
                )}
                
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      node.type === 'trigger' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      node.type === 'ai' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}>
                      {node.type === 'trigger' && <LinkIcon className="w-4 h-4" />}
                      {node.type === 'ai' && <Sparkles className="w-4 h-4" />}
                      {node.type === 'action' && <Database className="w-4 h-4" />}
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{node.title}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{node.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 shrink-0">
                    <button 
                      onClick={(e) => handleTestSingleNode(node.id, e)}
                      className="p-1 text-slate-400 hover:text-emerald-700 rounded-md hover:bg-emerald-50 transition-colors cursor-pointer"
                      title="Test Run This Step"
                    >
                      <Play className={`w-3 h-3 ${isTesting ? 'animate-spin text-emerald-600' : ''}`} />
                    </button>
                    <button 
                      onClick={(e) => handleDuplicateNode(node.id, e)}
                      className="p-1 text-slate-400 hover:text-blue-700 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                      title="Duplicate Node"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={(e) => handleDeleteNode(node.id, e)}
                      className="p-1 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Node"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="uppercase tracking-wider font-semibold">
                    {node.type === 'trigger' ? 'Trigger Ingest' : node.type === 'ai' ? 'Model Inference' : 'Action Dispatch'}
                  </span>
                  <span className="font-mono text-emerald-600 font-medium">Ready</span>
                </div>

                <div className="w-3 h-3 rounded-full bg-blue-500 absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-2 border-white" />
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Right Sidebar: Dynamic Node Configuration Inspector */}
      <div className="w-80 md:w-96 bg-white border-l border-slate-200 flex flex-col z-20 shrink-0">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-900" />
            <h3 className="font-bold text-slate-900 text-sm">Node Configuration</h3>
          </div>
          <button onClick={() => setSelectedNode(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5">
          <AnimatePresence mode="wait">
            {selectedNodeObj ? (
              <motion.div
                key={`insp-${selectedNodeObj.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                    ID: {selectedNodeObj.id} • {selectedNodeObj.type.toUpperCase()}
                  </span>
                  <div className="mt-2 space-y-1">
                    <input 
                      type="text"
                      value={selectedNodeObj.title}
                      onChange={(e) => updateSelectedNode({ title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold rounded-lg px-3 py-1.5 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                    <input 
                      type="text"
                      value={selectedNodeObj.subtitle}
                      onChange={(e) => updateSelectedNode({ subtitle: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-500 text-xs rounded-lg px-3 py-1.5 outline-none focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {selectedNodeObj.type === 'ai' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Model Engine</label>
                      <select 
                        value={selectedNodeObj.config?.model || 'Gemini 1.5 Pro'}
                        onChange={(e) => updateSelectedNode({ config: { model: e.target.value } })}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                      >
                        <option value="Gemini 1.5 Pro">Gemini 1.5 Pro (Deep Reasoning & Function Calling)</option>
                        <option value="Gemini 1.5 Flash">Gemini 1.5 Flash (Ultra-Low Latency)</option>
                        <option value="Gemini Flash-Lite">Gemini Flash-Lite (Cost Optimized)</option>
                        <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet (Multi-Agent Swarm)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">System Prompt Instructions</label>
                      <textarea 
                        rows={4}
                        value={selectedNodeObj.config?.systemPrompt || 'You are an expert customer support triage agent. Analyze the incoming ticket and output a structured JSON categorization with sentiment, urgency, and recommended routing action.'}
                        onChange={(e) => updateSelectedNode({ config: { systemPrompt: e.target.value } })}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 resize-none font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>Temperature (Creativity)</span>
                        <span className="font-mono text-blue-900 font-bold">
                          {((selectedNodeObj.config?.temperature ?? 20) / 100).toFixed(2)}
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={selectedNodeObj.config?.temperature ?? 20}
                        onChange={(e) => updateSelectedNode({ config: { temperature: Number(e.target.value) } })}
                        className="w-full accent-blue-600 cursor-pointer" 
                      />
                    </div>
                  </div>
                )}

                {selectedNodeObj.type === 'trigger' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Webhook Endpoint URL</label>
                      <div className="flex">
                        <input 
                          type="text"
                          readOnly
                          value={selectedNodeObj.config?.endpointUrl || "https://api.nexaflow.com/hook/xt782q"}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-l-lg px-3 py-1.5 font-mono"
                        />
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(selectedNodeObj.config?.endpointUrl || "https://api.nexaflow.com/hook/xt782q");
                            toast.success('Copied Webhook URL');
                          }}
                          className="px-3 bg-slate-100 border border-l-0 border-slate-200 rounded-r-lg text-xs font-semibold text-blue-900 hover:bg-slate-200 cursor-pointer"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">HTTP Method</label>
                      <select className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none">
                        <option>POST (JSON Payload)</option>
                        <option>PUT (Idempotent Update)</option>
                      </select>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>HMAC SHA-256 validation active</span>
                    </div>
                  </div>
                )}
                
                {selectedNodeObj.type === 'action' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Integration Destination</label>
                      <div className="w-full bg-white border border-slate-200 rounded-lg p-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-blue-50 border border-blue-100 text-blue-700 rounded-md flex items-center justify-center font-bold text-xs">Z</div>
                          <span className="text-xs font-bold text-slate-900">
                            {selectedNodeObj.config?.targetSystem || 'Zendesk Support'}
                          </span>
                        </div>
                        <span className="text-[11px] text-emerald-600 font-semibold">Active Token</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Dispatch Action</label>
                      <select 
                        value={selectedNodeObj.config?.actionType || 'Create Ticket & Tag Priority'}
                        onChange={(e) => updateSelectedNode({ config: { actionType: e.target.value } })}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-lg px-3 py-2 outline-none"
                      >
                        <option>Create Ticket & Tag Priority</option>
                        <option>Update Ticket SLA & Assignee</option>
                        <option>Add Internal Triage Comment</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button 
                    onClick={(e) => handleTestSingleNode(selectedNodeObj.id, e)}
                    disabled={testingNodeId === selectedNodeObj.id}
                    className="w-full py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    <Play className={`w-3.5 h-3.5 ${testingNodeId === selectedNodeObj.id ? 'animate-spin' : ''}`} />
                    <span>{testingNodeId === selectedNodeObj.id ? 'Executing Step...' : 'Test This Step Now'}</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-70 p-4"
              >
                <Sliders className="w-8 h-8 text-slate-400" />
                <p className="text-xs text-slate-600 font-semibold">Select a node on canvas</p>
                <p className="text-[11px] text-slate-400">Click any card to inspect prompt settings, integration bindings, and schema rules.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {selectedNodeObj && (
          <div className="p-4 border-t border-slate-200 bg-slate-50/60">
            <button 
              onClick={() => toast.success('Node Properties Saved', { description: `Configuration for "${selectedNodeObj.title}" updated and synced.` })}
              className="w-full py-2 bg-blue-900 text-white text-xs font-semibold rounded-xl hover:bg-blue-950 transition-colors shadow-xs cursor-pointer"
            >
              Save Node Properties
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* 1. In-Page Embedded Canvas Studio (when not expanded) */}
      {!isCanvasExpanded && (
        <div className="w-full flex-grow min-h-[640px] rounded-3xl bg-slate-50/70 border border-slate-200/90 shadow-sm overflow-hidden relative flex">
          {renderCanvasBody(false)}
        </div>
      )}

      {/* 2. Fullscreen Studio Portal (Rendered directly into document.body to bypass transformed container clipping) */}
      {isCanvasExpanded && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[99999] bg-slate-100 flex flex-col p-4 md:p-6 overflow-hidden">
          {/* Top Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 shrink-0 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <Workflow className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-900">{workflowName}</h2>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-semibold border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Fullscreen Studio Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Press <kbd className="px-1.5 py-0.5 bg-slate-200 rounded font-mono text-[10px]">Esc</kbd> or click Exit Fullscreen to return to page view
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handleOpenTestModal}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-900 text-white hover:bg-blue-950 flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                Run Test
              </button>
              <button 
                onClick={() => {
                  setIsCanvasExpanded(false);
                  toast.info('Exited Fullscreen Studio');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                Exit Fullscreen
              </button>
            </div>
          </div>

          {/* Canvas & Inspector Container */}
          <div className="flex-1 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden relative flex">
            {renderCanvasBody(true)}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
