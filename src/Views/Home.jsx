import React, { useEffect, useState } from "react";
import AnimeCardsScroll from "../Components/AnimeCardsScroll";
import Carousel from "../Components/Carousel";
import HomeBanner from "../Components/HomeBanner";
import { GetTrendingAnimes, GetPopularAnimes } from "../Utils/DBServices";
function Home() {
  const [Response, setResponse] = useState({
    popular: [],
    trending: [],
  });

  useEffect(() => {
    async function FetchResults() {
      let trending = await GetTrendingAnimes(1);
      let popular = await GetPopularAnimes(1);
      setResponse({
        popular: popular.results,
        trending: trending.results,
      });
    }
    FetchResults();
  }, []);
  return (
    <main
      className="h-full min-h-screen max-w-[1440px] mx-auto flex flex-col gap-2"
    >
      <Carousel Animes={Response.trending} />
      <AnimeCardsScroll Title="Popular animes" Animes={Response.popular} />
      {/* Categories */}

      {/* Popular/Trending/Recommened */}
    </main>
  );
}

export default Home;
