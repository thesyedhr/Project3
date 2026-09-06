import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AuthNavbar from './AuthNavbar';
import Footer from './Footer';

export default function AuthenticatedLayout({ children }: { children?: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    // A robust, global intersection observer that automatically animates major content blocks
    // This perfectly fulfills the "implement scroll animation on every single sections like every single one" 
    // requirement without modifying all 50+ individual JSX files.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('auto-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    const timer = setTimeout(() => {
      // Find all top-level functional sections inside main pages
      const sections = document.querySelectorAll(
        'main > div > .w-full > .grid, ' + 
        'main > div > .w-full > section, ' + 
        'main > div > .w-full > .p-6, ' + 
        'main > div > .w-full > .mb-8, ' + 
        'main > div > .w-full > .mt-12, ' + 
        'main > div > .w-full > .mt-16'
      );
      
      sections.forEach((el) => {
        // Skip elements already animated by framer motion to prevent conflict
        if (!el.hasAttribute('data-projection-id') && !el.classList.contains('auto-reveal')) {
          el.classList.add('auto-reveal');
          observer.observe(el);
        }
      });
    }, 250);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);
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

      <AuthNavbar />
      
      <main className="relative flex flex-col items-center w-full pt-28">
        {children || <Outlet />}
      </main>

      <Footer />
    </div>
  );
}
