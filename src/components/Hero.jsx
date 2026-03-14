import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import './Hero.css';

const typingWords = [
  "developing robust MERN applications",
  "engineering scalable backend systems",
  "building high-performance React frontends",
  "turning complex problems into elegant code",
  "building tools for dashboards",
  "crafting modern web apps"
];

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer = setTimeout(() => {
      handleType();
    }, typingSpeed);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isDeleting, loopNum]);

  const handleType = () => {
    const i = loopNum % typingWords.length;
    const fullText = typingWords[i];

    setText(
      isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
    );

    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), 2000);
      setTypingSpeed(50);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(100);
    } else {
      setTypingSpeed(isDeleting ? 40 : 100);
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">

        <div className="hero-content">
          <motion.div
            className="hero-text-content"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Hey, I'm <span className="gradient-text">Om Vazire</span> <br />
              a full-stack developer <br />from India <br />
              <span className="subtitle">trying to cause a positive impact through technology.</span>
            </h1>

            <div className="typewriter-container">
              <span className="typewriter-prefix">&gt;</span>
              <div className="word-slider">
                <span className="typewriter-text">{text}</span>
                <motion.span
                  className="typewriter-cursor"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >_</motion.span>
              </div>
            </div>

            <div className="hero-actions">
              <a href="#contact" className="primary-btn interactive">
                Hire Me
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="secondary-btn interactive">
                View resume <Download size={16} style={{ marginLeft: '4px' }} />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-image-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="profile-img-wrapper">
              <div className="profile-img placeholder-avatar">
                <img src={`/avatar.jpeg`} alt="Profile" className="avatar-img" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
