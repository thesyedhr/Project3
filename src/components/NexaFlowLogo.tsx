import { useState } from 'react';

interface NexaFlowLogoProps {
  className?: string;
  variant?: 'badge' | 'glyph';
}

export const NEXAFLOW_LOGO_URL = `${import.meta.env.BASE_URL || '/'}nexaflow_logo.png`.replace(/([^:]\/)\/+/g, "$1");

export default function NexaFlowLogo({ 
  className = "h-8 w-auto", 
}: NexaFlowLogoProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
      {!imageError ? (
        <img 
          src={NEXAFLOW_LOGO_URL}
          alt="NexaFlow"
          onError={() => setImageError(true)}
          className="h-full w-auto max-h-full object-contain block"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      ) : (
        <svg
          viewBox="0 0 40 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto"
          aria-label="NexaFlow"
        >
          <path
            d="M 20 11 C 15 4 7 4 7 11 C 7 18 15 18 20 11 C 25 4 33 4 33 11 C 33 18 25 18 20 11 Z"
            stroke="#0F172A"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}


