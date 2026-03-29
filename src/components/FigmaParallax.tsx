import { useRef, createContext, useContext } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

/**
 * FigmaParallax Context to share common scroll progress among layers.
 */
interface ParallaxContextProps {
  scrollYProgress: MotionValue<number>;
}

const ParallaxContext = createContext<ParallaxContextProps | null>(null);

/**
 * FigmaParallaxGroup: The parent container for a parallax section.
 * It tracks its own scroll progress relative to the viewport.
 */
export const FigmaParallaxGroup = ({ children, className = "", height = "min-h-[500px]" }: { children: React.ReactNode; className?: string; height?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${height} ${className}`}>
      <ParallaxContext.Provider value={{ scrollYProgress }}>
        {children}
      </ParallaxContext.Provider>
    </div>
  );
};

/**
 * FigmaParallaxLayer: A layer within the group that moves at a specific speed.
 * 
 * Speeds (Pre-defined Figma-style patterns):
 * - bg: 0.3x (Deep distance)
 * - mid: 0.6x (Secondary objects/textures)
 * - fore: 1.0x (Main content/Foreground)
 */
export type ParallaxLayerSpeed = 'bg' | 'mid' | 'fore' | number;

interface FigmaParallaxLayerProps {
  children?: React.ReactNode;
  speed?: ParallaxLayerSpeed;
  offset?: number; // Total pixels traveled from bottom-to-top of scroll
  className?: string;
  zIndex?: number;
}

export const FigmaParallaxLayer = ({ 
  children, 
  speed = 'fore', 
  offset = 200, 
  className = "",
  zIndex = 0 
}: FigmaParallaxLayerProps) => {
  const context = useContext(ParallaxContext);
  if (!context) {
    throw new Error("FigmaParallaxLayer must be used within a FigmaParallaxGroup");
  }

  // Calculate the numeric speed multiplier
  // multiplier = 1 meaning 0 relative movement (moves 1x with scroll)
  // divider = Speed reduction compared to parent scroll
  const factor = 
    speed === 'bg' ? 0.3 : 
    speed === 'mid' ? 0.6 : 
    speed === 'fore' ? 1.0 : 
    typeof speed === 'number' ? speed : 1.0;

  // The relative movement is (1 - factor) * offset
  // Higher factor means LESS relative movement (fore=1 means no movement relative to scroll)
  const relativeMovement = (1 - factor) * offset;

  // Map the scroll progress to a Y translation
  const yRange = [relativeMovement, -relativeMovement];
  const yTransform = useTransform(context.scrollYProgress, [0, 1], yRange);

  // Apply smooth spring physics (Figma's organic motion)
  const y = useSpring(yTransform, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <motion.div 
      style={{ y, zIndex }} 
      className={`absolute inset-x-0 w-full h-full will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};
