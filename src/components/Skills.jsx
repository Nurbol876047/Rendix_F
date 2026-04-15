import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Bot, Globe, GraduationCap, LayoutDashboard, Palette, ShieldCheck, Sparkles, Users } from 'lucide-react';
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
  student: GraduationCap,
  teacher: Users
};

const Skills = () => {
  const { t } = useLanguage();
  const categories = Array.isArray(t('skills.cards')) ? t('skills.cards') : [];
  const spotlightCards = Array.isArray(t('skills.spotlightCards')) ? t('skills.spotlightCards') : [];
  const spotlightLabel = t('skills.spotlightLabel');
  const spotlightBadge = t('skills.spotlightBadge');

  return (
    <section id="skills" className="skills section-padding">
      <div className="container">
        <AnimatedSectionTitle title={t('skills.title')} />

        {spotlightCards.length ? (
          <div className="skills-spotlight">
            <p className="skills-spotlight-label">{spotlightLabel}</p>

            <div className="skills-spotlight-grid">
              {spotlightCards.map((card, index) => {
                const Icon = iconMap[card.icon] ?? Sparkles;

                return (
                  <motion.div
                    key={card.title ?? index}
                    className="skills-spotlight-card"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                  >
                    <div className="skills-spotlight-head">
                      <div className="skills-spotlight-title">
                        <span className="skills-spotlight-icon"><Icon size={18} /></span>
                        <h3>{card.title}</h3>
                      </div>

                      <span className="skills-spotlight-badge">{spotlightBadge}</span>
                    </div>

                    <div className="skills-spotlight-list">
                      {Array.isArray(card.items) ? card.items.map((item, itemIndex) => (
                        <span className="skills-spotlight-item" key={`${card.title}-${itemIndex}`}>
                          {item}
                        </span>
                      )) : null}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="skills-layout">
          {categories.map((category, index) => {
            const Icon = iconMap[category.icon] ?? Globe;

            return (
              <Tilt 
                key={category.title ?? index}
                perspective={1500} 
                scale={1.02} 
                glareEnable={true} 
                glareMaxOpacity={0.1}
              >
                <motion.div 
                  className="skill-group glass-panel interactive-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="group-header">
                    <div className="group-icon"><Icon size={24} /></div>
                    <h3 className="group-title">{category.title}</h3>
                  </div>
                </motion.div>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
