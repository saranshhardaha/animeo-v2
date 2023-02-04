import React, { useEffect, useState } from "react";
import { GetAnimeDetails } from "Utils/DBServices";
import { useParams } from "react-router-dom";
import { RemoveHTMLTags } from "Utils/Utils";
import DotIcon from "Components/DotIcon";
import AnimeCardsScroll from "Components/AnimeCardsScroll";
import { Search } from "react-feather";
function AnimeDetail() {
  const { animeId } = useParams();
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
            <div className="flex flex-col md:flex-row backdrop-blur-md mx-auto text-white ring-1 ring-white/20 bg-black/30 w-full h-full">
              <div className="flex flex-col lg:flex-row grow gap-8 mx-auto w-full p-4 max-w-[1200px]">
                <div className="flex flex-col items-center -mt-20 sm:-mt-32 lg:m-0">
                  <div className=" bg-black">
                    <img
                      src={response?.image}
                      alt=""
                      className={
                        "bg-white/40 w-36 lg:w-96 h-auto aspect-[3/4] ring-1 ring-white object-cover" +
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
                      href={"/watch/" + response?.id}
                      className="flex items-center gap-2 ring-1 ring-white p-2 backdrop-blur bg-white/20 hover:bg-white/40"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm">Watch Now</p>
                    </a>
                    <button className="ring-1 ring-white p-3 backdrop-blur bg-white/20 hover:bg-white/40">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
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
                        <span>{genre}</span>
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
            <div className="flex gap-1 p-1 px-2 items-center ring-1 bg-black/10 ring-white/80 backdrop-blur">
              <Search size="1rem" />
              <input
                type="text"
                className="px-2 w-full max-w-[14rem] bg-transparent border-0"
              />
            </div>
          </div>
          <div className="flex flex-col divide-y divide-solid divide-white/10 text-white max-h-[32rem] overflow-y-auto">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center p-2 overflow-y-auto max-h-[30rem] bg-black/20 backdrop-blur ">
            {response?.characters?.map((char) => (
              <div className="flex gap-3 p-2 w-full" key={char.id}>
                <img
                  src={char?.image}
                  alt="test"
                  className="ring-1 ring-white/70 object-cover aspect-[3/4] w-20 h-full"
                />
                <div className="flex flex-col gap-1 text-white/70 text-sm">
                  <p className="text-lg text-white font-semibold">
                    {char.name.full}
                  </p>
                  <p>Role: {char?.role}</p>
                  <p>Voice: {char?.voiceActors[0]?.name?.full}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AnimeCardsScroll
          Title="Recommendations"
          Animes={response?.recommendations}
        />
      </section>
    </>
  );
}

export default AnimeDetail;
