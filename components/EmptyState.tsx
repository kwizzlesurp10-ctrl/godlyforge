"use client";
import { motion } from "framer-motion";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
  illustration?: "anvil" | "sparkles" | "library";
}

export function EmptyState({ 
  title, 
  description, 
  action,
  illustration = "anvil" 
}: EmptyStateProps) {
  const illustrations = {
    anvil: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#F4A261" />
          </linearGradient>
        </defs>
        {/* Anvil base */}
        <rect x="20" y="75" width="80" height="25" rx="3" fill="#374151" />
        {/* Anvil top */}
        <rect x="35" y="55" width="50" height="22" rx="2" fill="url(#goldGrad)" />
        {/* Sparkles */}
        <circle cx="30" cy="35" r="3" fill="#22D3EE" className="animate-ping" />
        <circle cx="85" cy="30" r="2.5" fill="#FFD700" />
        <circle cx="70" cy="25" r="2" fill="#22D3EE" />
        {/* Hammer */}
        <rect x="88" y="48" width="18" height="6" rx="1" fill="#9CA3AF" transform="rotate(35 88 48)" />
      </svg>
    ),
    sparkles: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>
        <path d="M60 20 L65 45 L90 50 L65 55 L60 80 L55 55 L30 50 L55 45 Z" fill="url(#sparkleGrad)" />
        <circle cx="35" cy="75" r="4" fill="#FFD700" className="animate-pulse" />
        <circle cx="85" cy="70" r="3" fill="#22D3EE" />
      </svg>
    ),
    library: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="30" width="70" height="60" rx="4" fill="#374151" />
        <rect x="35" y="40" width="50" height="8" fill="#FFD700" opacity="0.6" />
        <rect x="35" y="52" width="50" height="8" fill="#22D3EE" opacity="0.5" />
        <rect x="35" y="64" width="50" height="8" fill="#A78BFA" opacity="0.4" />
        <circle cx="60" cy="85" r="8" fill="#FFD700" />
      </svg>
    )
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-6"
      >
        {illustrations[illustration]}
      </motion.div>
      
      <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
      <p className="max-w-md text-zinc-400 mb-8">{description}</p>
      
      {action && <div>{action}</div>}
    </div>
  );
}