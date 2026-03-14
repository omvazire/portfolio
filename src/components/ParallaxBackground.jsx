import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParallaxBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
      {/* Gradient Orbs */}
      <motion.div
        animate={{
          x: mousePosition.x * -50,
          y: mousePosition.y * -50,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 100 }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: '50vw',
          height: '50vw',
          maxHeight: '600px',
          maxWidth: '600px',
          background: 'radial-gradient(circle, var(--particle-color) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />
      
      <motion.div
        animate={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 100 }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '40vw',
          height: '40vw',
          maxHeight: '500px',
          maxWidth: '500px',
          background: 'radial-gradient(circle, var(--particle-color) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />

      {/* Grid Pattern */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'linear-gradient(var(--card-border) 1px, transparent 1px), linear-gradient(90deg, var(--card-border) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.1,
        maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 80%)'
      }} />
    </div>
  );
};

export default ParallaxBackground;
