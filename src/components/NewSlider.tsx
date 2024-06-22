import { useCallback, useRef } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { projects } from "../../constants";

const NewSlider = () => {
  const carousel = useRef(null);
  const carouselList = useRef(null);
  const nextButton = useRef(null);
  const prevButton = useRef(null);

  const hanldeShowDetail = useCallback(() => {
    console.log("wew");
    if (carousel.current) {
      (carousel.current as Element).classList.add("showDetail");
    }
  }, [
    carousel.current,
    carouselList.current,
    nextButton.current,
    prevButton.current,
  ]);

  let unAcceptClick: any;
  const showSlider = useCallback(
    (type: "next" | "prev") => {
      if (
        carouselList.current &&
        carousel.current &&
        nextButton.current &&
        prevButton.current
      ) {
        (nextButton.current as HTMLButtonElement).style.pointerEvents = "none";
        (prevButton.current as HTMLButtonElement).style.pointerEvents = "none";

        (carousel.current as Element).classList.remove("prev", "next");
        let items = (carouselList.current as Element).querySelectorAll(".item");
        if (type === "next") {
          (carouselList.current as Element).appendChild(items[0]);
          (carousel.current as Element).classList.add("next");
        }
        if (type === "prev") {
          let positionLast = items.length - 1;
          (carouselList.current as Element).prepend(items[positionLast]);
          (carousel.current as Element).classList.add("prev");
        }

        clearTimeout(unAcceptClick);
        unAcceptClick = setTimeout(() => {
          (nextButton.current! as HTMLButtonElement).style.pointerEvents =
            "auto";
          (prevButton.current! as HTMLButtonElement).style.pointerEvents =
            "auto";
        }, 2000);
      }
    },
    [
      carousel.current,
      carouselList.current,
      nextButton.current,
      prevButton.current,
      unAcceptClick,
    ]
  );

  const handleNextSlide = useCallback(() => {
    showSlider("next");
  }, [
    carousel.current,
    carouselList.current,
    nextButton.current,
    prevButton.current,
  ]);

  const handlePrevSlide = useCallback(() => {
    showSlider("prev");
  }, [
    carousel.current,
    carouselList.current,
    nextButton.current,
    prevButton.current,
  ]);

  const handleBack = useCallback(() => {
    if (carousel.current) {
      (carousel.current as Element).classList.remove("showDetail");
    }
  }, [
    carousel.current,
    carouselList.current,
    nextButton.current,
    prevButton.current,
  ]);

  return (
    <div className="relative h-full customShape w-full text-white flex flex-col justify-center">
      <div ref={carousel} className="carousel">
        <div ref={carouselList} className="list">
          {projects.map((project, index) => (
            <div key={index} className="item">
              <img src={project.img} alt={`imageProject-${index}`} />
              <div className="intro max-w-md py-8 px-4">
                <div className="title">{project.title}</div>
                <div className="topic">{project.topic}</div>
                <div className="des">{project.des}</div>
                <button
                  onClick={hanldeShowDetail}
                  type="button"
                  className="seeMore"
                >
                  See more &#8599;
                </button>
              </div>
              <div className="detail">
                <div className="title">{project.detail.title}</div>
                <div className="des">{project.detail.des}</div>
                <div className="specifications">
                  {project.detail.tech.map((tech, index) => (
                    <div key={`tech-${index}`}>{tech}</div>
                  ))}
                </div>
                <div className="checkout">
                  <a href={project.links.github}>
                    <button>Visit Github</button>
                  </a>
                  <a href={project.links.live}>
                    <button>Visit Live</button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="arrows">
          <button id="prev" ref={prevButton} onClick={handlePrevSlide}>
            <RiArrowLeftSLine />
          </button>
          <button onClick={handleBack} id="back">
            Go Back &#8599;
          </button>
          <button id="next" ref={nextButton} onClick={handleNextSlide}>
            <RiArrowRightSLine />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSlider;
