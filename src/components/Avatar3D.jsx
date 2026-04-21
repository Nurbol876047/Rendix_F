import { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Avatar3D = () => {
  const { t } = useLanguage();
  const brand = t('hero.brand') || 'RENDIX';
  const brandLetters = Array.from(brand.replace(/\s+/g, ''));
  const sparks = [
    { x: '9%', y: '33%', size: '2px', delay: '0.2s', type: 'star' },
    { x: '14%', y: '25%', size: '4px', delay: '0.7s' },
    { x: '18%', y: '43%', size: '3px', delay: '1.9s' },
    { x: '24%', y: '29%', size: '3px', delay: '1.3s', type: 'star' },
    { x: '31%', y: '23%', size: '4px', delay: '0.5s' },
    { x: '38%', y: '43%', size: '3px', delay: '2.4s' },
    { x: '43%', y: '19%', size: '5px', delay: '1.2s' },
    { x: '49%', y: '48%', size: '2px', delay: '0.4s', type: 'star' },
    { x: '54%', y: '24%', size: '4px', delay: '2.1s' },
    { x: '60%', y: '42%', size: '3px', delay: '0.9s' },
    { x: '66%', y: '21%', size: '3px', delay: '1.6s', type: 'star' },
    { x: '73%', y: '29%', size: '4px', delay: '0.3s' },
    { x: '81%', y: '45%', size: '3px', delay: '2.6s' },
    { x: '87%', y: '31%', size: '2px', delay: '1.1s', type: 'star' },
    { x: '22%', y: '61%', size: '3px', delay: '2s' },
    { x: '33%', y: '67%', size: '2px', delay: '0.8s', type: 'star' },
    { x: '46%', y: '72%', size: '4px', delay: '1.8s' },
    { x: '59%', y: '64%', size: '3px', delay: '0.6s' },
    { x: '71%', y: '69%', size: '2px', delay: '2.2s', type: 'star' },
    { x: '79%', y: '61%', size: '3px', delay: '1.4s' },
  ];
  const showcaseRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(0);
  const idleStartRef = useRef(0);
  const currentRef = useRef({ rotateX: -8, rotateY: 12 });
  const targetRef = useRef({ rotateX: -8, rotateY: 12 });
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerTargetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return undefined;
    }

    const applyTransforms = () => {
      stage.style.setProperty('--avatar-rotate-x', `${currentRef.current.rotateX}deg`);
      stage.style.setProperty('--avatar-rotate-y', `${currentRef.current.rotateY}deg`);
      stage.style.setProperty('--avatar-float-y', `${currentRef.current.floatY ?? 0}px`);
    };

    const animate = (timestamp) => {
      if (!idleStartRef.current) {
        idleStartRef.current = timestamp;
      }

      const elapsed = (timestamp - idleStartRef.current) / 1000;
      const idleRotateX = -4.6 + Math.sin(elapsed * 1.08) * 1.7;
      const idleRotateY = 6.8 + Math.cos(elapsed * 0.82) * 4.2;

      pointerRef.current.x += (pointerTargetRef.current.x - pointerRef.current.x) * 0.08;
      pointerRef.current.y += (pointerTargetRef.current.y - pointerRef.current.y) * 0.08;

      targetRef.current.rotateX = idleRotateX + pointerRef.current.y * -5.4;
      targetRef.current.rotateY = idleRotateY + pointerRef.current.x * 6.2;
      currentRef.current.floatY = Math.sin(elapsed * 1.35) * -4.5;

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

    pointerTargetRef.current.x = Math.max(-1, Math.min(1, normalizedX));
    pointerTargetRef.current.y = Math.max(-1, Math.min(1, normalizedY));
  };

  const handlePointerLeave = () => {
    pointerTargetRef.current.x = 0;
    pointerTargetRef.current.y = 0;
  };

  return (
    <div className="avatar-3d-wrapper" aria-label={t('hero.brand')}>
      <div
        ref={showcaseRef}
        className="avatar-showcase avatar-showcase-panel"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div ref={stageRef} className="avatar-letter-stage avatar-letter-stage-panel">
          <div className="avatar-logo-panel">
            <div className="avatar-logo-noise" aria-hidden="true">
              {sparks.map((spark, index) => (
                <span
                  key={index}
                  className={`avatar-logo-spark${spark.type === 'star' ? ' is-star' : ''}`}
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
                  style={{
                    '--letter-delay': `${index * 0.18}s`,
                    '--letter-shift': `${(index % 2 === 0 ? -1 : 1) * (3 + (index % 3))}px`,
                  }}
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
