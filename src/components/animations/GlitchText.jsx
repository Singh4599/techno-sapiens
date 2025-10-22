import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const GlitchText = ({ children, className = '', intensity = 'medium' }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, intensity === 'high' ? 2000 : intensity === 'medium' ? 4000 : 6000);

    return () => clearInterval(glitchInterval);
  }, [intensity]);

  return (
    <span className={`relative inline-block ${className}`} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
      {/* Main Text */}
      <motion.span
        className="relative z-10 inline-block"
        animate={isGlitching ? {
          x: [0, -1, 1, -1, 0],
          opacity: [1, 0.9, 1, 0.9, 1],
        } : {}}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>

      {/* Glitch Layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-primary opacity-50 inline-block"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', left: 0, top: 0 }}
            animate={{
              x: [-1, 1, -1],
              skewX: [0, -1, 0],
            }}
            transition={{ duration: 0.15, repeat: 1 }}
            aria-hidden="true"
          >
            {children}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-secondary opacity-50 inline-block"
            style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)', left: 0, top: 0 }}
            animate={{
              x: [1, -1, 1],
              skewX: [0, 1, 0],
            }}
            transition={{ duration: 0.15, repeat: 1 }}
            aria-hidden="true"
          >
            {children}
          </motion.span>
        </>
      )}
    </span>
  );
};

GlitchText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  intensity: PropTypes.oneOf(['low', 'medium', 'high']),
};

export default GlitchText;
