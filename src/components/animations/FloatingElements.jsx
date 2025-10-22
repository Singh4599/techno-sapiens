import { motion } from 'framer-motion';

const FloatingElements = () => {
  const elements = [
    { icon: '⚡', delay: 0, duration: 3 },
    { icon: '🚀', delay: 0.5, duration: 4 },
    { icon: '💻', delay: 1, duration: 3.5 },
    { icon: '🎮', delay: 1.5, duration: 4.5 },
    { icon: '🎯', delay: 2, duration: 3.8 },
    { icon: '🔥', delay: 2.5, duration: 4.2 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
