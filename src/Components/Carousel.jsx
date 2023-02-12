import React, { useEffect } from "react";
import { RemoveHTMLTags } from "Utils/Utils";
import * as Icon from "react-feather";
import DotIcon from "Components/DotIcon";
import { ChevronDown, ChevronUp, Clock, Play, Star } from "react-feather";

export default function Carousel(props) {
  var isMouseOver = false;
  const OnMouseEnter = () => {
    isMouseOver = true;
    console.log("Carousel Paused:", isMouseOver);
  };
  const OnMouseExit = () => {
    isMouseOver = false;
  };
  function Slide(action) {
    if (isMouseOver) return;
    const slider = document.getElementById("sliderContent");
    if (slider.onmouseover) return;
    const slideWidth = document.getElementsByClassName("slide")[0].clientHeight;
    if (action === "DOWN" && slider.scrollTop === slider.clientHeight * 9) {
      slider.scrollTop = 0;
      return;
    } else if (action === "UP" && slider.scrollTop === 0) {
      slider.scrollTop = slider.clientHeight * 9;
      return;
    }
    if (action === "DOWN") slider.scrollTop += slideWidth;
    else slider.scrollTop -= slideWidth;
  }
  useEffect(() => {
    const interval = setInterval(() => {
      Slide("DOWN");
    }, 6000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <section className="relative overflow-hidden w-full h-96">
        <div className="absolute bottom-0 right-0 z-10 md:flex flex-col gap-2 m-8 hidden ">
          <button
            className="bg-white/10 grid place-items-center transition-all rounded p-2 backdrop-blur-xl  hover:bg-white/20 text-white"
            id="slide-arrow-up"
            onClick={() => Slide("UP")}
          >
            <ChevronUp />
          </button>

          <button
            className="bg-white/10 grid place-items-center transition-all rounded p-2 backdrop-blur-xl  hover:bg-white/20 text-white"
            id="slide-arrow-down"
            onClick={() => Slide("DOWN")}
          >
            <ChevronDown />
          </button>
        </div>

        <div
          id="sliderContent"
          className="flex flex-col w-full h-full snap-y snap-mandatory overflow-auto scroll-smooth transition-all scrollbar-hide"
        >
          {props?.Animes == null &&
            Array.from(Array(10), (e, i) => {
              return (
                <div className="h-96 w-full animate-pulse bg-white/10 backdrop-blur-xl rounded"></div>
              );
            })}
          {props.Animes?.map((ani, key) => (
            <div
              key={key}
              className="slide relative flex w-full snap-center bg-black"
            >
              <img
                src={ani?.cover}
                alt={ani?.id}
                className="w-full h-96 object-cover flex-1"
              />
              <div
                id="slide"
                onMouseEnter={OnMouseEnter}
                onMouseLeave={OnMouseExit}
                className="absolute flex flex-col gap-3 justify-end text-white p-4 md:p-8 md:pr-20 w-full bg-gradient-to-t from-black via-black/80 h-96"
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="flex items-end gap-2 filter drop-shadow-2xl">
                    <p className="text-lg font-black drop-shadow-2xl">
                      #{++key}
                    </p>
                    <p className="font-semibold drop-shadow-2xl">Spotlight</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className=" flex items-center gap-1 bg-white/10 backdrop-blur-lg text-white text-sm rounded-full font-semibold p-2 px-3 h-8 max-w-min">
                      <Star size={"0.75rem"} fill="#fff" />
                      {(ani?.rating / 10).toFixed(1)}
                    </div>
                    <h2 className="font-bold text-lg md:text-xl line-clamp-1">
                      {ani?.title.english}
                    </h2>
                    <div className="flex gap-1 font-semibold text-xs md:text-sm text-white">
                      <p>Ep {ani?.totalEpisodes}</p>
                      <DotIcon />
                      <div className="flex items-center gap-1">
                        <Clock size={"0.75rem"} />
                        <p>{ani?.duration}m</p>
                      </div>
                      <DotIcon />
                      <div className=" items-center gap-1 hidden md:flex">
                        <Play fill="#fff" size={"0.75rem"} />
                        <p>{ani?.type}</p>
                      </div>
                      <DotIcon />
                      <p>{ani?.status}</p>
                      <DotIcon />
                      <div className="flex items-center gap-2 leading-3 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z" />
                          <path
                            fillRule="evenodd"
                            d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p>{ani?.releaseDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 text-white/60 w-full text-xs md:text-sm">
                      {ani?.genres.map((genre) => (
                        <p key={genre}>{genre}</p>
                      ))}
                    </div>
                    <p className="line-clamp-2 text-sm md:text-base text-white/70">
                      {RemoveHTMLTags(ani?.description)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 text-sm">
                  <a
                    href={"/anime/" + ani?.id}
                    className="flex items-center rounded gap-2 px-4 p-3 bg-white/10 backdrop-blur max-w-max hover:bg-white/20 transition-all"
                  >
                    <Icon.Play fill="#fff" size={16} />
                    <p>Watch Now</p>
                  </a>
                  <a
                    href={"/anime/" + ani?.id}
                    className="flex items-center rounded gap-2 px-4 p-3 pr-2 bg-white/10 backdrop-blur max-w-max hover:bg-white/20 transition-all"
                  >
                    <p>Details</p>
                    <Icon.ChevronRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
