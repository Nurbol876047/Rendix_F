import { motion as Motion } from 'framer-motion';
import AnimatedSectionTitle from './AnimatedSectionTitle';
import './Process.css';
import { useLanguage } from '../contexts/LanguageContext';

const Process = () => {
  const { t } = useLanguage();
  const steps = Array.isArray(t('process.steps')) ? t('process.steps') : [];

  return (
    <section id="process" className="process section-padding">
      <div className="container">
        <AnimatedSectionTitle title={t('process.title')} />
        <p className="section-intro process-intro">{t('process.intro')}</p>

        <div className="process-grid">
          {steps.map((step, index) => (
            <Motion.article
              key={step.title ?? index}
              className="process-card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
