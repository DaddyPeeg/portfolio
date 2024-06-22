import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import image from "../../assets/earth-map.jpg";
import { useRef } from "react";
import { Mesh } from "three";
// @ts-ignore
import vertexShader from "../../../shaders/earth/vertex.glsl";
// @ts-ignore
import fragmentShader from "../../../shaders/earth/fragment.glsl";

const Sphere = () => {
  const earthMap = useLoader(TextureLoader, image);
  const earthRef = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.25;
    }
  });
  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[5, 50, 50]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          globeTexture: {
            value: earthMap,
          },
        }}
      />
    </mesh>
  );
};

export default Sphere;
