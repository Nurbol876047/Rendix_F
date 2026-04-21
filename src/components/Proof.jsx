import { motion as Motion } from 'framer-motion';
import { BarChart3, CircleCheckBig, MessageSquareLock } from 'lucide-react';
import AnimatedSectionTitle from './AnimatedSectionTitle';
import './Proof.css';
import { useLanguage } from '../contexts/LanguageContext';

const Proof = () => {
  const { t } = useLanguage();
  const services = Array.isArray(t('services.cards')) ? t('services.cards') : [];
  const projects = Array.isArray(t('projects.items')) ? t('projects.items') : [];
  const checklist = Array.isArray(t('proof.checklist')) ? t('proof.checklist') : [];

  const metrics = [
    { value: `${services.length}`, label: t('proof.metrics.services') },
    { value: `${projects.length}+`, label: t('proof.metrics.projects') },
    { value: 'KZ / RU / EN', label: t('proof.metrics.languages') },
  ];

  return (
    <section className="proof section-padding">
      <div className="container">
        <AnimatedSectionTitle title={t('proof.title')} />
        <p className="section-intro proof-intro">{t('proof.intro')}</p>

        <div className="proof-layout">
          <Motion.div
            className="proof-metrics glass-panel"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <div className="proof-panel-head">
              <span className="proof-panel-icon">
                <BarChart3 size={22} />
              </span>
              <h3>{t('proof.checklistTitle')}</h3>
            </div>

            <div className="proof-metric-grid">
              {metrics.map((metric) => (
                <div key={metric.label} className="proof-metric-card">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>

            <div className="proof-checklist">
              {checklist.map((item) => (
                <div key={item} className="proof-check-item">
                  <CircleCheckBig size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Motion.div>

          <Motion.div
            className="proof-note glass-panel"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div className="proof-panel-head">
              <span className="proof-panel-icon">
                <MessageSquareLock size={22} />
              </span>
              <h3>{t('proof.noteTitle')}</h3>
            </div>
            <p>{t('proof.noteText')}</p>
            <a className="btn-secondary proof-cta" href="#contact">
              {t('proof.requestReferences')}
            </a>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default Proof;
