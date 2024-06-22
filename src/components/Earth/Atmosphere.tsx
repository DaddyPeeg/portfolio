import * as THREE from "three";
// @ts-ignore
import vertexShader from "../../../shaders/atmosphere/vertex.glsl";
// @ts-ignore
import fragmentShader from "../../../shaders/atmosphere/fragment.glsl";

const Atmosphere = () => {
  return (
    <mesh scale={1.1}>
      <sphereGeometry args={[5, 50, 50]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

export default Atmosphere;
