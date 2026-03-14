import React, { useRef } from 'react';
import { motion } from 'framer-motion';
// Generic icons since we have 26 mixed tools and languages
import { Code2, Database, LayoutTemplate, Server, Terminal, Box, Cloud, Settings, Layers, Workflow, TestTube, BrainCircuit, Activity } from 'lucide-react';
import './Skills.css';

const skillsData = [
  { name: 'C', icon: <Code2 />, color: '#00599C' },
  { name: 'CSS3', icon: <LayoutTemplate />, color: '#1572b6' },
  { name: 'JavaScript', icon: <Code2 />, color: '#f7df1e' },
  { name: 'HTML5', icon: <LayoutTemplate />, color: '#e34f26' },
  { name: 'PowerShell', icon: <Terminal />, color: '#5391FE' },
  { name: 'Python', icon: <Code2 />, color: '#3776AB' },
  { name: 'TypeScript', icon: <Code2 />, color: '#3178C6' },
  { name: 'Render', icon: <Cloud />, color: '#46E3B7' },
  { name: 'Vercel', icon: <Server />, color: '#ffffff' },
  { name: 'Bootstrap', icon: <LayoutTemplate />, color: '#7952B3' },
  { name: 'EJS', icon: <Code2 />, color: '#B4CA65' },
  { name: 'Express.js', icon: <Server />, color: '#cccccc' },
  { name: 'NPM', icon: <Box />, color: '#CB3837' },
  { name: 'Nodemon', icon: <Activity />, color: '#76D04B' },
  { name: 'React', icon: <Code2 />, color: '#61dafb' },
  { name: 'TailwindCSS', icon: <LayoutTemplate />, color: '#38B2AC' },
  { name: 'MongoDB', icon: <Database />, color: '#47A248' },
  { name: 'MySQL', icon: <Database />, color: '#4479A1' },
  { name: 'Matplotlib', icon: <Activity />, color: '#ffffff' },
  { name: 'Numpy', icon: <Layers />, color: '#013243' },
  { name: 'Pandas', icon: <Layers />, color: '#150458' },
  { name: 'PyTorch', icon: <BrainCircuit />, color: '#EE4C2C' },
  { name: 'Scikit-learn', icon: <TestTube />, color: '#F7931E' },
  { name: 'TensorFlow', icon: <BrainCircuit />, color: '#FF6F00' },
  { name: 'Docker', icon: <Box />, color: '#2496ED' },
  { name: 'Kubernetes', icon: <Workflow />, color: '#326CE5' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

const Skills = () => {
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
    <section className="skills-section" id="skills">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        My <span className="gradient-text">Skills</span>
      </motion.h2>

      <motion.div 
        ref={gridRef}
        className="skills-grid bento-glow-group"
        onMouseMove={handleMouseMove}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skillsData.map((skill, index) => (
          <motion.div 
            key={index} 
            className="skill-card glass-panel mouse-glow-card"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="skill-icon" style={{ color: skill.color }}>
              {skill.icon}
            </div>
            <span className="skill-name">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
