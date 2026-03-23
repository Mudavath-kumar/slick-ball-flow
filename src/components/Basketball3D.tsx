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

  // Configure texture for realism
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
  }, [texture]);

  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: texture,
      roughness: 0.75,
      metalness: 0.0,
      clearcoat: 0.15,
      clearcoatRoughness: 0.6,
      envMapIntensity: 0.5,
      bumpMap: texture,
      bumpScale: 0.02,
    });
  }, [texture]);

  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const targetScale = useRef(new THREE.Vector3(1, 1, 1));
  const targetRotY = useRef(0);

  const getTransform = (progress: number) => {
    const s = progress;

    if (s < 0.167) {
      // Section 1: Hero - small centered ball
      const t = s / 0.167;
      return {
        position: [0, 0, 0] as [number, number, number],
        scale: 1.1 + t * 0.1,
        rotationY: t * 0.5,
        wireframe: false,
        opacity: 1,
      };
    } else if (s < 0.333) {
      // Section 2: Elite Control - move right, moderate zoom
      const t = (s - 0.167) / 0.167;
      return {
        position: [t * 2.5, 0, t * 1] as [number, number, number],
        scale: 1.2 + t * 0.8,
        rotationY: 0.5 + t * 1,
        wireframe: false,
        opacity: 1,
      };
    } else if (s < 0.5) {
      // Section 3: Perfect Flight - move left, side view
      const t = (s - 0.333) / 0.167;
      return {
        position: [2.5 - t * 5, 0, 1 - t * 0.5] as [number, number, number],
        scale: 2.0 - t * 0.5,
        rotationY: 1.5 + t * 1.5,
        wireframe: false,
        opacity: 1,
      };
    } else if (s < 0.667) {
      // Section 4: Technical - center, wireframe
      const t = (s - 0.5) / 0.167;
      return {
        position: [-2.5 + t * 2.5, 0, 0.5 - t * 0.5] as [number, number, number],
        scale: 1.5 - t * 0.2,
        rotationY: 3 + t * 2,
        wireframe: t > 0.3,
        opacity: 1,
      };
    } else if (s < 0.833) {
      // Section 5: Champion - center, realistic, nice size
      const t = (s - 0.667) / 0.167;
      return {
        position: [0, 0, 0] as [number, number, number],
        scale: 1.3 - t * 0.1,
        rotationY: 5 + t * 1,
        wireframe: t < 0.15,
        opacity: 1,
      };
    } else {
      // Section 6: Fade out
      const t = (s - 0.833) / 0.167;
      return {
        position: [0, -t * 1.5, 0] as [number, number, number],
        scale: Math.max(0.1, 1.2 - t * 1.2),
        rotationY: 6 + t * 2,
        wireframe: false,
        opacity: Math.max(0, 1 - t * 2),
      };
    }
  };

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const transform = getTransform(scrollProgress);

    // Smooth lerp with delta-based factor for consistent speed
    const lerpFactor = 1 - Math.pow(0.001, delta);

    targetPos.current.set(...transform.position);
    targetScale.current.set(transform.scale, transform.scale, transform.scale);
    targetRotY.current = transform.rotationY;

    meshRef.current.position.lerp(targetPos.current, lerpFactor * 0.5);
    meshRef.current.scale.lerp(targetScale.current, lerpFactor * 0.5);

    // Gentle idle rotation + scroll-driven rotation
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotY.current,
      lerpFactor * 0.1
    );

    // Update material properties smoothly
    const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
    if (mat) {
      mat.wireframe = transform.wireframe;
      mat.opacity = transform.opacity;
      mat.transparent = transform.opacity < 1;
      mat.needsUpdate = false;
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
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} />
        <directionalLight position={[-3, 2, 4]} intensity={0.3} color="#FF8844" />
        <pointLight position={[0, -3, 3]} intensity={0.2} />
        <Ball scrollProgress={scrollProgress} />
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.3}
          scale={8}
          blur={2.5}
          far={4}
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

export default Basketball3D;
