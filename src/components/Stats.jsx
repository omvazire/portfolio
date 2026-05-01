import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, GitCommit, Layers, Brain } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import './Stats.css';

const Stats = () => {
  const username = "omvazire";
  const scrollRef = useRef(null);
  
  const [githubData, setGithubData] = useState({
    repos: "42+",
    commits: "140+",
    tech: "25+", // Based on the user's skill image
    scratches: "∞"
  });

  // Fetch live stats from GitHub API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();
        
        if (userData.public_repos) {
          setGithubData(prev => ({ ...prev, repos: `${userData.public_repos}+` }));
        }
      } catch (error) {
        console.error("Error fetching GitHub stats", error);
      }
    };
    
    fetchStats();
  }, [username]);

  // Auto-scroll the heatmap to the current month (far right)
  useEffect(() => {
    // We use a slight timeout to ensure the GitHub calendar SVG has finished rendering its width
    const timer = setTimeout(() => {
      if (scrollRef.current) {
         // Scroll max to the right
         scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="stats-section" id="stats" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: '2.5rem' }}
      >
        My <span className="gradient-text">Stats</span>
      </motion.h2>
      <div className="stats-layout">
        {/* Left Column: GitHub Stats */}
        <motion.div 
          className="hero-stats glass-panel"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="stat-item">
            <div className="stat-icon-wrapper"><FolderGit2 size={28} /></div>
            <h3>{githubData.repos}</h3>
            <p>Repositories<br/>Created</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-icon-wrapper"><GitCommit size={28} /></div>
            <h3>{githubData.commits}</h3>
            <p>Total GitHub<br/>Commits</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-icon-wrapper"><Layers size={28} /></div>
            <h3>{githubData.tech}</h3>
            <p>Technologies<br/>Mastered</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-icon-wrapper"><Brain size={28} /></div>
            <h3>{githubData.scratches}</h3>
            <p>Head Scratched<br/>while Debugging</p>
          </div>
        </motion.div>

        {/* Right Column: GitHub Heatmap */}
        <motion.div 
          className="github-heatmap glass-panel"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3>Contributions</h3>
          <div 
            className="heatmap-container" 
            ref={scrollRef}
            onWheel={(e) => {
              // Allows smooth horizontal scrolling with regular mouse wheel
              if (scrollRef.current && e.deltaY !== 0) {
                e.preventDefault();
                scrollRef.current.scrollLeft -= e.deltaY; // -= because of rtl direction
                
                // Temporarily disable pointer events to force tooltips/hover states to dismiss 
                // and realign correctly once the scrolling stops.
                scrollRef.current.style.pointerEvents = 'none';
                clearTimeout(scrollRef.current.scrollTimeout);
                scrollRef.current.scrollTimeout = setTimeout(() => {
                  if (scrollRef.current) scrollRef.current.style.pointerEvents = 'auto';
                }, 150);
              }
            }}
          >
            <GitHubCalendar 
              username={username} 
              colorScheme="dark"
              theme={{
                light: ['#ebedf0', '#c084fc', '#a855f7', '#9333ea', '#7e22ce'], 
                dark: ['rgba(255, 255, 255, 0.05)', '#c084fc', '#a855f7', '#9333ea', '#7e22ce']
              }}
              blockSize={12}
              blockMargin={4}
              fontSize={12}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
