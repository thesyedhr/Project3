import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NexaFlowLogo from './NexaFlowLogo';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 85;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = Math.max(0, elementPosition - headerOffset);
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    } else {
      navigate(`/${href}`);
    }
  };

  return (
    <footer className="w-full border-t border-slate-200/80 bg-slate-50/70 backdrop-blur-2xl pt-16 pb-8 px-6 mt-12 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-3 text-[17px] cursor-pointer text-left group w-fit select-none"
            title="Scroll to top"
          >
            <NexaFlowLogo className="h-9 sm:h-10 w-auto shrink-0 group-hover:scale-[1.04] transition-transform duration-200" />
            <span className="text-[29px] font-bold text-slate-900 tracking-tight">
              NexaFlow
            </span>
          </button>
          <p className="text-[15px] text-slate-600 leading-[20.75px]">
            <span className="text-blue-900 font-semibold">Automate the work. Not your team.</span><br/>
            The AI workflow platform for growing businesses.
          </p>
        </div>

        <div className="flex flex-col gap-4 leading-[24px]">
          <h4 className="font-bold text-slate-900">Product</h4>
          <a href="#features" onClick={(e) => handleSectionClick(e, '#features')} className="text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">Features</a>
          <a href="#how-it-works" onClick={(e) => handleSectionClick(e, '#how-it-works')} className="text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">How it Works</a>
          <a href="#integrations" onClick={(e) => handleSectionClick(e, '#integrations')} className="text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">Integrations</a>
          <a href="#roi-calculator" onClick={(e) => handleSectionClick(e, '#roi-calculator')} className="text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">ROI Calculator</a>
          <a href="#pricing" onClick={(e) => handleSectionClick(e, '#pricing')} className="text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">Pricing</a>
          <a href="#security" onClick={(e) => handleSectionClick(e, '#security')} className="text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">Security & Trust</a>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-slate-900">Resources</h4>
          <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Documentation</a>
          <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Blog</a>
          <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Community</a>
          <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Guides</a>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-slate-900">Company</h4>
          <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">About Us</a>
          <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Careers</a>
          <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Contact</a>
          <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Legal</a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-200">
        <p className="text-xs text-slate-500 mb-4 md:mb-0">
          © {new Date().getFullYear()} NexaFlow Inc. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
          </a>
          <a href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
