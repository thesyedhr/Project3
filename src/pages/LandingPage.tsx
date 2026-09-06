import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Integrations from '../components/Integrations';
import RoiCalculator from '../components/RoiCalculator';
import Pricing from '../components/Pricing';
import EnterpriseSecurity from '../components/EnterpriseSecurity';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

const SectionSeparator = () => (
  <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-200/80 to-transparent" />
);

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full flex flex-col items-center">
    {children}
  </div>
);

export default function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('signup');

  const openAuth = (view: 'login' | 'signup') => {
    setAuthView(view);
    setIsAuthOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-white">
      {/* Ambient background glows for unified flow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/60 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] rounded-full bg-slate-50/80 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] rounded-full bg-blue-50/40 blur-[120px]" />
      </div>
      
      {/* Subtle Grid Pattern for crisp architectural texture on pure white */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <Navbar onOpenAuth={openAuth} />
      
      <main className="relative z-10 flex flex-col items-center w-full">
        <Hero onStartFree={() => openAuth('signup')} />
        <SectionSeparator />
        <SectionWrapper><Features /></SectionWrapper>
        <SectionWrapper><HowItWorks /></SectionWrapper>
        <SectionWrapper><Integrations onOpenAuth={() => openAuth('signup')} /></SectionWrapper>
        <SectionWrapper><RoiCalculator onOpenAuth={() => openAuth('signup')} /></SectionWrapper>
        <SectionWrapper><Pricing onOpenAuth={openAuth} /></SectionWrapper>
        <SectionWrapper><EnterpriseSecurity onOpenAuth={() => openAuth('signup')} /></SectionWrapper>
        <SectionWrapper><Testimonials /></SectionWrapper>
        <SectionWrapper><FAQ /></SectionWrapper>
      </main>

      <Footer />
      
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} initialView={authView} />
    </div>
  );
}
