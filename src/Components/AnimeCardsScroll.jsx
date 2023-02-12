import React, { Component } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimeCard from "Components/AnimeCard";
import { RemoveHTMLTags } from "Utils/Utils";
import * as Icon from "react-feather";
import DotIcon from "./DotIcon";
export default class AnimeCardsScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnime: null,
    };
  }


  OnAnimeSelect = (item) => {
    if (!this.props.Recommendations) this.setState({ selectedAnime: item });
    else this.props.Navigation(`/anime/${item?.id}`, true);
  };

  render() {
    return (
      <>
        <div
          className={`max-w-[1200px] mx-auto w-full p-4 md:px-0 ${
            this.props.DarkTitle ? "text-black" : "text-white"
          }`}
        >
          <div className="flex items-center justify-between m-4 mx-0">
            <p
              className={`text-2xl font-bold border-l-4 ${
                this.props.DarkTitle ? "border-black" : "border-white"
              } px-2 leading-7`}
            >
              {this.props.Title}
            </p>
            <a href="/" className="flex items-center gap-1 hover:underline">
              <p className="text-lg font-semibold px-1">All</p>
              <Icon.ChevronRight />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 place-items-center relative h-full w-full">
            {this.props?.Animes == null &&
              Array.from(Array(12), (e, i) => {
                return (
                  <div
                    key={i}
                    className="h-96 w-full animate-pulse bg-white/10 backdrop-blur-xl rounded"></div>
                );
              })}

            {this.props?.Animes?.map((item) => (
              <motion.div
                key={item.id}
                layoutId={item.id}
                onClick={() => this.OnAnimeSelect(item)}
              >
                <AnimeCard Anime={item} key={item?.id} />
              </motion.div>
            ))}
          </div>
        </div>
        <AnimatePresence mode="popLayout">
          {this.state.selectedAnime && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.2, delay: 0.15 }}
              style={{ pointerEvents: "auto" }}
              className="fixed  z-20 grid place-items-center top-0 left-0 p-2 w-full h-full bg-black/80"
            >
              <motion.div
                className="flex flex-col relative max-w-[50rem] w-full bg-black/20 ring-1 ring-white/40 backdrop-blur-xl m-2 text-white"
                layoutId={this.state.selectedAnime?.id}
              >
                <div className="absolute top-2 right-2 flex justify-end items-center w-full">
                  <motion.button
                    onClick={() => this.setState({ selectedAnime: null })}
                    className="bg-black/20 backdrop-blur-lg rounde-full p-1"
                  >
                    <Icon.X />
                  </motion.button>
                </div>
                <div className="flex items-start h-full w-full col-span-1">
                  <motion.img
                    src={this.state.selectedAnime?.cover}
                    className="w-full object-cover min-h-[12rem]"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-3 px-5 p-2 pb-5">
                  <h1 className="font-bold text-lg">
                    {this.state.selectedAnime?.title?.english}
                  </h1>
                  <div className="flex gap-1 font-semibold ">
                    <p>Ep {this.state.selectedAnime?.totalEpisodes}</p>
                    <DotIcon />
                    <p>{this.state.selectedAnime?.duration}m</p>
                    <DotIcon />
                    <p>{this.state.selectedAnime?.status}</p>
                    <DotIcon />
                    <p>{this.state.selectedAnime?.releaseDate}</p>
                  </div>
                  <div className="flex gap-2 text-white/60">
                    {this.state.selectedAnime?.genres?.join(", ")}
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="line-clamp-6 text-white/90">
                      {RemoveHTMLTags(this.state.selectedAnime?.description)}
                    </p>
                    <div className="flex gap-2">
                      <a
                        href={"/anime/" + this.state.selectedAnime?.id}
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
  }
}
