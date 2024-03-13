import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { sceneDefaults } from "./utils/cameraDefaults";
import { LoadingScreen } from "./components/Loading";
import { Leva } from "leva";
import { Scroll, ScrollControls } from "@react-three/drei";
import { ScrollManager } from "./components/ScrollManager";
import { Interface } from "./components/Sections";
import { MotionConfig } from "framer-motion";
import { framerMotionConfig } from "./framerConfig";
import Navbar from "./components/Navbar";
import { Landing } from "./components/Landing";
import { Cursor } from "./components/Cursor";
import useMediaQuery from "./utils/useMediaQuery";

function App() {
  const [start, setStart] = useState(false);
  const [section, setSection] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [section]);
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <section className="w-full h-screen relative">
      <Leva hidden />
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
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
                <Landing section={section} />
              </Scroll>
              <Scroll html>
                <Interface
                  started={start}
                  setSection={setSection}
                  section={section}
                />
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
        <LoadingScreen started={start} onStarted={() => setStart(true)} />
        {!isMobile && <Cursor />}
      </MotionConfig>
    </section>
  );
}

export default App;
