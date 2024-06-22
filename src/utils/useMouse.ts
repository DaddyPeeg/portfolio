import { useEffect, useState } from "react";

const useMouseNearElement = (elementRef: any, distanceThreshold = 50) => {
  const [isMouseNear, setIsMouseNear] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      const elementRect = elementRef.current.getBoundingClientRect();
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const isNear =
        mouseX >= elementRect.left - distanceThreshold &&
        mouseX <= elementRect.right + distanceThreshold &&
        mouseY >= elementRect.top - distanceThreshold &&
        mouseY <= elementRect.bottom + distanceThreshold;

      setIsMouseNear(isNear);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [elementRef, distanceThreshold]);

  return isMouseNear;
};

export default useMouseNearElement;
