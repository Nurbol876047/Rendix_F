import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sparkles, Text } from '@react-three/drei';

function Logo() {
  const group = useRef();
  const textRef = useRef();
  
  // Rotate and float the logo
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.4) * 0.3; // Gentle oscillation
    group.current.rotation.x = Math.cos(t * 0.3) * 0.15; // Slight pitch
    
    // Pulse effect for the red glow
    if (textRef.current) {
      textRef.current.material.emissiveIntensity = 0.8 + Math.sin(t * 2) * 0.4;
    }
  });

  return (
    <group ref={group}>
      <Text
        ref={textRef}
        fontSize={0.8}
        color="#ffffff"
        maxWidth={10}
        lineHeight={1}
        letterSpacing={0.05}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        RENDIX
        <meshStandardMaterial 
          metalness={0.9} 
          roughness={0.1} 
          emissive="#ff0000" 
          emissiveIntensity={0.5}
          side={THREE.DoubleSide}
        />
      </Text>
      
      {/* Dynamic cinematic lighting around the logo */}
      <pointLight position={[0, -0.5, 1]} intensity={2} color="#ff3333" />
      <pointLight position={[0, 0.5, -1]} intensity={1} color="#ffffff" />
    </group>
  );
}

const Avatar3D = () => {
  return (
    <div className="canvas-container" style={{ width: '100%', height: '100%', minHeight: '800px', cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ff3333" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Logo />
        </Float>
        
        {/* Cinematic atmospheric particles */}
        <Sparkles count={80} scale={6} size={3} speed={0.5} opacity={0.6} color="#ff3300" />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
    </div>
  );
};

export default Avatar3D;
