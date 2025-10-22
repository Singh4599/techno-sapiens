import { TypeAnimation } from 'react-type-animation';
import PropTypes from 'prop-types';

const TypewriterText = ({ phrases = [], className = '' }) => {
  const sequence = phrases.flatMap(phrase => [phrase, 2000]);

  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      speed={50}
      className={className}
      repeat={Infinity}
    />
  );
};

TypewriterText.propTypes = {
  phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};

export default TypewriterText;
