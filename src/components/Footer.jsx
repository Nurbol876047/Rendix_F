import './Footer.css';
import { studioSettings } from '../content/siteContent';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const navigationLinks = [
    { href: '#services', label: t('nav.services') },
    { href: '#projects', label: t('nav.work') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand-block">
          <div className="footer-logo">
            <span className="logo-text">{studioSettings.studioName}</span>
            <span className="logo-dot">.</span>
          </div>
          <p className="footer-studio">{t('footer.studio')}</p>
        </div>

        <div className="footer-links-block">
          <span className="footer-label">{t('footer.navigation')}</span>
          <div className="footer-links">
            {navigationLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} {studioSettings.studioName}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
