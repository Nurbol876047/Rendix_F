import { useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Avatar3D = () => {
  const { t } = useLanguage();
  const letters = useMemo(() => Array.from(t('hero.brand') || 'RENDIX'), [t]);

  return (
    <div className="avatar-3d-wrapper" aria-label={t('hero.brand')}>
      <div className="avatar-showcase avatar-showcase-letters">
        <span className="avatar-orbit avatar-orbit-one" />
        <span className="avatar-orbit avatar-orbit-two" />

        <div className="avatar-letter-stage">
          <div className="avatar-letter-grid">
            {letters.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                className="avatar-letter-tile"
                style={{
                  '--tile-delay': `${index * 0.12}s`,
                  '--tile-shift': `${(index % 2 === 0 ? -1 : 1) * (10 + index * 2)}px`,
                  '--tile-tilt': `${(index - letters.length / 2) * 1.8}deg`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          <div className="avatar-word-caption">
            <span className="avatar-word-line" />
            <span>{t('hero.kicker')}</span>
          </div>
        </div>

        <span className="avatar-node avatar-node-one" />
        <span className="avatar-node avatar-node-two" />
        <span className="avatar-node avatar-node-three" />
      </div>
    </div>
  );
};

export default Avatar3D;
