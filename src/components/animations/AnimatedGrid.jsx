import { useEffect, useRef } from 'react';

const AnimatedGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gridSize = 50;
    const cols = Math.ceil(canvas.width / gridSize);
    const rows = Math.ceil(canvas.height / gridSize);
    const cells = [];

    for (let i = 0; i < cols; i++) {
      cells[i] = [];
      for (let j = 0; j < rows; j++) {
        cells[i][j] = { glow: 0, targetGlow: 0 };
      }
    }

    let lastTime = 0;
    const throttleDelay = 32; // ~30fps for grid (less critical)

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      const col = Math.floor(e.clientX / gridSize);
      const row = Math.floor(e.clientY / gridSize);

      for (let i = Math.max(0, col - 2); i < Math.min(cols, col + 3); i++) {
        for (let j = Math.max(0, row - 2); j < Math.min(rows, row + 3); j++) {
          const distance = Math.sqrt(Math.pow(i - col, 2) + Math.pow(j - row, 2));
          cells[i][j].targetGlow = Math.max(0, 1 - distance / 3);
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const cell = cells[i][j];
          cell.glow += (cell.targetGlow - cell.glow) * 0.1;
          cell.targetGlow *= 0.95;

          if (cell.glow > 0.01) {
            ctx.strokeStyle = `rgba(0, 229, 255, ${cell.glow * 0.5})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(i * gridSize, j * gridSize, gridSize, gridSize);

            if (cell.glow > 0.3) {
              ctx.fillStyle = `rgba(0, 229, 255, ${cell.glow * 0.1})`;
              ctx.fillRect(i * gridSize, j * gridSize, gridSize, gridSize);
            }
          }
        }
      }

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.4 }}
    />
  );
};

export default AnimatedGrid;
