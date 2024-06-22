import { ReactNode, useEffect, useRef, useState } from "react";
import { image404, lottieAnimation } from "./images";
import { ArrayCategorized } from "../Sections";
import gsap from "gsap";
import { TextSpanNew } from "../TextSpan";
import { FaAngleLeft, FaAngleRight, FaGithub } from "react-icons/fa";
import useMediaQuery from "../../utils/useMediaQuery";
import lottie from "lottie-web";
import { Project } from "../../projects";
const SliderMain = ({
  data,
  clickIndex,
  hoverIndex,
  isAnimating,
  setIsAnimating,
}: {
  data: ArrayCategorized[] | null;
  clickIndex: number | null;
  hoverIndex: number | null;
  isAnimating?: boolean;
  setIsAnimating: (n: boolean) => void;
}) => {
  const [index, setIndex] = useState<number>(0);
  const sliderPersonalItems = useRef<HTMLDivElement>(null);
  const sliderCompanyItems = useRef<HTMLDivElement>(null);
  const lottieContRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(false);

  const previewVideo = useRef();
  const viewPersonal = useRef();
  const viewCompany = useRef();

  const isMounted = useRef(false);
  const previousRef = useRef<any | null>(null);

  function showNextImage() {
    if (clickIndex !== null && data && !isAnimating) {
      setIndex((index) => {
        if (index === data[clickIndex].projects.length - 1) return 0;
        return index + 1;
      });
    }
  }

  function showPrevImage() {
    if (clickIndex !== null && data && !isAnimating) {
      setIndex((index) => {
        if (index === 0) return data[clickIndex].projects.length - 1;
        return index - 1;
      });
    }
  }

  useEffect(() => {
    if (!isRendered) {
      if (lottieContRef.current) {
        lottie.loadAnimation({
          container: lottieContRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: lottieAnimation,
        });
      }
      setIsRendered(true);
    }
  }, [isRendered]);

  useEffect(() => {
    if (sliderPersonalItems.current && sliderCompanyItems.current) {
      const sliderPersonalWidth = sliderPersonalItems.current?.offsetWidth;
      const sliderCompanyWidth = sliderCompanyItems.current?.offsetWidth;
      function sliderAnimation(index: number) {
        if (clickIndex === null) {
          gsap.to(sliderPersonalItems.current, {
            x: 0,
            duration: 0.2,
            onStart: () => {
              setIsAnimating(true);
            },
            onComplete: () => {
              setIsAnimating(false);
            },
          });
          gsap.to(sliderCompanyItems.current, {
            x: 0,
            duration: 0.2,
            onStart: () => {
              setIsAnimating(true);
            },
            onComplete: () => {
              setIsAnimating(false);
            },
          });
          return;
        }
        if (clickIndex === 0) {
          gsap.to(sliderPersonalItems.current, {
            x: (-sliderPersonalWidth - 8) * index,
            duration: 0.5,
            ease: "power2.inOut",
            onStart: () => {
              setIsAnimating(true);
            },
            onComplete: () => {
              setIsAnimating(false);
            },
          });
          return;
        }
        if (clickIndex === 1) {
          gsap.to(sliderCompanyItems.current, {
            x: (-sliderCompanyWidth - 8) * index,
            duration: 0.5,
            ease: "power2.inOut",
            onStart: () => {
              setIsAnimating(true);
            },
            onComplete: () => {
              setIsAnimating(false);
            },
          });
          return;
        }
      }
      sliderAnimation(index);
    }
  }, [index, clickIndex]);

  const animationInOut = (el?: any) => {
    let timeline = gsap.timeline({
      onStart: () => {
        setIsAnimating(true);
      },
      onComplete: () => {
        setIsAnimating(false);
      },
    });
    if (el === null && previousRef.current !== null) {
      const intClip = previousRef.current.dataset.initialClip;
      timeline.to(previousRef.current, {
        duration: 0.5,
        clipPath: intClip,
        zIndex: 0,
      });
    }
    if (previousRef.current && previousRef.current !== null && el !== null) {
      timeline.to(previousRef.current, {
        duration: 0,
        zIndex: 5,
      });
    }
    if (el && el !== null) {
      const finalClip = el.dataset.finalClip;
      timeline.to(el, {
        zIndex: 10,
        clipPath: finalClip,
        duration: 0.5,
        ease: "power1.out",
      });
      if (previousRef.current && previousRef.current !== null) {
        const intClip = previousRef.current.dataset.initialClip;
        timeline.to(previousRef.current, {
          duration: 0,
          clipPath: intClip,
        });
      }
    }
  };

  useEffect(() => {
    setIndex(0);

    if (previewVideo && viewPersonal && viewCompany) {
      if (clickIndex !== null && hoverIndex === null) {
        if (clickIndex === 0) {
          animationInOut(viewPersonal.current);
          previousRef.current = viewPersonal.current;
          return;
        }
        if (clickIndex === 1) {
          animationInOut(viewCompany.current);
          previousRef.current = viewCompany.current;
          return;
        }
        return;
      } else if (isMounted.current) {
        animationInOut(null);
      } else {
        isMounted.current = true;
      }
      previousRef.current = null;
      return;
    }
  }, [clickIndex]);

  const isMobile = useMediaQuery("(max-width:767px)");
  return (
    <div className="h-full overflow-hidden w-full group relative bg-trasparent backdrop-blur-lg ">
      <Card
        className="[clip-path:circle(20%_at_-50%_150%)] bg-black md:project-gradient-1 overflow-hidden"
        forwardedRef={viewPersonal}
        data="circle(20% at -50% 150%)"
        final="circle(220% at -50% 150%)"
      >
        {!isMobile && (
          <div className="p-8 h-full w-full flex flex-col">
            <div className="flex justify-between mb-4">
              <div className="flex flex-col flex-1">
                <div className="flex text-4xl font-bold [text-shadow:_2px_4px_0px_rgb(0_0_0_/_50%)]">
                  {"C.P.".split("").map((letter, index) => (
                    <TextSpanNew
                      className="font-bold"
                      key={`personal-${index}`}
                    >
                      {letter}
                    </TextSpanNew>
                  ))}
                </div>
                <div className="flex text-2xl font-base">
                  Completed Projects
                </div>
              </div>
              {data && data[0].projects.length > 1 && (
                <div className="flex-1 flex items-center justify-center gap-2">
                  <span className="bg-white rounded-full p-1 cursor-pointer">
                    <FaAngleLeft
                      onClick={showPrevImage}
                      className="text-black h-5 w-5 translate-x-[-1px]"
                    />
                  </span>
                  {data &&
                    data[0].projects.map((_, itemIndex) => (
                      <span
                        key={itemIndex}
                        className={`w-4 h-4  rounded-full ${
                          index === itemIndex
                            ? "border-2 border-white bg-gray-800"
                            : "bg-white"
                        }`}
                      ></span>
                    ))}
                  <span className="bg-white rounded-full p-1 cursor-pointer">
                    <FaAngleRight
                      onClick={showNextImage}
                      className="text-black h-5 w-5 translate-x-[1px]"
                    />
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 relative overflow-hidden">
              <div
                className="w-full h-full flex gap-2"
                ref={sliderPersonalItems}
              >
                {data &&
                  data[0].projects.map((page, index) => (
                    <div
                      key={index}
                      className="w-full h-full flex-shrink-0 flex-grow-0 flex justify-center items-center flex-col gap-2"
                    >
                      <div className="flex gap-2 flex-1 w-full">
                        {page.items.map((item, index) => {
                          if (index < 2)
                            return (
                              <div
                                className="flex-1 justify-center flex items-center"
                                key={index}
                              >
                                <ProjectCard
                                  type="personal"
                                  cardInfo={item}
                                  className={`
                              ${page.items.length == 2 && "h-[20rem] w-full"}
                              ${
                                page.items.length === 1 &&
                                "w-full max-w-[25rem] h-full"
                              }
                              ${page.items.length > 2 && "h-full w-full"}
                              bg-indigo-500 
                              `}
                                />
                              </div>
                            );
                        })}
                      </div>

                      {page.items.length > 2 && (
                        <div className="flex gap-2 flex-1 w-full">
                          {page.items.map((item, index) => {
                            if (index >= 2)
                              return (
                                <div
                                  key={index}
                                  className={`flex-1 ${
                                    page.items.length !== 3 &&
                                    "justify-center items-center flex"
                                  }`}
                                >
                                  <ProjectCard
                                    type="personal"
                                    cardInfo={item}
                                    className={`
                                  ${
                                    page.items.length === 3
                                      ? "max-w-[20rem] mx-auto"
                                      : "w-full"
                                  }
                                  h-full
                                  bg-indigo-500 
                                `}
                                  />
                                </div>
                              );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {isMobile && (
          <div className="flex relative h-full">
            <div className="flex flex-col gap-2 h-full md:overflow-hidden snap-always snap-y snap-mandatory overflow-y-scroll w-full">
              {data != null &&
                data &&
                data[0].projects.map((page) =>
                  page.items.map((card, index) => (
                    <ProjectCard
                      cardInfo={card}
                      key={index}
                      className="h-full w-full flex-shrink-0 flex-grow-0 snap-start"
                      type="personal"
                    />
                  ))
                )}
            </div>
          </div>
        )}
      </Card>
      <Card
        className="[clip-path:circle(20%_at_150%_-50%)] bg-black sm:project-gradient-1 overflow-hidden"
        forwardedRef={viewCompany}
        data="circle(20% at 150% -50%)"
        final="circle(220% at 150% -50%)"
      >
        {!isMobile && (
          <div className="p-8 h-full w-full flex flex-col">
            <div className="flex justify-between mb-4">
              <div className="flex flex-col flex-1">
                <div className="flex text-4xl font-bold [text-shadow:_2px_4px_0px_rgb(0_0_0_/_50%)]">
                  {"W.I.P.".split("").map((letter, index) => (
                    <TextSpanNew
                      className="font-bold"
                      key={`personal-${index}`}
                    >
                      {letter}
                    </TextSpanNew>
                  ))}
                </div>
                <div className="flex text-2xl font-base">Work in Progress</div>
              </div>
              {data && data[1].projects.length > 1 && (
                <div className="flex-1 flex items-center justify-center gap-2">
                  <span className="bg-white rounded-full p-1 cursor-pointer">
                    <FaAngleLeft
                      onClick={showPrevImage}
                      className="text-black h-5 w-5 translate-x-[-1px]"
                    />
                  </span>
                  {data &&
                    data[1].projects.map((_, itemIndex) => (
                      <span
                        key={itemIndex}
                        className={`w-4 h-4  rounded-full ${
                          index === itemIndex
                            ? "border-2 border-white bg-gray-800"
                            : "bg-white"
                        }`}
                      ></span>
                    ))}
                  <span className="bg-white rounded-full p-1 cursor-pointer">
                    <FaAngleRight
                      onClick={showNextImage}
                      className="text-black h-5 w-5 translate-x-[1px]"
                    />
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 relative overflow-hidden">
              <div
                className="w-full h-full flex gap-2"
                ref={sliderCompanyItems}
              >
                {data &&
                  data[1].projects.map((page, index) => (
                    <div
                      key={index}
                      className="w-full h-full flex-shrink-0 flex-grow-0 flex justify-center items-center flex-col gap-2"
                    >
                      <div className="flex gap-2 flex-1 w-full">
                        {page.items.map((item, index) => {
                          if (index < 2)
                            return (
                              <div
                                className="flex-1 justify-center flex items-center"
                                key={index}
                              >
                                <ProjectCard
                                  itemNo={index}
                                  cardInfo={item}
                                  className={`
                              ${page.items.length === 2 && "h-[20rem] w-full"}
                              ${
                                page.items.length === 1 &&
                                "w-full max-w-[25rem] h-full"
                              }
                              ${page.items.length > 2 && "h-full w-full"}
                              bg-red-500
                              `}
                                />
                              </div>
                            );
                        })}
                      </div>

                      {page.items.length > 2 && (
                        <div className="flex gap-2 flex-1 w-full">
                          {page.items.map((item, index) => {
                            if (index >= 2)
                              return (
                                <div
                                  key={index}
                                  className={`flex-1 ${
                                    page.items.length !== 3 &&
                                    "justify-center items-center flex"
                                  }`}
                                >
                                  <ProjectCard
                                    itemNo={index}
                                    cardInfo={item}
                                    className={`
                                  ${
                                    page.items.length === 3
                                      ? "max-w-[20rem] mx-auto"
                                      : "w-full"
                                  }
                                  h-full
                                  bg-red-500 
                                `}
                                  />
                                </div>
                              );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {isMobile && (
          <div className="flex relative h-full">
            <div className="flex flex-col gap-2 h-full w-full md:overflow-hidden overflow-y-auto snap-always snap-y snap-mandatory ">
              {data != null &&
                data &&
                data[1].projects.map((page) =>
                  page.items.map((card, index) => (
                    <ProjectCard
                      cardInfo={card}
                      key={index}
                      className="h-full w-full flex-shrink-0 flex-grow-0 snap-start"
                      type="company"
                    />
                  ))
                )}
            </div>
          </div>
        )}
      </Card>
      <Card forwardedRef={previewVideo} className="z-[1] ">
        <div ref={lottieContRef} className="h-full w-full bg-transparent flex">
          {/* <video
            autoPlay
            muted
            loop
            className="w-full my-auto object-contain pointer-events-none"
          >
            <source src={prevVideo} type="video/mp4" />
          </video> */}
        </div>
      </Card>
    </div>
  );
};

const Card = ({
  children,
  className,
  forwardedRef,
  data,
  final,
}: {
  children?: ReactNode;
  className?: string;
  forwardedRef?: any;
  data?: string;
  final?: string;
}) => {
  return (
    <figure
      ref={forwardedRef}
      className={`slider flex items-center justify-center ${className}`}
      data-initial-clip={data}
      data-final-clip={final}
    >
      <div className="slider">{children}</div>
    </figure>
  );
};

const ProjectCard = ({
  className,
  cardInfo,
  itemNo,
  type,
}: {
  cardInfo: Project;
  className?: string;
  itemNo?: number;
  type?: "personal" | "company";
}) => {
  const [reveal, setReveal] = useState(false);
  const handleReveal = () => {
    setReveal(true);
    setTimeout(() => {
      setReveal(false);
    }, 3000);
  };
  return (
    <div className={`rounded-md ${className} relative overflow-hidden `}>
      {!reveal && (
        <div
          onClick={handleReveal}
          className="bg-black/20 absolute object-cover top-0 w-full h-full z-10 backdrop-blur-sm cursor-crosshair"
        />
      )}
      <img
        src={cardInfo.image || image404}
        alt={cardInfo.name}
        className="object-cover h-full w-full absolute"
      />

      <div
        className={`text-lg px-4 py-1 font-bold rounded-br-lg absolute top-0 left-0 z-20 transition-all ease-out ${
          type === "personal" ? "bg-[#4f46e5]" : "bg-[#db2777]"
        } ${reveal ? "translate-x-[-30rem]" : "translate-x-0"}`}
      >
        {cardInfo.name}
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full h-[3rem] transition-custom delay-500 overflow-hidden py-0 px-4 bg-transparent`}
      >
        <div className="h-full w-full flex justify-end items-center gap-2">
          <div
            className={`text-white flex text-[9px] rounded-full overflow-hidden z-20 transition-all ${
              reveal ? "translate-y-[10rem]" : "translate-y-0"
            }`}
          >
            <a href={cardInfo.githubUrl || `/#${cardInfo.title}`}>
              <button className="bg-red-500 p-1 w-16 flex items-center justify-center gap-1">
                Code
                <FaGithub className="w-3 h-3" />
              </button>
            </a>
            {cardInfo.live && (
              <a href={cardInfo.url || `/#${cardInfo.name}`}>
                <button className="bg-blue-500 p-1 w-16">Preview</button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderMain;
1;
