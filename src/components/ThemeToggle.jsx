import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

const ThemeToggle = ({ darkMode, toggle }) => {
  return (
    <Magnetic>
      <button 
        onClick={toggle}
        className="glass-panel interactive"
        style={{
          padding: '0.75rem',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: 'none',
          outline: 'none',
          color: 'var(--text-primary)'
        }}
        aria-label="Toggle Theme"
      >
        <motion.div
          initial={false}
          animate={{ rotate: darkMode ? 180 : 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </motion.div>
      </button>
    </Magnetic>
  );
};

export default ThemeToggle;
