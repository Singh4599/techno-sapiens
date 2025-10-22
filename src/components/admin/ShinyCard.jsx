import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ShinyCard = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`glass-strong rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/20 h-full ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

ShinyCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default ShinyCard;
