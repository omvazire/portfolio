import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import './AlterEgoToggle.css';

const AlterEgoToggle = () => {
  const { isRapMode, toggleTheme } = useTheme();

  return (
    <div className="alter-ego-standalone-wrap">
      <motion.button
        onClick={toggleTheme}
        className={`ego-btn ${isRapMode ? 'mode-rap' : 'mode-default'} interactive`}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.05 }}
        aria-label={isRapMode ? "Exit Alter Ego Mode" : "Switch to Alter Ego Mode"}
        title={isRapMode ? "Exit Alter Ego (Return to Default Portfolio)" : "Switch to Alter Ego"}
      >
        {/* Logo Badge on Top */}
        <div className="ego-logo-badge">
          <svg
            className="ego-logo-svg"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M8.5 14.5C8.5 16.433 10.067 18 12 18C13.933 18 15.5 16.433 15.5 14.5C15.5 12.5 13 10.5 12 8.5C11 10.5 8.5 12.5 8.5 14.5Z"
              fill={isRapMode ? "#ffffff" : "url(#egoGrad)"}
            />
            <path
              d="M12 3C7 6 4 11 4 15C4 19.4183 7.58172 23 12 23C16.4183 23 20 19.4183 20 15C20 11 17 6 12 3Z"
              stroke={isRapMode ? "#ffffff" : "url(#egoGrad)"}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="egoGrad" x1="4" y1="3" x2="20" y2="23" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ec4899" />
                <stop offset="1" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Text Below Logo in Bold Small Style */}
        <span className="ego-btn-text">
          {isRapMode ? 'EXIT EGO' : 'SWITCH TO EGO'}
        </span>
      </motion.button>
    </div>
  );
};

export default AlterEgoToggle;
