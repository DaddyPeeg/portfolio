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
      key={chartData.month}
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
      {/* h-[26rem] */}
      <div className="skill_card text-white shrink-0 w-full max-w-[24rem] h-[14rem] p-2">
        <div className="skill_card__border" />
        <span className="bg-gray-100 z-50 absolute p-1 md:p-2 md:top-3 self-start rounded-full top-1">
          <Icon className="size-5 md:size-8 rounded-full text-black" />
        </span>
        {/* relative border-t border-b border-r border-gray-100 rounded-xl flex text-nowrap w-32 overflow-hidden */}
        <motion.div
          className="relative border-t border-b border-r border-gray-100 rounded-xl text-nowrap overflow-hidden shrink-0"
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
          <h1 className="text-xs font-semibold md:text-base ml-10 md:ml-14 md:font-semibold ">
            {chartData.month}
          </h1>
        </motion.div>
        <div className="line shrink-0 my-2 md:mt-6 md:mb-2" />
        <div className="h-full overflow-y-auto hide_scrollbar">
          <ul className="space-y-2">
            {chartData.tech.map((tech, techIndex) => {
              const Logo = tech.logo;
              return (
                <li
                  className="flex relative justify-between items-center"
                  key={`${chartData.month}-${tech.name}`}
                >
                  <div className="flex items-center">
                    <Logo />
                    <p className="md:text-sm text-xs font-thin md:font-bold ml-2 items-center">
                      {tech.name}
                    </p>
                  </div>

                  <div className="h-1 hover:glow transition-custom w-32 bg-gray-200 rounded-full ">
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
      </div>
    </motion.div>
  );
};

export default SkillsSlider;
