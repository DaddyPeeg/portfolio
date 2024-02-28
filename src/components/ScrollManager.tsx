//@ts-nocheck
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { document } from "postcss";
import { useEffect, useRef, useState } from "react";

export const ScrollManager = ({
  section,
  onSectionChange,
}: {
  section: number;
  onSectionChange: (e: number) => void;
}) => {
  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);
  const [window, setWindow] = useState({
    width: innerWidth,
    height: innerHeight,
  });
  const windowRef = useRef(window);
  function resizeWindow() {
    setWindow((prev) => ({ ...prev, width: innerWidth, height: innerHeight }));
  }

  useEffect(() => {
    addEventListener("resize", resizeWindow);
    return () => {
      removeEventListener("resize", resizeWindow);
    };
  }, []);

  useEffect(() => {
    if (data.fill.parentElement !== null) {
      data.fill.parentElement.style.overflowY = "hidden";
      data.fill.classList.add("top-0");
      data.fill.classList.add("absolute");
    }
  }, [data.fill.parentElement]);

  useEffect(() => {
    gsap.to(data.el, {
      duration: window.width !== windowRef.current.width ? 0.5 : 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
    return () => {
      windowRef.current = window;
    };
  }, [section, window.width, window.height]);

  // useFrame(() => {
  //   if (isAnimating.current) {
  //     lastScroll.current = data.scroll.current;
  //     return;
  //   }

  //   const curSection = Math.floor(data.scroll.current * data.pages);
  //   if (data.scroll.current > lastScroll.current && curSection === 0) {
  //     onSectionChange(1);
  //   }

  //   if (
  //     data.scroll.current < lastScroll.current &&
  //     data.scroll.current < 1 / (data.pages - 1)
  //   ) {
  //     onSectionChange(0);
  //   }
  //   lastScroll.current = data.scroll.current;
  // });

  return null;
};
