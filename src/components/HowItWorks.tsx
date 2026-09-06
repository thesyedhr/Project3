import { useRef, useState, type RefObject } from 'react';
import { motion, useScroll, useInView, useMotionValueEvent, type MotionValue } from 'motion/react';
import { Route } from 'lucide-react';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    num: '01',
    title: 'Connect Integrations',
    description: 'Securely link your existing tools in seconds. We support over 100+ native integrations with zero configuration required.'
  },
  {
    num: '02',
    title: 'Describe Your Goal',
    description: 'Use natural language to outline your desired workflow. Our AI intelligently structures the necessary logic and branching.'
  },
  {
    num: '03',
    title: 'Automate & Scale',
    description: 'Deploy instantly. NexaFlow autonomously monitors triggers and executes your operations flawlessly, 24/7.'
  }
];

interface StepItemProps {
  step: (typeof steps)[0];
  index: number;
  isActive: boolean;
  itemRef?: RefObject<HTMLDivElement | null>;
}

function StepItem({ step, isActive, itemRef }: StepItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const activeState = isActive || isHovered;

  return (
    <div 
      ref={itemRef} 
      className="flex flex-col items-center text-center group cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Number Indicator: Clean, Minimal, Low Soft Shadow */}
      <div className="relative mb-5 md:mb-6">
        <motion.div 
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 25 
          }}
          className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center z-10 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] border ${
            activeState
              ? 'bg-blue-900 border-blue-800 text-white shadow-[0_4px_16px_rgba(15,23,42,0.15)]'
              : 'bg-white border-slate-200 text-slate-800 shadow-xs'
          }`}
        >
          <motion.span 
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.2, ease: LUXURY_EASE }}
            className="text-xl md:text-2xl font-bold tracking-tight select-none"
          >
            {step.num}
          </motion.span>
        </motion.div>
      </div>

      {/* Step Content */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, delay: 0.1, ease: LUXURY_EASE }}
        className="max-w-md px-4 space-y-2"
      >
        <h3 
          className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-300 ${
            activeState ? 'text-blue-900' : 'text-slate-800'
          }`}
        >
          {step.title}
        </h3>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

interface StepConnectorProps {
  lineRef: RefObject<HTMLDivElement | null>;
  scrollYProgress: MotionValue<number>;
}

function StepConnector({ lineRef, scrollYProgress }: StepConnectorProps) {
  return (
    <div ref={lineRef} className="relative w-[2px] h-36 md:h-48 my-5 md:my-7 flex justify-center">
      {/* Background Track: Subtle brand-tinted blue hairline */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-blue-200/70 to-blue-100 rounded-full" />
      
      {/* Dynamic Scroll Fill: Rich, elegant NexaFlow blue gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-blue-500 via-blue-700 to-blue-900 rounded-full origin-top"
        style={{ scaleY: scrollYProgress }}
      />
    </div>
  );
}

export default function HowItWorks() {
  const step1Ref = useRef<HTMLDivElement>(null);
  const isStep1InView = useInView(step1Ref, { once: false, margin: "-15% 0px -15% 0px" });

  const line1Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: line1Progress } = useScroll({
    target: line1Ref,
    offset: ["start 75%", "end 45%"],
  });

  const [isLine1Touching, setIsLine1Touching] = useState(false);
  useMotionValueEvent(line1Progress, "change", (latest) => {
    setIsLine1Touching(latest >= 0.92);
  });

  const line2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: line2Progress } = useScroll({
    target: line2Ref,
    offset: ["start 75%", "end 45%"],
  });

  const [isLine2Touching, setIsLine2Touching] = useState(false);
  useMotionValueEvent(line2Progress, "change", (latest) => {
    setIsLine2Touching(latest >= 0.92);
  });

  return (
    <section id="how-it-works" className="w-full py-24 md:py-32 px-6 relative bg-slate-50/75 border-y border-slate-200/80">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-blue-900 mb-4"
          >
            <Route className="w-3.5 h-3.5 text-blue-800" />
            <span>Step-by-Step Architecture</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4 md:mb-5"
          >
            How it works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
            className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed"
          >
            From natural language instruction to autonomous enterprise workflow in three simple steps.
          </motion.p>
        </div>

        <div className="flex flex-col items-center">
          {/* Step 01: Activates when scrolled into view */}
          <div className="w-full flex flex-col items-center">
            <StepItem 
              step={steps[0]} 
              index={0} 
              isActive={isStep1InView} 
              itemRef={step1Ref}
            />
            {/* Connector between 01 and 02 */}
            <StepConnector lineRef={line1Ref} scrollYProgress={line1Progress} />
          </div>

          {/* Step 02: Activates only when Line 1 reaches/touches it */}
          <div className="w-full flex flex-col items-center">
            <StepItem 
              step={steps[1]} 
              index={1} 
              isActive={isLine1Touching} 
            />
            {/* Connector between 02 and 03 */}
            <StepConnector lineRef={line2Ref} scrollYProgress={line2Progress} />
          </div>

          {/* Step 03: Activates only when Line 2 reaches/touches it */}
          <div className="w-full flex flex-col items-center">
            <StepItem 
              step={steps[2]} 
              index={2} 
              isActive={isLine2Touching} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
