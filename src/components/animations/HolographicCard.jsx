import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';

const HolographicCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);
  
  const gradientX = useTransform(x, [0, 1], ['0%', '100%']);
  const gradientY = useTransform(y, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Holographic shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${gradientX} ${gradientY}, 
            rgba(0, 229, 255, 0.3) 0%, 
            rgba(138, 43, 226, 0.2) 25%,
            rgba(255, 0, 255, 0.2) 50%,
            transparent 70%)`,
          mixBlendMode: 'screen',
        }}
      />
      
      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary opacity-50 pointer-events-none z-30" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-secondary opacity-50 pointer-events-none z-30" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-secondary opacity-50 pointer-events-none z-30" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent opacity-50 pointer-events-none z-30" />
    </motion.div>
  );
};

HolographicCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default HolographicCard;
