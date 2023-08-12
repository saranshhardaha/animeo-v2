import VideoPlayer from "../Components/VideoPlayer";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEpisodes } from "Utils/DBServices";
import * as Icon from "react-feather";
import { RemoveHTMLTags } from "Utils/Utils";
import CardsScroll from "Components/Sections/CardsScroll";
import { IAnimeEpisode, IAnimeInfo, ITitle, META } from "@consumet/extensions";

const anilist = new META.Anilist();
const Watch = () => {
  const { animeId, episodeID } = useParams();
  // const navigation = useNavigate();
  let [episode, setEpisode] = useState<IAnimeEpisode | null>(null);
  let [anime, setAnime] = useState<IAnimeInfo | null>(null);
  const [episodes, setEpisodes] = useState<IAnimeEpisode[] | null>(null);
  const navigate = useNavigate();
  const episodeChange = (ep: any) => {
    setEpisode(null);
    navigate(`/watch/${anime?.id}/${ep.number}`);
  };
  const filterEpisodes = (e: any) => {
    const value = new RegExp(e.target.value, "gi");
    if (value === null) {
      setEpisodes(anime?.episodes ?? null);
    } else {
      setEpisodes(
        anime?.episodes?.filter(
          (x) => x?.title?.match(value) || x?.number?.toString().match(value)
        ) ?? null
      );
    }
  };

  useEffect(() => {
    async function FetchResults() {
      if (!animeId || !episodeID) return;

      await anilist.fetchAnilistInfoById(animeId).then((data) => {
        setAnime(data);
      });
      var ani = await fetchEpisodes(animeId);
      setEpisodes(ani?.episodes);
      if (ani) {
        const episode = await (
          await fetch(`https://api.enime.moe/view/${ani?.slug}/${episodeID}`)
        ).json();
        setEpisode(episode);
      }
    }
    FetchResults();
  }, [animeId, episodeID]);
  return (
    <>
      {!episodes && (
        <div className="grid place-items-center h-screen w-full">Loading..</div>
      )}
      {episodes && (
        <main className="flex flex-col min-h-screen w-full mx-auto max-w-[1440px]">
          <div className="flex flex-col lg:flex-row w-full">
            <div className="flex flex-col gap-6 p-4 h-full max-w-[1440px] w-full mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 max-w-max">
                <div className="flex flex-col gap-4 w-full lg:py-4">
                  <div className="flex items-center h-full w-full lg:h-[28rem] xl:h-[34rem]">
                    {episode ? (
                      <VideoPlayer
                        episode={episode}
                        className="relative w-full aspect-video h-full"
                      />
                    ) : (
                      <div className="w-full h-[28rem] xl:h-[34rem] bg-white/10 rounded animate-pulse py-4"></div>
                    )}
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
                        {(anime?.title as ITitle)?.english}
                      </h2>
                      <p className="text-sm text-neutral-400 line-clamp-6">
                        {RemoveHTMLTags(anime?.description)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:max-w-[26rem] w-full h-full">
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
                  <div className="flex flex-col text-white w-full h-[28rem] xl:h-[34rem] overflow-y-auto scrollbar-hide">
                    {episodes?.map((ep) => (
                      <button
                        onClick={() => episodeChange(ep)}
                        key={ep.id}
                        className={`group w-full flex gap-2 text-sm p-2 rounded-md transition-all hover:bg-white/5 ${
                          episode?.number === ep.number ? "bg-white/10" : ""
                        }`}
                      >
                        <div className="grid place-items-center h-16 xl:h-20 w-auto aspect-video relative">
                          <img
                            src={`https://images.weserv.nl/?url=${ep.image}`}
                            alt={ep.id}
                            className="absolute h-full w-full object-cover rounded-md"
                          />
                          <h4
                            className={`group-hover:opacity-100 grid transition-all ease-in-out place-items-center h-full w-full z-10 text-xl font-bold bg-black/60 drop-shadow rounded-md ${
                              episode?.number === ep.number
                                ? "opacity-100"
                                : "opacity-0 "
                            }`}
                          >
                            Ep {ep.number}
                          </h4>
                        </div>
                        <div className="flex flex-col items-start justify-start w-full">
                          <h4 className="text-sm text-white text-left line-clamp-1 w-full">
                            {ep.title}
                          </h4>
                          <p className="text-sm text-neutral-500 text-left line-clamp-2 xl:line-clamp-3 w-full">
                            {ep.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {
                //@ts-ignore
                anime?.recommendations?.length > 0 && (
                  <CardsScroll
                    Title="Recommendations"
                    recommendations={true}
                    Animes={anime?.recommendations?.slice(0, 8)}
                  />
                )
              }
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Watch;
