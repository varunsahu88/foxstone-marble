import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * ParallaxImage Component - Ultra Smooth & Lightweight
 */
export const ParallaxImage: React.FC<ParallaxImageProps> = ({ src, alt, className = "" }) => {
   const ref = useRef(null);
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
   });

   const smoothProgress = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
   });

   const y = useTransform(smoothProgress, [0, 1], ["-8%", "8%"]);

   return (
      <div 
         ref={ref} 
         className={`relative overflow-hidden ${className}`}
         style={{ transform: 'translate3d(0,0,0)' }}
      >
         <motion.img
            src={src}
            alt={alt}
            style={{ 
               y, 
               scale: 1.15,
               willChange: 'transform'
            }}
            className="absolute inset-0 w-full h-full object-cover"
         />
      </div>
   );
};

interface SlideRevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  className?: string;
  duration?: number;
}

/**
 * SlideReveal Component - High Performance & Persistent
 * Animates on every entrance (up and down) while maintaining GPU smoothness.
 */
export const SlideReveal: React.FC<SlideRevealProps> = ({ 
  children, 
  direction = 'left', 
  delay = 0, 
  className = "",
  duration = 0.8
}) => {
   const variants = {
      hidden: {
         x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
         y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
         opacity: 0,
         filter: 'blur(4px)'
      },
      visible: {
         x: 0,
         y: 0,
         opacity: 1,
         filter: 'blur(0px)',
         transition: { 
            duration, 
            delay, 
            ease: [0.22, 1, 0.36, 1] as any
         }
      }
   };

   return (
      <motion.div
         variants={variants}
         initial="hidden"
         whileInView="visible"
         viewport={{ margin: "-5%", once: false }} // Enabled 'once: false' for repeat animations on scroll
         style={{ willChange: 'transform, opacity' }}
         className={className}
      >
         {children}
      </motion.div>
   );
};
