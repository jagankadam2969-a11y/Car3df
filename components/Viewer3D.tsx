
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  PresentationControls,
  Stage
} from '@react-three/drei';
import CarModel from './CarModel';
import { CarConfig } from '../types';

interface Viewer3DProps {
  config: CarConfig;
}

const Viewer3D: React.FC<Viewer3DProps> = ({ config }) => {
  return (
    <div className="w-full h-full bg-[#050505]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
        <Suspense fallback={null}>
          <Stage intensity={0.5} environment="city" adjustCamera={false}>
            <CarModel config={config} />
          </Stage>
          <ContactShadows 
            position={[0, -0.1, 0]} 
            opacity={0.6} 
            scale={10} 
            blur={2} 
            far={1} 
            resolution={256} 
            color="#000000" 
          />
        </Suspense>
        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Viewer3D;
