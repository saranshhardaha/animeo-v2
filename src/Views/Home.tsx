import React, { useEffect, useState } from "react";
import CardsScroll from "../Components/Sections/CardsScroll";
import AiringSchedule from "Components/Sections/AiringSchedule";
import GenreSelect from "Components/Sections/GenreSelect";
import { IAnimeResult, ISearch, META } from "@consumet/extensions";
import { NavigateFunction, useNavigate } from "react-router-dom";
import * as Icon from "react-feather";
const anilist = new META.Anilist();

function Home() {
  const [popularAnimes, setPopularAnimes] = useState<
    ISearch<IAnimeResult> | undefined
  >();
  const [trendingAnimes, setTrendingAnimes] = useState<
    ISearch<IAnimeResult> | undefined
  >();
  const isLoggedIn = false;

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      searchAnimes(navigate, searchQuery);
    }
  };

  useEffect(() => {
    async function FetchResults() {
      await anilist.fetchPopularAnime().then((data) => {
        setPopularAnimes(data);
      });
      await anilist.fetchTrendingAnime().then((data) => {
        setTrendingAnimes(data);
      });
    }
    FetchResults();
  }, []);

  return (
    <>
      <main className="h-full flex flex-col gap-2 max-w-[1440px] mx-auto p-4">
        <div className="relative h-60 flex justify-center group">
          <div className="relative group flex h-52 w-full bg-white/10 justify-center rounded-md grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden">
            {popularAnimes?.results &&
              popularAnimes?.results?.map((x) => (
                <img
                  key={x?.id}
                  className="w-full h-full object-cover"
                  src={x?.cover}
                  alt={x?.title as string}
                />
              ))}
            <div className="absolute bg-black/40 font-semibold text-white/80 cursor-default text-3xl w-full h-full grid place-items-center">
              Animeo
            </div>
          </div>
          <div className=" flex items-center bg-white rounded-sm text-black p-2 absolute bottom-4 max-w-md w-full drop-shadow-2xl">
            <Icon.Search size={20} />
            <input
              placeholder="Search animes!"
              className="flex p-1 px-3 w-full bg-transparent active:outline-none focus:outline-none"
              onChange={(value) => setSearchQuery(value.target.value)}
              value={searchQuery}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <GenreSelect />
        <CardsScroll
          Title="Trending animes"
          Dark={false}
          Animes={trendingAnimes?.results}
        />
        {isLoggedIn && (
          <CardsScroll
            Title="Continue watching"
            Dark={false}
            IsVertical={false}
            ShowAllButton={false}
            Animes={trendingAnimes?.results}
          />
        )}
        <CardsScroll
          Title="Popular animes"
          Dark={false}
          Animes={popularAnimes?.results}
        />
        <AiringSchedule />
      </main>
    </>
  );
}

const searchAnimes = (navigate: NavigateFunction, value: string) => {
  if (value) {
    navigate(`/search/${value}`);
  }
};

export default Home;
