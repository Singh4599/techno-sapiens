import ReactMarquee from 'react-fast-marquee';
import PropTypes from 'prop-types';

const Marquee = ({ children, speed = 50, direction = 'left', gradient = true, className = '' }) => {
  return (
    <ReactMarquee
      speed={speed}
      direction={direction}
      gradient={gradient}
      gradientColor={[10, 10, 10]}
      gradientWidth={100}
      className={className}
    >
      {children}
    </ReactMarquee>
  );
};

Marquee.propTypes = {
  children: PropTypes.node.isRequired,
  speed: PropTypes.number,
  direction: PropTypes.oneOf(['left', 'right', 'up', 'down']),
  gradient: PropTypes.bool,
  className: PropTypes.string,
};

export default Marquee;
