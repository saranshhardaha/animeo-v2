import React, { useEffect, useState } from "react";
import CardsScroll from "../Components/Sections/CardsScroll";
// import Carousel from "Components/Carousel";
import AiringSchedule from "Components/Sections/AiringSchedule";
import GenreSelect from "Components/Sections/GenreSelect";
import { IAnimeResult, ISearch, META } from "@consumet/extensions";
import { fetchPopular } from "Utils/DBServices";
// <providerName> is the name of the provider you want to use. list of the proivders is below.
const anilist = new META.Anilist();
// import OverlaySearch from "Components/OverlaySearch";\

function Home() {
  const [popularAnimes, setPopularAnimes] = useState<
    ISearch<IAnimeResult> | undefined
  >();
  const [trendingAnimes, setTrendingAnimes] = useState<
    ISearch<IAnimeResult> | undefined
  >();
  const [animes, setAnimes] = useState<[] | undefined>();
  const isLoggedIn = false;
  useEffect(() => {
    async function FetchResults() {
      await anilist.fetchPopularAnime().then((data) => {
        setPopularAnimes(data);
      });
      await anilist.fetchTrendingAnime().then((data) => {
        setTrendingAnimes(data);
      });
      var test = await fetchPopular();
      setAnimes(test.data);
    }
    FetchResults();
  }, []);
  return (
    <>
      {/* <OverlaySearch /> */}
      <main className="h-full flex flex-col gap-2 max-w-[1440px] mx-auto p-4">
        {/* <Carousel Animes={trendingAnimes} /> */}
        {/* Categories */}
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
        <GenreSelect />
        {/* {animes &&
          animes?.map((anime: any) => (
            <div>
              {anime?.title?.english}
              {anime?.slug}
            </div>
          ))} */}
      </main>
    </>
  );
}

export default Home;
