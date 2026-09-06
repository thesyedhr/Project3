import { motion } from 'motion/react';
import { Bot, Link, BarChart3, Layers, Lock, Shield } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

const mockData = [
  { value: 40 }, { value: 65 }, { value: 45 }, { value: 80 }, { value: 55 }, { value: 90 }, { value: 75 }, { value: 100 }
];

export default function Features() {
  return (
    <section id="features" className="w-full py-24 md:py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100/80 text-xs font-semibold text-blue-900 mb-4"
          >
            <Layers className="w-3.5 h-3.5 text-blue-800" />
            <span>Platform Capabilities</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-5 tracking-tight"
          >
            Capabilities designed for <br className="hidden sm:inline" />
            <span className="text-blue-900">
              maximum leverage
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Everything you need to automate your entire business operation, packaged in an interface anyone can understand.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto hover-group">
          
          {/* Card 1: AI Agents (Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: LUXURY_EASE }}
            className="md:col-span-2 p-8 md:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-center items-start group hover-item relative overflow-hidden"
          >
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[120%] bg-blue-50/50 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-100/50 transition-colors duration-700" />
            
            <div className="relative z-10 max-w-xl">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                <Bot className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">Autonomous Agents</h3>
              <p className="text-slate-600 leading-relaxed max-w-xl">
                Deploy specialized AI workers that don't just follow rules, but understand context. They can read emails, classify intent, and execute multi-step logic.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Analytics (Span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: LUXURY_EASE }}
            className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col group hover-item relative overflow-hidden"
          >
            <div className="relative z-10 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">Real-time Insights</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Track execution volume, success rates, and compute exactly how many hours of manual work you've saved.
              </p>
            </div>
            
            {/* Visual Mockup */}
            <div className="mt-auto h-32 w-full relative z-10 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden pt-4 px-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4338ca" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#4338ca" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#4338ca" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Card 3: Enterprise Security (Span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: LUXURY_EASE }}
            className="p-8 md:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between group hover-item relative overflow-hidden"
          >
            <div className="relative z-10 flex-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-900 transition-colors">Enterprise Grade</h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-6">
                SOC 2 Type II compliant. Zero-retention data policies. Your data is encrypted at rest and in transit.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-slate-800">AES-256 Encryption Active</span>
            </div>
          </motion.div>

          {/* Card 4: Integrations (Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: LUXURY_EASE }}
            className="md:col-span-2 p-8 md:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col items-start justify-center group hover-item relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                <Link className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-900 transition-colors">100+ Native Integrations</h3>
              <p className="text-slate-600 leading-relaxed max-w-xl">
                Connect your CRM, helpdesk, databases, and communication tools effortlessly. Authentic securely via standard OAuth with zero engineering required.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
