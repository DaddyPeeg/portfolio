import { useEffect, useState } from "react";

const useInView = (ref: any) => {
  const [inView, setInView] = useState(false);

  const isInView = () => {
    const rect = ref.current.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const handleScroll = () => {
    setInView(isInView());
  };

  useEffect(() => {
    // Initial check
    setInView(isInView());

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup: Remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return inView;
};

export default useInView;
