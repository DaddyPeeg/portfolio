import { a } from "@react-spring/three";
import gsap from "gsap";
import Sphere from "./Sphere";
import Atmosphere from "./Atmosphere";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
type Mouse = {
  x: number | undefined;
  y: number | undefined;
};
const GroupScene = ({ aspectRatio = 1, ...props }) => {
  const groupRef = useRef(null);
  const [mouse, setMouse] = useState<Mouse>({
    x: undefined,
    y: undefined,
  });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const updatedObject = { ...mouse };
      updatedObject.x = (e.clientX / window.innerWidth) * 2 - 1;
      updatedObject.y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse(updatedObject);
    };
    addEventListener("mousemove", handleMouseMove);
    return () => {
      removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  useFrame(() => {
    if (groupRef.current && mouse.x && mouse.y) {
      //@ts-ignore
      gsap.to(groupRef.current.rotation, {
        x: -mouse.y * 0.3,
        y: mouse.x * 0.5,
        duration: 2,
      });
    }
  });
  return (
    <a.group ref={groupRef} {...props}>
      <Sphere />
      <Atmosphere />
    </a.group>
  );
};

export default GroupScene;
