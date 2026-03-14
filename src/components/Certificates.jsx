import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, FileText, CheckCircle } from 'lucide-react';
import './Certificates.css';

const certificatesData = [
  {
    title: 'Retrieval-Augmented Generation (RAG) Lab',
    issuer: 'IBM',
    date: '2025',
    icon: <Award size={18} />,
    description: 'Completion of the Retrieval-Augmented Generation lab by IBM.',
    pdfLink: '/certificates/RAG lab ibm.pdf'
  },
  {
    title: 'Getting Started with AI',
    issuer: 'IBM',
    date: '2025',
    icon: <FileText size={18} />,
    description: 'Foundational certification in Artificial Intelligence concepts.',
    pdfLink: '/certificates/getting started with ai.pdf'
  },
  {
    title: 'Journey to AI',
    issuer: 'IBM',
    date: '2025',
    icon: <CheckCircle size={18} />,
    description: 'Comprehensive overview of AI technologies and their applications.',
    pdfLink: '/certificates/journey to ai.pdf'
  },
  {
    title: 'Coursera Certification',
    issuer: 'Coursera',
    date: '2025',
    icon: <Award size={18} />,
    description: 'Professional course completion and skill verification on Coursera.',
    pdfLink: '/certificates/Coursera NU65EWPQBZP5.pdf'
  },
  {
    title: 'Full Stack Web Development',
    issuer: 'Apna College',
    date: '2025',
    icon: <FileText size={18} />,
    description: 'Complete Sigma Web Development Course covering Frontend and Backend technologies.',
    pdfLink: '/certificates/certificate-sigma-80-68d3fa0826af06db09016814.pdf'
  },
  {
    title: 'Santander Bootcamp / Scholarship',
    issuer: 'Santander',
    date: '2025',
    icon: <CheckCircle size={18} />,
    description: 'Certificate of excellence and successful course completion.',
    pdfLink: '/certificates/2056_omvazire1195@gmail.com.pdf'
  },
  {
    title: 'AWS Job Simulation',
    issuer: 'Forage',
    date: '2025',
    icon: <Award size={18} />,
    description: 'Virtual experience program and job simulation for AWS software engineering.',
    pdfLink: '/certificates/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_8CkEf4u7iR9cbYcKs_1751199005390_completion_certificate.pdf'
  },
  {
    title: 'Deloitte Job Simulation',
    issuer: 'Forage',
    date: '2024',
    icon: <FileText size={18} />,
    description: 'Virtual job simulation highlighting technical skills and problem solving for Deloitte.',
    pdfLink: '/certificates/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_8CkEf4u7iR9cbYcKs_1751046845657_completion_certificate.pdf'
  }
];

const Certificates = () => {
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
    <section className="certificates-section" id="certificates">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        My <span className="gradient-text">Certificates</span>
      </motion.h2>

      <div 
        className="certificates-grid bento-glow-group"
        ref={gridRef}
        onMouseMove={handleMouseMove}
      >
        {certificatesData.map((cert, index) => (
          <motion.div 
            key={index}
            className="certificate-card glass-panel mouse-glow-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="certificate-content">
              <h3 className="certificate-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center', color: 'var(--accent-color)' }}>{cert.icon}</span> 
                {cert.title}
              </h3>
              <div className="certificate-meta">
                <span className="cert-issuer">{cert.issuer}</span>
                <span className="cert-date">{cert.date}</span>
              </div>
              <p className="certificate-desc">{cert.description}</p>
            </div>
            
            <div className="certificate-actions">
              <a href={cert.pdfLink} target="_blank" rel="noopener noreferrer" className="certificate-btn view-btn">
                View Certificate <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
