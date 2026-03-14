import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, Phone } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Get In <span className="gradient-text">Touch</span>
      </motion.h2>

      <div className="contact-container glass-panel">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3>Let's Connect</h3>
          <p>I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
          
          <div className="contact-links">
            <a href="mailto:omvazire1195@gmail.com" className="contact-link interactive">
              <span className="icon-wrapper"><Mail size={20} /></span>
              omvazire1195@gmail.com
            </a>
            <a href="tel:+919552576538" className="contact-link interactive">
              <span className="icon-wrapper"><Phone size={20} /></span>
              +91 9552576538
            </a>
            <a href="https://www.linkedin.com/in/omvazire/" target="_blank" rel="noreferrer" className="contact-link interactive">
              <span className="icon-wrapper"><Linkedin size={20} /></span>
              LinkedIn Profile
            </a>
            <a href="https://github.com/omvazire" target="_blank" rel="noreferrer" className="contact-link interactive">
              <span className="icon-wrapper"><Github size={20} /></span>
              GitHub Profile
            </a>
          </div>
        </motion.div>

        <motion.form 
          // Uses formsubmit.co to securely forward emails from static sites without exposing backend keys
          action="https://formsubmit.co/omvazire1195@gmail.com" 
          method="POST"
          className="contact-form"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Honeypot field to fight spam */}
          <input type="text" name="_honey" style={{ display: 'none' }} />
          {/* Prevent nasty captchas */}
          <input type="hidden" name="_captcha" value="false" />
          
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              placeholder="John Doe"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder="john@example.com"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              required 
              placeholder="Your message here..."
              rows="5"
              className="form-input"
            ></textarea>
          </div>
          <button type="submit" className="submit-btn primary-btn interactive">
            Send Message <Send size={18} style={{ marginLeft: '8px' }} />
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
