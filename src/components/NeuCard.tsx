import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface NeuCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  interactive?: boolean;
  variant?: 'default' | 'glass';
}

export const NeuCard = ({ children, className = '', interactive = false, variant = 'default', ...props }: NeuCardProps) => {
  const isGlass = variant === 'glass';
  
  return (
    <motion.div
      whileHover={interactive ? { 
        y: -8, 
        scale: 1.01,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      } : {}}
      className={`
        relative rounded-2xl md:rounded-[2.5rem] overflow-hidden transition-all duration-300
        ${isGlass 
          ? 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl' 
          : 'bg-bg-base shadow-neu border border-white/5'}
        ${interactive ? 'cursor-pointer' : ''} 
        ${className}
      `}
      {...props}
    >
      {/* Subtle Marble Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};
