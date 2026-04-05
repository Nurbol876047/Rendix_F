import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Globe } from 'lucide-react';
import './Contact.css';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <motion.div
          className="contact-wrapper glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="lamp-system">
            <div className="lamp-wire"></div>
            <div className="lamp-head"></div>
            <div className="lamp-beam"></div>
          </div>
          <h2 className="contact-heading">
            {t('contact.subtitle')}
          </h2>

          <motion.div
            className="contact-actions"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="contact-kicker">{t('contact.title')}</span>
            <a href="mailto:studio@rendix.kz" className="email-link">
              studio@rendix.kz <ArrowUpRight className="arrow" size={28} />
            </a>
          </motion.div>

          <motion.div
            className="social-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#" className="social-item interactive-card">
              <Github size={20} /> GitHub
            </a>
            <a href="#" className="social-item interactive-card">
              <Globe size={20} /> Web
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
