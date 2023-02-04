import React, { useEffect, useState } from "react";
import AnimeCardsScroll from "Components/AnimeCardsScroll";
import Carousel from "Components/Carousel";
import { GetTrendingAnimes, GetPopularAnimes } from "Utils/DBServices";
import OverlaySearch from "Components/OverlaySearch";
function Home() {
  const [response, setResponse] = useState(null);

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
    <>
      <OverlaySearch />
      <main className="h-full max-w-[1200px] mx-auto flex flex-col gap-2">
        <Carousel Animes={response?.trending} />
        {/* Categories */}

        {/* Popular/Trending/Recommened */}
      </main>
      <AnimeCardsScroll
        Title="Popular animes"
        DarkTitle={true}
        Animes={response?.popular}
      />
    </>
  );
}

export default Home;
