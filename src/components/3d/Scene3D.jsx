import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import PropTypes from 'prop-types';
import FloatingShapes from './FloatingShapes';

const Scene3D = ({ children, enableControls = false, cameraPosition = [0, 0, 10] }) => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={cameraPosition} />
        
        <Suspense fallback={null}>
          {children || <FloatingShapes />}
        </Suspense>

        {enableControls && <OrbitControls enableZoom={false} />}
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#0A0A0A', 5, 20]} />
      </Canvas>
    </div>
  );
};

Scene3D.propTypes = {
  children: PropTypes.node,
  enableControls: PropTypes.bool,
  cameraPosition: PropTypes.arrayOf(PropTypes.number),
};

export default Scene3D;
