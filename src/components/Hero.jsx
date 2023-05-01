import React, { useEffect, useRef, useState } from "react";
import { SliderData } from "./Sliderdata";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const length = SliderData.length;
  const timeOut = useRef();

  useEffect(() => {
    const nextSlide = () => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
    };
    timeOut.current = setTimeout(nextSlide, 5000);
    return function () {
      if (timeOut.current) {
        clearTimeout(timeOut.current);
      }
    };
  }, [current, length]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    // console.log(current);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    // console.log(current);
  };

  if (!Array.isArray(SliderData) || SliderData.length <= 0) {
    return null;
  }
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-2"
    >
      <div className="py-2 flex-1 flex flex-col items-center md:items-center justify-center">
        {SliderData.map((slide, index) => {
          return (
            <div key={index} className="z-10 w-full h-full">
              {index === current && (
                <div
                  className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
                >
                  <img
                    className="absolute top-0 left-0 w-screen h-screen object-cover"
                    src={slide.Image}
                    alt=""
                  />
                  <div className="relative z-10 flex flex-col max-w-1600 w-full mx-auto text-white ml-8">
                    <h1
                      className="text-left font-semibold text-4xl text-shadow-md mb-2 sm:pr-1"
                      style={{
                        fontSize: "clamp(1rem, 8vw, 2rem)",
                        textTransform: "uppercase",
                      }}
                    >
                      {slide.title}
                    </h1>
                    <p className="text-shadow-md mb-3">{slide.price}</p>
                    <Link to={slide.path}>
                      <button className="text-white bg-gray-800 px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150 flex flex-row justify-center items-center gap-3">
                        {slide.label}
                        <AiOutlineArrowRight size={20} />
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div className="absolute flex z-10 -bottom-10 right-5 pb-20 gap-2">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-black rounded-full cursor-pointer border border-white pl-3 user-select-none  hover:bg-yellow-800 hover:scale-105 active:scale-90 transition duration-150"
            style={{ color: "white" }}
          >
            <AiOutlineArrowLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-black rounded-full cursor-pointer border border-white pl-4 user-select-none  hover:bg-yellow-800 hover:scale-105 active:scale-90 transition duration-150"
            style={{ color: "white" }}
          >
            <AiOutlineArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
