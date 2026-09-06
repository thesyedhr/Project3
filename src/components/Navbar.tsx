import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import NexaFlowLogo from './NexaFlowLogo';
import { useScrollLock } from '../utils/useScrollLock';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar({ onOpenAuth }: { onOpenAuth: (v: 'login' | 'signup') => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({ left: 0, width: 0, opacity: 0 });
  const isClickNavigatingRef = useRef<boolean>(false);
  const clickNavTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lock background scroll when mobile menu drawer is open
  useScrollLock(mobileMenuOpen);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (clickNavTimerRef.current) clearTimeout(clickNavTimerRef.current);
    isClickNavigatingRef.current = true;
    setActiveSection('');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setMobileMenuOpen(false);
    clickNavTimerRef.current = setTimeout(() => {
      isClickNavigatingRef.current = false;
    }, 850);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    // Set active section immediately on user click and lock scroll spy during travel so indicator glides straight without flicker
    if (clickNavTimerRef.current) clearTimeout(clickNavTimerRef.current);
    isClickNavigatingRef.current = true;
    setActiveSection(href);
    
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - headerOffset);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
    clickNavTimerRef.current = setTimeout(() => {
      isClickNavigatingRef.current = false;
    }, 850);
  };

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Integrations', href: '#integrations' },
    { name: 'ROI', href: '#roi-calculator' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Security', href: '#security' },
    { name: 'FAQ', href: '#faq' },
  ];

  // Update sideways-only active indicator coordinates strictly along horizontal X axis for buttery smooth gliding
  const updateIndicator = () => {
    if (!navContainerRef.current) return;
    const activeLink = navContainerRef.current.querySelector<HTMLAnchorElement>(`[data-active="true"]`);
    if (activeLink) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      if (linkRect.width > 0) {
        setIndicatorStyle({
          left: linkRect.left - containerRect.left,
          width: linkRect.width,
          opacity: 1,
        });
      }
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  };

  useEffect(() => {
    updateIndicator();
    const timer = setTimeout(updateIndicator, 50);
    const observer = new ResizeObserver(updateIndicator);
    if (navContainerRef.current) {
      observer.observe(navContainerRef.current);
    }
    window.addEventListener('resize', updateIndicator);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeSection, scrolled]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Transition only as user scrolls past the hero section completely
          const heroSection = document.getElementById('hero');
          if (heroSection) {
            const rect = heroSection.getBoundingClientRect();
            setScrolled(rect.bottom <= 80);
          } else {
            setScrolled(window.scrollY > 200);
          }

          // Dynamic scroll-spy tracking during manual page scrolling (locked out during click transitions)
          if (!isClickNavigatingRef.current) {
            const sectionIds = navLinks.map(link => link.href.substring(1));
            let currentActive = '';
            
            for (let i = sectionIds.length - 1; i >= 0; i--) {
              const section = document.getElementById(sectionIds[i]);
              if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 160) {
                  currentActive = `#${sectionIds[i]}`;
                  break;
                }
              }
            }

            // If user is at top / in hero section, clear active section
            if (window.scrollY < 120) {
              currentActive = '';
            }

            setActiveSection(currentActive);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      if (clickNavTimerRef.current) clearTimeout(clickNavTimerRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-5 sm:py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              maxWidth: scrolled ? 1160 : 1360,
            }}
            transition={{ 
              duration: 0.4, 
              ease: LUXURY_EASE,
            }}
            className={`w-full h-[62px] relative flex items-center justify-between mx-auto rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              scrolled
                ? 'px-5 sm:px-7 bg-white/85 backdrop-blur-2xl shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-200/70'
                : 'px-6 sm:px-8 bg-white/75 backdrop-blur-xl border border-slate-200/50 shadow-[0_2px_8px_rgba(15,23,42,0.02)]'
            }`}
          >
            {/* Left Brand */}
            <div className="flex items-center shrink-0 z-10">
              <a href="#" onClick={handleScrollToTop} className="flex items-center group shrink-0 py-1">
                <NexaFlowLogo className="h-5 sm:h-6 w-auto shrink-0 group-hover:scale-[1.04] transition-transform duration-200" />

                <AnimatePresence initial={false}>
                  {!scrolled && (
                    <motion.span
                      key="brand-wordmark"
                      initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                      animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
                      exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                      transition={{ duration: 0.35, ease: LUXURY_EASE }}
                      className="text-[21px] font-bold tracking-tight text-slate-900 leading-none overflow-hidden whitespace-nowrap select-none inline-block"
                    >
                      NexaFlow
                    </motion.span>
                  )}
                </AnimatePresence>
              </a>
            </div>

            {/* Centered Desktop Nav - Locked Dead Center with Sideways-Only Sliding Pill */}
            <div 
              ref={navContainerRef}
              className="hidden md:flex items-center justify-center gap-1 lg:gap-1.5 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-auto z-10"
            >
              {/* Smooth Liquid Gliding Pill (Strict horizontal sideways glide) */}
              <motion.div
                className="absolute top-0 bottom-0 my-auto h-[32px] bg-blue-50 border border-blue-200/80 rounded-full pointer-events-none shadow-xs"
                initial={false}
                animate={{
                  x: indicatorStyle.left,
                  width: indicatorStyle.width,
                  opacity: indicatorStyle.opacity,
                }}
                transition={{
                  x: { type: 'spring', stiffness: 320, damping: 30, mass: 0.5 },
                  width: { type: 'spring', stiffness: 320, damping: 30, mass: 0.5 },
                  opacity: { duration: 0.2, ease: LUXURY_EASE },
                }}
                style={{ left: 0, zIndex: 0 }}
              />

              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    data-active={isActive}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-sm font-semibold transition-colors relative group px-3.5 py-1.5 rounded-full flex items-center justify-center leading-none z-10 ${
                      isActive ? 'text-blue-900' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="relative select-none whitespace-nowrap">{link.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4 shrink-0 z-10">
              <button
                onClick={() => onOpenAuth('login')}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer leading-none flex items-center"
              >
                Log in
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-5 rounded-full text-xs sm:text-sm font-semibold bg-[#1e3a8a] text-white transition-transform duration-200 cursor-pointer shadow-xs flex items-center justify-center text-center leading-none hover:scale-[1.02] active:scale-[0.98]"
                style={{ height: '32px' }}
              >
                Start free
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </motion.nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#f1f5f9]/95 backdrop-blur-3xl pt-32 px-6 flex flex-col md:hidden"
          >
            <div className="flex flex-col gap-6 items-center text-center">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-2xl font-medium transition-colors ${
                      isActive ? 'text-blue-900 font-bold' : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="w-full h-px bg-slate-200 my-4" />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="text-xl font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="text-xl font-medium bg-blue-900 text-white px-8 py-4 rounded-full w-full mt-4 hover:bg-slate-800 transition-colors"
              >
                Start free
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
