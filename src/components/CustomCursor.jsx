import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Smooth springs for the cursor outline
  const springConfig = { damping: 20, stiffness: 250, mass: 0.2 };
  const cursorXSpring = useSpring(0, springConfig);
  const cursorYSpring = useSpring(0, springConfig);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      // Offset by 20 to center the 40x40 glass cursor
      cursorXSpring.set(e.clientX - 20);
      cursorYSpring.set(e.clientY - 20);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorXSpring, cursorYSpring]);

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 1,
      scale: 1
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 0,
      scale: 0
    }
  };

  const glassVariants = {
    default: {
      scale: 1,
      borderColor: "rgba(255, 255, 255, 0.15)",
      backgroundColor: "rgba(255, 255, 255, 0.02)"
    },
    hover: {
      scale: 1.6,
      borderColor: "rgba(168, 85, 247, 0.4)", // Accent purple glow
      backgroundColor: "rgba(168, 85, 247, 0.1)"
    }
  };

  return (
    <>
      <div 
        className="global-glow" 
        style={{
          transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`
        }} 
      />
      <motion.div
        className="cursor-dot"
        variants={dotVariants}
        animate={isHovering ? "hover" : "default"}
        transition={{ type: "tween", ease: "circOut", duration: 0.15 }}
      />
      <motion.div
        className="cursor-glass"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        variants={glassVariants}
        animate={isHovering ? "hover" : "default"}
      />
    </>
  );
};

export default CustomCursor;
