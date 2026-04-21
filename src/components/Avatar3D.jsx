import { Suspense, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import {
  Center,
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
  useGLTF,
} from '@react-three/drei';
import CanvasResizeSync, { useElementSize } from './CanvasResizeSync';
import { useLanguage } from '../contexts/LanguageContext';

const createMonitorTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 768;

  const context = canvas.getContext('2d');

  if (!context) {
    return null;
  }

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#050505');
  gradient.addColorStop(0.52, '#14080c');
  gradient.addColorStop(1, '#050505');

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = 'rgba(230, 57, 70, 0.16)';
  context.lineWidth = 2;

  for (let x = 0; x <= canvas.width; x += 58) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }

  for (let y = 0; y <= canvas.height; y += 42) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }

  context.strokeStyle = 'rgba(230, 57, 70, 0.58)';
  context.lineWidth = 5;
  context.strokeRect(68, 68, canvas.width - 136, canvas.height - 136);

  context.fillStyle = '#f6f6f6';
  context.font = '700 142px "Space Grotesk", "Arial Black", sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('RENDIX', canvas.width / 2, canvas.height / 2 - 8);

  context.fillStyle = '#e63946';
  context.font = '700 38px "Space Grotesk", Arial, sans-serif';
  context.fillText('STUDIO', canvas.width / 2, canvas.height / 2 + 84);

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
};

const HeroComputerModel = () => {
  const { scene } = useGLTF('/models/computer.glb');
  const model = useMemo(() => scene.clone(true), [scene]);
  const screenTexture = useMemo(() => createMonitorTexture(), []);

  useEffect(() => {
    if (!screenTexture) {
      return undefined;
    }

    model.traverse((child) => {
      if (!child.isMesh) {
        return;
      }

      if (child.material) {
        child.material = Array.isArray(child.material)
          ? child.material.map((material) => material.clone())
          : child.material.clone();
      }

      if (child.name === 'monitor-screen') {
        child.material = new THREE.MeshBasicMaterial({
          map: screenTexture,
          toneMapped: false,
        });
      }
    });

    return () => {
      screenTexture.dispose();
    };
  }, [model, screenTexture]);

  return <primitive object={model} />;
};

useGLTF.preload('/models/computer.glb');

const Avatar3D = () => {
  const [containerRef, size] = useElementSize();
  const { t } = useLanguage();

  return (
    <div
      ref={containerRef}
      className="avatar-3d-wrapper"
      style={{ width: '100%', height: '100%', minHeight: '600px', cursor: 'grab' }}
    >
      <div className="avatar-showcase avatar-showcase-fallback" aria-hidden="true">
        <span className="avatar-orbit avatar-orbit-one" />
        <span className="avatar-orbit avatar-orbit-two" />
        <div className="avatar-core glass-panel">
          <span className="avatar-core-mark">RDX</span>
          <span className="avatar-core-title">{t('hero.brand')}</span>
          <span className="avatar-core-divider" />
          <p className="avatar-core-copy">{t('hero.kicker')}</p>
        </div>
        <span className="avatar-node avatar-node-one" />
        <span className="avatar-node avatar-node-two" />
        <span className="avatar-node avatar-node-three" />
      </div>

      <Canvas className="avatar-3d-canvas" dpr={[1, 1.6]} camera={{ position: [0, 0.9, 8.2], fov: 30 }}>
        <CanvasResizeSync width={size.width} height={size.height} />
        <PerspectiveCamera makeDefault position={[0, 0.9, 8.2]} fov={30} />

        <ambientLight intensity={1.1} />
        <hemisphereLight intensity={0.65} color="#ffffff" groundColor="#e63946" />
        <directionalLight position={[5, 7, 5]} intensity={2.8} color="#ffffff" />
        <pointLight position={[0, 1.6, 4.6]} intensity={2.4} color="#ff4d6d" />
        <pointLight position={[-4, 0, -3]} intensity={1.5} color="#ffffff" />

        <Sparkles
          count={32}
          scale={[5.8, 3.6, 4.2]}
          size={4}
          speed={0.35}
          opacity={0.55}
          color="#ff3358"
        />

        <Suspense fallback={null}>
          <Center>
            <group scale={2.15} position={[0, -3.05, 0]} rotation={[0, -0.12, 0]}>
              <HeroComputerModel />
            </group>
          </Center>
        </Suspense>

        <ContactShadows
          position={[0, -3.7, 0]}
          opacity={0.4}
          scale={10}
          blur={2.6}
          far={6.5}
        />

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.85}
          minPolarAngle={0}
          maxPolarAngle={Math.PI}
          target={[0, -0.25, 0]}
        />
      </Canvas>
    </div>
  );
};

export default Avatar3D;
