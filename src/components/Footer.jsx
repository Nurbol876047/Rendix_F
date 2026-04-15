import './Footer.css';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-logo">
          <span className="logo-text">RENDIX STUDIO</span>
          <span className="logo-dot">.</span>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} {t('footer.studio')}. {t('footer.rights')}
        </p>
        <div className="footer-links">
          <a href="https://wa.me/77764370355" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
