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
  const currentRef = useRef({ rotateX: -14, rotateY: 0, floatY: 0 });
  const targetRef = useRef({ rotateX: -14, rotateY: 0 });
  const velocityRef = useRef({ rotateX: 0, rotateY: 0 });
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    baseRotateX: -14,
    baseRotateY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
  });

  const renderLogoWord = (faceClass) => (
    <div className={`avatar-logo-word ${faceClass}`} aria-hidden="true">
      {brandLetters.map((letter, index) => (
        <span
          key={`${faceClass}-${index}`}
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
  );

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
      const idleRotateX = Math.sin(elapsed * 0.92) * 1.8;
      const idleRotateY = Math.cos(elapsed * 0.74) * 1.4;

      if (!dragRef.current.active) {
        targetRef.current.rotateX += velocityRef.current.rotateX;
        targetRef.current.rotateY += velocityRef.current.rotateY;
        velocityRef.current.rotateX *= 0.94;
        velocityRef.current.rotateY *= 0.94;

        if (Math.abs(velocityRef.current.rotateX) < 0.002) {
          velocityRef.current.rotateX = 0;
        }

        if (Math.abs(velocityRef.current.rotateY) < 0.002) {
          velocityRef.current.rotateY = 0;
        }
      }

      currentRef.current.floatY = Math.sin(elapsed * 1.18) * -5.8;

      currentRef.current.rotateX += (targetRef.current.rotateX - currentRef.current.rotateX) * 0.09;
      currentRef.current.rotateY += (targetRef.current.rotateY - currentRef.current.rotateY) * 0.09;
      currentRef.current.rotateX += idleRotateX;
      currentRef.current.rotateY += idleRotateY;
      applyTransforms();

      currentRef.current.rotateX -= idleRotateX;
      currentRef.current.rotateY -= idleRotateY;

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handlePointerDown = (event) => {
    const showcase = showcaseRef.current;

    if (!showcase) {
      return;
    }

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      baseRotateX: targetRef.current.rotateX,
      baseRotateY: targetRef.current.rotateY,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: performance.now(),
    };

    velocityRef.current.rotateX = 0;
    velocityRef.current.rotateY = 0;
    showcase.classList.add('is-dragging');
    showcase.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current.active) {
      return;
    }

    const deltaX = event.clientX - dragRef.current.startX;
    const deltaY = event.clientY - dragRef.current.startY;
    const rotateY = dragRef.current.baseRotateY + deltaX * 0.58;
    const rotateX = dragRef.current.baseRotateX - deltaY * 0.46;
    const now = performance.now();
    const elapsed = Math.max(16, now - dragRef.current.lastTime);
    const frameStep = elapsed / 16.67;

    targetRef.current.rotateY = rotateY;
    targetRef.current.rotateX = rotateX;
    velocityRef.current.rotateY = (((event.clientX - dragRef.current.lastX) * 0.58) / frameStep) * 0.18;
    velocityRef.current.rotateX = (((dragRef.current.lastY - event.clientY) * 0.46) / frameStep) * 0.18;

    dragRef.current.lastX = event.clientX;
    dragRef.current.lastY = event.clientY;
    dragRef.current.lastTime = now;
  };

  const handlePointerEnd = (event) => {
    const showcase = showcaseRef.current;

    if (!dragRef.current.active || !showcase) {
      return;
    }

    dragRef.current.active = false;
    dragRef.current.pointerId = null;
    showcase.classList.remove('is-dragging');

    if (event?.pointerId !== undefined && showcase.hasPointerCapture?.(event.pointerId)) {
      showcase.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="avatar-3d-wrapper" aria-label={t('hero.brand')}>
      <div
        ref={showcaseRef}
        className="avatar-showcase avatar-showcase-panel"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
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

            <div className="avatar-logo-rotor">
              {renderLogoWord('avatar-logo-word-front')}
              {renderLogoWord('avatar-logo-word-back')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar3D;
