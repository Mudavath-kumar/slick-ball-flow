import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import basketballImg from '@/assets/basketball.jpg';

interface BallProps {
  scrollProgress: number;
}

const Ball = ({ scrollProgress }: BallProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, basketballImg);

  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: texture,
      roughness: 0.6,
      metalness: 0.05,
      clearcoat: 0.3,
      clearcoatRoughness: 0.4,
      envMapIntensity: 0.8,
    });
  }, [texture]);

  // Determine ball position/scale/rotation based on scroll progress
  const getTransform = (progress: number) => {
    // Section boundaries: 0-0.167, 0.167-0.333, 0.333-0.5, 0.5-0.667, 0.667-0.833, 0.833-1
    const s = progress;

    if (s < 0.167) {
      // Section 1: Center, normal size
      const t = s / 0.167;
      return {
        position: [0, 0, 0] as [number, number, number],
        scale: 1.8 + t * 0.2,
        rotationY: t * 0.5,
        wireframe: false,
        opacity: 1,
      };
    } else if (s < 0.333) {
      // Section 2: Move right, zoom in (texture close-up)
      const t = (s - 0.167) / 0.167;
      return {
        position: [t * 3, 0, t * 2] as [number, number, number],
        scale: 2 + t * 2,
        rotationY: 0.5 + t * 1,
        wireframe: false,
        opacity: 1,
      };
    } else if (s < 0.5) {
      // Section 3: Move left, side view
      const t = (s - 0.333) / 0.167;
      return {
        position: [3 - t * 6, 0, 2 - t * 1] as [number, number, number],
        scale: 4 - t * 1.5,
        rotationY: 1.5 + t * 1.5,
        wireframe: false,
        opacity: 1,
      };
    } else if (s < 0.667) {
      // Section 4: Center, wireframe mode
      const t = (s - 0.5) / 0.167;
      return {
        position: [-3 + t * 3, 0, 1 - t * 1] as [number, number, number],
        scale: 2.5 - t * 0.5,
        rotationY: 3 + t * 2,
        wireframe: t > 0.3,
        opacity: 1,
      };
    } else if (s < 0.833) {
      // Section 5: Center, realistic, smaller
      const t = (s - 0.667) / 0.167;
      return {
        position: [0, 0, 0] as [number, number, number],
        scale: 2 - t * 0.3,
        rotationY: 5 + t * 1,
        wireframe: t < 0.2,
        opacity: 1,
      };
    } else {
      // Section 6: Fade out
      const t = (s - 0.833) / 0.167;
      return {
        position: [0, -t * 2, 0] as [number, number, number],
        scale: Math.max(0.1, 1.7 - t * 1.7),
        rotationY: 6 + t * 2,
        wireframe: false,
        opacity: Math.max(0, 1 - t * 2),
      };
    }
  };

  useFrame(() => {
    if (!meshRef.current) return;
    const transform = getTransform(scrollProgress);

    meshRef.current.position.lerp(
      new THREE.Vector3(...transform.position),
      0.08
    );
    meshRef.current.scale.lerp(
      new THREE.Vector3(transform.scale, transform.scale, transform.scale),
      0.08
    );
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      transform.rotationY + meshRef.current.rotation.y * 0.01,
      0.02
    );

    // Update material
    if (meshRef.current.material instanceof THREE.MeshPhysicalMaterial) {
      meshRef.current.material.wireframe = transform.wireframe;
      meshRef.current.material.opacity = transform.opacity;
      meshRef.current.material.transparent = transform.opacity < 1;
    }
  });

  return (
    <mesh ref={meshRef} material={material}>
      <sphereGeometry args={[1, 64, 64]} />
    </mesh>
  );
};

interface Basketball3DProps {
  scrollProgress: number;
}

const Basketball3D = ({ scrollProgress }: Basketball3DProps) => {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-3, 2, 4]} intensity={0.4} color="#FF5F1F" />
        <pointLight position={[0, -3, 3]} intensity={0.3} />
        <Ball scrollProgress={scrollProgress} />
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

export default Basketball3D;
