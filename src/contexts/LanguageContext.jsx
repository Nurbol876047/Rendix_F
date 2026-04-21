import { createContext, useContext, useState } from 'react';
import { translations } from '../content/siteContent';

const LanguageContext = createContext();

const getNestedValue = (source, path) => {
  return path.split('.').reduce((current, key) => {
    if (current && current[key] !== undefined) {
      return current[key];
    }

    return undefined;
  }, source);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru');

  const t = (path) => {
    const result = getNestedValue(translations[language], path);
    return result === undefined ? path : result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
