import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 19,
    annualPrice: 15,
    for: 'For individuals and small teams.',
    features: [
      '5 workflows',
      '1,000 tasks/month',
      'Basic AI automation',
      '5 integrations',
      'Email support'
    ],
    cta: 'Start for free',
    popular: false
  },
  {
    name: 'Growth',
    monthlyPrice: 49,
    annualPrice: 39,
    for: 'For growing businesses.',
    features: [
      'Unlimited workflows',
      '10,000 tasks/month',
      'Advanced AI agents',
      '25 integrations',
      'Analytics',
      'Priority support'
    ],
    cta: 'Get Started',
    popular: true
  },
  {
    name: 'Scale',
    monthlyPrice: 149,
    annualPrice: 119,
    for: 'For businesses with advanced needs.',
    features: [
      'Unlimited workflows',
      '50,000 tasks/month',
      'Advanced AI agents',
      'Unlimited integrations',
      'Team management',
      'Advanced analytics',
      'Dedicated support'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function Pricing({ onOpenAuth }: { onOpenAuth?: (view: 'login' | 'signup') => void }) {
  const [isAnnual, setIsAnnual] = useState(true);

  const handlePlanAction = (_planName: string) => {
    if (onOpenAuth) {
      onOpenAuth('signup');
    } else {
      toast.info(`Selected ${_planName}`, {
        description: `Sign up or log in to get started.`
      });
    }
  };

  return (
    <section id="pricing" className="w-full py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100/80 text-xs font-semibold text-blue-900 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-800" />
            <span>Predictable Pricing</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-5 tracking-tight"
          >
            Simple, transparent pricing
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: LUXURY_EASE }}
            className="text-slate-600 max-w-xl mx-auto text-base sm:text-lg mb-6 font-normal leading-relaxed"
          >
            Choose the plan that fits your business scale. Upgrade, downgrade, or cancel anytime.
          </motion.p>
        </div>

        {/* Billing Toggle: Refined pill design matching reference */}
        <div className="flex justify-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: LUXURY_EASE }}
            className="inline-flex items-center p-1 rounded-full bg-white border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative px-6 rounded-full font-semibold transition-colors duration-200 cursor-pointer text-[14px] h-[27.45px] flex items-center justify-center ${
                !isAnnual ? 'text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {!isAnnual && (
                <motion.div
                  layoutId="billingPill"
                  className="absolute inset-0 bg-[#1e3a8a] rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>

            <button
              onClick={() => setIsAnnual(true)}
              className={`relative px-5 rounded-full font-semibold transition-colors duration-200 flex items-center gap-2 cursor-pointer text-[14px] h-[27.45px] ${
                isAnnual ? 'text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isAnnual && (
                <motion.div
                  layoutId="billingPill"
                  className="absolute inset-0 bg-[#1e3a8a] rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">Annual</span>
              <span className="relative z-10 text-[10px] font-bold tracking-tight px-2 py-0.5 rounded-full bg-[#1e3a8a] text-white">
                SAVE 20%
              </span>
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards Grid - Refined with rounded-32px and exact reference spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto hover-group">
          {plans.map((plan, index) => {
            const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  opacity: { duration: 0.65, delay: index * 0.08, ease: LUXURY_EASE },
                  y: { duration: 0.65, delay: index * 0.08, ease: LUXURY_EASE },
                  default: { duration: 0.3, ease: LUXURY_EASE }
                }}
                className={`relative flex flex-col justify-between p-8 sm:p-10 cursor-default hover-item rounded-[32px] transition-all duration-400 ${
                  plan.popular 
                    ? 'bg-white ring-1 ring-slate-200 shadow-[0_24px_48px_-12px_rgba(30,58,138,0.1)]' 
                    : 'bg-white border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)]'
                }`}
              >
                {plan.popular ? (
                  <div className="absolute -top-[13.7px] left-1/2 -translate-x-1/2 px-4 h-[27.45px] rounded-full bg-[#1e3a8a] text-white text-[14px] font-bold tracking-wide z-20 flex items-center justify-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                    <span>Popular</span>
                  </div>
                ) : null}
                
                {/* Header */}
                <div className="relative z-10">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-5xl font-bold text-slate-900 tracking-tight">${currentPrice}</span>
                      <span className="text-slate-400 font-medium text-base">/month</span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{plan.for}</p>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-4 mb-10 pt-8 border-t border-slate-100">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          plan.popular
                            ? 'bg-[#1e3a8a] text-white'
                            : 'bg-blue-50/50 border border-blue-100/50 text-blue-600'
                        }`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-slate-600 text-[14px] font-semibold">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-2 relative z-10">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    onClick={() => handlePlanAction(plan.name)}
                    className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center ${
                      plan.popular
                        ? 'bg-[#1e3a8a] text-white shadow-[0_8px_20px_-4px_rgba(30,58,138,0.3)] hover:bg-[#183075]'
                        : 'bg-blue-50/80 hover:bg-blue-100/70 text-[#1e3a8a] border border-blue-200/80 hover:border-blue-300'
                    }`}
                  >
                    <span>{plan.cta}</span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



