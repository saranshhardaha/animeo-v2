import VideoPlayer from "Components/VideoPlayer";
import React, { useEffect, useState } from "react";
import { GetAnimeDetails, GetEpisodeDetails } from "Utils/DBServices";
import { useParams, useNavigate } from "react-router-dom";
import * as Icon from "react-feather";
import AnimeCardsScroll from "Components/AnimeCardsScroll";
import { RemoveHTMLTags } from "Utils/Utils";
// import VideoPlayer  from "Components/VideoPlayer";

function Watch() {
  const { animeId, episodeID } = useParams();
  const navigation = useNavigate();
  let [showVideo, setShowVideo] = useState(false);
  let [anime, setAnime] = useState(null);
  const [episodes, setEpisodes] = useState(null);

  const [VideoOptions, setVideoOptions] = useState({
    sources: [],
  });
  const filterEpisodes = (e) => {
    const value = new RegExp(e.target.value, "gi");
    console.log(value);
    if (value === null || value === "") {
      setEpisodes(anime?.episodes);
    } else {
      setEpisodes(
        anime?.episodes?.filter(
          (x) => x?.title?.match(value) || x?.number?.toString().match(value)
        )
      );
    }
  };

  useEffect(() => {
    async function FetchResults() {
      setShowVideo(false);
      let details = await GetEpisodeDetails(episodeID);
      let animeDetails = await GetAnimeDetails(animeId);
      setAnime(animeDetails);
      setEpisodes(animeDetails?.episodes);
      details?.sources?.forEach((element) => {
        element.type = "application/x-mpegURL";
      });
      setVideoOptions({
        sources: details?.sources,
      });
      setShowVideo(true);
    }
    FetchResults();
  }, [animeId, episodeID]);
  return (
    <>
      <main className="flex flex-col min-h-screen md:pt-12 w-full mx-auto max-w-[1440px]">
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col gap-6 p-4 h-full max-w-[68rem] w-full mx-auto">
            <div className="flex flex-col-reverse md:flex-row gap-2 md:h-[24rem] w-full md:py-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center px-2 justify-between text-white w-full">
                  <h2 className="px-1 font-bold">Episodes</h2>
                  <div className="flex gap-1 p-1 items-center rounded-full bg-white/5 hover:bg-white/10">
                    <button className="p-1 opacity-50 group-focus-within:opacity-80">
                      <Icon.Search size={20} />
                    </button>
                    <input
                      type="text"
                      onChange={filterEpisodes}
                      placeholder="Search"
                      className="p-1 pl-3 text-sm bg-transparent focus-visible:outline-none w-full transition-all"
                    />
                  </div>
                </div>
                <div className="flex flex-col divide-y divide-solid divide-white/10 text-white max-h-[24rem] overflow-y-auto scrollbar-hide">
                  {episodes?.map((ep) => (
                    <button
                      key={ep.id}
                      className="flex gap-2 text-sm py-2 md:px-2 hover:bg-white/5"
                    >
                      <div className="flex gap-2 items-center">
                        <div className="font-bold text-center text-sm md:text-lg w-8 md:w-14">
                          {ep.number}
                        </div>
                        <div className="flex flex-col line-clamp-1 w-full">
                          <p className="text-sm w-64 text-left">{ep.title}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center h-full w-full">
                {showVideo ? (
                  <VideoPlayer sources={VideoOptions?.sources} />
                ) : (
                  <div className="w-full h-[20rem] bg-white/10 rounded animate-pulse py-4"></div>
                )}
              </div>
            </div>
            <div className="flex gap-5">
              <img
                alt=""
                src={anime?.image}
                className={`h-44 rounded aspect-[5/7] ${
                  !anime?.image
                    ? "animate-pulse bg-white/10 ring-0 outline-none"
                    : ""
                }`}
              />
              <div className="flex flex-col gap-3">
                <h2 className="flex text-xl font-bold">
                  {anime?.title?.english ? (
                    anime?.title?.english
                  ) : (
                    <span className="w-full h-4 bg-white/10 animate-pulse text-black rounded-md"></span>
                  )}
                </h2>
                <p className="text-sm text-neutral-400 line-clamp-6">
                  {RemoveHTMLTags(anime?.description)}
                </p>
              </div>
            </div>

            <AnimeCardsScroll
              Title="Recommendations"
              Recommendations={true}
              Navigation={navigation}
              Animes={anime?.recommendations?.slice(0, 8)}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Watch;
