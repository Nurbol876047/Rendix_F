import React, { createContext, useState, useContext } from 'react';

const translations = {
  kz: {
    nav: {
      home: "Басты",
      about: "Біз туралы",
      expertise: "Тәжірибе",
      work: "Жобалар",
      contact: "Байланыс"
    },
    hero: {
      kicker: "Жоғары технологиялық шешімдер",
      name: "Сандық шешімдер мен қорғаныс",
      subtext: "Сіздің бизнесіңіз үшін қауіпсіз және тиімді веб-жобалар жасаймыз. Сайттар әзірлеу, киберқауіпсіздік және деректер архитектурасы.",
      status: "МӘРТЕБЕСІ",
      operational: "ЖҰМЫС ІСТЕП ТҰР",
      latency: "КІДІРІС",
      fast: "ЖЫЛДАМ",
      viewArsenal: "Жұмыстарды көру",
      unsheatheCode: "Хабарласу"
    },
    about: {
      title: "Біздің жолымыз",
      mission: "Миссия",
      missionText: "Біз заманауи технологиялар мен қауіпсіздікті біріктіру арқылы бизнестерге цифрлық кеңістікте өсуге көмектесеміз. Біздің әрбір жобамыз - бұл инновация мен сенімділіктің үйлесімі.",
      expertise: "Сараптама",
      expertiseText: "Веб-студиямыз күрделі веб-қосымшалардан бастап, киберқауіпсіздік аудитіне дейінгі қызметтерді ұсынады. Біз IIT жоғары деңгейлі инженерлері мен қауіпсіздік мамандарынан құралған командамыз.",
      stats: {
        projects: "Аяқталған жобалар",
        clients: "Риза клиенттер",
        security: "Қауіпсіздік деңгейі"
      }
    },
    skills: {
      title: "Технологиялар",
      web: "Веб-әзірлеу",
      cyber: "Киберқауіпсіздік",
      design: "UI/UX Дизайн",
      infrastructure: "Инфрақұрылым"
    },
    projects: {
      title: "Таңдаулы жобалар",
      viewProject: "Жобаны көру",
      items: [
        {
          title: "Киберқауіпсіздік платформасы",
          description: "Инфрақұрылымды бақылауға және қауіптерді анықтауға арналған кешенді шешім."
        },
        {
          title: "E-Commerce Экожүйесі",
          description: "Төлем жүйелерімен және логистикамен интеграцияланған масштабталатын интернет-дүкен."
        },
        {
          title: "Корпоративтік Портал",
          description: "Ішкі процестерді басқаруға және қауіпсіз деректер алмасуға арналған жүйе."
        }
      ]
    },
    contact: {
      title: "Бөлісу",
      subtitle: "Жобаңызды бірге талқылайық",
      name: "Атыңыз",
      email: "Электрондық пошта",
      message: "Хабарлама",
      send: "Жіберу",
      placeholder: "Жобаңыз туралы қысқаша айтып беріңіз..."
    },
    footer: {
      rights: "Барлық құқықтар қорғалған.",
      studio: "Цифрлық шешімдер мен қорғаныс веб-студиясы"
    }
  },
  ru: {
    nav: {
      home: "Главная",
      about: "О нас",
      expertise: "Экспертиза",
      work: "Проекты",
      contact: "Контакты"
    },
    hero: {
      kicker: "Высокотехнологичные решения",
      name: "Цифровые решения и защита",
      subtext: "Создаем безопасные и эффективные веб-проекты для вашего бизнеса. Разработка сайтов, кибербезопасность и архитектура данных.",
      status: "СТАТУС",
      operational: "ОПЕРАЦИОННЫЙ",
      latency: "ЗАДЕРЖКА",
      fast: "БЫСТРО",
      viewArsenal: "Посмотреть работы",
      unsheatheCode: "Связаться"
    },
    about: {
      title: "Наш путь",
      mission: "Миссия",
      missionText: "Мы помогаем бизнесу расти в цифровом пространстве, объединяя современные технологии и безопасность. Каждый наш проект — это сочетание инноваций и надежности.",
      expertise: "Экспертиза",
      expertiseText: "Наша веб-студия предлагает услуги от разработки сложных веб-приложений до аудита кибербезопасности. Мы — команда высококлассных инженеров и специалистов по безопасности.",
      stats: {
        projects: "Завершенных проектов",
        clients: "Довольных клиентов",
        security: "Уровень безопасности"
      }
    },
    skills: {
      title: "Технологии",
      web: "Веб-разработка",
      cyber: "Кибербезопасность",
      design: "UI/UX Дизайн",
      infrastructure: "Инфраструктура"
    },
    projects: {
      title: "Избранные проекты",
      viewProject: "Посмотреть проект",
      items: [
        {
          title: "Платформа кибербезопасности",
          description: "Комплексное решение для мониторинга инфраструктуры и обнаружения угроз."
        },
        {
          title: "E-Commerce Экосистема",
          description: "Масштабируемый интернет-магазин с интеграцией платежных систем и логистики."
        },
        {
          title: "Корпоративный Портал",
          description: "Система управления внутренними процессами и безопасного обмена данными."
        }
      ]
    },
    contact: {
      title: "Связаться",
      subtitle: "Давайте обсудим ваш проект",
      name: "Ваше имя",
      email: "Электронная почта",
      message: "Сообщение",
      send: "Отправить",
      placeholder: "Расскажите кратко о вашем проекте..."
    },
    footer: {
      rights: "Все права защищены.",
      studio: "Веб-студия Цифровых решений и защиты"
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      expertise: "Expertise",
      work: "Work",
      contact: "Contact"
    },
    hero: {
      kicker: "High-Tech Solutions",
      name: "Digital Solutions & Protection",
      subtext: "Creating secure and efficient web projects for your business. Web development, cybersecurity, and data architecture.",
      status: "STATUS",
      operational: "OPERATIONAL",
      latency: "LATENCY",
      fast: "FAST",
      viewArsenal: "View Projects",
      unsheatheCode: "Get in Touch"
    },
    about: {
      title: "The Path",
      mission: "Mission",
      missionText: "We help businesses grow in the digital space by merging modern technology and security. Every project we undertake is a blend of innovation and reliability.",
      expertise: "Expertise",
      expertiseText: "Our web studio provides services ranging from complex web applications to cybersecurity audits. We are a team of top-tier engineers and security experts.",
      stats: {
        projects: "Completed Projects",
        clients: "Happy Clients",
        security: "Security Rating"
      }
    },
    skills: {
      title: "Technologies",
      web: "Web Development",
      cyber: "Cyber Security",
      design: "UI/UX Design",
      infrastructure: "Infrastructure"
    },
    projects: {
      title: "Featured Projects",
      viewProject: "View Project",
      items: [
        {
          title: "Cybersecurity Platform",
          description: "Comprehensive solution for infrastructure monitoring and threat detection."
        },
        {
          title: "E-Commerce Ecosystem",
          description: "Scalable online store with payment and logistics integration."
        },
        {
          title: "Corporate Portal",
          description: "Internal process management and secure document exchange system."
        }
      ]
    },
    contact: {
      title: "Connect",
      subtitle: "Let's discuss your project",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      placeholder: "Tell us a bit about your project..."
    },
    footer: {
      rights: "All rights reserved.",
      studio: "Digital Solutions & Protection Web Studio"
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('kz'); // Default to Kazakh

  const t = (path) => {
    const keys = path.split('.');
    let result = translations[language];
    for (const key of keys) {
      if (result[key] === undefined) return path;
      result = result[key];
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
