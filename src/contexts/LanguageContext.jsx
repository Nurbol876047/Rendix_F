import React, { createContext, useState, useContext } from 'react';
import kuiThemeImage from '../assets/projects/kui-theme.png';
import livingPaintingImage from '../assets/projects/living-painting.png';
import moodScannerImage from '../assets/projects/mood-scanner.png';
import cyberguardImage from '../assets/projects/cyberguard.png';
import runaJazuImage from '../assets/projects/runa-jazu.png';
import symmetryImage from '../assets/projects/symmetry.png';
import lawLiteracyImage from '../assets/projects/law-literacy.png';

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
      title: "Бағыттар",
      spotlightLabel: "Жаңа бағыттар",
      spotlightBadge: "Жаңа",
      cards: [
        {
          icon: "web",
          title: "Сайттар",
          items: ["Лендингтер", "Көпбеттік сайттар", "Промо-беттер", "Каталогтар", "Корпоративтік сайттар"]
        },
        {
          icon: "automation",
          title: "Автоматтандыру",
          items: ["Боттар", "Автожауаптар", "Интеграциялар", "Сценарийлер", "Ішкі процестер"]
        },
        {
          icon: "security",
          title: "Киберқауіпсіздік",
          items: ["Тексеру", "Аудит", "Мониторинг", "Талдау", "Қорғаныс"]
        },
        {
          icon: "systems",
          title: "Жүйелер",
          items: ["Панельдер", "Жеке кабинеттер", "Ішкі сервистер", "Дашбордтар", "Басқару бөлімдері"]
        },
        {
          icon: "design",
          title: "Дизайн",
          items: ["Интерфейстер", "Макеттер", "Прототиптер", "Визуалдар", "Айдентика"]
        },
        {
          icon: "interactive",
          title: "Интерактивті жобалар",
          items: ["Демо-беттер", "Оқу жобалары", "Визуалды оқиғалар", "Симуляторлар", "Презентациялық жобалар"]
        }
      ],
      spotlightCards: [
        {
          icon: "student",
          title: "Студенттерге",
          items: [
            "Дипломдық / курстық жұмыстар",
            "Ғылыми IT-жобалар",
            "Бағдарламалау бойынша зертханалық жұмыстар",
            "Техникалық презентациялар",
            "Код пен жөндеуге көмек"
          ]
        },
        {
          icon: "teacher",
          title: "Оқытушыларға",
          items: [
            "Оқу платформалары мен порталдар",
            "Тест жүйелері / quiz-боттар",
            "Журналдар мен есептерді автоматтандыру",
            "Презентациялар мен оқу материалдары",
            "Кафедра / факультет сайттары"
          ]
        }
      ]
    },
    projects: {
      title: "Жобалар",
      viewProject: "Жобаны көру",
      items: [
        {
          title: "Күй аңызы",
          description: "MediaPipe JS арқылы қол қимылымен басқарылатын интерактивті күй сахнасы. Бір және екі саусақ қимылдары оқиға мен дыбысты іске қосады.",
          image: kuiThemeImage,
          url: "https://9kd5vj2x1i.onrender.com",
          tags: ["MediaPipe", "Gesture"]
        },
        {
          title: "Living Painting",
          description: "Қол қимылы арқылы қара-ақ эскизді түске айналдыратын интерактивті сурет. Веб-камера мен hand tracking көріністі жандандырады.",
          image: livingPaintingImage,
          url: "https://control-display.onrender.com",
          tags: ["Interactive Art", "Hand Tracking"]
        },
        {
          title: "Көңіл-күй сканері",
          description: "Эмоция мен қол қимылын талдап, ЕБҚ және кибербуллинг туралы ақпарат беретін интерактивті сканер.",
          image: moodScannerImage,
          url: "https://1-mk1g.onrender.com/index.html?openScanner=1",
          tags: ["Emotion AI", "Cyberbullying"]
        },
        {
          title: "CyberGuard",
          description: "Фишинг, DDoS, XSS, ботнет және IoT қауіптері көрсетілетін интерактивті киберқауіпсіздік симуляторы. Шабуыл картасы мен қорғаныс сценарийлері бар.",
          image: cyberguardImage,
          url: "https://cyberguard3.onrender.com",
          tags: ["Cybersecurity", "Simulator"]
        },
        {
          title: "Runa Jazu",
          description: "Көне түркі әліпбиін тақтадан таңдап, дыбыстап үйрететін интерактивті оқу құралы. Таңба, дыбыс және камера режимі бір интерфейсте біріктірілген.",
          image: runaJazuImage,
          url: "https://runa-jazu.onrender.com",
          tags: ["Runes", "Education"]
        },
        {
          title: "Symmetry сыры",
          description: "Симметрия, алтын қима және ғалам үйлесімі туралы интерактивті платформа. Формула, визуал, бөлімдер және дыбыстық атмосфера біріккен.",
          image: symmetryImage,
          url: "https://symmetry1.onrender.com",
          tags: ["Symmetry", "Golden Ratio"]
        },
        {
          title: "Zań Alemine Sayahat",
          description: "Оқушыларға арналған интерактивті құқықтық квест. Заң, құқықтық мәдениет және қауіпсіз мінез-құлық тақырыптары ойын форматында түсіндіріледі.",
          image: lawLiteracyImage,
          url: "https://zan-tawny.vercel.app/",
          tags: ["Law", "Quest"]
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
      title: "Направления",
      spotlightLabel: "Новые направления",
      spotlightBadge: "Новое",
      cards: [
        {
          icon: "web",
          title: "Сайты",
          items: ["Лендинги", "Многостраничные сайты", "Промо-страницы", "Каталоги", "Корпоративные сайты"]
        },
        {
          icon: "automation",
          title: "Автоматизация",
          items: ["Боты", "Автоответы", "Интеграции", "Сценарии", "Внутренние процессы"]
        },
        {
          icon: "security",
          title: "Кибербезопасность",
          items: ["Проверка", "Аудит", "Мониторинг", "Анализ", "Защита"]
        },
        {
          icon: "systems",
          title: "Системы",
          items: ["Панели", "Личные кабинеты", "Внутренние сервисы", "Дашборды", "Управляющие разделы"]
        },
        {
          icon: "design",
          title: "Дизайн",
          items: ["Интерфейсы", "Макеты", "Прототипы", "Визуалы", "Айдентика"]
        },
        {
          icon: "interactive",
          title: "Интерактивные проекты",
          items: ["Демо-страницы", "Обучающие проекты", "Визуальные истории", "Симуляторы", "Презентационные проекты"]
        }
      ],
      spotlightCards: [
        {
          icon: "student",
          title: "Студентам",
          items: [
            "Дипломные / курсовые работы",
            "Научные IT-проекты",
            "Лабораторные по программированию",
            "Технические презентации",
            "Помощь с кодом и отладкой"
          ]
        },
        {
          icon: "teacher",
          title: "Преподавателям",
          items: [
            "Учебные платформы и порталы",
            "Тестовые системы / quiz-боты",
            "Автоматизация журналов и отчетов",
            "Презентации и учебные материалы",
            "Сайты кафедр / факультетов"
          ]
        }
      ]
    },
    projects: {
      title: "Проекты",
      viewProject: "Посмотреть проект",
      items: [
        {
          title: "Күй аңызы",
          description: "Интерактивная сцена с управлением через MediaPipe JS, где жесты одной и двух пальцев запускают сюжет и звук.",
          image: kuiThemeImage,
          url: "https://9kd5vj2x1i.onrender.com",
          tags: ["MediaPipe", "Gesture"]
        },
        {
          title: "Living Painting",
          description: "Интерактивная картина, в которой эскиз оживает цветом и реагирует на движение руки перед камерой.",
          image: livingPaintingImage,
          url: "https://control-display.onrender.com",
          tags: ["Interactive Art", "Hand Tracking"]
        },
        {
          title: "Сканер настроения",
          description: "Интерактивный сканер эмоций и жестов с разделом про кибербуллинг и визуализацией эмоционального состояния.",
          image: moodScannerImage,
          url: "https://1-mk1g.onrender.com/index.html?openScanner=1",
          tags: ["Emotion AI", "Cyberbullying"]
        },
        {
          title: "CyberGuard",
          description: "Интерактивный симулятор по кибербезопасности с темами фишинга, DDoS, XSS, ботнета и IoT-угроз. Внутри есть карта атак и сценарии защиты.",
          image: cyberguardImage,
          url: "https://cyberguard3.onrender.com",
          tags: ["Cybersecurity", "Simulator"]
        },
        {
          title: "Runa Jazu",
          description: "Интерактивная обучающая доска по древнетюркскому алфавиту, где знак можно выбрать рукой и сразу услышать его звучание.",
          image: runaJazuImage,
          url: "https://runa-jazu.onrender.com",
          tags: ["Runes", "Education"]
        },
        {
          title: "Секрет симметрии",
          description: "Интерактивная платформа о симметрии, золотом сечении и гармонии во Вселенной с атмосферным визуалом и формульной подачей.",
          image: symmetryImage,
          url: "https://symmetry1.onrender.com",
          tags: ["Symmetry", "Golden Ratio"]
        },
        {
          title: "Zań Alemine Sayahat",
          description: "Интерактивный правовой квест для школьников, где законы, правовая грамотность и безопасное поведение объясняются в игровом формате.",
          image: lawLiteracyImage,
          url: "https://zan-tawny.vercel.app/",
          tags: ["Law", "Quest"]
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
      title: "Directions",
      spotlightLabel: "New directions",
      spotlightBadge: "New",
      cards: [
        {
          icon: "web",
          title: "Websites",
          items: ["Landing pages", "Multi-page sites", "Promo pages", "Catalogs", "Corporate websites"]
        },
        {
          icon: "automation",
          title: "Automation",
          items: ["Bots", "Auto replies", "Integrations", "Scenarios", "Internal flows"]
        },
        {
          icon: "security",
          title: "Cybersecurity",
          items: ["Checks", "Audits", "Monitoring", "Analysis", "Protection"]
        },
        {
          icon: "systems",
          title: "Systems",
          items: ["Panels", "User accounts", "Internal services", "Dashboards", "Control sections"]
        },
        {
          icon: "design",
          title: "Design",
          items: ["Interfaces", "Layouts", "Prototypes", "Visuals", "Identity"]
        },
        {
          icon: "interactive",
          title: "Interactive Projects",
          items: ["Demo pages", "Learning projects", "Visual stories", "Simulators", "Presentation projects"]
        }
      ],
      spotlightCards: [
        {
          icon: "student",
          title: "For Students",
          items: [
            "Diploma / course projects",
            "Research IT projects",
            "Programming lab assignments",
            "Technical presentations",
            "Help with code and debugging"
          ]
        },
        {
          icon: "teacher",
          title: "For Educators",
          items: [
            "Learning platforms and portals",
            "Testing systems / quiz bots",
            "Journal and report automation",
            "Presentations and course materials",
            "Department / faculty websites"
          ]
        }
      ]
    },
    projects: {
      title: "Projects",
      viewProject: "View Project",
      items: [
        {
          title: "Kui Legend",
          description: "Interactive MediaPipe JS experience where one- and two-finger gestures control the scene and trigger sound.",
          image: kuiThemeImage,
          url: "https://9kd5vj2x1i.onrender.com",
          tags: ["MediaPipe", "Gesture"]
        },
        {
          title: "Living Painting",
          description: "An interactive artwork where a monochrome sketch blooms into color and follows the viewer's hand.",
          image: livingPaintingImage,
          url: "https://control-display.onrender.com",
          tags: ["Interactive Art", "Hand Tracking"]
        },
        {
          title: "Mood Scanner",
          description: "Gesture and emotion scanner with cyberbullying awareness content and a live emotional breakdown.",
          image: moodScannerImage,
          url: "https://1-mk1g.onrender.com/index.html?openScanner=1",
          tags: ["Emotion AI", "Cyberbullying"]
        },
        {
          title: "CyberGuard",
          description: "Interactive cybersecurity simulator covering phishing, DDoS, XSS, botnets, and IoT threats, complete with attack maps and defense scenarios.",
          image: cyberguardImage,
          url: "https://cyberguard3.onrender.com",
          tags: ["Cybersecurity", "Simulator"]
        },
        {
          title: "Runa Jazu",
          description: "Interactive learning board for the Old Turkic alphabet where users select symbols by hand and hear each sound instantly.",
          image: runaJazuImage,
          url: "https://runa-jazu.onrender.com",
          tags: ["Runes", "Education"]
        },
        {
          title: "Symmetry Secret",
          description: "Interactive platform about symmetry, the golden ratio, and cosmic harmony with formula-driven storytelling and immersive visuals.",
          image: symmetryImage,
          url: "https://symmetry1.onrender.com",
          tags: ["Symmetry", "Golden Ratio"]
        },
        {
          title: "Zań Alemine Sayahat",
          description: "Interactive legal quest for students that teaches law, legal awareness, and safe behavior through a game-like journey.",
          image: lawLiteracyImage,
          url: "https://zan-tawny.vercel.app/",
          tags: ["Law", "Quest"]
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
  const [language, setLanguage] = useState('ru'); // Default to Russian

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
