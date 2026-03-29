import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export const PageWrapper = ({ children, itemKey }: { children: ReactNode; itemKey: string }) => {
  return (
    <motion.div
      key={itemKey}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, type: 'spring', damping: 20 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};
