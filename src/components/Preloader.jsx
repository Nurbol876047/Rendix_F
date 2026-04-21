import { useEffect, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import './Preloader.css';
import { useLanguage } from '../contexts/LanguageContext';

const MIN_DISPLAY_TIME = 900;

const Preloader = () => {
  const { t } = useLanguage();
  const [windowReady, setWindowReady] = useState(
    typeof document !== 'undefined' ? document.readyState === 'complete' : false,
  );
  const [minimumElapsed, setMinimumElapsed] = useState(false);
  const [progressValue, setProgressValue] = useState(12);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMinimumElapsed(true);
    }, MIN_DISPLAY_TIME);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (document.readyState === 'complete') {
      return undefined;
    }

    const handleLoad = () => {
      setWindowReady(true);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgressValue((current) => {
        if (windowReady) {
          return 100;
        }

        const next = current + Math.max(4, Math.ceil((100 - current) * 0.12));
        return Math.min(next, 92);
      });
    }, 120);

    return () => window.clearInterval(timer);
  }, [windowReady]);

  const shouldHide = minimumElapsed && windowReady && progressValue >= 100;

  return (
    <AnimatePresence>
      {!shouldHide ? (
        <Motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }}
        >
          <Motion.div
            className="preloader-panel"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="preloader-brand">RENDIX</span>
            <p className="preloader-copy">{t('site.loading')}</p>
            <div className="preloader-bar" aria-hidden="true">
              <Motion.span
                className="preloader-fill"
                animate={{ width: `${progressValue}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
            <span className="preloader-progress">{progressValue}%</span>
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Preloader;
