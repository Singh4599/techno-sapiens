import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, shape, color, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001 * speed;
      meshRef.current.rotation.y += 0.002 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  const ShapeComponent = {
    sphere: Sphere,
    box: Box,
    torus: Torus,
  }[shape] || Sphere;

  return (
    <ShapeComponent ref={meshRef} position={position} args={shape === 'torus' ? [0.5, 0.2, 16, 100] : [1, 32, 32]}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </ShapeComponent>
  );
};

const FloatingShapes = () => {
  const shapes = [
    { position: [-3, 2, -5], shape: 'sphere', color: '#00E5FF', speed: 0.8 },
    { position: [3, -1, -8], shape: 'box', color: '#8A2BE2', speed: 1.2 },
    { position: [0, 3, -6], shape: 'torus', color: '#FF00FF', speed: 1 },
    { position: [-4, -2, -7], shape: 'sphere', color: '#00FF00', speed: 0.9 },
    { position: [4, 1, -9], shape: 'box', color: '#FF6600', speed: 1.1 },
  ];

  return (
    <>
      {shapes.map((shape, index) => (
        <FloatingShape key={index} {...shape} />
      ))}
      
      {/* Ambient Light */}
      <ambientLight intensity={0.5} />
      
      {/* Point Lights */}
      <pointLight position={[10, 10, 10]} intensity={1} color="#00E5FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8A2BE2" />
      <pointLight position={[0, 0, 10]} intensity={0.3} color="#FF00FF" />
    </>
  );
};

export default FloatingShapes;
