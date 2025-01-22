import { ChartDataItem } from "@/types";
import "./skillcard.css";
import { motion } from "framer-motion";

type Props = {
  chartData: ChartDataItem;
};

const SkillsSlider = ({ chartData }: Props) => {
  const Icon = chartData.icon;
  return (
    <motion.div
      key={chartData.month} // Add key prop to force remount on chartData change
      className="flex justify-center w-full overflow-x-auto gap-4 p-4"
      initial={{
        opacity: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
      animate={{
        opacity: 1,
        zIndex: 1,
        pointerEvents: "auto",
        transition: {
          duration: 1, // Add duration for the animation
        },
      }}
    >
      <div className="skill_card text-white shrink-0 w-full max-w-[24rem] h-[26rem]">
        <div className="skill_card__border" />
        <span className="bg-gray-100 z-50 absolute p-2 top-3 self-start rounded-full">
          <Icon className="size-8 rounded-full text-black" />
        </span>
        <motion.div
          className="relative border-t border-b border-r border-gray-100 rounded-xl flex text-nowrap w-32 overflow-hidden"
          key={chartData.month}
          initial={{
            width: 0,
            opacity: 0,
          }}
          animate={{
            width: "100%",
            opacity: 1,
          }}
          transition={{
            delay: 1,
            duration: 0.5,
          }}
        >
          {/* <motion.div
            className="absolute w-full h-full bg-red-500"
           
          ></motion.div> */}
          <h1 className="text-base ml-14 font-semibold">{chartData.month}</h1>
        </motion.div>
        <div className="line shrink-0 mt-6 mb-2" />
        <ul className="space-y-2">
          {chartData.tech.map((tech, techIndex) => {
            const Logo = tech.logo;
            return (
              <li
                className="flex relative justify-between"
                key={`${chartData.month}-${tech.name}`}
              >
                <div className="flex items-center">
                  <Logo />
                  <p className="text-sm font-bold ml-2 items-center">
                    {tech.name}
                  </p>
                </div>

                <div className="h-1 hover:glow transition-custom w-32 bg-gray-200 rounded-full mt-2 ">
                  <motion.div
                    className="h-full bg-gradient rounded-full "
                    style={{ width: `${tech.score * 10}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 1 + techIndex * 0.2,
                        },
                      },
                    }}
                    whileInView={"visible"}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
};

export default SkillsSlider;
