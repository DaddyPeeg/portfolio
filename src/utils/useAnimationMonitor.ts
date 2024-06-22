import { useEffect, useState } from "react";

const useAnimationMonitor = (item: any) => {
  const [isAnimating, setIsAnimating] = useState(true);

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  useEffect(() => {
    if (item.current) {
      item.current.addEventListener("animationend", handleAnimationEnd);
      item.current.addEventListener("transitionend", handleAnimationEnd);

      return () => {
        item.current.removeEventListener("animationend", handleAnimationEnd);
        item.current.removeEventListener("transitionend", handleAnimationEnd);
      };
    }
  }, [isAnimating]); // Empty dependency array ensures that the effect runs only once during component mount and unmount

  return isAnimating;
};

export default useAnimationMonitor;
