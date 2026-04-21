import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Text3D } from '@react-three/drei';
import fontUrl from 'three/examples/fonts/helvetiker_bold.typeface.json?url';
import { useLanguage } from '../contexts/LanguageContext';

const HOT_LETTER_INDICES = new Set([1, 2]);

const buildParticles = () =>
  Array.from({ length: 28 }, (_, index) => {
    const angle = (index / 28) * Math.PI * 2;
    const radiusX = 3 + (index % 4) * 0.22;
    const radiusY = 1.16 + (index % 5) * 0.12;

    return {
      baseX: Math.cos(angle) * radiusX,
      baseY: Math.sin(angle) * radiusY,
      baseZ: ((index % 7) - 3) * 0.16,
      drift: 0.08 + (index % 3) * 0.03,
      pulse: 0.85 + (index % 4) * 0.1,
      size: 0.028 + (index % 4) * 0.008,
      speed: 0.42 + (index % 5) * 0.06,
      phase: index * 0.41,
      color: index % 4 === 0 ? '#ffd2a0' : '#ff4961',
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

      mesh.position.x =
        particle.baseX + Math.cos(elapsed * particle.speed + particle.phase) * particle.drift;
      mesh.position.y =
        particle.baseY + Math.sin(elapsed * (particle.speed + 0.18) + particle.phase) * particle.drift;
      mesh.position.z =
        particle.baseZ + Math.sin(elapsed * (particle.speed + 0.32) + particle.phase) * 0.14;

      mesh.rotation.x += 0.01 + index * 0.0005;
      mesh.rotation.y += 0.012 + index * 0.0006;

      const scale = 0.82 + Math.sin(elapsed * particle.pulse + particle.phase) * 0.34;
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
            emissiveIntensity={2.4}
            metalness={0.2}
            roughness={0.22}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
};

const FloatingLetter = ({ letter, index, total }) => {
  const letterRef = useRef(null);
  const isHot = HOT_LETTER_INDICES.has(index);
  const spacing = 1.07;
  const offset = ((total - 1) * spacing) / 2;
  const baseX = index * spacing - offset;
  const baseY = Math.sin(index * 0.8) * 0.035;
  const baseZ = Math.cos(index * 0.9) * 0.14;

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (!letterRef.current) {
      return;
    }

    letterRef.current.position.x = baseX;
    letterRef.current.position.y = baseY + Math.sin(elapsed * 1.1 + index * 0.55) * 0.025;
    letterRef.current.position.z = baseZ + Math.cos(elapsed * 0.92 + index * 0.6) * 0.06;
    letterRef.current.rotation.x = Math.sin(elapsed * 0.7 + index * 0.35) * 0.035;
    letterRef.current.rotation.y = Math.cos(elapsed * 0.82 + index * 0.4) * 0.09;
    letterRef.current.rotation.z = Math.sin(elapsed * 0.5 + index * 0.3) * 0.018;
  });

  return (
    <group ref={letterRef}>
      <Center>
        <Text3D
          font={fontUrl}
          size={0.56}
          height={0.28}
          curveSegments={20}
          bevelEnabled
          bevelThickness={0.025}
          bevelSize={0.018}
          bevelOffset={0}
          bevelSegments={8}
        >
          {letter}
          <meshPhysicalMaterial
            attach="material-0"
            color={isHot ? '#ffd8ab' : '#ff6270'}
            emissive={isHot ? '#ff9563' : '#ff304a'}
            emissiveIntensity={isHot ? 1.95 : 1.28}
            metalness={0.28}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.1}
            toneMapped={false}
          />
          <meshStandardMaterial
            attach="material-1"
            color={isHot ? '#933f2c' : '#6d1220'}
            emissive={isHot ? '#ff6f4a' : '#c91c37'}
            emissiveIntensity={0.42}
            metalness={0.58}
            roughness={0.3}
            toneMapped={false}
          />
        </Text3D>
      </Center>
    </group>
  );
};

const RendixLetters = ({ brand }) => {
  const letters = useMemo(() => Array.from(brand.replace(/\s+/g, '')), [brand]);

  return (
    <group scale={[0.78, 0.78, 0.78]}>
      {letters.map((letter, index) => (
        <FloatingLetter
          key={`${letter}-${index}`}
          letter={letter}
          index={index}
          total={letters.length}
        />
      ))}
    </group>
  );
};

const LogoScene = ({ brand, dragRef, targetRotationRef, velocityRef }) => {
  const logoGroupRef = useRef(null);
  const currentRotationRef = useRef({ x: -0.1, y: 0 });

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (!dragRef.current.active) {
      targetRotationRef.current.x += velocityRef.current.x;
      targetRotationRef.current.y += velocityRef.current.y;
      velocityRef.current.x *= 0.92;
      velocityRef.current.y *= 0.92;

      targetRotationRef.current.x += (-0.1 - targetRotationRef.current.x) * 0.06;
      targetRotationRef.current.y += (0 - targetRotationRef.current.y) * 0.035;

      if (Math.abs(velocityRef.current.x) < 0.00035) {
        velocityRef.current.x = 0;
      }

      if (Math.abs(velocityRef.current.y) < 0.00035) {
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

    logoGroupRef.current.rotation.x = currentRotationRef.current.x + Math.sin(elapsed * 0.78) * 0.02;
    logoGroupRef.current.rotation.y = currentRotationRef.current.y + Math.cos(elapsed * 0.58) * 0.03;
    logoGroupRef.current.position.y = Math.sin(elapsed * 1.02) * 0.06;
    logoGroupRef.current.position.z = Math.cos(elapsed * 0.82) * 0.03;
  });

  return (
    <>
      <ambientLight intensity={0.34} />
      <hemisphereLight intensity={0.78} color="#fff1ec" groundColor="#170204" />
      <directionalLight position={[4.6, 5.6, 5.4]} intensity={2.7} color="#ffe2d4" />
      <pointLight position={[0, 0.35, 4.8]} intensity={28} distance={14} color="#ffab78" decay={2} />
      <pointLight position={[0, -0.25, 3.6]} intensity={18} distance={11} color="#ff2745" decay={2} />
      <pointLight position={[-2.8, 1.4, 2.4]} intensity={6} distance={8} color="#ffffff" decay={2} />

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
  const shellRef = useRef(null);
  const targetRotationRef = useRef({ x: -0.1, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    baseRotateX: -0.1,
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
    const rotateY = dragRef.current.baseRotateY + deltaX * 0.0105;
    const rotateX = Math.max(-0.3, Math.min(0.12, dragRef.current.baseRotateX - deltaY * 0.0038));
    const now = performance.now();
    const elapsed = Math.max(16, now - dragRef.current.lastTime);
    const frameStep = elapsed / 16.67;

    targetRotationRef.current.y = rotateY;
    targetRotationRef.current.x = rotateX;
    velocityRef.current.y = (((event.clientX - dragRef.current.lastX) * 0.0105) / frameStep) * 0.16;
    velocityRef.current.x = (((dragRef.current.lastY - event.clientY) * 0.0038) / frameStep) * 0.16;

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
        <div className="avatar-webgl-host">
          <Canvas
            dpr={[1.4, 2.6]}
            camera={{ position: [0, 0, 8], fov: 30 }}
            gl={{
              alpha: true,
              antialias: true,
              powerPreference: 'high-performance',
              premultipliedAlpha: false,
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
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
