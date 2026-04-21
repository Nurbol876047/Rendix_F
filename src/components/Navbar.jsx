import { useEffect, useMemo, useState } from 'react';
import './Navbar.css';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = useMemo(() => ([
    { href: '#services', label: t('nav.services') },
    { href: '#why-us', label: t('nav.whyUs') },
    { href: '#process', label: t('nav.process') },
    { href: '#projects', label: t('nav.work') },
    { href: '#contact', label: t('nav.contact') },
  ]), [t]);

  return (
    <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="nav-brand" aria-label="RENDIX">
          <span className="brand-main">RENDIX</span>
          <span className="brand-sub">studio</span>
        </a>

        <div className="nav-menu">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-item">
              {link.label}
            </a>
          ))}

          <div className="language-switcher" aria-label="Language switcher">
            <button
              type="button"
              className={`lang-btn ${language === 'kz' ? 'active' : ''}`}
              onClick={() => setLanguage('kz')}
            >
              KZ
            </button>
            <button
              type="button"
              className={`lang-btn ${language === 'ru' ? 'active' : ''}`}
              onClick={() => setLanguage('ru')}
            >
              RU
            </button>
            <button
              type="button"
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
