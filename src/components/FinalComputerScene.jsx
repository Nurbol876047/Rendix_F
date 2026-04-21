import { Suspense, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import {
  Center,
  ContactShadows,
  OrbitControls,
  useGLTF,
} from '@react-three/drei';
import './FinalComputerScene.css';
import CanvasResizeSync, { useElementSize } from './CanvasResizeSync';

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
  gradient.addColorStop(0.5, '#120709');
  gradient.addColorStop(1, '#050505');

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = 'rgba(230, 57, 70, 0.18)';
  context.lineWidth = 2;

  for (let x = 0; x <= canvas.width; x += 64) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }

  for (let y = 0; y <= canvas.height; y += 48) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }

  context.fillStyle = 'rgba(255, 255, 255, 0.05)';
  context.fillRect(62, 62, canvas.width - 124, canvas.height - 124);

  context.strokeStyle = 'rgba(230, 57, 70, 0.55)';
  context.lineWidth = 4;
  context.strokeRect(62, 62, canvas.width - 124, canvas.height - 124);

  context.fillStyle = '#f4f4f4';
  context.font = '700 164px "Space Grotesk", "Arial Black", sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('RENDIX', canvas.width / 2, canvas.height / 2 - 24);

  context.fillStyle = '#e63946';
  context.font = '600 42px "Space Grotesk", Arial, sans-serif';
  context.fillText('STUDIO', canvas.width / 2, canvas.height / 2 + 92);

  context.fillStyle = 'rgba(255, 255, 255, 0.78)';
  context.font = '500 26px "Outfit", Arial, sans-serif';
  context.fillText('DIGITAL SOLUTIONS // CYBERSECURITY // WEB', canvas.width / 2, canvas.height - 104);

  context.fillStyle = '#e63946';
  context.fillRect(116, 114, 156, 10);
  context.fillRect(canvas.width - 272, canvas.height - 124, 156, 10);

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
};

const ComputerModel = () => {
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

      child.castShadow = true;
      child.receiveShadow = true;

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

const FinalComputerScene = () => {
  const [canvasHostRef, canvasSize] = useElementSize();

  return (
    <section className="final-computer">
      <div className="container">
        <div className="final-computer-shell glass-panel">
          <div ref={canvasHostRef} className="final-computer-canvas">
            <Canvas
              shadows
              dpr={[1, 1.75]}
              camera={{ position: [0, 0.9, 8.2], fov: 30 }}
            >
              <CanvasResizeSync width={canvasSize.width} height={canvasSize.height} />
              <ambientLight intensity={1} />
              <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#e63946" />
              <directionalLight
                castShadow
                position={[6, 7, 5]}
                intensity={3}
                color="#ff6a6a"
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <pointLight position={[-4, 2, -4]} intensity={2} color="#ffffff" />
              <pointLight position={[0, 1.4, 4]} intensity={2.5} color="#e63946" />

              <Suspense fallback={null}>
                <Center>
                  <group scale={2.15} position={[0, -3.05, 0]} rotation={[0, -0.12, 0]}>
                    <ComputerModel />
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
                enablePan
                enableZoom
                enableRotate
                enableDamping
                dampingFactor={0.06}
                rotateSpeed={0.9}
                zoomSpeed={0.9}
                panSpeed={0.8}
                minDistance={4.2}
                maxDistance={14}
                target={[0, -0.25, 0]}
                minPolarAngle={0}
                maxPolarAngle={Math.PI}
              />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalComputerScene;
