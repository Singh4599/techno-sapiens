import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { cn } from '@utils/helpers';

const Card = ({ 
  children, 
  className,
  variant = 'default',
  hover = true,
  padding = true,
  ...props 
}) => {
  const variants = {
    default: 'bg-background-card border border-white/10',
    glass: 'glass',
    gradient: 'bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10',
  };

  return (
    <motion.div
      className={cn(
        'rounded-xl transition-all duration-300',
        variants[variant],
        padding && 'p-6',
        hover && 'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20',
        className
      )}
      whileHover={hover ? { y: -5 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'glass', 'gradient']),
  hover: PropTypes.bool,
  padding: PropTypes.bool,
};

export default Card;
