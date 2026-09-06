import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Quote 
} from 'lucide-react';

export interface ReviewItem {
  id: string | number;
  initials?: string;
  name?: string;
  role?: string;
  rating?: number;
  headline?: string;
  quote?: string;
  timeAgo?: string;
}

interface ReviewsSectionProps {
  items?: ReviewItem[];
  autoPlayInterval?: number;
}

const defaultReviews: ReviewItem[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'COO, Brightside Marketing',
    initials: 'SM',
    rating: 5,
    headline: 'Eliminated 20+ hours of busywork',
    quote: "NexaFlow eliminated hours of repetitive work from our team's week. We finally spend our time on clients instead of spreadsheets.",
    timeAgo: '2d ago',
  },
  {
    id: 2,
    name: 'James Peterson',
    role: 'Founder, Elevate Real Estate',
    initials: 'JP',
    rating: 5,
    headline: 'Like having a 24/7 AI employee',
    quote: "The AI agent qualified our leads faster than our SDR team ever could. It's like having a 24/7 employee that never makes mistakes.",
    timeAgo: '5d ago',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Head of Operations, Lumière',
    initials: 'ER',
    rating: 5,
    headline: 'Connected our tools in 3 sentences',
    quote: "We connected Shopify and our CRM in literally three sentences. No Zapier headaches, no API docs. Just pure automation magic.",
    timeAgo: '1w ago',
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'VP Engineering, PulseStack',
    initials: 'DC',
    rating: 5,
    headline: 'Flawless workflow orchestration',
    quote: "The visual workflow engine and intelligent triggers replaced four separate subscriptions. Our entire ops pipeline runs smoothly.",
    timeAgo: '2w ago',
  },
  {
    id: 5,
    name: 'Maya Lin',
    role: 'Director of Growth, Veloce',
    initials: 'ML',
    rating: 5,
    headline: 'Doubled our conversion speed',
    quote: "From automated onboarding emails to instant CRM syncing, our response times dropped from hours to seconds.",
    timeAgo: '3w ago',
  },
];

export const ReviewsSectionLayout: React.FC<ReviewsSectionProps> = ({
  items = defaultReviews,
  autoPlayInterval = 4500,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [handleNext, isPaused, autoPlayInterval]);

  const getPosition = (index: number) => {
    const diff = (index - currentIndex + items.length) % items.length;
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -(items.length - 1)) return 'right';
    if (diff === items.length - 1 || diff === -1) return 'left';
    return 'hidden';
  };

  return (
    <section 
      id="verified-reviews" 
      className="scroll-spy-section py-20 lg:py-28 relative overflow-hidden z-10 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header Layout */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100/80 text-xs font-semibold text-blue-900 mb-4"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" />
            <span>Verified Customer Stories</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-5 tracking-tight"
          >
            Trusted by modern teams
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: LUXURY_EASE }}
            className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed"
          >
            See how high-growth teams automate their operations with NexaFlow.
          </motion.p>
          
          {/* Floating Rating Pill Layout with visible frosted glass */}
          <div className="inline-flex items-center gap-2.5 px-6 py-2.5 glass-pill rounded-full shadow-xs">
            <div className="flex items-center gap-1 text-slate-900">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-slate-900 text-slate-900" />
              ))}
            </div>
            <span className="w-1 h-1 rounded-full bg-slate-300 mx-1" />
            <span className="text-xs sm:text-sm font-semibold text-slate-900">4.9 / 5.0 (500+ reviews)</span>
          </div>
        </div>

        {/* 3D Interactive Carousel Viewport */}
        <div 
          className="relative h-[480px] sm:h-[440px] md:h-[400px] flex items-center justify-center [perspective:1000px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {items.map((item, index) => {
            const diff = (index - currentIndex + items.length) % items.length;
            const xPos = diff === 0 ? '0%' : diff === 1 ? '105%' : diff === items.length - 1 ? '-105%' : diff <= items.length / 2 ? '200%' : '-200%';

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={{
                  x: xPos,
                  scale: diff === 0 ? 1 : 0.85,
                  opacity: diff === 0 ? 1 : (diff === 1 || diff === items.length - 1) ? 0.4 : 0,
                  zIndex: diff === 0 ? 30 : (diff === 1 || diff === items.length - 1) ? 20 : 0,
                  pointerEvents: diff === 0 ? 'auto' : 'none',
                }}
                transition={{
                  duration: 0.45,
                  ease: LUXURY_EASE,
                }}
                className="absolute w-full max-w-lg px-4"
              >
                <div className="glass-panel p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between h-[360px] sm:h-[320px]">
                  
                  {/* Top Ambient Specular Sheen */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/60 via-white/20 to-transparent pointer-events-none" />

                  {/* Decorative Background Quote Icon */}
                  <Quote className="absolute right-6 top-6 w-20 h-20 text-slate-900/[0.04] -rotate-12 pointer-events-none" />

                  {/* Top Bar: Star Ratings & Verification Chip */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className="flex items-center gap-1 text-slate-900">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-slate-900 text-slate-900" />
                        ))}
                      </div>
                      
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100/80 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-800" />
                        <span className="text-xs font-semibold text-blue-900">Verified User</span>
                      </div>
                    </div>

                    {/* Headline & Body Text */}
                    <div className="space-y-3 mb-6">
                      {item.headline ? (
                        <h4 className="font-bold text-lg text-slate-900 tracking-tight">{item.headline}</h4>
                      ) : (
                        <div className="h-6 w-3/4 bg-slate-200 rounded" />
                      )}
                      
                      {item.quote ? (
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 font-normal">
                          "{item.quote}"
                        </p>
                      ) : (
                        <div className="space-y-2">
                          <div className="h-4 w-full bg-slate-200 rounded" />
                          <div className="h-4 w-5/6 bg-slate-200 rounded" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: User Monogram & Verification Details */}
                  <div className="pt-4 border-t border-slate-200/50 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center uppercase tracking-wider shadow-sm shrink-0">
                        {item.initials || (item.name ? item.name.split(' ').map(n => n[0]).join('') : 'U')}
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-slate-900">{item.name || 'Verified Customer'}</div>
                        <div className="text-xs text-slate-500">{item.role || 'Enterprise Member'}</div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-slate-400 hidden sm:block">
                      {item.timeAgo || 'Verified Customer'}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}

          {/* Navigation Controls */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={handlePrev}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-4 z-40 w-11 h-11 rounded-full bg-white/90 border border-slate-200 text-slate-900 flex items-center justify-center hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-colors cursor-pointer shadow-xs"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={handleNext}
            aria-label="Next slide"
            className="absolute right-2 sm:right-4 z-40 w-11 h-11 rounded-full bg-white/90 border border-slate-200 text-slate-900 flex items-center justify-center hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-colors cursor-pointer shadow-xs"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === i 
                  ? 'w-8 h-2 bg-blue-900' 
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ReviewsSectionLayout;
