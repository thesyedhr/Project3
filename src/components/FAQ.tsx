import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    q: "What is NexaFlow?",
    a: "NexaFlow is an AI-powered automation platform that helps businesses connect their tools and automate repetitive tasks using plain English commands instead of complex code."
  },
  {
    q: "Do I need coding experience?",
    a: "Not at all. If you can describe your workflow in a sentence (e.g., 'When I get an email, save the attachment to Drive'), NexaFlow can build and run it."
  },
  {
    q: "What tools can I connect?",
    a: "We natively support over 100+ business tools including Gmail, Slack, HubSpot, Salesforce, Notion, Shopify, Google Sheets, and more."
  },
  {
    q: "Is there a free trial?",
    a: "Yes! We offer a fully-featured 14-day free trial on all our plans. No credit card is required to sign up."
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, there are no long-term contracts. You can upgrade, downgrade, or cancel your subscription at any time right from your dashboard."
  },
  {
    q: "Is my data secure?",
    a: "Security is our top priority. We use bank-level encryption for all data in transit and at rest, and we comply with GDPR and SOC2 standards."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="w-full py-24 md:py-32 px-6 relative bg-slate-50/75 border-y border-slate-200/80">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
      <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100/80 text-xs font-semibold text-blue-900 mb-4"
        >
          <HelpCircle className="w-3.5 h-3.5 text-blue-800" />
          <span>Got Questions?</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: LUXURY_EASE }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4 md:mb-5"
        >
          Frequently asked questions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
          className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed"
        >
          Everything you need to know about setting up and automating your workflows.
        </motion.p>
      </div>

      <div className="space-y-3.5 max-w-3xl mx-auto hover-group">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.06, ease: LUXURY_EASE }}
            className={`overflow-hidden transition-all duration-300 hover-item ${
              openIndex === index 
                ? 'glass-panel ring-1 ring-blue-100 shadow-[0_4px_20px_0_rgba(15,23,42,0.06)]' 
                : 'glass-panel'
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50/70 transition-colors cursor-pointer"
            >
              <span className={`text-base sm:text-lg font-bold transition-colors ${openIndex === index ? 'text-blue-950' : 'text-slate-900'}`}>{faq.q}</span>
              <ChevronDown 
                className={`w-5 h-5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${openIndex === index ? 'rotate-180 text-blue-900' : 'text-slate-400'}`} 
              />
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: LUXURY_EASE }}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 leading-relaxed text-sm sm:text-base font-normal border-t border-slate-100/80 pt-3">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
