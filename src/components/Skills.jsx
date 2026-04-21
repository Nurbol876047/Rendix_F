import { motion as Motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
  Bot,
  BriefcaseBusiness,
  Globe,
  LayoutDashboard,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import './Skills.css';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedSectionTitle from './AnimatedSectionTitle';

const iconMap = {
  web: Globe,
  automation: Bot,
  security: ShieldCheck,
  systems: LayoutDashboard,
  design: Palette,
  interactive: Sparkles,
  startup: Rocket,
  business: BriefcaseBusiness,
};

const Skills = () => {
  const { t } = useLanguage();
  const categories = Array.isArray(t('services.cards')) ? t('services.cards') : [];
  const spotlightCards = Array.isArray(t('services.spotlightCards')) ? t('services.spotlightCards') : [];

  return (
    <section id="services" className="skills section-padding">
      <div className="container">
        <AnimatedSectionTitle title={t('services.title')} />
        <p className="section-intro services-intro">{t('services.intro')}</p>

        <div className="skills-layout">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] ?? Globe;

            return (
              <Tilt
                key={category.title ?? index}
                perspective={1500}
                scale={1.01}
                glareEnable
                glareMaxOpacity={0.08}
              >
                <Motion.article
                  className="skill-group glass-panel interactive-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                >
                  <div className="group-header">
                    <div className="group-icon">
                      <Icon size={22} />
                    </div>
                    <h3 className="group-title">{category.title}</h3>
                  </div>

                  <p className="group-description">{category.description}</p>

                  <div className="group-list">
                    {Array.isArray(category.items)
                      ? category.items.map((item) => (
                          <span key={`${category.title}-${item}`} className="group-item">
                            {item}
                          </span>
                        ))
                      : null}
                  </div>
                </Motion.article>
              </Tilt>
            );
          })}
        </div>

        {spotlightCards.length ? (
          <div className="skills-spotlight">
            <p className="skills-spotlight-label">{t('services.spotlightLabel')}</p>

            <div className="skills-spotlight-grid">
              {spotlightCards.map((card, index) => {
                const Icon = iconMap[card.icon] ?? Sparkles;

                return (
                  <Motion.article
                    key={card.title ?? index}
                    className="skills-spotlight-card"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                  >
                    <div className="skills-spotlight-head">
                      <div className="skills-spotlight-title">
                        <span className="skills-spotlight-icon">
                          <Icon size={18} />
                        </span>
                        <h3>{card.title}</h3>
                      </div>

                      <span className="skills-spotlight-badge">{t('services.spotlightBadge')}</span>
                    </div>

                    <div className="skills-spotlight-list">
                      {Array.isArray(card.items)
                        ? card.items.map((item, itemIndex) => (
                            <span className="skills-spotlight-item" key={`${card.title}-${itemIndex}`}>
                              {item}
                            </span>
                          ))
                        : null}
                    </div>
                  </Motion.article>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Skills;
