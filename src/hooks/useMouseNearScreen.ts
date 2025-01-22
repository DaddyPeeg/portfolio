import { useEffect, useState } from "react";

const useMouseNearCorner = (
  side:
    | "all"
    | "left"
    | "bottom"
    | "top"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right",
  distanceThreshold = 50
) => {
  const [isMouseNearCorner, setIsMouseNearCorner] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const isNearTopLeft =
        mouseX <= distanceThreshold && mouseY <= distanceThreshold;
      const isNearTopRight =
        mouseX >= screenWidth - distanceThreshold &&
        mouseY <= distanceThreshold;
      const isNearBottomLeft =
        mouseX <= distanceThreshold &&
        mouseY >= screenHeight - distanceThreshold;
      const isNearBottomRight =
        mouseX >= screenWidth - distanceThreshold &&
        mouseY >= screenHeight - distanceThreshold;
      const isNearLeft = mouseX <= distanceThreshold;
      const isNearRight = mouseX >= screenWidth - distanceThreshold;
      const isNearTop = mouseY <= distanceThreshold;
      const isNearBottom = mouseY >= screenHeight - distanceThreshold;

      const isNearAnyCorner =
        isNearTopLeft ||
        isNearTopRight ||
        isNearBottomLeft ||
        isNearBottomRight ||
        isNearLeft ||
        isNearRight ||
        isNearTop ||
        isNearBottom;

      if (side === "all") setIsMouseNearCorner(isNearAnyCorner);
      if (side === "left") setIsMouseNearCorner(isNearLeft);
      if (side === "right") setIsMouseNearCorner(isNearRight);
      if (side === "top") setIsMouseNearCorner(isNearTop);
      if (side === "top-left") setIsMouseNearCorner(isNearTopLeft);
      if (side === "top-right") setIsMouseNearCorner(isNearTopRight);
      if (side === "bottom") setIsMouseNearCorner(isNearBottom);
      if (side === "bottom-left") setIsMouseNearCorner(isNearBottomLeft);
      if (side === "bottom-right") setIsMouseNearCorner(isNearBottomRight);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [distanceThreshold]);

  return isMouseNearCorner;
};

export default useMouseNearCorner;
