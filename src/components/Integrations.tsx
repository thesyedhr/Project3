import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Workflow, 
  Layers, 
  Share2, 
  Database, 
  MessageSquare, 
  CreditCard, 
  GitBranch, 
  Users2,
  Bot,
  ArrowDown
} from 'lucide-react';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

interface IntegrationTool {
  id: string;
  name: string;
  category: 'crm' | 'dev' | 'finance' | 'collab' | 'data';
  description: string;
  badge: string;
  sampleTrigger: string;
  sampleAction: string;
  icon: typeof MessageSquare;
}

const CATEGORIES = [
  { id: 'all', label: 'All Ecosystem' },
  { id: 'collab', label: 'Productivity & Comms' },
  { id: 'crm', label: 'CRM & Sales' },
  { id: 'dev', label: 'DevOps & Code' },
  { id: 'finance', label: 'Finance & Payments' },
  { id: 'data', label: 'Databases & AI' },
] as const;

const INTEGRATIONS: IntegrationTool[] = [
  {
    id: 'slack',
    name: 'Slack',
    category: 'collab',
    description: 'Instant notification dispatch, interactive slash commands, and AI channel summaries.',
    badge: 'Popular',
    sampleTrigger: 'New VIP Lead detected',
    sampleAction: 'Broadcast summary to #exec-deals with action buttons',
    icon: MessageSquare,
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'dev',
    description: 'Automate PR triage, issue synchronization, release tagging, and status checks.',
    badge: 'Developer',
    sampleTrigger: 'Pull Request merged to main',
    sampleAction: 'Trigger staging deploy & update Linear tickets',
    icon: GitBranch,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'finance',
    description: 'Sync charge events, manage subscription upgrades, and automate failed payment dunning.',
    badge: 'Finance',
    sampleTrigger: 'Invoice payment succeeded > $1,000',
    sampleAction: 'Generate customized PDF & notify account manager',
    icon: CreditCard,
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'crm',
    description: 'Two-way lead enrichment, deal stage progression, and marketing lifecycle automation.',
    badge: 'Sales',
    sampleTrigger: 'Contact scheduled product demo',
    sampleAction: 'Enrich profile with Clearbit & assign account executive',
    icon: Users2,
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'collab',
    description: 'Append meeting transcripts, update roadmap databases, and sync documentation.',
    badge: 'Docs',
    sampleTrigger: 'New customer feedback submitted',
    sampleAction: 'Append structured row to Product Backlog database',
    icon: Layers,
  },
  {
    id: 'linear',
    name: 'Linear',
    category: 'dev',
    description: 'Auto-create bug tickets from user reports and sync sprints across teams.',
    badge: 'DevOps',
    sampleTrigger: 'High priority error in Sentry',
    sampleAction: 'Create triage issue in Engineering cycle',
    icon: GitBranch,
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'crm',
    description: 'Enterprise contract syncing, territory assignment, and revenue forecasting triggers.',
    badge: 'Enterprise',
    sampleTrigger: 'Opportunity moved to Closed-Won',
    sampleAction: 'Trigger onboarding sequence and provision client workspace',
    icon: Users2,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL & Cloud SQL',
    category: 'data',
    description: 'Direct SQL CDC triggers, automated schema backups, and data transformation pipeline.',
    badge: 'Data',
    sampleTrigger: 'New transaction record inserted',
    sampleAction: 'Run vector embedding indexing & sync to warehouse',
    icon: Database,
  },
  {
    id: 'openai',
    name: 'Gemini & OpenAI LLMs',
    category: 'data',
    description: 'Embedded semantic parsing, multi-modal analysis, and smart response drafting.',
    badge: 'AI Engine',
    sampleTrigger: 'Unstructured customer inquiry email received',
    sampleAction: 'Extract sentiment, draft reply & generate tag classification',
    icon: Bot,
  },
];

export default function Integrations({ onOpenAuth }: { onOpenAuth?: () => void }) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTool, setSelectedTool] = useState<IntegrationTool>(INTEGRATIONS[0]);

  const filteredTools = useMemo(() => {
    return INTEGRATIONS.filter((tool) => {
      const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="integrations" className="w-full py-24 md:py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: LUXURY_EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100/80 text-xs font-semibold text-blue-900 mb-4"
          >
            <Share2 className="w-3.5 h-3.5 text-blue-800" />
            <span>100+ Pre-Built Connectors</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.06, ease: LUXURY_EASE }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4 md:mb-5"
          >
            Connects with your entire software ecosystem
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.12, ease: LUXURY_EASE }}
            className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Sync data continuously across your daily tools with zero maintenance, enterprise webhooks, and automatic retry resilience.
          </motion.p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 bg-white/70 backdrop-blur-xl p-2 sm:p-2.5 rounded-2xl sm:rounded-full border border-slate-200/80 shadow-xs">
          
          {/* Category Pills (Horizontal scrollable on mobile, flex on desktop) */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto no-scrollbar py-0.5 px-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-blue-900 shadow-xs -z-0"
                      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0 px-1 sm:px-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100/70 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-slate-300 rounded-full text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
          </div>
        </div>

        {/* Interactive Layout: Grid + Live Workflow Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Integration Grid with Magnetic Sibling Hover (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 hover-group">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredTools.map((tool) => {
                const isSelected = selectedTool.id === tool.id;
                const IconComponent = tool.icon;

                return (
                  <motion.div
                    layout
                    key={tool.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ 
                      duration: 0.35, 
                      ease: LUXURY_EASE,
                      layout: { duration: 0.38, ease: LUXURY_EASE }
                    }}
                    onClick={() => {
                      setSelectedTool(tool);
                      if (window.innerWidth < 1024) {
                        const el = document.getElementById('blueprint-panel');
                        if (el) {
                          const rect = el.getBoundingClientRect();
                          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                          window.scrollTo({
                            top: scrollTop + rect.top - 90,
                            behavior: 'smooth'
                          });
                        }
                      }
                    }}
                    className={`p-5 rounded-2xl border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex flex-col justify-between text-left hover-item hover:scale-[1.02] active:scale-[0.99] group ${
                      isSelected
                        ? 'bg-white border-blue-400/80 shadow-xs'
                        : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isSelected ? 'bg-blue-900 text-white shadow-xs' : 'bg-slate-100 text-slate-800'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isSelected 
                            ? 'bg-blue-50 text-blue-900 border border-blue-100/80' 
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {tool.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 mb-1">{tool.name}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{tool.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                      <span>Live Connector</span>
                      <span className={`font-semibold flex items-center gap-1 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isSelected ? 'text-blue-900' : 'text-slate-800 group-hover:text-blue-900'
                      }`}>
                        {isSelected ? 'Inspecting' : 'Preview'}
                        <ArrowRight className="w-3 h-3 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Live Workflow Simulator Preview (5 cols) */}
          <div id="blueprint-panel" className="lg:col-span-5 sticky top-24 lg:top-28 z-20 self-start">
            <div className="p-6 sm:p-8 glass-panel no-hover relative overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-900 shrink-0 shadow-xs">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 block tracking-wider uppercase">Workflow Engine</span>
                    <motion.span 
                      key={selectedTool.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, ease: LUXURY_EASE }}
                      className="text-sm font-bold text-slate-900 block"
                    >
                      {selectedTool.name} Blueprint
                    </motion.span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100/80 text-blue-900 text-xs font-semibold shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-800 animate-pulse" />
                  Ready to Deploy
                </span>
              </div>

              {/* Smoothly cross-fading blueprint steps without height jumps */}
              <div className="relative min-h-[178px] z-10">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div 
                    key={selectedTool.id}
                    initial={{ opacity: 0, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(3px)' }}
                    transition={{ duration: 0.28, ease: LUXURY_EASE }}
                    className="flex flex-col w-full"
                  >
                    {/* Step 1: Trigger */}
                    <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-1.5">
                        <Zap className="w-3.5 h-3.5 text-blue-800" />
                        <span className="tracking-wider uppercase text-[11px]">TRIGGER EVENT</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">{selectedTool.sampleTrigger}</p>
                    </div>

                    {/* Workflow Step Connector */}
                    <div className="flex justify-center my-2">
                      <div className="w-6 h-6 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center text-slate-400">
                        <ArrowDown className="w-3 h-3" />
                      </div>
                    </div>

                    {/* Step 2: Action */}
                    <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" />
                        <span className="tracking-wider uppercase text-[11px]">AUTOMATED ACTION</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">{selectedTool.sampleAction}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Integration stats */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-100 relative z-10 text-xs">
                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                  <span className="text-slate-600 block mb-0.5 text-[11px] font-medium">Execution Latency</span>
                  <span className="font-bold text-slate-900 text-sm">&lt; 85ms global</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                  <span className="text-slate-600 block mb-0.5 text-[11px] font-medium">Sync Mechanism</span>
                  <span className="font-bold text-slate-900 text-sm">Real-time Webhook</span>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-6 pt-3 relative z-10">
                <button
                  onClick={onOpenAuth}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-900 text-white font-semibold text-sm hover:bg-blue-950 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
                >
                  <motion.span
                    key={selectedTool.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, ease: LUXURY_EASE }}
                  >
                    Connect {selectedTool.name} in 1-Click
                  </motion.span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
