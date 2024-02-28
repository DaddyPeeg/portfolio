import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({
  started,
  onStarted,
}: {
  started: boolean;
  onStarted: () => void;
}) => {
  const [start, setStart] = useState(false);
  useEffect(() => {
    const time = setTimeout(() => {
      if (!start) setStart(true);
    }, 5000);
    return () => {
      clearTimeout(time);
    };
  }, []);
  const { progress } = useProgress();
  return (
    <div className={`loadingScreen ${started ? "loadingScreen--started" : ""}`}>
      <div className="loadingScreen__progress">
        <div
          className="loadingScreen__progress__value transition-all"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <div className="flex flex-col">
        <AnimatePresence>
          {start && progress === 100 ? (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`loadingScreen__button ${
                started &&
                "after:bg-transparent after:border-2 after:border-black text-black"
              }`}
              onClick={onStarted}
              key={0}
            >
              Start
            </motion.button>
          ) : (
            <motion.div
              className="wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              key={1}
            >
              <div className="box-wrap">
                <div className="box one"></div>
                <div className="box two"></div>
                <div className="box three"></div>
                <div className="box four"></div>
                <div className="box five"></div>
                <div className="box six"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
