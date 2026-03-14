import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Home, CloudSun, Music } from 'lucide-react';
import './Projects.css';

const projectsData = [
  {
    title: 'UrbenNest',
    icon: <Home size={22} />,
    description: 'A full-stack rental marketplace inspired by Airbnb where users can list, explore, and review properties. Built with a robust backend architecture and secure authentication, supporting CRUD operations, image uploads, and interactive reviews.',
    tech: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Bootstrap'],
    demo: 'https://urbannest-gaew.onrender.com/listings',
    github: 'https://github.com/omvazire/UrbanNest'
  },
  {
    title: 'React Weather App',
    icon: <CloudSun size={22} />,
    description: 'A smooth real-time weather application built with React that allows users to search any city and instantly view live weather conditions with dynamic UI updates based on the weather data.',
    tech: ['React', 'OpenWeather API', 'JavaScript', 'CSS'],
    demo: 'https://react-weather-app-9agu.onrender.com/',
    github: 'https://github.com/omvazire/React-weather-app'
  },
  {
    title: 'Spotify Clone',
    icon: <Music size={22} />,
    description: 'A responsive music player interface inspired by Spotify that demonstrates UI design, audio playback controls, and playlist interaction using modern frontend technologies.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://spotify-clone-sgae.onrender.com/',
    github: 'https://github.com/omvazire/spotify-clone'
  }
];

const Projects = () => {
  const gridRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.mouse-glow-card');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <section className="projects-section" id="projects">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Featured <span className="gradient-text">Projects</span>
      </motion.h2>

      <div 
        className="projects-grid bento-glow-group"
        ref={gridRef}
        onMouseMove={handleMouseMove}
      >
        {projectsData.map((project, index) => (
          <motion.div 
            key={index}
            className="project-card glass-panel mouse-glow-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="project-content">
              <h3 className="project-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center', color: 'var(--accent-color)' }}>{project.icon}</span> 
                {project.title}
              </h3>
              <p className="project-desc">{project.description}</p>
              
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="project-actions">
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-btn demo-btn">
                Live Demo <ExternalLink size={16} />
              </a>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-btn github-btn">
                <Github size={18} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
