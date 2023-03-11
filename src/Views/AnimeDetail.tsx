import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//@ts-ignore
import { RemoveHTMLTags } from "Utils/Utils";
import DotIcon from "../Components/Icons/DotIcon";
import * as Icon from "react-feather";
import CardsScroll from "Components/Sections/CardsScroll";
import { IAnimeEpisode, IAnimeInfo, ITitle, META } from "@consumet/extensions";
var _ = require("lodash");
const anilist = new META.Anilist();
function AnimeDetail() {
  const { animeId } = useParams();
  // const navigation = useNavigate();

  const [response, setResponse] = useState<IAnimeInfo>();
  const [episodes, setEpisodes] = useState<Array<IAnimeEpisode> | null>();

  useEffect(() => {
    async function FetchResults() {
      if (animeId)
        await anilist.fetchAnimeInfo(animeId).then((data) => {
          setResponse(data);
          setEpisodes(data.episodes);
        });
    }
    FetchResults();
  }, [animeId]);

  const filterEpisodes = (e: any) => {
    const value = new RegExp(e.target.value, "gi");
    if (value === null) {
      setEpisodes(null);
    } else {
      setEpisodes(
        response?.episodes?.filter(
          (x) => x?.title?.match(value) || x?.number?.toString().match(value)
        )
      );
    }
  };

  return (
    <>
      {/* <div>
        <div>Button[Fav,WatchNow,Share]</div>
        <div>TRailers</div>
        <div>Characters</div>
      </div> */}
      <section className="flex flex-col gap-3 w-full h-full bg-black/80">
        {response && (
          <div className="flex flex-col w-full h-full">
            <img
              src={response?.cover}
              alt=""
              className={
                "absolute min-h-[20rem] h-full max-h-96 transition-all object-cover w-full bg-white/10 " +
                (response === null ? "animate-pulse h-72" : "")
              }
            />
            <div className="flex w-full">
              <div className="flex flex-col md:flex-row backdrop-blur-lg mx-auto text-white bg-black/50 w-full h-96">
                <div className="flex flex-col lg:flex-row grow gap-6 lg:gap-8 mx-auto w-full p-4 max-w-[1800px]">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className=" bg-black rounded">
                        <img
                          src={response?.image}
                          alt=""
                          className={
                            "bg-white/10 h-44 lg:h-80 w-auto aspect-[3/4] object-cover rounded " +
                            (response?.image === null ? "animate-pulse" : "")
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 grow w-full">
                      <h2 className="font-semibold text-2xl">
                        {(response?.title as ITitle)?.english}
                      </h2>
                      <div className="flex gap-1 font-semibold text-white">
                        <p className="flex items-center gap-1">
                          {response?.type}
                        </p>
                        <DotIcon />
                        <p>Ep {response?.totalEpisodes}</p>
                        <DotIcon />
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p>{response?.duration as string}m</p>
                        </div>
                      </div>
                      <div>
                        <p className="line-clamp-4 text-white/70">
                          {RemoveHTMLTags(response?.description)}
                        </p>
                      </div>
                      <div className="flex gap-2 max-w-max">
                        <a
                          href={
                            "/watch/" +
                            response?.id +
                            "/" +
                            _.head(response?.episodes)?.id
                          }
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
                  <div className="grid grid-cols-2 md:grid-cols-3 place-content-center lg:flex lg:flex-col shrink bg-black/20 lg:h-full gap-2 p-4 py-4 text-sm lg:text-base w-full lg:max-w-[26rem]">
                    {(response?.synonyms as string[]).length > 0 && (
                      <div className="flex gap-1">
                        <p className="flex text-white/60">Synonyms: </p>
                        <div className="font-semibold overflow-hidden truncate">
                          {response?.synonyms?.map((x) => x)}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-1 truncate">
                      <p className="text-white/60">Aired on: </p>
                      <p className="font-semibold">
                        {response?.startDate &&
                          response?.startDate.day +
                          "/" +
                          response?.startDate.month +
                          "/" +
                          response?.startDate.year}
                      </p>
                    </div>
                    <p>
                      <span className="text-white/60">Premiered: </span>
                      {response?.season?.toUpperCase()} {response?.releaseDate}
                    </p>
                    <p>
                      <span className="text-white/60">Duration: </span>
                      {response?.duration as string}m
                    </p>
                    <div className="flex gap-1">
                      <span className="text-white/60">Genres: </span>
                      <div className="flex flex-wrap gap-2 text-white font-semibold truncate w-full">
                        {response?.genres?.map((genre) => (
                          <span key={genre}>{genre}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-white/60">Studios: </span>
                      <div className="flex gap-2 text-white font-semibold">
                        {response?.studios?.map((studio) => (
                          <p key={studio}>{studio}</p>
                        ))}
                      </div>
                    </div>
                    <p>
                      <span className="text-white/60">Country of origin: </span>
                      {response?.countryOfOrigin}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3 p-4 max-w-[1800px] w-full mx-auto">
          <div className="flex items-center justify-between text-white">
            <h2 className="py-2 px-1 text-xl font-bold">Episodes</h2>
            <div className="flex gap-1 p-1 px-2 items-center rounded-full bg-white/5 hover:bg-white/10">
              <button className="p-1 opacity-50 group-focus-within:opacity-80">
                <Icon.Search size={20} />
              </button>
              <input
                type="text"
                onChange={filterEpisodes}
                placeholder="Search"
                className="p-1 pl-3 bg-transparent focus-visible:outline-none w-full transition-all"
              />
            </div>
          </div>
          <div className="flex flex-col divide-y divide-solid divide-white/10 text-white max-h-[32rem] overflow-y-auto scrollbar-hide">
            {episodes?.map((ep) => (
              <a
                href={"/watch/" + response?.id + "/" + ep.id}
                key={ep.id}
                className="flex gap-2 text-sm py-2 md:px-4 hover:bg-white/5"
              >
                <div className="flex gap-2 items-center">
                  <div className="font-bold text-center text-base md:text-xl w-12 md:w-16">
                    {ep.number}
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="text-base">{ep.title}</p>
                    <p className="text-white/50 line-clamp-1">
                      {ep?.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        {/* <div className="flex flex-col gap-3 p-4 max-w-[1800px] w-full mx-auto">
          <div className="flex items-center justify-between text-white">
            <h2 className="py-2 px-1 text-xl font-bold">Characters</h2>
          </div>
          <div className="flex p-2 overflow-y-auto max-h-[30rem] bg-black/20 backdrop-blur scrollbar-hide">
            {response?.characters  && response?.characters?.map((char) => (
              <div className="flex flex-col gap-3 p-2 w-full" key={char.id}>
                <img
                  src={char?.image}
                  alt="test"
                  className="rounded-full object-cover aspect-square min-w-[7rem] h-28"
                />
                <div className="flex flex-col items-center gap-1 text-white/70 text-sm">
                  <p className="text-sm text-white font-semibold truncate">
                    {char.name.full}
                  </p>
                  <p>{char?.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="p-4">
          {//@ts-ignore
            response?.recommendations?.length > 0 && (
              <CardsScroll
                Title="Recommendations"
                recommendations={true}
                Animes={response?.recommendations?.slice(0, 8)}
              />
            )}
        </div>
      </section>
    </>
  );
}

export default AnimeDetail;
