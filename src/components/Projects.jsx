import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ArrowRight, SwatchBook } from 'lucide-react';
import './Projects.css';
import { useLanguage } from '../contexts/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();
  const projectItems = t('projects.items');

  return (
    <section id="projects" className="projects section-padding">
      <div className="container">
        <div className="section-title-container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              style={{ display: 'inline-block', marginRight: '1rem' }}
            >
              <SwatchBook className="title-icon" size={32} />
            </motion.span>
            
            {t('projects.title').split('').map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.4,
                      delay: index * 0.05 
                    }
                  }
                }}
                style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        <div className="projects-grid">
          {Array.isArray(projectItems) && projectItems.map((project, index) => (
            <Tilt 
              key={index}
              perspective={1500} 
              scale={1.02} 
              glareEnable={true} 
              glareMaxOpacity={0.1}
            >
              <motion.div
                className="project-card glass-panel interactive-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>

                <div className="project-footer">
                  <div className="project-tags">
                    <span className="project-tag">Studio</span>
                    <span className="project-tag">Enterprise</span>
                  </div>
                  <button className="project-link-btn">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
