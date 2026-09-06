import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero({ onStartFree }: { onStartFree: () => void }) {
  return (
    <section id="hero" className="relative w-full pt-36 pb-20 lg:pt-44 lg:pb-32 px-6 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Subtle floating background ambient glows */}
      <motion.div 
        animate={{ y: [-8, 8, -8], opacity: [0.12, 0.18, 0.12] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] w-72 h-72 bg-slate-500/20 rounded-full blur-[90px] pointer-events-none"
      />
      <motion.div 
        animate={{ y: [8, -8, 8], opacity: [0.1, 0.16, 0.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[10%] w-88 h-88 bg-blue-900/15 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Text Content (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          
          {/* Section Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-blue-900"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-800" />
            <span>Autonomous AI Workflow Engine</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.05, ease: LUXURY_EASE }}
            className="text-[65px] font-bold tracking-tight text-slate-900 leading-[1.1] lg:leading-[65px]"
          >
            Automate the work.<br/>
            <span className="text-blue-900">
              Not your team.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: LUXURY_EASE }}
            className="text-[19px] text-slate-600 max-w-xl font-normal leading-[27px]"
          >
            NexaFlow helps high-growth organizations orchestrate complex cross-app operations with autonomous AI agents—no code required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease: LUXURY_EASE }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <motion.button 
              onClick={onStartFree}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="h-[50px] w-full sm:w-auto px-8 bg-[#1e3a8a] text-white rounded-full font-semibold text-base sm:text-lg transition-transform duration-200 cursor-pointer shadow-sm flex items-center justify-center gap-2 leading-none"
            >
              <span>Start free</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </motion.button>
            <motion.a 
              href="#how-it-works"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="h-[50px] w-full sm:w-auto px-8 rounded-full font-bold text-base sm:text-lg bg-blue-50/80 hover:bg-blue-100/70 border border-blue-200/80 text-[#1e3a8a] text-center transition-colors cursor-pointer shadow-2xs flex items-center justify-center leading-none"
            >
              See how it works
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: LUXURY_EASE }}
            className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 font-medium"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-800" />
              No credit card required
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-800" />
              SOC 2 & GDPR compliant
            </span>
          </motion.div>
        </div>

        {/* Empty space preserving the exact 2-column (7/5) grid structure and alignments */}
        <div className="hidden lg:block lg:col-span-5" />

      </div>
    </section>
  );
}
