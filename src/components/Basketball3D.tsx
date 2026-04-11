import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import basketballImg from '@/assets/basketball.jpg';

interface BallProps {
  scrollProgress: number;
}

interface BallState {
  position: [number, number, number];
  scale: number;
  rotationY: number;
  wireframeMix: number;
  opacity: number;
}

const Ball = ({ scrollProgress }: BallProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, basketballImg);
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const targetScale = useRef(new THREE.Vector3(1, 1, 1));
  const smoothRotationY = useRef(0.2);
  const previousProgress = useRef(scrollProgress);
  const wireframeMix = useRef(0);

  // Configure texture for realism
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
  }, [texture]);

  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: texture,
      roughness: 0.86,
      metalness: 0.0,
      clearcoat: 0.06,
      clearcoatRoughness: 0.78,
      envMapIntensity: 0.45,
      sheen: 0.12,
      sheenRoughness: 0.8,
      bumpMap: texture,
      bumpScale: 0.02,
      transparent: true,
    });
  }, [texture]);

  const sectionStates = useMemo<BallState[]>(
    () => [
      {
        // Section 1: Hero - smaller, slightly behind headline
        position: [0, -0.16, -0.5],
        scale: 0.68,
        rotationY: 0.2,
        wireframeMix: 0,
        opacity: 0.98,
      },
      {
        // Section 2: Ball Showcase (horizontal scroll) - hide ball
        position: [4, 0, -2],
        scale: 0.3,
        rotationY: 0.8,
        wireframeMix: 0,
        opacity: 0,
      },
      {
        // Section 3: Elite Control - pushed right for left content visibility
        position: [2.45, -0.04, 0.75],
        scale: 1.46,
        rotationY: 1.35,
        wireframeMix: 0,
        opacity: 1,
      },
      {
        // Section 4: Perfect Flight - moved further left to avoid text overlap
        position: [-3.35, 0.02, 0.45],
        scale: 1.16,
        rotationY: 2.95,
        wireframeMix: 0,
        opacity: 1,
      },
      {
        // Section 5: Technical scanner - small and centered
        position: [0, 0, 0.12],
        scale: 0.8,
        rotationY: 4.65,
        wireframeMix: 1,
        opacity: 1,
      },
      {
        // Section 6: Champion - center and front-facing
        position: [0, 0.1, 0],
        scale: 0.95,
        rotationY: 5.75,
        wireframeMix: 0,
        opacity: 1,
      },
      {
        // Section 7 start
        position: [0, 0, 0],
        scale: 0.9,
        rotationY: 6.35,
        wireframeMix: 0,
        opacity: 1,
      },
      {
        // Section 7 end: fade out
        position: [0, -1.4, 0],
        scale: 0.06,
        rotationY: 7.75,
        wireframeMix: 0,
        opacity: 0,
      },
    ],
    []
  );

  const lerpNumber = (start: number, end: number, t: number) => start + (end - start) * t;

  const getTransform = (progress: number) => {
    const p = THREE.MathUtils.clamp(progress, 0, 1);
    const segmentCount = sectionStates.length - 1;
    const segmentSize = 1 / segmentCount;
    const segmentIndex = Math.min(Math.floor(p / segmentSize), segmentCount - 1);
    const localStart = segmentIndex * segmentSize;
    const localT = THREE.MathUtils.clamp((p - localStart) / segmentSize, 0, 1);

    const from = sectionStates[segmentIndex];
    const to = sectionStates[segmentIndex + 1];

    return {
      position: [
        lerpNumber(from.position[0], to.position[0], localT),
        lerpNumber(from.position[1], to.position[1], localT),
        lerpNumber(from.position[2], to.position[2], localT),
      ] as [number, number, number],
      scale: lerpNumber(from.scale, to.scale, localT),
      rotationY: lerpNumber(from.rotationY, to.rotationY, localT),
      wireframeMix: lerpNumber(from.wireframeMix, to.wireframeMix, localT),
      opacity: lerpNumber(from.opacity, to.opacity, localT),
    };
  };

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const transform = getTransform(scrollProgress);
    const smooth = 1 - Math.exp(-7 * delta);
    const scrollVelocity = scrollProgress - previousProgress.current;
    previousProgress.current = scrollProgress;

    targetPos.current.set(...transform.position);
    targetScale.current.set(transform.scale, transform.scale, transform.scale);

    meshRef.current.position.lerp(targetPos.current, smooth);
    meshRef.current.scale.lerp(targetScale.current, smooth);

    // Smooth bidirectional rotation with slight velocity response
    smoothRotationY.current = THREE.MathUtils.damp(smoothRotationY.current, transform.rotationY, 6, delta);
    const velocityBoost = THREE.MathUtils.clamp(scrollVelocity * 28, -0.08, 0.08);
    meshRef.current.rotation.y = smoothRotationY.current + velocityBoost;
    meshRef.current.rotation.y += 0.0018;

    // Material updates
    const mat = meshRef.current.material as THREE.MeshPhysicalMaterial;
    if (mat) {
      wireframeMix.current = THREE.MathUtils.damp(wireframeMix.current, transform.wireframeMix, 8, delta);
      mat.wireframe = wireframeMix.current > 0.6;
      mat.opacity = transform.opacity;
      mat.transparent = transform.opacity < 0.98;
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
    <div className="fixed inset-0 z-[5] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        dpr={[1, 1.75]}
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
