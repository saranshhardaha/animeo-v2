import React, { useEffect, useState } from "react";
import { GetAnimeDetails } from "../Utils/DBServices";
import { useParams } from "react-router-dom";
import { RemoveHTMLTags } from "../Utils/Utils";
import DotIcon from "../Components/DotIcon";
function AnimeDetail() {
  const { animeId } = useParams();
  const [Response, setResponse] = useState({
    cover: null,
    image: null,
    description: "",
    synonyms: "",
    title: { english: null },
    releaseDate: "",
    season: "",
    studios: [],
    popularity: "",
    episodes: [
      { id: "", title: "", description: "", number: 1, image: "", airDate: "" },
    ],
    countryOfOrigin: "",
    genres: [],
    startDate: { day: null, month: null, year: null },
  });
  useEffect(() => {
    async function FetchResults() {
      let details = await GetAnimeDetails(animeId);
      setResponse(details);
    }
    FetchResults();
  }, []);

  return (
    <>
      {/* <div>
        <div>Banner Image</div>
        <div>action * 2022</div>
        <div>Description 4 line trincate</div>
        <div>Button[Fav,WatchNow,Share]</div>
        <div>Episodes/Player Link</div>
        <div>TRailers</div>
        <div>Scores</div>
        <div>Characters</div>
      </div> */}
      <section className="flex flex-col gap-3 w-full h-full bg-black/90">
        <div className="relative flex w-full h-full">
          <img
            src={Response.cover}
            alt=""
            className="h-96 object-cover w-full"
          />
          <div className="absolute top-0 w-full h-96">
            <div className="flex flex-col md:flex-row gap-2 backdrop-blur-md max-w-[1440px] mx-auto text-white ring-1 ring-white/20 bg-black/30 w-full h-full">
              <div className="flex grow gap-8 mx-auto w-full p-8">
                <div className="flex flex-col items-center gap-2 shrink">
                  <img
                    src={Response.image}
                    alt=""
                    className="h-56 min-w-[10rem] ring-1 ring-white object-cover"
                  />
                  <div className="flex gap-1 font-semibold text-white">
                    <p className="flex items-center gap-1">{Response.type}</p>
                    <DotIcon />
                    <p>Ep {Response.totalEpisodes}</p>
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
                      <p>{Response.duration}m</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 grow w-full">
                  <h2 className="font-semibold text-2xl">
                    {Response.title.english}
                  </h2>

                  <div>
                    <p className="line-clamp-4">
                      {RemoveHTMLTags(Response.description)}
                    </p>
                  </div>
                  <div className="flex gap-2 max-w-max">
                    <a
                      href={"/watch/" + Response.id}
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
              </div>
              <div className="hidden flex-col shrink bg-white/10 h-full gap-2 p-4 py-8">
                <div className="flex gap-1">
                  <p className="flex text-white/60">Synonyms: </p>
                  <p className="font-semibold">{Response.synonyms}</p>
                </div>
                <div className="flex items-center gap-1 w-full truncate">
                  <p className="text-white/60">Aired on: </p>
                  <p className="font-semibold">
                    {Response.startDate.day +
                      "/" +
                      Response.startDate.month +
                      "/" +
                      Response.startDate.year}
                  </p>
                </div>
                <p>
                  <span className="text-white/60">Premiered: </span>
                  {Response.season.toUpperCase()} {Response.releaseDate}
                </p>
                <p>
                  <span className="text-white/60">Duration: </span>
                  {Response.duration}m
                </p>
                <div className="flex gap-1">
                  <span className="text-white/60">Genres: </span>
                  <div className="flex gap-2 text-white font-semibold">
                    {Response.genres.map((genre) => (
                      <p key={genre}>{genre}</p>
                    ))}
                  </div>
                </div>
                <div className="flex gap-1">
                  <span className="text-white/60">Studios: </span>
                  <div className="flex gap-2 text-white font-semibold">
                    {Response.studios.map((studio) => (
                      <p key={studio}>{studio}</p>
                    ))}
                  </div>
                </div>
                <p>
                  <span className="text-white/60">Country of origin: </span>
                  {Response.countryOfOrigin}
                </p>
                <p>
                  <span className="text-white/60">Popularity: </span>
                  {Response.popularity}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="text-white">
            <h2 className="px-4 p-2 text-xl font-bold">Episodes</h2>
          </div>
          <div className="flex flex-col divide-y divide-solid divide-white/10 text-white">
            {Response.episodes.map((ep) => (
              <a
                href={"/watch/" + ep.id}
                key={ep.id}
                className="flex gap-2 text-sm p-2 px-4 hover:bg-white/5"
              >
                <img src={ep.image} alt="" className="h-12 w-12 flex" />
                <div>
                  <div className="flex gap-2 text-base">
                    <span className="min-w-max">Ep {ep.number}</span>
                    <p className="text-base">{ep.title}</p>
                  </div>
                  <p className="text-white/50 line-clamp-2">{ep.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AnimeDetail;
