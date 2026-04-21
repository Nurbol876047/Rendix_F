import { motion as Motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Avatar3D from './Avatar3D';
import ErrorBoundary from './ErrorBoundary';
import './Hero.css';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const highlights = Array.isArray(t('hero.highlights')) ? t('hero.highlights') : [];

  return (
    <section id="home" className="hero">
      <div className="container hero-layout">
        <div className="hero-text-block">
          <Motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <Tilt
              perspective={1100}
              glareEnable
              glareMaxOpacity={0.12}
              scale={1.01}
              className="hero-tilt-card interactive-card"
            >
              <div className="hero-card-content">
                <div className="hero-hud-element top-left" />
                <div className="hero-hud-element bottom-right" />

                <div className="hero-kicker">
                  <span className="kicker-line" />
                  {t('hero.kicker')}
                  <span className="kicker-dot" />
                </div>

                <p className="hero-brand">{t('hero.brand')}</p>
                <h1 className="hero-headline">{t('hero.headline')}</h1>
                <p className="hero-subtext">{t('hero.subtext')}</p>

                <div className="hero-highlights">
                  {highlights.map((highlight) => (
                    <span key={highlight} className="hero-highlight">
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="hero-actions">
                  <a href="#contact" className="btn-primary">
                    <span>{t('hero.primaryAction')}</span>
                  </a>
                  <a href="#projects" className="btn-secondary">
                    {t('hero.secondaryAction')}
                  </a>
                </div>
              </div>
            </Tilt>
          </Motion.div>
        </div>

        <Motion.div
          className="hero-3d-block"
          initial={{ opacity: 0, scale: 0.95, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.05, delay: 0.2 }}
        >
          <ErrorBoundary
            fallback={(
              <div className="avatar-fallback glass-panel">
                <span className="avatar-fallback-brand">{t('hero.brand')}</span>
                <p>{t('hero.kicker')}</p>
              </div>
            )}
          >
            <Avatar3D />
          </ErrorBoundary>
        </Motion.div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-bar" />
      </div>
    </section>
  );
};

export default Hero;
