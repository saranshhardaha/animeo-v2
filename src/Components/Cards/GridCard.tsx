import { motion } from "framer-motion";
import React from "react";
import DotIcon from "../Icons/DotIcon";
// @ts-ignore
import { Star } from "react-feather";
import { IAnimeInfo, ITitle } from "@consumet/extensions";
type Props = {
  anime: IAnimeInfo;
};
const GridCard = ({ anime }: Props) => (
  <motion.div
    key={anime?.id}
    className="flex flex-col relative max-w-max group"
  >
    <motion.div className="flex flex-col w-full h-full relative cursor-pointer hover:opacity-60 transition-all rounded overflow-hidden">
      <div className="relative flex w-full">
        <img
          src={anime?.image}
          alt={(anime?.title as ITitle)?.english}
          className="w-full h-auto rounded aspect-[5/7]"
        />
        <div className="absolute flex items-center gap-1 text-sm md:text-sm bg-white/10 filter backdrop-blur-3xl text-white rounded-full m-2 font-semibold p-1 md:p-2 px-2 md:px-3 md:h-8">
          <Star height="0.75rem" width="0.75rem" fill="#fff" />
          {((anime?.rating ?? 0) / 10).toFixed(1)}
        </div>
      </div>

      {anime == null && (
        <div className="w-full sm:h-[240px] sm:w-[180px] md:h-[320px] md:w-[240px] bg-white animate-pulse"></div>
      )}

      <div className="flex flex-col h-full w-full items-start">
        <div className="flex flex-col justify-end p-2 bg-gradient-to-t from-black via-black/80 text-white w-full">
          <h1 className="font-semibold text-lg truncate">
            {(anime?.title as ITitle)?.english}
          </h1>
          <div className="flex gap-1 text-sm text-white/50">
            {anime?.status && (
              <div className="flex gap-1">
                <p>{anime?.status}</p>
                <DotIcon />
              </div>
            )}
            <p>{anime?.releaseDate?.toString()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default GridCard;
