import React from 'react';
import Hero from './components/Hero';
import AboutTablet from './components/AboutTablet';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import ParallaxBackground from './components/ParallaxBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Aurora from './components/Aurora';
import './index.css';

function App() {
  return (
    <>
      <Navbar />
      <div className="aurora-global-bg">
        <Aurora colorStops={["#7cff67","#B19EEF","#5227FF"]} blend={0.5} amplitude={1.0} speed={1} />
      </div>
      <CustomCursor />
      <ParallaxBackground />
      <div className="container app-container" style={{ paddingTop: '0', gap: '4rem' }}>
        <Hero />
        <main style={{ display: 'flex', flexDirection: 'column', gap: '5rem', marginTop: '0' }}>
          <AboutTablet />
          <Stats />
          <Skills />
          <Projects />
          <Certificates />
          <Contact />
          <footer style={{ 
            textAlign: 'center', 
            padding: '2rem 1rem', 
            color: 'var(--text-secondary)', 
            fontSize: '0.85rem',
            marginTop: '-1rem'
          }}>
            <p>© {new Date().getFullYear()} Om Vazire. Built with React.js & Framer Motion</p>
            <p style={{ marginTop: '0.5rem', fontStyle: 'italic', opacity: 0.8 }}>
              "Designed in mind, built with technology."
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;
