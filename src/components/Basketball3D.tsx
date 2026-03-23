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
      roughness: 0.82,
      metalness: 0.0,
      clearcoat: 0.08,
      clearcoatRoughness: 0.7,
      envMapIntensity: 0.35,
      bumpMap: texture,
      bumpScale: 0.015,
    });
  }, [texture]);

  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const targetScale = useRef(new THREE.Vector3(1, 1, 1));

  const getTransform = (progress: number) => {
    const s = progress;

    if (s < 0.167) {
      // Section 1: Hero - centered, modest size so SPALDING text visible
      return {
        position: [0, -0.2, 0] as [number, number, number],
        scale: 0.9,
        rotationY: s / 0.167 * 0.5,
        wireframe: false,
        opacity: 1,
      };
    } else if (s < 0.333) {
      // Section 2: Elite Control - content LEFT, ball RIGHT
      const t = (s - 0.167) / 0.167;
      return {
        position: [1.8 + t * 0.5, 0, t * 0.5] as [number, number, number],
        scale: 1.0 + t * 0.4,
        rotationY: 0.5 + t * 1.2,
        wireframe: false,
        opacity: 1,
      };
    } else if (s < 0.5) {
      // Section 3: Perfect Flight - content RIGHT, ball LEFT
      const t = (s - 0.333) / 0.167;
      return {
        position: [2.3 - t * 4.6, 0, 0.5 - t * 0.3] as [number, number, number],
        scale: 1.4 - t * 0.2,
        rotationY: 1.7 + t * 1.5,
        wireframe: false,
        opacity: 1,
      };
    } else if (s < 0.667) {
      // Section 4: Technical - center, wireframe mode
      const t = (s - 0.5) / 0.167;
      return {
        position: [-2.3 + t * 2.3, 0, 0.2 - t * 0.2] as [number, number, number],
        scale: 1.2,
        rotationY: 3.2 + t * 2,
        wireframe: t > 0.25,
        opacity: 1,
      };
    } else if (s < 0.833) {
      // Section 5: Champion - center, smaller
      const t = (s - 0.667) / 0.167;
      return {
        position: [0, 0.1, 0] as [number, number, number],
        scale: 1.0 - t * 0.05,
        rotationY: 5.2 + t * 0.8,
        wireframe: t < 0.1,
        opacity: 1,
      };
    } else {
      // Section 6: Fade out
      const t = (s - 0.833) / 0.167;
      return {
        position: [0, -t * 1.5, 0] as [number, number, number],
        scale: Math.max(0.05, 0.95 - t * 0.95),
        rotationY: 6 + t * 1.5,
        wireframe: false,
        opacity: Math.max(0, 1 - t * 2.5),
      };
    }
  };

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const transform = getTransform(scrollProgress);

    const lerpSpeed = 0.06;

    targetPos.current.set(...transform.position);
    targetScale.current.set(transform.scale, transform.scale, transform.scale);

    meshRef.current.position.lerp(targetPos.current, lerpSpeed);
    meshRef.current.scale.lerp(targetScale.current, lerpSpeed);

    // Gentle idle rotation
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      transform.rotationY,
      0.03
    );

    // Material updates
    const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
    if (mat) {
      mat.wireframe = transform.wireframe;
      mat.opacity = transform.opacity;
      mat.transparent = transform.opacity < 1;
    }
  });

  return (
    <mesh ref={meshRef} material={material}>
      <sphereGeometry args={[1, 128, 128]} />
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
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        {/* Soft realistic lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 6, 4]} intensity={0.9} color="#fff5ee" />
        <directionalLight position={[-2, 3, 5]} intensity={0.25} color="#ffaa77" />
        <pointLight position={[0, -2, 3]} intensity={0.15} color="#ffffff" />
        <hemisphereLight args={['#ffeedd', '#111111', 0.2]} />
        <Ball scrollProgress={scrollProgress} />
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.25}
          scale={6}
          blur={3}
          far={3}
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

export default Basketball3D;
