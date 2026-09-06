import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LogOut, Sparkles, CheckCircle2, CreditCard, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NexaFlowLogo from './NexaFlowLogo';
import { useScrollLock } from '../utils/useScrollLock';
import { CURRENT_USER_SUBSCRIPTION } from '../utils/userSubscription';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export default function AuthNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({ left: 0, width: 0, opacity: 0 });
  const location = useLocation();
  const navigate = useNavigate();

  // Throttled RAF scroll spy logic
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock background scroll when mobile menu drawer is open
  useScrollLock(mobileMenuOpen);

  const navLinks = [
    { name: 'Your Space', href: '/your-space' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Security', href: '/security' },
    { name: 'ROI', href: '/pricing' },
    { name: 'Builder', href: '/builder' },
    { name: 'Features', href: '/features' },
    { name: 'Upcoming Features', href: '/upcoming-features' },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/your-space') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      navigate('/your-space');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    if (location.pathname === href) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
  };

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
  }, [location.pathname, scrolled]);

  const handleLogout = () => {
    navigate('/');
  };

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
            {/* Left Brand - Scroll Spy Logo Logic */}
            <div className="flex items-center shrink-0 z-10">
              <Link to="/your-space" onClick={handleLogoClick} className="flex items-center group shrink-0 py-1">
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
              </Link>
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
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    data-active={isActive}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className={`text-sm font-semibold transition-colors relative group px-3.5 py-1.5 rounded-full flex items-center justify-center leading-none z-10 ${
                      isActive ? 'text-blue-900' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="relative select-none whitespace-nowrap">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth - Locked Right Edge with Profile Pill & Logout */}
            <div className="hidden md:flex items-center shrink-0 z-10">
              <motion.div 
                animate={{
                  backgroundColor: scrolled ? 'rgba(248, 250, 252, 0.95)' : 'rgba(248, 250, 252, 0.75)',
                  boxShadow: scrolled 
                    ? '0 2px 10px -2px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.9)' 
                    : '0 1px 3px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(226, 232, 240, 0.6)',
                }}
                transition={{ 
                  duration: 0.35, 
                  ease: LUXURY_EASE
                }}
                className="flex items-center justify-center gap-2.5 px-4 h-[38px] rounded-full border border-slate-200/80 shrink-0 cursor-default select-none"
              >
                <div className="w-6 h-6 rounded-full border border-slate-200 overflow-hidden flex items-center justify-center bg-white shrink-0">
                  <img 
                    src={CURRENT_USER_SUBSCRIPTION.avatarUrl} 
                    alt="PRINCE" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=PRINCE";
                    }}
                  />
                </div>
                <span className="text-[13px] font-bold text-slate-800 uppercase tracking-wider whitespace-nowrap leading-none">PRINCE</span>
              </motion.div>

              <AnimatePresence initial={false}>
                {!scrolled && (
                  <motion.div
                    key="logout-btn"
                    initial={{ opacity: 0, width: 0, scale: 0.92, marginLeft: 0 }}
                    animate={{ opacity: 1, width: 'auto', scale: 1, marginLeft: 8 }}
                    exit={{ opacity: 0, width: 0, scale: 0.92, marginLeft: 0 }}
                    transition={{ duration: 0.35, ease: LUXURY_EASE }}
                    className="overflow-hidden whitespace-nowrap shrink-0 flex items-center"
                  >
                    <button
                      onClick={handleLogout}
                      className="group text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all duration-200 cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-100/70 border border-transparent hover:border-slate-200/70 shrink-0 hover:scale-[1.02] active:scale-[0.98]"
                      title="Sign out"
                    >
                      <LogOut className="w-3.5 h-3.5 shrink-0 text-slate-500 group-hover:text-slate-800 transition-colors" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
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
            className="fixed inset-0 z-40 bg-[#f1f5f9]/95 backdrop-blur-3xl pt-32 px-6 flex flex-col md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-5 items-center text-center">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                    className={`text-xl font-medium transition-colors ${
                      isActive ? 'text-blue-900 font-bold' : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="w-full h-px bg-slate-200 my-2" />
              
              {/* User Badge in Mobile */}
              <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-200 w-full max-w-xs shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden flex items-center justify-center bg-slate-50">
                    <img 
                      src={CURRENT_USER_SUBSCRIPTION.avatarUrl} 
                      alt="PRINCE" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <span className="text-base font-bold text-slate-800 uppercase tracking-wider block leading-tight">PRINCE</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="text-base font-semibold bg-slate-200 text-slate-800 px-8 py-3 rounded-full w-full max-w-xs mt-2 hover:bg-slate-300 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

