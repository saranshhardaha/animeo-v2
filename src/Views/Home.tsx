import React, { useEffect, useState } from "react";
import CardsScroll from "../Components/Sections/CardsScroll";
// import Carousel from "Components/Carousel";
import Banner from "Components/Sections/Banner";
import GenreSelect from "Components/Sections/GenreSelect";
import { IAnimeResult, ISearch, META } from '@consumet/extensions';

// <providerName> is the name of the provider you want to use. list of the proivders is below.
const anilist = new META.Anilist();
// import OverlaySearch from "Components/OverlaySearch";\

function Home() {
  const [popularAnimes, setPopularAnimes] = useState<ISearch<IAnimeResult> | undefined>();
  const [trendingAnimes, setTrendingAnimes] = useState<ISearch<IAnimeResult> | undefined>();
  const isLoggedIn = false;
  useEffect(() => {
    async function FetchResults() {
      await anilist.fetchPopularAnime().then(data => {
        setPopularAnimes(data)
      })
      await anilist.fetchTrendingAnime().then(data => {
        setTrendingAnimes(data)
      })
    }
    FetchResults();
  }, []);
  return (
    <>
      {/* <OverlaySearch /> */}
      <main className="h-full flex flex-col gap-2 max-w-[1800px] mx-auto p-4">
        {/* <Carousel Animes={trendingAnimes} /> */}
        {/* Categories */}
        <CardsScroll
          Title="Trending animes"
          Dark={false}
          Animes={trendingAnimes?.results}
        />
        {isLoggedIn &&
          (<CardsScroll
            Title="Continue watching"
            Dark={false}
            IsVertical={false}
            ShowAllButton={false}
          Animes={trendingAnimes?.results}
          />)}
        <CardsScroll
          Title="Popular animes"
          Dark={false}
          Animes={popularAnimes?.results}
        />
        <Banner text="Hello" />
        <GenreSelect />
      </main>

    </>
  );
}

export default Home;
