import { useRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Float, 
  Text,
  ContactShadows,
  PerspectiveCamera,
  Sparkles
} from '@react-three/drei';
import CanvasResizeSync, { useElementSize } from './CanvasResizeSync';

function RendixLogo() {
  const textRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
      textRef.current.rotation.x = Math.cos(t * 0.3) * 0.08;
      textRef.current.position.y = Math.sin(t * 1.2) * 0.1;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Text
          ref={textRef}
          fontSize={1.1}
          color="#ffffff"
          maxWidth={10}
          lineHeight={1}
          letterSpacing={0.25}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          RENDIX
          <meshStandardMaterial 
            metalness={1} 
            roughness={0.1} 
            emissive="#d90429" 
            emissiveIntensity={0.7}
            side={THREE.DoubleSide} 
          />
        </Text>
      </Float>

      {/* The "red dots" effect using Sparkles */}
      <Sparkles 
        count={60} 
        scale={5} 
        size={4} 
        speed={0.4} 
        opacity={0.8} 
        color="#d90429" 
      />

    </group>
  );
}

const Avatar3D = () => {
  const [containerRef, size] = useElementSize();

  return (
    <div
      ref={containerRef}
      className="avatar-3d-wrapper"
      style={{ width: '100%', height: '100%', minHeight: '600px', cursor: 'grab' }}
    >
      <Canvas shadows dpr={[1, 1.5]}>
        <CanvasResizeSync width={size.width} height={size.height} />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={120} color="#ffffff" />
        <pointLight position={[-10, -10, 10]} intensity={80} color="#d90429" />
        <pointLight position={[0, 0, 5]} intensity={40} color="#ff0000" />
        
        <Suspense fallback={null}>
          <group scale={0.75}>
            <RendixLogo />
          </group>
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={10}
            blur={3}
            far={4}
          />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.8} 
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default Avatar3D;
