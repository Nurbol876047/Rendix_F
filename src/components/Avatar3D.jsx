import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Text3D } from '@react-three/drei';
import fontUrl from 'three/examples/fonts/helvetiker_bold.typeface.json?url';
import CanvasResizeSync, { useElementSize } from './CanvasResizeSync';
import { useLanguage } from '../contexts/LanguageContext';

const HOT_LETTER_INDICES = new Set([1, 2]);

const buildParticles = () =>
  Array.from({ length: 24 }, (_, index) => {
    const angle = (index / 24) * Math.PI * 2;
    const radiusX = 2.9 + (index % 4) * 0.24;
    const radiusY = 1.1 + (index % 5) * 0.14;

    return {
      baseX: Math.cos(angle) * radiusX,
      baseY: Math.sin(angle) * radiusY,
      baseZ: ((index % 5) - 2) * 0.18,
      drift: 0.08 + (index % 3) * 0.03,
      pulse: 0.75 + (index % 4) * 0.12,
      size: 0.03 + (index % 4) * 0.008,
      speed: 0.45 + (index % 5) * 0.08,
      phase: index * 0.47,
      color: index % 3 === 0 ? '#ffc487' : '#ff4f63',
      geometry: index % 2 === 0 ? 'octa' : 'tetra',
    };
  });

const LogoParticles = () => {
  const particleRefs = useRef([]);
  const particles = useMemo(buildParticles, []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    particleRefs.current.forEach((mesh, index) => {
      const particle = particles[index];

      if (!mesh || !particle) {
        return;
      }

      mesh.position.x = particle.baseX + Math.cos(elapsed * particle.speed + particle.phase) * particle.drift;
      mesh.position.y =
        particle.baseY + Math.sin(elapsed * (particle.speed + 0.22) + particle.phase) * particle.drift;
      mesh.position.z =
        particle.baseZ + Math.sin(elapsed * (particle.speed + 0.38) + particle.phase) * 0.12;

      mesh.rotation.x += 0.012 + index * 0.0007;
      mesh.rotation.y += 0.016 + index * 0.0008;

      const scale = 0.82 + Math.sin(elapsed * particle.pulse + particle.phase) * 0.28;
      mesh.scale.setScalar(scale);
    });
  });

  return (
    <group>
      {particles.map((particle, index) => (
        <mesh
          key={index}
          ref={(node) => {
            particleRefs.current[index] = node;
          }}
          position={[particle.baseX, particle.baseY, particle.baseZ]}
        >
          {particle.geometry === 'octa' ? (
            <octahedronGeometry args={[particle.size, 0]} />
          ) : (
            <tetrahedronGeometry args={[particle.size, 0]} />
          )}
          <meshStandardMaterial
            color={particle.color}
            emissive={particle.color}
            emissiveIntensity={2.2}
            metalness={0.18}
            roughness={0.26}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
};

const RendixLetters = ({ brand }) => {
  const letters = useMemo(() => Array.from(brand.replace(/\s+/g, '')), [brand]);
  const spacing = 1.03;
  const offset = ((letters.length - 1) * spacing) / 2;

  return (
    <group scale={[1.18, 1.18, 1.18]}>
      {letters.map((letter, index) => {
        const isHot = HOT_LETTER_INDICES.has(index);

        return (
          <group key={`${letter}-${index}`} position={[index * spacing - offset, 0, 0]}>
            <Center>
              <Text3D
                font={fontUrl}
                size={0.78}
                height={0.28}
                curveSegments={18}
                bevelEnabled
                bevelThickness={0.022}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={7}
              >
                {letter}
                <meshPhysicalMaterial
                  attach="material-0"
                  color={isHot ? '#ffd3a0' : '#ff5b69'}
                  emissive={isHot ? '#ff9561' : '#ff3049'}
                  emissiveIntensity={isHot ? 1.7 : 1.15}
                  metalness={0.24}
                  roughness={0.15}
                  clearcoat={1}
                  clearcoatRoughness={0.12}
                  toneMapped={false}
                />
                <meshStandardMaterial
                  attach="material-1"
                  color={isHot ? '#a63d29' : '#5e0e1d'}
                  emissive={isHot ? '#ff7448' : '#be1b31'}
                  emissiveIntensity={isHot ? 0.48 : 0.34}
                  metalness={0.46}
                  roughness={0.34}
                  toneMapped={false}
                />
              </Text3D>
            </Center>
          </group>
        );
      })}
    </group>
  );
};

const LogoScene = ({ brand, dragRef, targetRotationRef, velocityRef }) => {
  const logoGroupRef = useRef(null);
  const currentRotationRef = useRef({ x: -0.08, y: 0 });

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (!dragRef.current.active) {
      targetRotationRef.current.x += velocityRef.current.x;
      targetRotationRef.current.y += velocityRef.current.y;
      velocityRef.current.x *= 0.92;
      velocityRef.current.y *= 0.92;

      targetRotationRef.current.x += (-0.08 - targetRotationRef.current.x) * 0.06;
      targetRotationRef.current.y += (0 - targetRotationRef.current.y) * 0.045;

      if (Math.abs(velocityRef.current.x) < 0.0004) {
        velocityRef.current.x = 0;
      }

      if (Math.abs(velocityRef.current.y) < 0.0004) {
        velocityRef.current.y = 0;
      }
    }

    currentRotationRef.current.x +=
      (targetRotationRef.current.x - currentRotationRef.current.x) * 0.12;
    currentRotationRef.current.y +=
      (targetRotationRef.current.y - currentRotationRef.current.y) * 0.12;

    if (!logoGroupRef.current) {
      return;
    }

    logoGroupRef.current.rotation.x = currentRotationRef.current.x + Math.sin(elapsed * 0.9) * 0.025;
    logoGroupRef.current.rotation.y = currentRotationRef.current.y + Math.cos(elapsed * 0.65) * 0.04;
    logoGroupRef.current.position.y = Math.sin(elapsed * 1.1) * 0.08;
    logoGroupRef.current.position.z = Math.cos(elapsed * 0.85) * 0.04;
  });

  return (
    <>
      <ambientLight intensity={0.42} />
      <hemisphereLight intensity={0.95} color="#fff0ec" groundColor="#140204" />
      <directionalLight position={[4.8, 5.4, 4.8]} intensity={2.8} color="#ffd8c8" />
      <pointLight position={[0, 0.4, 4.4]} intensity={32} distance={13} color="#ff9f71" decay={2} />
      <pointLight position={[0, -0.4, 3.2]} intensity={18} distance={10} color="#ff2e49" decay={2} />
      <pointLight position={[-2.6, 1.6, 2.2]} intensity={6} distance={8} color="#ffffff" decay={2} />

      <group ref={logoGroupRef}>
        <RendixLetters brand={brand} />
        <LogoParticles />
      </group>
    </>
  );
};

const Avatar3D = () => {
  const { t } = useLanguage();
  const brand = (t('hero.brand') || 'RENDIX').replace(/\s+/g, '');
  const [canvasHostRef, canvasSize] = useElementSize();
  const shellRef = useRef(null);
  const targetRotationRef = useRef({ x: -0.08, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    baseRotateX: -0.08,
    baseRotateY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
  });

  const handlePointerDown = (event) => {
    const shell = shellRef.current;

    if (!shell) {
      return;
    }

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      baseRotateX: targetRotationRef.current.x,
      baseRotateY: targetRotationRef.current.y,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: performance.now(),
    };

    velocityRef.current.x = 0;
    velocityRef.current.y = 0;
    shell.classList.add('is-dragging');
    shell.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current.active) {
      return;
    }

    const deltaX = event.clientX - dragRef.current.startX;
    const deltaY = event.clientY - dragRef.current.startY;
    const rotateY = dragRef.current.baseRotateY + deltaX * 0.011;
    const rotateX = Math.max(-0.34, Math.min(0.16, dragRef.current.baseRotateX - deltaY * 0.0045));
    const now = performance.now();
    const elapsed = Math.max(16, now - dragRef.current.lastTime);
    const frameStep = elapsed / 16.67;

    targetRotationRef.current.y = rotateY;
    targetRotationRef.current.x = rotateX;
    velocityRef.current.y = (((event.clientX - dragRef.current.lastX) * 0.011) / frameStep) * 0.16;
    velocityRef.current.x = (((dragRef.current.lastY - event.clientY) * 0.0045) / frameStep) * 0.16;

    dragRef.current.lastX = event.clientX;
    dragRef.current.lastY = event.clientY;
    dragRef.current.lastTime = now;
  };

  const handlePointerEnd = (event) => {
    const shell = shellRef.current;

    if (!dragRef.current.active || !shell) {
      return;
    }

    dragRef.current.active = false;
    dragRef.current.pointerId = null;
    shell.classList.remove('is-dragging');

    if (event?.pointerId !== undefined && shell.hasPointerCapture?.(event.pointerId)) {
      shell.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="avatar-3d-wrapper" aria-label={brand}>
      <div
        ref={shellRef}
        className="avatar-webgl-shell"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onPointerLeave={handlePointerEnd}
      >
        <div ref={canvasHostRef} className="avatar-webgl-host">
          <Canvas
            dpr={[1.25, 2.2]}
            camera={{ position: [0, 0, 8.1], fov: 30 }}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          >
            <CanvasResizeSync width={canvasSize.width} height={canvasSize.height} />
            <Suspense fallback={null}>
              <LogoScene
                brand={brand}
                dragRef={dragRef}
                targetRotationRef={targetRotationRef}
                velocityRef={velocityRef}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Avatar3D;
