import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './AboutTablet.css';

const AboutTablet = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Add some slight 3D rotation on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section className="about-section" id="about" ref={containerRef}>
      <motion.div 
        className="tablet-container"
        style={{ rotateX, scale }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="tablet-device">
          <div className="tablet-camera"></div>
          <div className="tablet-screen">
            {/* Tablet Content */}
            <div className="tablet-header">
              <div className="window-controls">
                <span></span><span></span><span></span>
              </div>
              <div className="tablet-url">about.omvazire.dev</div>
            </div>
            <div className="tablet-body">
              <div className="about-code">
                <p><span className="keyword">const</span> <span className="variable">developer</span> = {'{'}</p>
                <div className="code-block">
                  <p><span className="property">name</span>: <span className="string">'Om Vazire'</span>,</p>
                  <p><span className="property">role</span>: <span className="string">'Full Stack Developer'</span>,</p>
                  <p><span className="property">location</span>: <span className="string">'India'</span>,</p>
                  <p><span className="property">skills</span>: [<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">'C'</span>, <span className="string">'Python'</span>, <span className="string">'JavaScript'</span>, <span className="string">'TypeScript'</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">'React'</span>, <span className="string">'Express.js'</span>, <span className="string">'MongoDB'</span>, <span className="string">'MySQL'</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="string">'PyTorch'</span>, <span className="string">'TensorFlow'</span>, <span className="string">'Docker'</span>, <span className="string">'Kubernetes'</span><br/>
                  ],</p>
                  <p><span className="property">passion</span>: <span className="string">'Crafting beautiful web experiences'</span></p>
                </div>
                <p>{'};'}</p>
                <br/>
                <p><span className="keyword">function</span> <span className="function">getAboutMe</span>() {'{'}</p>
                <div className="code-block" style={{ borderLeftColor: 'transparent' }}>
                  <p><span className="keyword">return</span> <span className="string">"I'm a passionate Full Stack Developer specializing in the MERN stack. I'm dedicated to building intuitive, dynamic, and robust web applications, transforming complex ideas into elegant digital solutions."</span>;</p>
                </div>
                <p>{'}'}</p>
              </div>
            </div>
          </div>
          <div className="tablet-home-button"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutTablet;
