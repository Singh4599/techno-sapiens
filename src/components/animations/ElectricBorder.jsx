import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const ElectricBorder = ({ children, className = '', color = '#00E5FF' }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const rect = container.getBoundingClientRect();
    
    canvas.width = rect.width;
    canvas.height = rect.height;

    const points = [];
    const numPoints = 100;
    const perimeter = 2 * (canvas.width + canvas.height);
    
    // Create points along the border
    for (let i = 0; i < numPoints; i++) {
      const distance = (perimeter / numPoints) * i;
      let x, y;
      
      if (distance < canvas.width) {
        x = distance;
        y = 0;
      } else if (distance < canvas.width + canvas.height) {
        x = canvas.width;
        y = distance - canvas.width;
      } else if (distance < 2 * canvas.width + canvas.height) {
        x = canvas.width - (distance - canvas.width - canvas.height);
        y = canvas.height;
      } else {
        x = 0;
        y = canvas.height - (distance - 2 * canvas.width - canvas.height);
      }
      
      points.push({
        x,
        y,
        offset: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03
      });
    }

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw thick glitchy border (like reference)
      ctx.strokeStyle = color;
      ctx.lineWidth = 4; // Thicker
      ctx.shadowBlur = 20; // More glow
      ctx.shadowColor = color;
      
      ctx.beginPath();
      points.forEach((point, i) => {
        const glitch = Math.sin(frame * point.speed + point.offset) * 5; // More glitch
        
        if (i === 0) {
          ctx.moveTo(point.x + glitch, point.y + glitch);
        } else {
          ctx.lineTo(point.x + glitch, point.y + glitch);
        }
      });
      ctx.closePath();
      ctx.stroke();
      
      // Add inner glow
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 15;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
      ctx.globalAlpha = 1;
      
      // Add random glitch segments (more frequent)
      if (Math.random() > 0.9) {
        const start = Math.floor(Math.random() * points.length);
        const end = start + Math.floor(Math.random() * 15);
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.shadowBlur = 25;
        
        ctx.beginPath();
        for (let i = start; i < end && i < points.length; i++) {
          const point = points[i];
          const glitch = Math.random() * 8;
          if (i === start) {
            ctx.moveTo(point.x + glitch, point.y + glitch);
          } else {
            ctx.lineTo(point.x + glitch, point.y + glitch);
          }
        }
        ctx.stroke();
      }
      
      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newRect = container.getBoundingClientRect();
      canvas.width = newRect.width;
      canvas.height = newRect.height;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [color]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

ElectricBorder.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
};

export default ElectricBorder;
