import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './RapModeEffects.css';

const RapModeEffects = () => {
  const { isRapMode, isTransitioning } = useTheme();
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    if (isRapMode) {
      setShowFlash(true);
      const timer = setTimeout(() => {
        setShowFlash(false);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setShowFlash(false);
    }
  }, [isRapMode, isTransitioning]);

  if (!isRapMode) return null;

  return (
    <>
      {/* 1. Camera Flash Burst */}
      {showFlash && <div className="rap-flash-burst" aria-hidden="true" />}

      {/* 2. Atmosphere Overlays */}
      <div className="rap-effects-container" aria-hidden="true">
        {/* Subtle moving fog / radial mist orbs */}
        <div className="rap-mist-orb rap-mist-orb-1" />
        <div className="rap-mist-orb rap-mist-orb-2" />

        {/* Cinematic Vignette */}
        <div className="rap-vignette" />

        {/* Vintage scanlines */}
        <div className="rap-scanlines" />

        {/* Analog Film Grain */}
        <div className="rap-film-grain" />
      </div>
    </>
  );
};

export default RapModeEffects;
