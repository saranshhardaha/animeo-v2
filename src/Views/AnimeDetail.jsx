import React, { useEffect, useState } from "react";
import { GetAnimeDetails } from "Utils/DBServices";
import { useNavigate, useParams } from "react-router-dom";
import { RemoveHTMLTags } from "Utils/Utils";
import DotIcon from "Components/DotIcon";
import AnimeCardsScroll from "Components/AnimeCardsScroll";
import * as Icon from "react-feather";
function AnimeDetail() {
  const { animeId } = useParams();
  const navigation = useNavigate();
  const [response, setResponse] = useState(null);
  useEffect(() => {
    async function FetchResults() {
      let details = await GetAnimeDetails(animeId);
      setResponse(details);
    }
    FetchResults();
  }, [animeId]);

  return (
    <>
      {/* <div>
        <div>Button[Fav,WatchNow,Share]</div>
        <div>TRailers</div>
        <div>Characters</div>
      </div> */}
      <section className="flex flex-col gap-3 w-full h-full bg-black/80">
        <div className="flex flex-col w-full h-full">
          <img
            src={response?.cover}
            alt=""
            className="min-h-[12rem] h-full max-h-80 object-cover w-full"
          />
          <div className="flex w-full">
            <div className="flex flex-col md:flex-row backdrop-blur-md mx-auto text-white bg-black/30 w-full h-full">
              <div className="flex flex-col lg:flex-row grow gap-8 mx-auto w-full p-4 max-w-[1200px]">
                <div className="flex flex-col items-center -mt-20 sm:-mt-32 lg:m-0">
                  <div className=" bg-black">
                    <img
                      src={response?.image}
                      alt=""
                      className={
                        "bg-white/40 w-44 lg:w-96 h-auto aspect-[3/4] ring-2 ring-white/30 object-cover rounded" +
                        (response?.image === null ? "animate-pulse" : "")
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 grow w-full">
                  <h2 className="font-semibold text-2xl">
                    {response?.title.english}
                  </h2>
                  <div className="flex gap-1 font-semibold text-white">
                    <p className="flex items-center gap-1">{response?.type}</p>
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
                      <p>{response?.duration}m</p>
                    </div>
                  </div>
                  <div>
                    <p className="line-clamp-4 text-white/70">
                      {RemoveHTMLTags(response?.description)}
                    </p>
                  </div>
                  <div className="flex gap-2 max-w-max">
                    <a
                      href={"/watch/" + response?.episodes[0].id}
                      className="flex items-center gap-2 ring-1 ring-white p-2 backdrop-blur bg-white/20 hover:bg-white/40"
                    >
                      <Icon.Play />
                      <p className="text-sm">Watch Now</p>
                    </a>
                    <button className="ring-1 ring-white p-3 backdrop-blur bg-white/20 hover:bg-white/40">
                      <Icon.Star />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col shrink bg-black/20 h-full gap-2 p-4 py-8 w-full lg:max-w-[26rem]">
                  <div className="flex gap-1">
                    <p className="flex text-white/60">Synonyms: </p>
                    <div className="font-semibold h-10 overflow-hidden">
                      {response?.synonyms?.map((syn) => (
                        <p key={syn}>{syn}</p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 w-full truncate">
                    <p className="text-white/60">Aired on: </p>
                    <p className="font-semibold">
                      {response?.startDate.day +
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
                    {response?.duration}m
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
                  <p>
                    <span className="text-white/60">Popularity: </span>
                    {response?.popularity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4 max-w-[1200px] w-full mx-auto">
          <div className="flex items-center justify-between text-white">
            <h2 className="py-2 px-1 text-xl font-bold">Episodes</h2>
            <div className="flex gap-1 p-1 px-2 items-center rounded-full bg-white/5 hover:bg-white/10">
              <button className="p-2 opacity-50 group-focus-within:opacity-80">
                <Icon.Search size={20} />
              </button>
              <input
                type="text"
                placeholder="Search"
                className="p-2 pl-3 bg-transparent focus-visible:outline-none w-full transition-all"
              />
            </div>
          </div>
          <div className="flex flex-col divide-y divide-solid divide-white/10 text-white max-h-[32rem] overflow-y-auto scrollbar-hide">
            {response?.episodes?.map((ep) => (
              <a
                href={"/watch/" + ep.id}
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
        <div className="flex flex-col gap-3 p-4 max-w-[1200px] w-full mx-auto">
          <div className="flex items-center justify-between text-white">
            <h2 className="py-2 px-1 text-xl font-bold">Characters</h2>
          </div>
          <div className="flex p-2 overflow-y-auto max-h-[30rem] bg-black/20 backdrop-blur scrollbar-hide">
            {response?.characters?.map((char) => (
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
        </div>
        <AnimeCardsScroll
          Title="Recommendations"
          Recommendations={true}
          Navigation={navigation}
          Animes={response?.recommendations?.slice(0, 8)}
        />
      </section>
    </>
  );
}

export default AnimeDetail;
