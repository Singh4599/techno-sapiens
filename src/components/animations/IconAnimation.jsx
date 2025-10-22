import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const IconAnimation = ({ children, animation = 'bounce', className = '' }) => {
  const animations = {
    bounce: {
      whileHover: { y: [-5, 0, -5], transition: { duration: 0.5, repeat: Infinity } },
    },
    rotate: {
      whileHover: { rotate: 360, transition: { duration: 0.5 } },
    },
    scale: {
      whileHover: { scale: 1.2, transition: { type: 'spring', stiffness: 300 } },
    },
    shake: {
      whileHover: { x: [-2, 2, -2, 2, 0], transition: { duration: 0.4 } },
    },
    pulse: {
      whileHover: { scale: [1, 1.1, 1], transition: { duration: 0.3, repeat: Infinity } },
    },
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      {...animations[animation]}
    >
      {children}
    </motion.div>
  );
};

IconAnimation.propTypes = {
  children: PropTypes.node.isRequired,
  animation: PropTypes.oneOf(['bounce', 'rotate', 'scale', 'shake', 'pulse']),
  className: PropTypes.string,
};

export default IconAnimation;
