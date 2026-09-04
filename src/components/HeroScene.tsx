"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Interactive 3D Central Blob/Sphere ── */
function CentralCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    meshRef.current.rotation.y = t * 0.2;

    // Mouse tilt effect
    const mouse = state.mouse;
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      mouse.x * 0.8,
      0.05
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      mouse.y * 0.5,
      0.05
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 3]} />
        <MeshDistortMaterial
          color="#0f0f12"
          emissive="#FC6B2F"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

/* ── Orbital Glass Rings ── */
function OrbitalRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.z = t * 0.05;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {/* Outer Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#FC6B2F" transparent opacity={0.3} />
      </mesh>
      {/* Inner Ring */}
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

/* ── Floating Particle Field ── */
function ParticleField({ count = 100 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const seededRandom = (seed: number) => {
      const val = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
      return val - Math.floor(val);
    };
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (seededRandom(i * 5 + 1) - 0.5) * 16;
      const y = (seededRandom(i * 5 + 2) - 0.5) * 16;
      const z = (seededRandom(i * 5 + 3) - 0.5) * 12;
      const speed = 0.2 + seededRandom(i * 5 + 4) * 0.5;
      const factor = 0.3 + seededRandom(i * 5 + 5) * 0.7;
      temp.push({ x, y, z, speed, factor, initialY: y });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + i) * 0.3,
        p.initialY + Math.cos(t * p.speed * 0.8 + i) * 0.4,
        p.z + Math.sin(t * p.speed * 0.5 + i) * 0.2
      );
      const s = p.factor * (0.015 + Math.sin(t * 2 + i) * 0.005);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#FC6B2F" transparent opacity={0.4} />
    </instancedMesh>
  );
}

/* ── Resize & Camera Controller ── */
function CanvasResizeController({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { setSize, setDpr } = useThree();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width || container.clientWidth || window.innerWidth));
      const height = Math.max(1, Math.floor(rect.height || container.clientHeight || window.innerHeight));

      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);

      setDpr(dpr);
      setSize(width, height);
    };

    handleResize();

    const ro = new ResizeObserver(() => {
      handleResize();
    });
    ro.observe(container);

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    const raf = requestAnimationFrame(handleResize);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [setSize, setDpr, containerRef]);

  return null;
}

function ResponsiveCamera() {
  useFrame(({ camera, gl, size }) => {
    const targetZ = size.width < 768 ? 8.5 : 7;
    if (camera.position.z !== targetZ) {
      camera.position.z = targetZ;
    }

    // Update camera aspect and projection matrix on resize
    if ("aspect" in camera) {
      const perspectiveCam = camera as THREE.PerspectiveCamera;
      const desiredAspect = size.width / Math.max(1, size.height);
      if (Math.abs(perspectiveCam.aspect - desiredAspect) > 0.001) {
        perspectiveCam.aspect = desiredAspect;
        perspectiveCam.updateProjectionMatrix();
      }
    }

    // Ensure renderer has capped pixel ratio and matches size
    const targetDpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    if (gl.getPixelRatio() !== targetDpr) {
      gl.setPixelRatio(targetDpr);
    }
  });

  return null;
}

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isVisible = typeof document !== "undefined" ? document.visibilityState === "visible" : true;
    let isIntersecting = true;

    const updateActive = () => {
      setIsActive(isVisible && isIntersecting);
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      updateActive();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        updateActive();
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[12] overflow-hidden"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <Canvas
        frameloop={isActive ? "always" : "never"}
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="!w-full !h-full !absolute !inset-0"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          display: "block",
          background: "transparent",
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#FC6B2F" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#FC6B2F" />

        <CentralCore />
        <OrbitalRings />
        <ParticleField count={100} />

        <ResponsiveCamera />
        <CanvasResizeController containerRef={containerRef} />
      </Canvas>
    </div>
  );
}
