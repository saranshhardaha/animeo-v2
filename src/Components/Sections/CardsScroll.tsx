import React, { useState, MouseEventHandler } from "react";
import { motion, AnimatePresence } from "framer-motion";
//@ts-ignore
import { RemoveHTMLTags } from "Utils/Utils";
import * as Icon from "react-feather";
import DotIcon from "../Icons/DotIcon";
import HorizontalCard from "Components/Cards/HorizontalCard";
import VerticalCard from "Components/Cards/VerticalCard";
import { IAnimeInfo, IAnimeResult, ITitle } from "@consumet/extensions";
type Props = {
  Title: string;
  recommendations?: boolean;
  Dark?: boolean;
  Animes: Array<IAnimeResult> | undefined;
  IsVertical?: boolean;
  ShowAllButton?: boolean;
  OnAllButtonClick?: MouseEventHandler;
};

const CardsScroll = ({
  recommendations,
  Dark,
  Animes,
  Title,
  IsVertical = true,
  ShowAllButton = true,
  OnAllButtonClick,
}: Props) => {
  const [selectedAnime, setSelectedAnime] = useState<IAnimeInfo | null>(null);

  const OnAnimeSelect = (item: IAnimeInfo) => {
    if (!recommendations) setSelectedAnime(item);
    // else Navigation(`/anime/${item?.id}`, true);
  };
  return (
    <>
      <div
        className={`max-w-[1800px] mx-auto w-full ${
          Dark ? "text-black" : "text-white"
        }`}
      >
        <div className="flex items-center justify-between px-1">
          <p className={`text-xl ${Dark ? "border-black" : "border-white"}`}>
            {Title}
          </p>
          {ShowAllButton && (
            <a href="/" className="flex items-center gap-1 hover:underline">
              <p className="text-neutral-400">All</p>
              <Icon.ChevronRight className="text-neutral-400" size={16} />
            </a>
          )}
        </div>
        <div className="flex gap-4 place-items-center relative overflow-scroll py-4 px-1 scrollbar-hide h-full w-full">
          {Animes == null &&
            Array.from(Array(12), (e, i) => {
              return (
                <div
                  key={i}
                  className="h-[240px] min-w-[180px] md:h-[320px] md:min-w-[240px] w-full animate-pulse bg-white/10 backdrop-blur-xl rounded"
                ></div>
              );
            })}

          {Animes &&
            Animes?.map((item) => (
              <div key={item.id} onClick={() => OnAnimeSelect(item)}>
                {IsVertical && <VerticalCard anime={item} key={item?.id} />}
                {!IsVertical && <HorizontalCard anime={item} key={item?.id} />}
              </div>
            ))}
        </div>
      </div>
      <AnimatePresence mode="popLayout">
        {selectedAnime && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2, delay: 0.15 }}
            style={{ pointerEvents: "auto" }}
            className="fixed z-20 grid place-items-center top-0 left-0 p-2 w-full h-full bg-black/80"
          >
            <motion.div
              className="flex flex-col relative max-w-[50rem] w-full bg-black/20 rounded ring-2 ring-white/30 backdrop-blur-xl m-2 text-white"
              layoutId={selectedAnime?.id}
            >
              <div className="absolute top-2 right-2 flex justify-end items-center w-full">
                <motion.button
                  onClick={() => setSelectedAnime(null)}
                  className="bg-black/20 backdrop-blur-lg rounde-full p-1"
                >
                  <Icon.X />
                </motion.button>
              </div>
              <div className="flex items-start h-44 w-full col-span-1">
                <motion.img
                  src={selectedAnime?.cover}
                  className="w-full object-cover h-44"
                />
              </div>
              <div className="flex flex-col gap-1 col-span-3 px-5 p-2 pb-5">
                <h1 className="font-bold text-lg">
                  {(selectedAnime?.title as ITitle)?.english}
                </h1>
                <div className="flex gap-1 font-semibold ">
                  <p>Ep {selectedAnime?.currentEpisode as string}</p>
                  <DotIcon />
                  {/* <p>{selectedAnime?.duration}m</p>
                  <DotIcon /> */}
                  <p>{selectedAnime?.status}</p>
                  <DotIcon />
                  <p>{selectedAnime?.releaseDate}</p>
                </div>
                <div className="flex gap-2 text-white/60">
                  {selectedAnime?.genres?.join(", ")}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="line-clamp-6 text-white/90">
                    {RemoveHTMLTags(selectedAnime?.description)}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={"/anime/" + selectedAnime?.id}
                      className="flex items-center rounded gap-2 px-4 p-3 bg-white/10 backdrop-blur max-w-max hover:bg-white/20 transition-all"
                    >
                      <Icon.Play fill="#fff" />
                      <p>Watch Now</p>
                    </a>
                    <button className="flex items-center rounded gap-2 px-4 p-3 bg-white/10 backdrop-blur max-w-max hover:bg-white/20 transition-all">
                      <Icon.Star />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CardsScroll;
