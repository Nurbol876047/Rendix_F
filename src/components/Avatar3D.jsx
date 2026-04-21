import { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Avatar3D = () => {
  const { t } = useLanguage();
  const showcaseRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(0);
  const idleStartRef = useRef(0);
  const currentRef = useRef({ rotateX: -8, rotateY: 12 });
  const targetRef = useRef({ rotateX: -8, rotateY: 12 });
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    baseRotateX: -8,
    baseRotateY: 12,
  });

  useEffect(() => {
    const stage = stageRef.current;
    const showcase = showcaseRef.current;

    if (!stage || !showcase) {
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

      if (!dragRef.current.active) {
        const elapsed = (timestamp - idleStartRef.current) / 1000;
        targetRef.current.rotateX = -7 + Math.sin(elapsed * 1.1) * 3.8;
        targetRef.current.rotateY = 10 + Math.cos(elapsed * 0.9) * 10.5;
      }

      currentRef.current.rotateX += (targetRef.current.rotateX - currentRef.current.rotateX) * 0.09;
      currentRef.current.rotateY += (targetRef.current.rotateY - currentRef.current.rotateY) * 0.09;
      applyTransforms();

      frameRef.current = window.requestAnimationFrame(animate);
    };

    applyTransforms();
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
      startX: event.clientX,
      startY: event.clientY,
      baseRotateX: currentRef.current.rotateX,
      baseRotateY: currentRef.current.rotateY,
    };

    showcase.classList.add('is-dragging');
    showcase.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const showcase = showcaseRef.current;

    if (!showcase) {
      return;
    }

    if (dragRef.current.active) {
      const deltaX = event.clientX - dragRef.current.startX;
      const deltaY = event.clientY - dragRef.current.startY;

      targetRef.current.rotateY = dragRef.current.baseRotateY + deltaX * 0.18;
      targetRef.current.rotateX = dragRef.current.baseRotateX - deltaY * 0.14;
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

  const handlePointerLeave = (event) => {
    const showcase = showcaseRef.current;

    if (showcase) {
      showcase.classList.remove('is-dragging');
      if (event?.pointerId !== undefined && showcase.hasPointerCapture?.(event.pointerId)) {
        showcase.releasePointerCapture(event.pointerId);
      }
    }

    dragRef.current.active = false;
    idleStartRef.current = performance.now();
  };

  return (
    <div className="avatar-3d-wrapper" aria-label={t('hero.brand')}>
      <div
        ref={showcaseRef}
        className="avatar-showcase avatar-showcase-panel"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
        onPointerLeave={handlePointerLeave}
      >
        <span className="avatar-orbit avatar-orbit-one" />
        <span className="avatar-orbit avatar-orbit-two" />
        <div ref={stageRef} className="avatar-letter-stage avatar-letter-stage-panel glass-panel">
          <span className="avatar-core-mark">RDX</span>
          <span className="avatar-core-title avatar-core-title-panel">{t('hero.brand')}</span>
          <span className="avatar-core-divider" />
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
