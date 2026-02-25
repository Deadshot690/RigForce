import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import type { PCBuild } from "../data/types";
import * as THREE from "three";

// ============================================================
// PERFORMANCE TIER → ARGB COLOR PALETTE
// ============================================================
const TIER_ARGB: Record<string, { primary: string; secondary: string; pulse: string }> = {
  Entry:       { primary: "#4488ff", secondary: "#2244aa", pulse: "#3366cc" },
  "Mid-Range": { primary: "#00ff88", secondary: "#00aa55", pulse: "#00cc66" },
  "High-End":  { primary: "#00eeff", secondary: "#0088bb", pulse: "#00ccdd" },
  Enthusiast:  { primary: "#cc44ff", secondary: "#770099", pulse: "#aa22ee" },
  Extreme:     { primary: "#ff6600", secondary: "#ff2200", pulse: "#ffaa00" },
  None:        { primary: "#00bfff", secondary: "#005577", pulse: "#0099cc" },
};

// ============================================================
// CASE BRAND PALETTE
// ============================================================
function getCasePalette(caseName: string, caseBrand: string) {
  const name = (caseName + caseBrand).toLowerCase();
  if (name.includes("lian li"))   return { body: "#1c1c1e", trim: "#e0e0e0", accent: "#00e5ff", logo: "#ffffff" };
  if (name.includes("nzxt"))      return { body: "#1a1a1a", trim: "#222222", accent: "#ee0055", logo: "#ffffff" };
  if (name.includes("fractal"))   return { body: "#2a2a2e", trim: "#888",    accent: "#aaccff", logo: "#cccccc" };
  if (name.includes("corsair"))   return { body: "#0d0d14", trim: "#ffec00", accent: "#ffec00", logo: "#ffdd00" };
  if (name.includes("be quiet"))  return { body: "#111111", trim: "#f5a623", accent: "#f5a623", logo: "#f5a623" };
  if (name.includes("phanteks"))  return { body: "#181825", trim: "#cc44ff", accent: "#cc44ff", logo: "#cc44ff" };
  if (name.includes("cooler master")) return { body: "#0f0f0f", trim: "#cc0000", accent: "#ff2200", logo: "#ff2200" };
  if (name.includes("thermaltake"))   return { body: "#101014", trim: "#00aaff", accent: "#00aaff", logo: "#44ccff" };
  if (name.includes("asus"))      return { body: "#18181c", trim: "#c8ab14", accent: "#c8ab14", logo: "#ddaa00" };
  if (name.includes("deepcool"))  return { body: "#12121a", trim: "#3399ff", accent: "#33aaff", logo: "#55bbff" };
  if (name.includes("antec"))     return { body: "#1a1010", trim: "#cc3300", accent: "#ff4400", logo: "#ff6633" };
  return { body: "#1a1a2e", trim: "#00bfff", accent: "#00bfff", logo: "#ffffff" };
}

// ============================================================
// ANIMATED COMPONENT WRAPPER (insertion slide-in)
// ============================================================
function AnimatedMount({ children, active }: { children: React.ReactNode; active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const mounted = useRef(false);

  useEffect(() => {
    if (active && !mounted.current) {
      progress.current = 0;
      mounted.current = true;
    }
    if (!active) {
      mounted.current = false;
      progress.current = 0;
    }
  }, [active]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (active) {
      progress.current = Math.min(progress.current + delta * 5, 1);
      const t = 1 - Math.pow(1 - progress.current, 3); // ease-out cubic
      groupRef.current.position.y = (1 - t) * 0.12;
      groupRef.current.scale.setScalar(0.85 + 0.15 * t);
      const mat = groupRef.current as any;
      groupRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          ((child as THREE.Mesh).material as THREE.Material).opacity = t;
          ((child as THREE.Mesh).material as THREE.Material).transparent = t < 1;
        }
      });
    }
  });

  if (!active) return null;
  return <group ref={groupRef}>{children}</group>;
}

// ============================================================
// CABLE COMPONENT (CatmullRom tube)
// ============================================================
function Cable({
  points,
  color,
  radius = 0.004,
}: {
  points: [number, number, number][];
  color: string;
  radius?: number;
}) {
  const geometry = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))),
    20,
    radius,
    6,
    false
  );
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
    </mesh>
  );
}

function CableManagement({ hasCPU, hasGPU, hasPSU, hasMotherboard }: {
  hasCPU: boolean; hasGPU: boolean; hasPSU: boolean; hasMotherboard: boolean;
}) {
  if (!hasPSU || !hasMotherboard) return null;
  return (
    <group>
      {/* ATX 24-pin: PSU → motherboard */}
      <Cable
        color="#ffcc00"
        points={[
          [0, -0.16, 0.1],
          [0.02, -0.10, 0.06],
          [0.04, -0.02, 0.0],
          [0.04, 0.04, -0.04],
        ]}
      />
      {/* EPS 8-pin: PSU → CPU top */}
      {hasCPU && (
        <Cable
          color="#ff8800"
          radius={0.003}
          points={[
            [0, -0.16, 0.05],
            [-0.03, -0.06, -0.01],
            [-0.05, 0.04, -0.05],
            [-0.04, 0.08, -0.07],
          ]}
        />
      )}
      {/* PCIe 8-pin: PSU → GPU */}
      {hasGPU && (
        <>
          <Cable
            color="#cc44ff"
            radius={0.003}
            points={[
              [0, -0.16, 0.12],
              [0.02, -0.12, 0.1],
              [0.02, -0.06, 0.08],
              [0.01, -0.02, 0.06],
            ]}
          />
          <Cable
            color="#aa22dd"
            radius={0.003}
            points={[
              [0, -0.16, 0.12],
              [-0.01, -0.10, 0.09],
              [0.0, -0.04, 0.07],
              [-0.01, -0.02, 0.06],
            ]}
          />
        </>
      )}
      {/* SATA data cable */}
      <Cable
        color="#ffffff"
        radius={0.002}
        points={[
          [-0.07, -0.09, 0.09],
          [-0.05, -0.06, 0.03],
          [-0.04, 0.01, 0.0],
        ]}
      />
    </group>
  );
}

// ============================================================
// ARGB STRIP INSIDE CASE
// ============================================================
function ARGBStrip({ color, intensity }: { color: string; intensity: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    const pulse = 0.8 + 0.2 * Math.sin(t.current * 2);
    if (lightRef.current) {
      lightRef.current.intensity = intensity * pulse;
    }
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse * 1.5;
    }
  });

  const col = new THREE.Color(color);
  return (
    <group>
      {/* Bottom strip */}
      <mesh ref={meshRef} position={[0, -0.18, -0.05]}>
        <boxGeometry args={[0.18, 0.003, 0.005]} />
        <meshStandardMaterial color={color} emissive={col} emissiveIntensity={1.5} />
      </mesh>
      {/* Right vertical strip */}
      <mesh position={[0.1, -0.05, -0.05]}>
        <boxGeometry args={[0.003, 0.22, 0.005]} />
        <meshStandardMaterial color={color} emissive={col} emissiveIntensity={1.2} />
      </mesh>
      {/* Ambient point light inside */}
      <pointLight
        ref={lightRef}
        position={[0, 0, -0.05]}
        color={color}
        intensity={intensity}
        distance={0.6}
        decay={2}
      />
    </group>
  );
}

// ============================================================
// CASE SHELL
// ============================================================
function CaseShell({
  formFactor,
  caseName,
  caseBrand,
}: {
  formFactor: string;
  caseName: string;
  caseBrand: string;
}) {
  const w = formFactor === "Mini-ITX" ? 0.18 : formFactor === "Micro-ATX" ? 0.22 : 0.26;
  const h = formFactor === "Mini-ITX" ? 0.28 : formFactor === "Micro-ATX" ? 0.38 : 0.48;
  const d = 0.46;
  const t = 0.007;
  const pal = getCasePalette(caseName, caseBrand);

  return (
    <group>
      {/* Back wall */}
      <mesh position={[-w / 2 + t / 2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[t, h, d]} />
        <meshStandardMaterial color={pal.body} metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Top */}
      <mesh position={[0, h / 2 - t / 2, 0]} castShadow>
        <boxGeometry args={[w, t, d]} />
        <meshStandardMaterial color={pal.body} metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Bottom */}
      <mesh position={[0, -h / 2 + t / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, t, d]} />
        <meshStandardMaterial color={pal.body} metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Rear */}
      <mesh position={[0, 0, -d / 2 + t / 2]} castShadow>
        <boxGeometry args={[w, h, t]} />
        <meshStandardMaterial color={pal.body} metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Front panel (fully opaque) */}
      <mesh position={[0, 0, d / 2 - t / 2]} castShadow>
        <boxGeometry args={[w, h, t * 1.5]} />
        <meshStandardMaterial color={pal.body} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Front vertical accent trim */}
      <mesh position={[w * 0.35, 0, d / 2 + 0.001]}>
        <boxGeometry args={[0.005, h * 0.9, 0.003]} />
        <meshStandardMaterial color={pal.trim} emissive={pal.accent} emissiveIntensity={0.6} metalness={0.5} roughness={0.2} />
      </mesh>
      {/* Front I/O bar */}
      <mesh position={[0, h / 2 - 0.025, d / 2 + 0.005]}>
        <boxGeometry args={[w * 0.55, 0.016, 0.003]} />
        <meshStandardMaterial color={pal.accent} emissive={pal.accent} emissiveIntensity={0.8} />
      </mesh>
      {/* Power button */}
      <mesh position={[-w * 0.3, h / 2 - 0.025, d / 2 + 0.006]}>
        <cylinderGeometry args={[0.006, 0.006, 0.003, 16]} />
        <meshStandardMaterial color={pal.accent} emissive={pal.accent} emissiveIntensity={1.2} />
      </mesh>
      {/* Side frame border */}
      <mesh position={[w / 2 - t / 2, 0, 0]}>
        <boxGeometry args={[t * 0.8, h, d]} />
        <meshStandardMaterial color={pal.trim} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Tempered glass side panel — ultra transparent */}
      <mesh position={[w / 2 + 0.001, 0, 0]}>
        <boxGeometry args={[0.004, h - 0.01, d - 0.01]} />
        <meshPhysicalMaterial
          color={pal.accent}
          transparent
          opacity={0.08}
          roughness={0.0}
          metalness={0.0}
          transmission={0.97}
          ior={1.5}
          reflectivity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Bottom vent glow */}
      <mesh position={[0, -h / 2 + 0.005, d / 2 - 0.05]}>
        <boxGeometry args={[w * 0.6, 0.003, 0.04]} />
        <meshStandardMaterial color={pal.accent} emissive={pal.accent} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

// ============================================================
// INTERNAL COMPONENTS
// ============================================================
function Motherboard({ socket }: { socket: string }) {
  const isAM5 = socket.startsWith("AM");
  const color = isAM5 ? "#1a2a1a" : "#1a1a2a";
  return (
    <group position={[0.02, -0.04, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.19, 0.003, 0.22]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[-0.06, 0.012, -0.08]}>
        <boxGeometry args={[0.05, 0.022, 0.04]} />
        <meshStandardMaterial color="#222233" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.04, 0.008, 0.04]}>
        <boxGeometry args={[0.03, 0.015, 0.03]} />
        <meshStandardMaterial color="#222233" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.005, 0.06]}>
        <boxGeometry args={[0.16, 0.006, 0.015]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.02, 0.006, -0.02]}>
        <boxGeometry args={[0.075, 0.004, 0.008]} />
        <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function CPU({ socket }: { socket: string }) {
  const isAMD = socket.startsWith("AM");
  return (
    <group position={[-0.04, 0.022, -0.06]}>
      <mesh castShadow>
        <boxGeometry args={[0.04, 0.004, 0.04]} />
        <meshStandardMaterial color={isAMD ? "#c0392b" : "#2980b9"} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.003, 0]}>
        <boxGeometry args={[0.038, 0.003, 0.038]} />
        <meshStandardMaterial color="#aaa" metalness={0.95} roughness={0.05} />
      </mesh>
    </group>
  );
}

function AnimatedCoolerFan({ position }: { position: [number, number, number] }) {
  const fanRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (fanRef.current) fanRef.current.rotation.z += delta * 10;
  });
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.008, 8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={fanRef} position={[0, 0.005, 0]}>
        <cylinderGeometry args={[0.022, 0.022, 0.003, 9]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

function CoolerUnit({ type }: { type: string }) {
  const isAIO = type.includes("AIO");
  if (isAIO) {
    return (
      <group position={[-0.04, 0.06, -0.06]}>
        <mesh castShadow>
          <boxGeometry args={[0.04, 0.008, 0.04]} />
          <meshStandardMaterial color="#0a0a1a" metalness={0.9} roughness={0.1} />
        </mesh>
        <AnimatedCoolerFan position={[0, 0.01, 0]} />
      </group>
    );
  }
  return (
    <group position={[-0.04, 0.05, -0.06]}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, i * 0.008, 0]} castShadow>
          <boxGeometry args={[0.042, 0.002, 0.042]} />
          <meshStandardMaterial color="#777" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      <AnimatedCoolerFan position={[0, 0.04, -0.026]} />
    </group>
  );
}

function RAMSticks({ count, type, rgbColor }: { count: number; type: string; rgbColor: string }) {
  const baseColor = type === "DDR5" ? "#00aaff" : "#00cc88";
  return (
    <group>
      {Array.from({ length: Math.min(count, 4) }).map((_, i) => (
        <group key={i} position={[0.02 + i * 0.016, 0.022, -0.08]}>
          <mesh castShadow>
            <boxGeometry args={[0.008, 0.04, 0.135]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.024, 0]}>
            <boxGeometry args={[0.008, 0.006, 0.135]} />
            <meshStandardMaterial
              color={rgbColor}
              emissive={rgbColor}
              emissiveIntensity={0.8}
              metalness={0.4}
              roughness={0.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function GPU({ lengthMm, vram }: { lengthMm: number; vram: number }) {
  const scale = Math.min(lengthMm / 300, 1.2);
  const w = 0.14 * scale;
  const color = vram >= 16 ? "#2c0040" : vram >= 12 ? "#1a0030" : "#120020";
  const fanRef1 = useRef<THREE.Mesh>(null);
  const fanRef2 = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (fanRef1.current) fanRef1.current.rotation.y += delta * 12;
    if (fanRef2.current) fanRef2.current.rotation.y += delta * 12;
  });
  return (
    <group position={[0, -0.02, 0.06]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, 0.04, 0.12]} />
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.022, 0]} castShadow>
        <boxGeometry args={[w - 0.01, 0.004, 0.12]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>
      {([-0.03, 0.03] as const).map((z, i) => (
        <group key={i} position={[0, 0.025, z]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 0.006, 12]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh ref={i === 0 ? fanRef1 : fanRef2} position={[0, 0.004, 0]}>
            <cylinderGeometry args={[0.017, 0.017, 0.003, 9]} />
            <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.024, 0]}>
        <boxGeometry args={[w, 0.002, 0.12]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff2200" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

function PSU() {
  return (
    <group position={[0, -0.16, 0.1]}>
      <mesh castShadow>
        <boxGeometry args={[0.15, 0.086, 0.14]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>
      <AnimatedCoolerFan position={[0, 0.046, 0]} />
    </group>
  );
}

function Storage({ count }: { count: number }) {
  return (
    <group>
      {Array.from({ length: Math.min(count, 2) }).map((_, i) => (
        <mesh key={i} position={[-0.08, -0.1 + i * 0.025, 0.1]} castShadow>
          <boxGeometry args={[0.07, 0.007, 0.1]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================
// SCENE
// ============================================================
function PCScene({
  build,
  tier,
}: {
  build: PCBuild;
  tier: string;
}) {
  const formFactor = build.motherboard?.form_factor ?? "ATX";
  const socket = build.cpu?.socket ?? "LGA1700";
  const ramKit = build.ram?.kit_sticks ?? 0;
  const ramType = build.ram?.type ?? "DDR5";
  const gpuLen = build.gpu?.length_mm ?? 270;
  const gpuVram = build.gpu?.vram_gb ?? 8;
  const coolerType = build.cooler?.type ?? "Air";
  const storageCount = build.storage.length;

  const argb = TIER_ARGB[tier] ?? TIER_ARGB.None;
  const hasAnyComponent = !!(build.cpu || build.gpu || build.ram || build.motherboard);

  return (
    <>
      <CaseShell
        formFactor={formFactor}
        caseName={build.case?.name ?? ""}
        caseBrand={build.case?.brand ?? ""}
      />

      {/* ARGB interior lighting — only if components exist */}
      {hasAnyComponent && (
        <ARGBStrip color={argb.primary} intensity={0.8} />
      )}

      {/* Components with mount animations */}
      <AnimatedMount active={!!build.motherboard}>
        <Motherboard socket={socket} />
      </AnimatedMount>

      <AnimatedMount active={!!build.cpu}>
        <CPU socket={socket} />
      </AnimatedMount>

      <AnimatedMount active={!!build.cooler}>
        <CoolerUnit type={coolerType} />
      </AnimatedMount>

      <AnimatedMount active={!!build.ram}>
        <RAMSticks count={ramKit} type={ramType} rgbColor={argb.secondary} />
      </AnimatedMount>

      <AnimatedMount active={!!build.gpu}>
        <GPU lengthMm={gpuLen} vram={gpuVram} />
      </AnimatedMount>

      <AnimatedMount active={!!build.psu}>
        <PSU />
      </AnimatedMount>

      {storageCount > 0 && (
        <AnimatedMount active={storageCount > 0}>
          <Storage count={storageCount} />
        </AnimatedMount>
      )}

      {/* Cable management */}
      <CableManagement
        hasCPU={!!build.cpu}
        hasGPU={!!build.gpu}
        hasPSU={!!build.psu}
        hasMotherboard={!!build.motherboard}
      />
    </>
  );
}

// ============================================================
// TIER BADGE OVERLAY
// ============================================================
function TierBadge({ tier }: { tier: string }) {
  const argb = TIER_ARGB[tier] ?? TIER_ARGB.None;
  return (
    <div
      className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold border backdrop-blur-sm"
      style={{
        background: `${argb.primary}18`,
        borderColor: `${argb.primary}55`,
        color: argb.primary,
        boxShadow: `0 0 12px ${argb.primary}33`,
      }}
    >
      <span
        className="w-2 h-2 rounded-full animate-pulse"
        style={{ background: argb.primary }}
      />
      ARGB • {tier} Tier
    </div>
  );
}

// ============================================================
// EXPORTED COMPONENT
// ============================================================
export default function PCPreview3D({
  build,
  tier = "None",
}: {
  build: PCBuild;
  tier?: string;
}) {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden relative">
      <Canvas
        shadows
        camera={{ position: [0.6, 0.4, 0.7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#070b14"]} />
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[2, 4, 2]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-1, 1, -1]} intensity={0.4} color="#00bfff" />
        <pointLight position={[1, -1, 1]} intensity={0.25} color="#7700ff" />

        <Suspense fallback={null}>
          <PCScene build={build} tier={tier} />
          <ContactShadows position={[0, -0.28, 0]} opacity={0.5} blur={2.5} />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={0.5}
          maxDistance={1.8}
          dampingFactor={0.08}
          enableDamping
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Overlay badge */}
      <TierBadge tier={tier} />
    </div>
  );
}
