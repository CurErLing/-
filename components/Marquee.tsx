import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  className?: string;
  speed?: number;
}

const Marquee: React.FC<MarqueeProps> = ({ text, direction = 'left', className = "", speed = 20 }) => {
  return (
    <div className={`relative flex overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="flex"
        animate={{
          x: direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
      </motion.div>
    </div>
  );
};

export default Marquee;