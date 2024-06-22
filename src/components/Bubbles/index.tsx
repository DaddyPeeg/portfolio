import * as THREE from "three";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

export interface Props {
  frequency?: number;
  primaryColor?: THREE.Color;
  secondaryColor?: THREE.Color;
}
export default function Bubble({
  frequency,
  primaryColor,
  secondaryColor,
}: Props) {
  const { frequencyS, primaryColorS, secondaryColorS } = useControls({
    frequencyS: 2,
    primaryColorS: "#04000c",
    secondaryColorS: "#3f0000",
  });

  const [mouse, setMouse] = useState<THREE.Vector2>(new THREE.Vector2(0, 0));

  const primaryColorSThree = new THREE.Color(primaryColorS);
  const secondaryColorSThree = new THREE.Color(secondaryColorS);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useRef({
    uTime: { value: 0 },
    uFrequency: { value: frequencyS },
    uPrimaryColor: { value: primaryColorSThree },
    uSecondaryColor: { value: secondaryColorSThree },
    uMouse: { value: mouse },
  });
  function onMouseMove(event: any) {
    let x = (event.clientX / window.innerWidth) * 2 - 1;
    let y = (event.clientY / window.innerHeight) * 2 - 1;
    setMouse(new THREE.Vector2(x, y));
  }
  useEffect(() => {
    addEventListener("mousemove", onMouseMove);
    return () => {
      removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useEffect(() => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uPrimaryColor.value = primaryColorSThree;
      shaderRef.current.uniforms.uSecondaryColor.value = secondaryColorSThree;
    }
  }, [primaryColorSThree, secondaryColorSThree]);

  useFrame((_, delta) => {
    if (!shaderRef.current) return;
    shaderRef.current.uniforms.uTime.value += delta * 1;
    shaderRef.current.uniforms.uFrequency.value = frequencyS;
  });
  return (
    <mesh>
      <sphereGeometry args={[2, 1024, 512]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        // side={THREE.BackSide}
        transparent
        uniforms={uniforms.current}
        toneMapped={false}
      />
    </mesh>
  );
}
