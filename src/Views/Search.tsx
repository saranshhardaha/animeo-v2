import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GridCard from "Components/Cards/GridCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  IAnimeResult,
  ITitle,
  IAnimeInfo,
  ISearch,
  META,
} from "@consumet/extensions";
import * as Icon from "react-feather";
import DotIcon from "../Components/Icons/DotIcon";
const anilist = new META.Anilist();

const Search = () => {
  const { searchQuery } = useParams();
  const [text, setText] = useState("");
  const [animes, setAnimes] = useState<
    ISearch<IAnimeResult> | undefined | null
  >();
  const [selectedAnime, setSelectedAnime] = useState<IAnimeInfo | null>(null);

  const OnAnimeSelect = (item: IAnimeInfo) => {
    setSelectedAnime(item);
  };
  
  function handleChange(e: any) {
    setText(e.target.value);
  }
  async function SearchAnimes(searchQuery: string) {
    if (!searchQuery) return;
    await anilist.search(searchQuery).then((data) => {
      setAnimes(data);
    });
  }
  useEffect(() => {
    if (searchQuery != null) SearchAnimes(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <div className="max-w-[1440px] mx-auto p-4">
        <div className="flex gap-1 p-1 items-center rounded-full bg-white/10 hover:bg-white/10 max-w-xs mx-auto">
          <button className="p-1 opacity-50 group-focus-within:opacity-80">
            <Icon.Search size={20} />
          </button>
          <input
            type="text"
            placeholder="Search"
            onChange={handleChange}
            value={text}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                SearchAnimes(text);
              }
            }}
            className="p-1 pl-3 text-sm bg-transparent focus-visible:outline-none w-full transition-all"
          />
        </div>
        <div className="h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-center gap-4 py-4 p-2">
          {animes?.results &&
            animes.results.map((item) => (
              <div key={item.id} onClick={() => OnAnimeSelect(item)}>
                <GridCard anime={item} key={item?.id} />
              </div>
            ))}
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
                    <p>Ep {selectedAnime?.totalEpisodes as number}</p>
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
                      {selectedAnime?.description}
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
      </div>
    </div>
  );
};

export default Search;
