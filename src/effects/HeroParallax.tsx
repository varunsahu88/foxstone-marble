import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from './heroParallax.module.css';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * HeroParallax Component
 * Provides isolated scroll-based movement for the hero section.
 * - Background layer: 0.3x speed
 * - Middle/Image layer: 0.6x speed
 * - Text/Foreground: 1x speed with fade-in
 */
export const HeroParallax: React.FC<HeroParallaxProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Background moves slow (0.3x) - mapping 0->1 to 0px -> 150px
  const bgY = useTransform(smoothProgress, [0, 1], ["0px", "150px"]);
  
  // Content floats up (0.6x) - mapping 0->1 to 0px -> -80px
  const contentY = useTransform(smoothProgress, [0, 1], ["0px", "-80px"]);
  
  // Opacity fade
  const fadeOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  return (
    <motion.div 
      ref={containerRef} 
      style={{ 
        opacity: fadeOpacity,
        // Drive CSS variables for internal elements
        ["--bg-y" as any]: bgY,
        ["--content-y" as any]: contentY
      }}
      className={styles.heroWrapper}
    >
      {children}
    </motion.div>
  );
};
