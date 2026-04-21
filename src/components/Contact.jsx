import { useMemo, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import './Contact.css';
import { studioSettings } from '../content/siteContent';
import { useLanguage } from '../contexts/LanguageContext';

const initialFormState = {
  name: '',
  company: '',
  email: '',
  service: '',
  message: '',
  consent: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const serviceOptions = useMemo(() => {
    const options = t('contact.form.serviceOptions');
    return Array.isArray(options) ? options : [];
  }, [t]);

  const checklist = useMemo(() => {
    const items = t('contact.checklist');
    return Array.isArray(items) ? items : [];
  }, [t]);

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = t('contact.validation.name');
    }

    if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = t('contact.validation.email');
    }

    if (!formData.message.trim()) {
      nextErrors.message = t('contact.validation.message');
    }

    if (!formData.consent) {
      nextErrors.consent = t('contact.validation.consent');
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setStatus('idle');
    setErrors((current) => ({
      ...current,
      [name]: '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus('error');
      return;
    }

    const lines = [
      `RENDIX brief`,
      `Name: ${formData.name.trim()}`,
      `Company: ${formData.company.trim() || '-'}`,
      `Email: ${formData.email.trim()}`,
      `Project type: ${formData.service || '-'}`,
      '',
      'Project details:',
      formData.message.trim(),
    ];

    const whatsappUrl = `https://wa.me/${studioSettings.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setFormData(initialFormState);
    setErrors({});
    setStatus('success');
  };

  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <Motion.div
          className="contact-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="contact-sidebar glass-panel">
            <span className="contact-kicker">{t('nav.contact')}</span>
            <h2 className="contact-title">{t('contact.title')}</h2>
            <p className="contact-copy">{t('contact.subtitle')}</p>

            <div className="contact-direct-card">
              <span className="contact-channel-label">{t('contact.directTitle')}</span>
              <a href={`https://wa.me/${studioSettings.whatsappNumber}`} className="contact-direct-link" target="_blank" rel="noreferrer">
                <span className="wa-brand">WhatsApp</span>
                <span className="wa-number">{studioSettings.phoneDisplay}</span>
                <ArrowUpRight size={20} />
              </a>
              <p className="contact-direct-copy">{t('contact.directText')}</p>
            </div>

            <div className="contact-checklist">
              <h3>{t('contact.checklistTitle')}</h3>
              <div className="contact-checklist-items">
                {checklist.map((item) => (
                  <div key={item} className="contact-check-item">
                    <CheckCircle2 size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Motion.form
            className="contact-form glass-panel"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <div className="form-grid">
              <label className="form-field">
                <span>{t('contact.form.name')}</span>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  placeholder={t('contact.form.name')}
                />
                {errors.name ? <small>{errors.name}</small> : null}
              </label>

              <label className="form-field">
                <span>{t('contact.form.company')}</span>
                <input
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="organization"
                  placeholder={t('contact.form.company')}
                />
              </label>

              <label className="form-field">
                <span>{t('contact.form.email')}</span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder={t('contact.form.email')}
                />
                {errors.email ? <small>{errors.email}</small> : null}
              </label>

              <label className="form-field">
                <span>{t('contact.form.service')}</span>
                <select name="service" value={formData.service} onChange={handleChange}>
                  <option value="">{t('contact.form.service')}</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="form-field">
              <span>{t('contact.form.message')}</span>
              <textarea
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.form.placeholder')}
              />
              {errors.message ? <small>{errors.message}</small> : null}
            </label>

            <label className="form-consent">
              <input
                name="consent"
                type="checkbox"
                checked={formData.consent}
                onChange={handleChange}
              />
              <span>{t('contact.form.consent')}</span>
            </label>
            {errors.consent ? <small className="form-consent-error">{errors.consent}</small> : null}

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                <span>{t('contact.form.send')}</span>
              </button>
              <a
                href={`https://wa.me/${studioSettings.whatsappNumber}`}
                className="btn-secondary"
                target="_blank"
                rel="noreferrer"
              >
                {t('contact.form.directWhatsapp')}
              </a>
            </div>

            {status === 'success' ? <p className="form-success">{t('contact.success')}</p> : null}
          </Motion.form>
        </Motion.div>
      </div>
    </section>
  );
};

export default Contact;
