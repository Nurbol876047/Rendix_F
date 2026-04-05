import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="nav-brand">
          <span className="brand-d">DS</span>
          <span className="brand-dot">P</span>
        </a>
        <div className="nav-menu">
          <a href="#about" className="nav-item">{t('nav.about')}</a>
          <a href="#skills" className="nav-item">{t('nav.expertise')}</a>
          <a href="#projects" className="nav-item">{t('nav.work')}</a>
          <a href="#contact" className="nav-item">{t('nav.contact')}</a>
          
          <div className="language-switcher">
            <button 
              className={`lang-btn ${language === 'kz' ? 'active' : ''}`} 
              onClick={() => setLanguage('kz')}
            >
              KZ
            </button>
            <button 
              className={`lang-btn ${language === 'ru' ? 'active' : ''}`} 
              onClick={() => setLanguage('ru')}
            >
              RU
            </button>
            <button 
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
