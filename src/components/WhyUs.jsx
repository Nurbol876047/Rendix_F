import { motion as Motion } from 'framer-motion';
import { Fingerprint, Gem, ShieldCheck, Zap } from 'lucide-react';
import AnimatedSectionTitle from './AnimatedSectionTitle';
import './WhyUs.css';
import { useLanguage } from '../contexts/LanguageContext';

const iconMap = {
  shield: ShieldCheck,
  zap: Zap,
  fingerprint: Fingerprint,
  gem: Gem,
};

const WhyUs = () => {
  const { t } = useLanguage();
  const cards = Array.isArray(t('whyUs.cards')) ? t('whyUs.cards') : [];

  return (
    <section id="why-us" className="why-us section-padding">
      <div className="container">
        <AnimatedSectionTitle title={t('whyUs.title')} />
        <p className="section-intro why-us-intro">{t('whyUs.intro')}</p>

        <div className="why-us-grid">
          {cards.map((card, index) => {
            const Icon = iconMap[card.icon] ?? ShieldCheck;

            return (
              <Motion.article
                key={card.title ?? index}
                className="why-us-card glass-panel"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <span className="why-us-icon">
                  <Icon size={22} />
                </span>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </Motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
