'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Torus, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Advanced Particle System
function ParticleField({ count = 5000 }) {
  const mesh = useRef<THREE.Points>(null!);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp.set([
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      ], i * 3);
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.1;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={mesh} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Interactive Floating Geometries
function FloatingGeometry() {
  const torusRef = useRef<THREE.Mesh>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      torusRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
    
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      sphereRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 2;
      sphereRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.3) * 1.5;
    }
  });

  return (
    <group>
      <Torus ref={torusRef} args={[1, 0.3, 16, 32]} position={[3, 0, -2]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Torus>
      
      <Sphere ref={sphereRef} args={[0.8]} position={[-3, 1, -1]}>
        <MeshDistortMaterial
          color="#06b6d4"
          attach="material"
          distort={0.6}
          speed={1.5}
          roughness={0}
          metalness={1}
        />
      </Sphere>
    </group>
  );
}

// Holographic Code Display
function HolographicCode() {
  const codeRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (codeRef.current) {
      codeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={codeRef} position={[0, 0, -3]}>
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial 
          color="#10b981" 
          emissive="#065f46"
          emissiveIntensity={0.2}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </group>
  );
}

export default function Advanced3DHero() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Advanced Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          castShadow
          color="#06b6d4"
        />
        
        {/* Particle Field */}
        <ParticleField />
        
        {/* Floating Geometries */}
        <FloatingGeometry />
        
        {/* Holographic Code */}
        <HolographicCode />
        
        {/* Interactive Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
