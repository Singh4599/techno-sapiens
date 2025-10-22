import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-[9998] origin-left"
        style={{ scaleX }}
      >
        <div className="absolute inset-0 bg-white/30 blur-sm" />
        <motion.div
          className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white/50 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-8 pointer-events-none z-[9997]"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(0,229,255,0.15), transparent)',
          scaleX,
          transformOrigin: 'left',
        }}
      />
    </>
  );
};

export default ScrollProgress;
