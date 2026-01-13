
import React, { useRef } from 'react';
import { Group } from 'three';
import { useFrame, ThreeElements } from '@react-three/fiber';
import { CarConfig } from '../types';

// Extend the JSX namespace to include Three.js elements from react-three-fiber
declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

interface CarModelProps {
  config: CarConfig;
}

const CarModel: React.FC<CarModelProps> = ({ config }) => {
  // Use specific Group type for the ref to improve type safety
  const groupRef = useRef<Group>(null);

  // Simple animation using the clock
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Chassis / Body */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        {config.bodyType === 'sedan' && <boxGeometry args={[4, 0.8, 1.8]} />}
        {config.bodyType === 'sport' && <boxGeometry args={[4.2, 0.6, 2]} />}
        {config.bodyType === 'truck' && <boxGeometry args={[4.5, 1.2, 2]} />}
        {config.bodyType === 'cyber' && <boxGeometry args={[4, 1.0, 1.9]} />}
        <meshStandardMaterial color={config.bodyColor} roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Cabin */}
      <mesh position={[config.bodyType === 'truck' ? -0.5 : 0, 0.9, 0]} castShadow>
        {config.bodyType === 'sedan' && <boxGeometry args={[2, 0.6, 1.6]} />}
        {config.bodyType === 'sport' && <boxGeometry args={[1.8, 0.5, 1.5]} />}
        {config.bodyType === 'truck' && <boxGeometry args={[1.5, 0.8, 1.6]} />}
        {config.bodyType === 'cyber' && <boxGeometry args={[2.2, 0.6, 1.7]} />}
        <meshStandardMaterial color="#111" roughness={0} transparent opacity={0.9} />
      </mesh>

      {/* Wheels */}
      {[ 
        [-1.2, 0.2, 0.9], [1.2, 0.2, 0.9], 
        [-1.2, 0.2, -0.9], [1.2, 0.2, -0.9] 
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.35, 0.35, 0.3, 32]} />
            <meshStandardMaterial color={config.rimColor} metalness={1} roughness={0.2} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.36, 0.36, 0.1, 32]} />
            <meshStandardMaterial color="#222" />
          </mesh>
        </group>
      ))}

      {/* Spoiler */}
      {config.spoiler && (
        <group position={[-1.8, 0.8, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.1, 0.4, 1.6]} />
            <meshStandardMaterial color={config.bodyColor} />
          </mesh>
          <mesh position={[0, 0.2, 0]} rotation={[0.1, 0, 0]}>
            <boxGeometry args={[0.5, 0.05, 1.8]} />
            <meshStandardMaterial color={config.bodyColor} />
          </mesh>
        </group>
      )}

      {/* Headlights */}
      <mesh position={[2, 0.5, 0.6]}>
        <boxGeometry args={[0.1, 0.2, 0.4]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[2, 0.5, -0.6]}>
        <boxGeometry args={[0.1, 0.2, 0.4]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
      </mesh>

      {/* Tail Lights */}
      <mesh position={[-2.1, 0.5, 0]}>
        <boxGeometry args={[0.05, 0.1, 1.6]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1.5} />
      </mesh>

      {/* Underglow */}
      {config.neonUnderglow && (
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 2]} />
          <meshStandardMaterial 
            color={config.neonColor} 
            emissive={config.neonColor} 
            emissiveIntensity={5} 
            transparent 
            opacity={0.4} 
          />
        </mesh>
      )}
    </group>
  );
};

export default CarModel;
