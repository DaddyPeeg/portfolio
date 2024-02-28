//@ts-nocheck
import * as THREE from "three";
import { useRef, useMemo, useEffect } from "react";
import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { Effects } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { framerMotionConfig } from "../../framerConfig";
import { animate, useMotionValue } from "framer-motion";
import { Layers } from "three";
import {
  FilmPass,
  WaterPass,
  UnrealBloomPass,
  LUTPass,
  LUTCubeLoader,
} from "three-stdlib";
import { MeshWobbleMaterial } from "drei";
import Bubble from "../Bubbles";
import Sphere from "../Sphere";
import GroupScene from "../Earth/Group";
import useMediaQuery from "../../utils/useMediaQuery";
import { Gyroscope } from "three/examples/jsm/misc/Gyroscope.js";

extend({ WaterPass, UnrealBloomPass, FilmPass, LUTPass });

export const Landing = ({ section }: { section?: number }) => {
  const { viewport } = useThree();
  let data = {
    initial: new THREE.Vector3(0, 0, -50),
    next: new THREE.Vector3(0, -120, 40),
  };

  let blob = {
    initial: new THREE.Vector3(0, 0, -50),
    next: new THREE.Vector3(4, 48, -20),
  };

  const landingRef = useRef(null);
  const blobRef = useRef(null);
  const earthRef = useRef(null);
  const particlePositionZ = useMotionValue(data.initial.z);
  const particlePositionY = useMotionValue(data.initial.y);
  const blobPositionX = useMotionValue(blob.initial.x);
  const blobPositionY = useMotionValue(blob.initial.y);
  const blobPositionZ = useMotionValue(blob.initial.z);

  useEffect(() => {
    animate(particlePositionZ, section === 0 ? data.initial.z : data.next.z, {
      ...framerMotionConfig,
    });
    animate(particlePositionY, section === 0 ? data.initial.y : data.next.y, {
      ...framerMotionConfig,
    });
    animate(blobPositionX, section === 0 ? blob.initial.x : blob.next.x, {
      ...framerMotionConfig,
    });
    animate(blobPositionY, section === 0 ? blob.initial.y : blob.next.y, {
      ...framerMotionConfig,
    });
    animate(blobPositionZ, section === 0 ? blob.initial.z : blob.next.z, {
      ...framerMotionConfig,
    });
  }, [section]);
  useFrame((state) => {
    if (landingRef.current && blobRef.current) {
      landingRef.current.position.y = particlePositionY.get();
      landingRef.current.position.z = particlePositionZ.get();

      blobRef.current.position.x = blobPositionX.get();
      blobRef.current.position.y = blobPositionY.get();
      blobRef.current.position.z = blobPositionZ.get();
    }
  });
  return (
    <>
      <motion.group position={[0, 0, -50]} ref={landingRef}>
        <ambientLight intensity={0.01} />
        <pointLight distance={60} intensity={4} color="lightblue" />
        <spotLight
          intensity={0.7}
          position={[0, 0, -1000]}
          penumbra={1}
          color="red"
        />
        <spotLight
          intensity={0.7}
          position={[0, 100, -1000]}
          penumbra={1}
          color="blue"
        />
        <mesh>
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial
            color="#00ffff"
            roughness={0.5}
            depthTest={false}
          />
        </mesh>
        <Swarm count={15000} />
        <Postpro />
        <group ref={blobRef} scale={3} position={[4, -23, -50]}>
          <Bubble />
        </group>
      </motion.group>
      <motion.group position={[3, -215, 22]} ref={earthRef}>
        <GroupScene />
      </motion.group>
    </>
  );
};

function Swarm({ count, dummy = new THREE.Object3D() }) {
  const mesh = useRef();
  const light = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);
  const isMobile = useMediaQuery("(max-width:600px)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  useFrame((state) => {
    if (!isMobile && !reduceMotion.matches) {
      light.current.position.set(
        (-state.mouse.x * state.viewport.width) / 5,
        (-state.mouse.y * state.viewport.height) / 5,
        0
      );
    } else {
      light.current.position.set(
        (0 * state.viewport.width) / 5,
        (0 * state.viewport.height) / 5,
        0
      );
    }

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 5;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      if (!isMobile && !reduceMotion.matches) {
        particle.mx += (state.mouse.x * 1000 - particle.mx) * 0.01;
        particle.my += (state.mouse.y * 1000 - 1 - particle.my) * 0.01;
      } else {
        particle.mx += (0 * 1000 - particle.mx) * 0.01;
        particle.my += (0 * 1000 - 1 - particle.my) * 0.01;
      }

      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.setScalar(s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue">
        <mesh scale={2}>
          <sphereGeometry args={[4, 1]} />
        </mesh>
      </pointLight>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#020000" roughness={0.5} />
      </instancedMesh>
    </>
  );
}

function Postpro() {
  const water = useRef();
  const data = useLoader(LUTCubeLoader, "cubicle.CUBE");
  useFrame((state) => (water.current.time = state.clock.elapsedTime * 4));
  return (
    // <></>
    <Effects disableGamma>
      <waterPass ref={water} factor={0.5} />
      <unrealBloomPass args={[undefined, 1.25, 1, 0]} />
      <filmPass args={[0, 0, 2000, false]} />
      <lUTPass lut={data.texture} intensity={1} />
    </Effects>
  );
}
