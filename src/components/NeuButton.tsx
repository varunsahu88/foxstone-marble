import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface NeuButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'icon' | 'white' | 'accent';
}

export const NeuButton = ({ children, variant = 'primary', className = '', ...props }: NeuButtonProps) => {
  const baseClasses = "rounded-xl font-semibold transition-colors duration-200 outline-none flex items-center justify-center";
  
  const variants = {
    primary: "bg-cta text-white shadow-neu border border-white/5 active:shadow-neu-pressed py-3.5 px-8 hover:bg-cta/90 transition-all",
    secondary: "bg-bg-base text-primary shadow-neu border border-primary/10 active:shadow-neu-pressed py-3.5 px-8 hover:text-white transition-all",
    white: "bg-white/90 backdrop-blur-md text-bg-base shadow-neu active:shadow-neu-pressed py-3.5 px-8 font-black hover:bg-white transition-all",
    icon: "bg-bg-base text-text-main shadow-neu active:shadow-neu-pressed p-3.5 rounded-full border border-primary/5",
    accent: "bg-accent text-bg-base shadow-gold font-black py-4 px-10 rounded-full hover:scale-105 active:scale-95 transition-all uppercase tracking-widest shadow-neu"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
