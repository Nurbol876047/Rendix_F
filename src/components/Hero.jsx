import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Avatar3D from './Avatar3D';
import './Hero.css';
import { useLanguage } from '../contexts/LanguageContext';
const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="hero">
      <div className="container hero-layout">
        <div className="hero-text-block">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Tilt 
              perspective={1000} 
              glareEnable={true} 
              glareMaxOpacity={0.15} 
              scale={1.02} 
              className="hero-tilt-card interactive-card"
            >
              <div className="hero-card-content">
                <div className="hero-hud-element top-left"></div>
                <div className="hero-hud-element bottom-right"></div>
                
                <div className="hero-kicker">
                  <span className="kicker-line"></span>
                  {t('hero.kicker')}
                  <span className="kicker-dot"></span>
                </div>
                
                <h1 className="hero-name" data-text={t('hero.name')}>
                  {t('hero.name')}
                </h1>
                
                <p className="hero-subtext">
                  {t('hero.subtext')}
                </p>
                
                <div className="hero-actions">
                  <a href="#projects" className="btn-primary">
                    <span>{t('hero.viewArsenal')}</span>
                  </a>
                  <a href="#contact" className="btn-secondary">
                    {t('hero.unsheatheCode')}
                  </a>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>

        <motion.div
          className="hero-3d-block"
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <Avatar3D />
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-bar"></div>
      </div>
    </section>
  );
};

export default Hero;
