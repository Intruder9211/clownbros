'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function TorusKnotMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1] range
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Slowly rotate the TorusKnot
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
      meshRef.current.rotation.z = time * 0.05;

      // Calculate target positions based on mouse coordinate parallax
      const targetX = mouse.current.x * 2.0;
      const targetY = mouse.current.y * 1.5;

      // Smoothly lerp towards target position
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
      
      // Add a subtle vertical floating offset
      meshRef.current.position.y += Math.sin(time * 1.5) * 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.5, 0.45, 120, 16]} />
      <meshBasicMaterial
        color="#DCC7A1"
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <TorusKnotMesh />
      </Canvas>
    </div>
  );
}
