import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimeResult, ISearch, META } from "@consumet/extensions";
import VerticalCard from "Components/Cards/VerticalCard";
import GenreSelect from "Components/Sections/GenreSelect";
const anilist = new META.Anilist();
const Genres = () => {
  const { genre } = useParams();
  const [animes, setAnimes] = useState<ISearch<IAnimeResult> | undefined>();
  useEffect(() => {
    async function FetchResults() {
      if (!genre) return;
      var genres: string[] = [genre];
      await anilist.fetchAnimeGenres(genres).then((data) => {
        setAnimes(data);
      });
    }
    FetchResults();
  }, [genre]);
  return (
    <div className="max-w-[1800px] mx-auto p-4">
      <GenreSelect center={true} />
      <h4 className="w-full text-center text-xl py-4">{genre}</h4>
      <div className="h-full flex flex-wrap justify-center gap-4 p-4">
        {animes?.results &&
          animes.results.map((anime) => (
            <VerticalCard key={anime.id} anime={anime} />
          ))}
        {!animes?.results &&
          Array.from(Array(20), (e, i) => {
            return (
              <div
                key={i}
                className="h-[240px] w-[180px] md:h-[320px] md:w-[240px] animate-pulse bg-white/10 backdrop-blur-xl rounded"
              ></div>
            );
          })}
      </div>
    </div>
  );
};

export default Genres;
