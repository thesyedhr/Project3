import { motion, AnimatePresence } from 'motion/react';
import { X, AlertCircle, Copy, Check, KeyRound, Sparkles, ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NexaFlowLogo from './NexaFlowLogo';
import { useScrollLock } from '../utils/useScrollLock';

const VALID_EMAIL = 'prince@nexaflow.com';
const VALID_PASSWORD = 'createdbysyedhr';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  initialView = 'signup' 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  initialView?: 'login' | 'signup'
}) {
  const [view, setView] = useState(initialView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState<'email' | 'password' | null>(null);
  const [showWannaTryPrompt, setShowWannaTryPrompt] = useState(false);
  const [isWannaTryExpanded, setIsWannaTryExpanded] = useState(false);
  const navigate = useNavigate();

  // Sync internal view & reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setView(initialView);
      setEmail('');
      setPassword('');
      setError('');
      setCopiedField(null);
      setShowWannaTryPrompt(false);
      setIsWannaTryExpanded(false);
    }
  }, [isOpen, initialView]);

  // Lock background scroll while AuthModal is open
  useScrollLock(isOpen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (view === 'login') {
      if (!email.trim() && !password.trim()) {
        setError('Enter email and password');
        return;
      }
      if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
        setError('Incorrect email or password.');
        return;
      }
      onClose();
      navigate('/your-space');
    } else {
      if (!email.trim()) {
        setError('Enter email and password');
        return;
      }
      setShowWannaTryPrompt(true);
    }
  };

  const handleGoogleAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError('');
    if (view === 'signup') {
      setShowWannaTryPrompt(true);
    }
    
    // Trigger expansion animation on the Wanna Try section for 1 second
    setIsWannaTryExpanded(true);
    setTimeout(() => {
      setIsWannaTryExpanded(false);
    }, 1000);
  };

  const handleCopy = (text: string, field: 'email' | 'password') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleAutoFillAndLogin = () => {
    setEmail(VALID_EMAIL);
    setPassword(VALID_PASSWORD);
    setError('');
    onClose();
    navigate('/your-space');
  };

  const handleAutoFillOnly = () => {
    setEmail(VALID_EMAIL);
    if (view === 'login') {
      setPassword(VALID_PASSWORD);
    }
    setError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60]"
            onClick={onClose}
          />
          
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 pointer-events-none overflow-y-auto">
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col md:flex-row items-center md:items-stretch gap-5 max-w-4xl w-full justify-center pointer-events-auto my-auto"
            >
              {/* Main Auth Form Card */}
              <div
                className="w-full max-w-[400px] bg-white/95 backdrop-blur-2xl p-7 sm:p-8 rounded-[28px] border border-slate-200/80 relative pointer-events-auto shrink-0 flex flex-col justify-between overflow-hidden"
              >
                {/* Floating "Wanna Try?" Overlay Section for Signup View */}
                <AnimatePresence>
                  {showWannaTryPrompt && view === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        scale: isWannaTryExpanded ? 1.04 : 1, 
                        y: 0 
                      }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                      className="absolute inset-0 z-30 bg-white/98 backdrop-blur-2xl p-7 sm:p-8 rounded-[28px] border border-slate-200/80 flex flex-col items-center justify-between text-center"
                    >
                      <button 
                        onClick={() => setShowWannaTryPrompt(false)}
                        className="absolute top-5 right-5 z-40 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-colors cursor-pointer"
                        aria-label="Close prompt"
                        title="Close"
                      >
                        <X className="w-5 h-5 stroke-[2]" />
                      </button>

                      <div className="w-full my-auto flex flex-col items-center">
                        <NexaFlowLogo className="h-10 w-auto mb-4" />
                        
                        <h4 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                          Wanna Try?
                        </h4>

                        <p className="text-slate-600 text-[14px] leading-[20px] font-medium text-center mb-6 px-1">
                          To Experience the SyedHR's Professionalism in Designing and Developing Websites, Click Log in button below
                        </p>

                        <motion.button
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.985 }}
                          type="button"
                          onClick={() => {
                            setEmail(VALID_EMAIL);
                            setPassword(VALID_PASSWORD);
                            setShowWannaTryPrompt(false);
                            setView('login');
                          }}
                          className="w-full py-3.5 px-6 rounded-2xl font-bold bg-[#1e3a8a] text-white text-sm cursor-pointer hover:bg-[#183075] transition-all duration-200 flex items-center justify-center gap-2.5 group"
                        >
                          <span>Log in</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Close Button on Signup Card */}
                {view === 'signup' && (
                  <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 z-20 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-colors cursor-pointer"
                    aria-label="Close modal"
                    title="Close"
                  >
                    <X className="w-5 h-5 stroke-[2]" />
                  </button>
                )}

                <div>
                  <div className="flex flex-col items-center mb-6">
                    <NexaFlowLogo className="h-10 w-auto mb-3" />
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight text-center">
                      {view === 'signup' ? 'Get started free' : 'Welcome back'}
                    </h3>
                    <p className="text-slate-500 mt-1.5 text-center text-sm font-medium leading-snug">
                      {view === 'signup' 
                        ? 'No credit card required. Start automating in minutes.' 
                        : 'Log in to manage your automated workflows.'}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <motion.button 
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleGoogleAuth}
                      className="w-full py-3.5 px-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-center gap-3 font-semibold text-slate-800 text-sm shadow-2xs hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                      <span>Continue with Google</span>
                    </motion.button>
                    
                    <div className="relative py-1 flex items-center">
                      <div className="flex-grow border-t border-slate-200" />
                      <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-medium">or</span>
                      <div className="flex-grow border-t border-slate-200" />
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                      {error && (
                        <motion.div 
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center gap-2.5 text-rose-700 text-xs font-semibold"
                        >
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>{error}</span>
                        </motion.div>
                      )}

                      <div>
                        <input 
                          type="text" 
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError('');
                          }}
                          placeholder="Work Email" 
                          className={`w-full bg-white border ${error ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-200 hover:border-slate-300'} rounded-2xl px-4 py-3.5 text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/10 transition-all shadow-2xs`}
                        />
                      </div>

                      {view === 'login' && (
                        <div>
                          <input 
                            type="password" 
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              if (error) setError('');
                            }}
                            placeholder="Password" 
                            className={`w-full bg-white border ${error ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-200 hover:border-slate-300'} rounded-2xl px-4 py-3.5 text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/10 transition-all shadow-2xs`}
                          />
                        </div>
                      )}

                      <motion.button 
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full py-3.5 rounded-2xl font-bold bg-[#1e3a8a] text-white text-sm shadow-xs cursor-pointer transition-transform duration-200 mt-2 hover:bg-[#183075]"
                      >
                        {view === 'signup' ? 'Continue with Email' : 'Log in'}
                      </motion.button>
                    </form>
                  </div>
                </div>

                {/* ONLY Signup view HAS the bottom link "Already have an account? Log in" */}
                {view === 'signup' && (
                  <div className="mt-6 text-center text-sm">
                    <p className="text-slate-500 font-medium">
                      Already have an account?{' '}
                      <button 
                        onClick={() => {
                          setView('login');
                          setError('');
                        }} 
                        className="text-[#1e3a8a] font-bold hover:underline cursor-pointer ml-0.5"
                      >
                        Log in
                      </button>
                    </p>
                  </div>
                )}
              </div>

              {/* Side-by-Side "Wanna Try?" Floating Card (ONLY IN LOGIN VIEW) */}
              {view === 'login' && (
                <motion.div
                  animate={{
                    scale: isWannaTryExpanded ? 1.05 : 1
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 22
                  }}
                  className="w-full max-w-[400px] bg-white/95 backdrop-blur-2xl p-7 sm:p-8 rounded-[28px] border border-slate-200/80 relative flex flex-col justify-center shrink-0 z-10"
                >
                  {/* Integrated Top-Right Close Button on Second Card */}
                  <button 
                    onClick={onClose}
                    className="absolute top-5 right-5 z-20 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-colors cursor-pointer"
                    aria-label="Close modal"
                    title="Close"
                  >
                    <X className="w-5 h-5 stroke-[2]" />
                  </button>

                  <div className="flex flex-col">
                    <div className="flex items-center justify-center mb-2">
                      <h4 className="text-2xl font-bold text-slate-900 tracking-tight text-center">Wanna Try?</h4>
                    </div>

                    <p className="text-slate-600 text-[14px] leading-[19px] font-medium text-center mb-5">
                      By using the Credentials below, you can experience SyedHR's Pure Professionalism in Designing and Developing Websites
                    </p>

                    {/* Credentials Box */}
                    <div className="space-y-3 bg-[#f8fafc] p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs mb-4">
                      {/* Work Email */}
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Work Email
                        </span>
                        <div className="flex items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2.5">
                          <span className="text-xs font-semibold text-slate-800 truncate select-all">
                            {VALID_EMAIL}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(VALID_EMAIL, 'email')}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#1e3a8a] hover:bg-slate-100 transition-colors cursor-pointer shrink-0 flex items-center gap-1 text-[11px] font-medium"
                            title="Copy Work Email"
                          >
                            {copiedField === 'email' ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Password
                        </span>
                        <div className="flex items-center justify-between gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2.5">
                          <span className="text-xs font-semibold text-slate-800 truncate select-all">
                            {VALID_PASSWORD}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(VALID_PASSWORD, 'password')}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#1e3a8a] hover:bg-slate-100 transition-colors cursor-pointer shrink-0 flex items-center gap-1 text-[11px] font-medium"
                            title="Copy Password"
                          >
                            {copiedField === 'password' ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>{copiedField === 'password' ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-2.5">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="button"
                        onClick={handleAutoFillAndLogin}
                        className="w-full py-3.5 px-4 rounded-2xl bg-[#1e3a8a] text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-transform duration-200 hover:bg-[#183075]"
                      >
                        <span>Auto-Fill & Log In</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>

                      <button
                        type="button"
                        onClick={handleAutoFillOnly}
                        className="w-full py-2.5 px-4 rounded-xl bg-blue-50/80 hover:bg-blue-100/70 text-[#1e3a8a] font-semibold text-xs border border-blue-200/80 cursor-pointer transition-all text-center"
                      >
                        Fill Form Only
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
