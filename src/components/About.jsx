import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { BookOpen, Shield, SquareTerminal } from 'lucide-react';
import './About.css';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="about section-padding">
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
              <SquareTerminal className="title-icon" size={32} />
            </motion.span>
            
            {t('about.title').split('').map((char, index) => (
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

        <div className="about-grid">
          <Tilt 
            perspective={1500} 
            scale={1.02} 
            glareEnable={true} 
            glareMaxOpacity={0.1}
          >
            <motion.div
              className="about-block glass-panel interactive-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="block-header">
                <Shield size={24} className="block-icon" />
                <h3>{t('about.mission')}</h3>
              </div>
              <p className="block-body">
                {t('about.missionText')}
              </p>
            </motion.div>
          </Tilt>

          <Tilt 
            perspective={1500} 
            scale={1.02} 
            glareEnable={true} 
            glareMaxOpacity={0.1}
          >
            <motion.div
              className="about-block glass-panel interactive-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="block-header">
                <BookOpen size={24} className="block-icon" />
                <h3>{t('about.expertise')}</h3>
              </div>
              <p className="block-body">
                {t('about.expertiseText')}
              </p>
              <div className="studio-stats">
                <div className="studio-stat">
                  <span className="stat-label">{t('about.stats.projects')}</span>
                  <span className="stat-num">50+</span>
                </div>
                <div className="studio-stat">
                  <span className="stat-label">{t('about.stats.security')}</span>
                  <span className="stat-num">99.9%</span>
                </div>
              </div>
            </motion.div>
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default About;
