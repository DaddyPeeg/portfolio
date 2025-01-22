import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { IoMdDownload } from "react-icons/io";
import useMouseNearCorner from "../hooks/useMouseNearScreen";
import { Project, projects } from "../projects";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useScroll } from "@react-three/drei";
import UpdatedLogo from "./UpdatedLogo";
import anime from "animejs";
import useMediaQuery from "../hooks/useMediaQuery";
import NewSlider from "./NewSlider";
import { SkillProvider, useSkill } from "@/context/SkillContext";
import { RadarChartComp } from "./RadarChart";
// import { BentoGridDemo } from "./BentoSample";
// import MousePressScrollArea from "./MousePressScrollArea";

const Section = ({
  children,
  className,
  section,
  listNumber,
  setSection,
}: {
  children: ReactNode;
  className?: string;
  section?: number;
  listNumber?: number;
  setSection: (section: number) => void;
}) => {
  const data = useScroll();
  const [isPageAnimating, setIsPageAnimating] = useState(false);
  const navigate = (d: "prev" | "next") => {
    if (!isPageAnimating) {
      if (d === "next") {
        if (section! >= 3) {
          return;
        }
        setSection(section! + 1);
        return;
      }
      if (d === "prev") {
        if (section! <= 0) {
          return;
        }
        setSection(section! - 1);
        return;
      }
    }
  };

  return (
    <section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start justify-center relative
  ${className}`}
    >
      <AnimatePresence>
        {listNumber !== 0 && listNumber === section && (
          <motion.button
            initial={{ opacity: 0, y: 30, x: -25 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { ease: "easeIn", duration: 0.5, delay: 1 },
            }}
            exit={{
              opacity: 0,
              y: 30,
              transition: { duration: 0.5, delay: 0 },
            }}
            onAnimationComplete={() => setIsPageAnimating(false)}
            onAnimationStart={() => setIsPageAnimating(true)}
            className="absolute left-[50%] z-20 top-5"
            onClick={() => navigate("prev")}
          >
            <MdKeyboardDoubleArrowUp className="h-12 w-12 opacity-50 text-[#4f46e5] hover:opacity-100 transition-opacity animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>
      {children}
      <AnimatePresence>
        {listNumber !== data.pages - 1 && listNumber === section && (
          <motion.button
            initial={{ opacity: 0, y: -30, x: -25 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { ease: "easeIn", duration: 0.5, delay: 1 },
            }}
            exit={{
              opacity: 0,
              y: -30,
              transition: { duration: 0.5, delay: 0 },
            }}
            onAnimationComplete={() => setIsPageAnimating(false)}
            onAnimationStart={() => setIsPageAnimating(true)}
            className="absolute left-[50%] z-20 bottom-5"
            onClick={() => navigate("next")}
          >
            <MdKeyboardDoubleArrowDown className="h-12 w-12 opacity-50 text-[#4f46e5] hover:opacity-100 transition-opacity animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
};

export const Interface = ({
  section,
  started,
  setSection,
  selectSkill,
}: {
  section: number;
  started?: boolean;
  setSection: (section: number) => void;
  selectSkill: (skillNumber: number) => void;
}) => {
  if (started)
    return (
      // <SkillProvider>
      <div className="flex flex-col items-center w-screen">
        <AboutSection section={section} setSection={setSection} />
        <SkillsSection
          selectSkill={selectSkill}
          section={section}
          setSection={setSection}
        />
        <ProjectSection section={section} setSection={setSection} />
        <ContactSection section={section} setSection={setSection} />
      </div>
      // </SkillProvider>
    );
  return <></>;
};

type Page = {
  page: number;
  items: Project[];
};

type CategorizedProjects = Record<string, Project[]>;
export type ArrayCategorized = {
  category: string;
  projects: Page[];
};

const ProjectSection = ({
  section,
  setSection,
}: {
  section: number;
  setSection: (section: number) => void;
}) => {
  const [data, setData] = useState<ArrayCategorized[] | null>(null);

  const categorizeProjects = useCallback(
    (projects: Project[]): ArrayCategorized[] => {
      function chunkArray(array: Project[], chunkSize: number): Page[] {
        const result: Page[] = [];
        let pages = 0;
        for (let i = 0; i < array.length; i += chunkSize) {
          pages++;
          const item: Page = {
            page: pages,
            items: [...array.slice(i, i + chunkSize)],
          };
          result.push(item);
        }
        return result;
      }

      const categorized: CategorizedProjects = {};

      projects.forEach((project) => {
        if (!categorized[project.category]) {
          categorized[project.category] = [];
        }
        categorized[project.category].push({
          category: project.category,
          name: project.name,
          title: project.title,
          image: project.image,
          definition: project.definition,
          live: project.live,
          url: project.url,
          githubUrl: project.githubUrl,
        });
      });

      return Object.entries(categorized).map(([key, value]) => ({
        category: key,
        projects: chunkArray(value, 4),
      }));
    },
    [data]
  );

  useEffect(() => {
    if (!data) setData(categorizeProjects(projects));
  }, []);
  return (
    <Section
      listNumber={2}
      section={section}
      setSection={setSection}
      className="!p-0 !overflow-visible"
    >
      {/* <div className="w-full customShape isolate relative h-full place-content-center">
        <MousePressScrollArea className="h-[calc(100%-12rem)] overflow-auto w-full ">
          <BentoGridDemo />
        </MousePressScrollArea>
      </div> */}

      <NewSlider />
    </Section>
  );
};

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

const AboutSection = ({
  section,
  setSection,
}: {
  setSection: (section: number) => void;
  section: number;
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const introRef = useRef(null);
  const sentence = ["Hi,", "I'm David,", "Fullstack Web Developer"];
  const variants = {
    visible: (wIndex: number) => {
      if (wIndex === 0)
        return {
          opacity: 1,
          y: 0,
        };
      if (wIndex === 1)
        return {
          opacity: 1,
          y: 0,
        };
      if (wIndex === 2)
        return {
          opacity: 1,
          x: 0,
        };
      return {
        opacity: 0,
        x: 0,
        y: 0,
      };
    },
    hidden: (wIndex: number) => {
      if (wIndex === 0)
        return {
          opacity: 0,
          y: 100,
        };
      if (wIndex === 1)
        return {
          opacity: 0,
          y: -100,
        };
      if (wIndex === 2)
        return {
          opacity: 0,
          x: -50,
        };
      return {
        opacity: 0,
        x: 0,
        y: 0,
      };
    },
  };
  const animateEye = () => {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;

    outlineX = outlineX + distX - 260;
    outlineY = outlineY + distY - 350;

    anime({
      targets: "#logoEye",
      translateX: Math.min(Math.max(outlineX, -25), 25),
      translateY: Math.min(Math.max(outlineY, -25), 25),
    });

    requestAnimationFrame(animateEye);
  };

  const media = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    function mouseMoveFunc(e: MouseEvent) {
      mouseX = e.pageX;
      mouseY = e.pageY;
    }
    const animateEvent = requestAnimationFrame(animateEye);
    if (!media) {
      document.addEventListener("mousemove", mouseMoveFunc);
    } else {
      document.removeEventListener("mousemove", mouseMoveFunc);
      cancelAnimationFrame(animateEvent);
      anime({
        targets: "#logoEye",
        translateX: 0,
        translateY: 0,
      });
    }
    return () => {
      document.removeEventListener("mousemove", mouseMoveFunc);
      cancelAnimationFrame(animateEvent);
    };
  }, [media]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsComplete(true);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const isLeftCorner = useMouseNearCorner("left", 250);
  const { matches: reduceMotion } = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  return (
    <Section listNumber={0} section={section} setSection={setSection}>
      <motion.div
        className={`h-full flex flex-col justify-center items-start sm:items-stretch opacity-100 ml-0 sm:hover:opacity-100 sm:hover:ml-0 transition-custom cursor-default pointer-events-auto
        ${
          isComplete && !reduceMotion
            ? isLeftCorner && section == 0
              ? "sm:opacity-100 sm:ml-0 pointer-events-auto"
              : "sm:opacity-0 sm:ml-[-10rem] pointer-events-none"
            : "sm:opacity-100 sm:ml-0 pointer-events-auto"
        }
        `}
        ref={introRef}
      >
        <div className="text-white font-bold">
          {sentence.map((word, wIndex) => (
            <motion.div
              custom={wIndex}
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{
                duration: 0.8,
                delay: 1 * wIndex + 1,
              }}
              className={`flex items-end ${
                wIndex !== sentence.length - 1
                  ? "sm:text-8xl text-5xl"
                  : "sm:text-4xl text-xl text-gray-300"
              } ${
                wIndex === 1 &&
                "bg-gradient rounded-xl my-4 p-4 lg:p-5 flex-grow-0"
              }  `}
              key={wIndex}
            >
              {word.split("").map((letter, lIndex) =>
                lIndex === 4 && wIndex === 1 ? (
                  <div
                    className="w-10 h-10 sm:w-20 sm:h-20 translate-y-[-7px] sm:translate-y-[-14px]"
                    key={lIndex}
                  >
                    <UpdatedLogo />
                  </div>
                ) : (
                  <TextSpan
                    className={`${
                      wIndex !== 1
                        ? "hover:text-blue-500 transition-custom"
                        : ""
                    }`}
                    key={lIndex}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </TextSpan>
                )
              )}
            </motion.div>
          ))}
        </div>
        <TextSequence />
        <div className="flex gap-4">
          <motion.button
            className={` border-2 border-indigo-600 text-white px-4 py-2 sm:py-4 sm:px-8 
      rounded-lg font-bold text-xs sm:text-lg mt-28`}
            onClick={() => setSection(3)}
            initial={{
              pointerEvents: "none",
              opacity: 0,
              y: 25,
            }}
            animate={{
              pointerEvents: "auto",
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 5,
            }}
          >
            Contact me
          </motion.button>
          <motion.button
            className={`border-2 border-[#e9499d] text-white px-4 py-2 sm:py-4 sm:px-8 
      rounded-lg font-bold text-xs sm:text-lg mt-28 flex justify-between items-center`}
            initial={{
              pointerEvents: "none",
              opacity: 0,
              y: 25,
            }}
            animate={{
              pointerEvents: "auto",
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 5,
            }}
          >
            Resume
            <IoMdDownload className="text-2xl ml-4" />
          </motion.button>
        </div>
      </motion.div>
    </Section>
  );
};

export const TextSpan = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const controls = useAnimationControls();
  const rubberBand = () => {
    controls.start({
      transform: [
        "scale3d(1,1,1)",
        "scale3d(1.4,.55,1)",
        "scale3d(.75,1.25,1)",
        "scale3d(1.25,.85,1)",
        "scale3d(.9,1.05,1)",
        "scale3d(1,1,1)",
      ],
    });
    setIsPlaying(true);
  };

  return (
    <motion.span
      className={className}
      animate={controls}
      onMouseOver={() => {
        if (!isPlaying) rubberBand();
      }}
      onAnimationComplete={() => setIsPlaying(false)}
    >
      {children}
    </motion.span>
  );
};

const TextSequence = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = [
    "From Concept to Deployment",
    "Responsive Design Mastery",
    "Innovative Solutions",
    "Blend of Art and Tech",
    "User-Centric Approach",
    "Diverse Skill Set",
    "Let's Create Together",
  ];
  useEffect(() => {
    let interval;
    const initialDelay = setTimeout(() => {
      interval = setInterval(() => {
        setCurrentTextIndex((prevIndex) =>
          prevIndex === texts.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
    }, 4000);
    return () => {
      clearTimeout(initialDelay);
      clearTimeout(interval!);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: 4, duration: 1 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTextIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="text-gray-400 text-sm sm:text-xl bg-red-500 w-[20rem] h-0"
        >
          <h1>{texts[currentTextIndex]}</h1>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default TextSequence;

const skills = [
  {
    title: "Threejs / React Three Fiber",
    level: 90,
  },
  {
    title: "NextJS",
    level: 100,
  },
  {
    title: "Nodejs",
    level: 100,
  },
  {
    title: "Typescript",
    level: 90,
  },
  {
    title: "3D Modeling",
    level: 50,
  },
];
const other = [
  {
    title: "Editing",
    level: 95,
  },
  {
    title: "Audio Production",
    level: 80,
  },
  {
    title: "Drone Operation",
    level: 90,
  },
];

const SkillsSection = ({
  section,
  setSection,
  selectSkill,
}: {
  section: number;
  setSection: (section: number) => void;
  selectSkill: (skillNumber: number) => void;
}) => {
  return (
    // text-transparent bg-clip-text
    <Section listNumber={1} section={section} setSection={setSection}>
      <RadarChartComp selectSkill={selectSkill} />
      {/* <motion.div className="flex flex-col" whileInView={"visible"}>
        <div
          className="mt-2 space-y-4 border-white border px-8 py-10 rounded-md bg-white/0
            backdrop-blur-lg"
        >
          <h2 className="text-xl sm:text-3xl w-0 hover:w-[13ch] whitespace-nowrap bg-gradient font-bold hover:text-transparent text-white transition-custom bg-clip-text">
            Technical Skills
          </h2>
          {skills.map((skill, index) => (
            <div
              className="w-64"
              key={index}
              onClick={() => selectSkill(index)}
            >
              <motion.h3
                className="text-xs sm:text-base font-bold text-gray-300"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 hover:glow transition-custom w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-gradient rounded-full "
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border px-8 py-10">
          <h2 className="text-xl sm:text-3xl w-0 hover:w-[13ch] whitespace-nowrap bg-gradient font-bold hover:text-transparent text-white transition-custom bg-clip-text">
            Videography
          </h2>
          <div className="mt-2 space-y-4">
            {other.map((lng, index) => (
              <div className="w-64" key={index}>
                <motion.h3
                  className="text-xs sm:text-base font-bold text-gray-300"
                  initial={{
                    opacity: 0,
                  }}
                  variants={{
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 1,
                        delay: 2 + index * 0.2,
                      },
                    },
                  }}
                >
                  {lng.title}
                </motion.h3>
                <div className="h-2 w-full hover:glow transition-custom bg-gray-200 rounded-full mt-2">
                  <motion.div
                    className="h-full bg-gradient rounded-full "
                    style={{ width: `${lng.level}%` }}
                    initial={{
                      scaleX: 0,
                      originX: 0,
                    }}
                    variants={{
                      visible: {
                        scaleX: 1,
                        transition: {
                          duration: 1,
                          delay: 2 + index * 0.2,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div> */}
    </Section>
  );
};

const ContactSection = ({
  section,
  setSection,
}: {
  section: number;
  setSection: (section: number) => void;
}) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !import.meta.env.VITE_APP_EMAILJS_SERVICE_ID ||
      !import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID ||
      !import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID
    ) {
      setIsLoading(false);
      toast.error("Something went wrong");
      return;
    }

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "David",
          from_email: form.email,
          to_email: "david.estrelloso.tribugenia@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsLoading(false);
        toast.success("Message Sent");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Something went wrong");
        console.log(error);
      });
  };
  return (
    <Section
      listNumber={3}
      className=""
      section={section}
      setSection={setSection}
    >
      <h2 className="text-xl sm:text-3xl w-0 hover:w-[13ch] whitespace-nowrap bg-gradient font-bold hover:text-transparent text-white transition-custom bg-clip-text">
        Contact Me
      </h2>
      <div className="md:w-96 rounded-md bg-gradient p-1 mt-4 relative before:absolute before:w-full before:h-full before:-z-10 before:bg-gradient before:left-0 before:top-0 before:blur-[40px]">
        <div className="p-8 rounded-md w-full max-w-full bg-white">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              className="font-medium text-gray-900 block mb-1 text-sm md:text-base"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              className="block w-full rounded-md border-0 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 px-3 md:py-3 py-2 text-sm md:text-base disabled:text-gray-500"
              onChange={handleChange}
              disabled={isLoading}
            />
            <label
              htmlFor="email"
              className="font-medium text-gray-900 block mb-1 md:mt-8 mt-2 text-sm md:text-base"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              className="block w-full rounded-md border-0 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 px-3 md:py-3 py-2 text-sm md:text-base disabled:text-gray-500"
              onChange={handleChange}
              disabled={isLoading}
            />
            <label
              htmlFor="email"
              className="font-medium text-gray-900 block mb-1 md:mt-8 mt-2 text-sm md:text-base"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={form.message}
              className="h-32 block w-full rounded-md border-0 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3 text-sm md:text-base resize-none disabled:text-gray-500"
              onChange={handleChange}
              disabled={isLoading}
            />
            <button className="bg-indigo-600 text-white md:py-4 md:px-8 py-2 px-4 rounded-lg font-bold text-sm md:text-lg md:mt-16 mt-4 ">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};
