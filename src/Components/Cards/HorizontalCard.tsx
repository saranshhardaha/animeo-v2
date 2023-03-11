import { motion } from "framer-motion";
import React from "react";
import DotIcon from "../Icons/DotIcon";
// @ts-ignore
import { RemoveHTMLTags } from "Utils/Utils";
import { Play, Star } from "react-feather";
import { IAnimeInfo, ITitle } from "@consumet/extensions";
type Props = {
  anime: IAnimeInfo
}
const HorizontalCard = ({ anime }: Props) => (
  <motion.div
    key={anime?.id}
    className="flex flex-col relative w-full group "
  >
    <motion.div className="flex flex-col h-[136px] min-w-[240px] relative cursor-pointer hover:opacity-60 transition-all rounded overflow-hidden ring-2 ring-white/5 hover:ring-white/30">
      <img
        src={anime?.image}
        alt={(anime?.title as ITitle)?.english}
        className="w-full h-auto bg-black aspect-[5/7] ring-1 rounded"
      />
      {anime == null && (
        <div className="h-full w-full bg-white animate-pulse"></div>
      )}
      <div className="absolute flex flex-col h-full w-full items-start justify-between gap-1">
        <div className="flex items-center gap-1 text-sm bg-white/30 backdrop-blur-3xl text-white  rounded-full m-2 font-semibold p-2 px-2 h-8 max-w-max">
          <Star height="0.75rem" width="0.75rem" fill="#fff" />
          {(anime?.rating ?? 0 / 10).toFixed(1)}
        </div>

        <div className="flex flex-col justify-end p-2 bg-gradient-to-t from-black via-black/80 text-white w-full h-32">
          <h1 className="font-semibold text-lg truncate w-full">
            {(anime?.title as ITitle)?.english}
          </h1>
          <div className="flex gap-1 text-sm text-white/50">
            <p>{anime?.status}</p>
            <DotIcon />
            <p>{anime?.releaseDate?.toString()}</p>
          </div>
        </div>
      </div>
    </motion.div>
    <div className="absolute z-10 left-1/3 top-1/3 w-96 hidden flex-col gap-4 text-white backdrop-blur-lg bg-black/80 transition-all duration-700 ease-in-out p-5 ring-1 ring-white">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-lg">
          {(anime?.title as ITitle)?.english}
        </h1>
        <div className="flex gap-1 font-semibold ">
          <p>Ep {anime?.totalEpisodes}</p>
          <DotIcon />
          {/* <p>{anime?.duration}m</p>
          <DotIcon /> */}
          <p>{anime?.status}</p>
          <DotIcon />
          <p>{anime?.releaseDate?.toString()}</p>
        </div>
        <div className="flex gap-2 text-white/60">
          {anime?.genres?.map((genre) => (
            <p key={genre}>{genre}</p>
          ))}
        </div>
        <p className="line-clamp-6 text-white/90">
          {RemoveHTMLTags(anime?.description)}
        </p>
      </div>
      <div className="flex gap-2">
        <a
          href={"/anime/" + anime?.id}
          className="flex items-center gap-2 ring-1 ring-white p-2 backdrop-blur bg-white/20 hover:bg-white/40"
        >
          <Play />
          <p className="text-sm">Watch Now</p>
        </a>
        <button className="ring-1 ring-white p-3 backdrop-blur bg-white/20 hover:bg-white/40">
          <Star />
        </button>
      </div>
    </div>
  </motion.div>
)

export default HorizontalCard;