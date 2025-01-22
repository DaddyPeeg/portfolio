import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { LoadingScreen } from "./components/Loading";
import { Leva } from "leva";
import { Scroll, ScrollControls } from "@react-three/drei";
import { ScrollManager } from "./components/ScrollManager";
import { Interface } from "./components/Sections";
import { MotionConfig } from "framer-motion";
import { framerMotionConfig } from "@/constants/index";
import Navbar from "./components/Navbar";
import { Landing } from "./components/Landing";
// import { Cursor } from "./components/Cursor";
import useMediaQuery from "./hooks/useMediaQuery";
import { useSkill } from "./context/SkillContext";
// import { NavbarDemo } from "./components/FloatingNavbar";
// import { SkillProvider, useSkill } from "./context/SkillContext";

function App() {
  const [start, setStart] = useState(false);
  const [section, setSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const main = useRef(null);

  const isProduction = process.env.NODE_ENV === "production";

  const click = useCallback(
    (e: any) => {
      setIsMenuOpen(false);
    },
    [isMenuOpen, main.current]
  );

  useEffect(() => {
    if (!main.current) return;
    (main.current as Element).children[2].addEventListener("click", click);
    return () => {
      (main.current! as Element).children[2].removeEventListener(
        "click",
        click
      );
    };
  }, [main.current]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [section]);
  // const isMobile = useMediaQuery("(max-width:600px)");
  const { selectSkill, selectedSkill } = useSkill();

  return (
    <section className="w-full h-screen relative" ref={main}>
      <div
        className={`fixed bottom-4 left-4 h-8 w-8 items-center justify-center text-xs bg-black rounded-full z-10 ${
          !isProduction ? "flex" : "hidden"
        }`}
      >
        <span className="block sm:hidden">xs</span>
        <span className="hidden sm:block md:hidden">sm</span>
        <span className="hidden md:block lg:hidden">md</span>
        <span className="hidden lg:block xl:hidden">lg</span>
        <span className="hidden xl:block 2xl:hidden">xl</span>
        <span className="hidden 2xl:block">xl+</span>
      </div>
      <Leva hidden />
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
        {/* <NavbarDemo /> */}
        <Navbar
          setSection={setSection}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          section={section}
        />
        <Canvas
          className="hello"
          linear
          flat
          legacy
          dpr={1}
          camera={{ fov: 100, position: [0, 0, 30] }}
        >
          <Suspense fallback={null}>
            <ScrollControls pages={4} damping={0.1}>
              <ScrollManager section={section} onSectionChange={setSection} />
              <Scroll>
                <Landing selectedSkill={selectedSkill} section={section} />
              </Scroll>
              <Scroll html>
                <Interface
                  started={start}
                  setSection={setSection}
                  section={section}
                  selectSkill={selectSkill}
                />
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
        <LoadingScreen started={start} onStarted={() => setStart(true)} />
        {/* {!isMobile && <Cursor />} */}
      </MotionConfig>
    </section>
  );
}

export default App;
