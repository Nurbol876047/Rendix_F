import { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Avatar3D = () => {
  const { t } = useLanguage();
  const brand = t('hero.brand') || 'RENDIX';
  const brandLetters = Array.from(brand.replace(/\s+/g, ''));
  const sparks = [
    { x: '14%', y: '18%', size: '4px', delay: '0.2s' },
    { x: '25%', y: '30%', size: '3px', delay: '1.4s' },
    { x: '35%', y: '22%', size: '5px', delay: '0.8s' },
    { x: '49%', y: '16%', size: '4px', delay: '1.9s' },
    { x: '63%', y: '28%', size: '3px', delay: '1.1s' },
    { x: '78%', y: '20%', size: '4px', delay: '0.5s' },
    { x: '18%', y: '62%', size: '3px', delay: '2.2s' },
    { x: '32%', y: '54%', size: '4px', delay: '1.6s' },
    { x: '58%', y: '60%', size: '5px', delay: '0.9s' },
    { x: '71%', y: '52%', size: '3px', delay: '2.5s' },
    { x: '83%', y: '72%', size: '4px', delay: '1.3s' },
    { x: '44%', y: '68%', size: '3px', delay: '0.4s' },
  ];
  const showcaseRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(0);
  const idleStartRef = useRef(0);
  const currentRef = useRef({ rotateX: -8, rotateY: 12 });
  const targetRef = useRef({ rotateX: -8, rotateY: 12 });

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return undefined;
    }

    const applyTransforms = () => {
      stage.style.setProperty('--avatar-rotate-x', `${currentRef.current.rotateX}deg`);
      stage.style.setProperty('--avatar-rotate-y', `${currentRef.current.rotateY}deg`);
    };

    const animate = (timestamp) => {
      if (!idleStartRef.current) {
        idleStartRef.current = timestamp;
      }

      const elapsed = (timestamp - idleStartRef.current) / 1000;
      targetRef.current.rotateX = -7 + Math.sin(elapsed * 1.1) * 3.8;
      targetRef.current.rotateY = 10 + Math.cos(elapsed * 0.9) * 10.5;

      currentRef.current.rotateX += (targetRef.current.rotateX - currentRef.current.rotateX) * 0.09;
      currentRef.current.rotateY += (targetRef.current.rotateY - currentRef.current.rotateY) * 0.09;
      applyTransforms();

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handlePointerMove = (event) => {
    const showcase = showcaseRef.current;

    if (!showcase) {
      return;
    }

    const rect = showcase.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normalizedX = (event.clientX - centerX) / (rect.width / 2);
    const normalizedY = (event.clientY - centerY) / (rect.height / 2);

    targetRef.current.rotateY = normalizedX * 14;
    targetRef.current.rotateX = normalizedY * -10;
  };

  return (
    <div className="avatar-3d-wrapper" aria-label={t('hero.brand')}>
      <div
        ref={showcaseRef}
        className="avatar-showcase avatar-showcase-panel"
        onPointerMove={handlePointerMove}
      >
        <div ref={stageRef} className="avatar-letter-stage avatar-letter-stage-panel">
          <div className="avatar-logo-panel">
            <div className="avatar-logo-noise" aria-hidden="true">
              {sparks.map((spark, index) => (
                <span
                  key={index}
                  className="avatar-logo-spark"
                  style={{
                    '--spark-x': spark.x,
                    '--spark-y': spark.y,
                    '--spark-size': spark.size,
                    '--spark-delay': spark.delay,
                  }}
                />
              ))}
            </div>

            <div className="avatar-logo-word" aria-hidden="true">
              {brandLetters.map((letter, index) => (
                <span
                  key={index}
                  className={`avatar-logo-letter${index === 1 || index === 2 ? ' is-hot' : ''}`}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar3D;
