import React from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  return (
    <motion.nav 
      className="glassy-navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="nav-logo">
        Om <span>Vazire</span>
      </div>
      <div className="nav-links">
        <a href="#about" className="nav-link">About</a>
        <a href="#skills" className="nav-link">Skills</a>
        <a href="#projects" className="nav-link">Projects</a>
        <a href="#certificates" className="nav-link">Certificates</a>
      </div>
      <div className="nav-actions">
        <a href="#contact" className="nav-contact-btn">Contact Me</a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
