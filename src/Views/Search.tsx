import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimeResult, ISearch, META } from "@consumet/extensions";
import * as Icon from "react-feather";
import VerticalCard from "Components/Cards/VerticalCard";
const anilist = new META.Anilist();

const Search = () => {
  const { searchQuery } = useParams();
  const [text, setText] = useState("");
  const [animes, setAnimes] = useState<
    ISearch<IAnimeResult> | undefined | null
  >();
  const searchAnimes = (e: any) => {
    const value = new RegExp(e.target.value, "gi");
    if (value === null) {
      setAnimes(null);
    } else {
      SearchAnimes(e.target.value);
    }
  };
  function handleChange(e:any) {
    setText(e.target.value);
  }
  async function SearchAnimes(searchQuery: string) {
    if (!searchQuery) return;
    await anilist.search(searchQuery).then((data) => {
      console.log(
        data?.results?.sort((a: any, b: any) => b.popularity - a.popularity)
      );
      setAnimes(data);
    });
  }

  return (
    <div>
      <div className="max-w-[1440px] mx-auto p-4">
        <div className="flex gap-1 p-1 items-center rounded-full bg-white/10 hover:bg-white/10 max-w-xs mx-auto">
          <button className="p-1 opacity-50 group-focus-within:opacity-80">
            <Icon.Search size={20} />
          </button>
          <input
            type="text"
            placeholder="Search"
            onChange={handleChange}
            value={text}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                SearchAnimes(text);
              }
            }}
            className="p-1 pl-3 text-sm bg-transparent focus-visible:outline-none w-full transition-all"
          />
        </div>
        <div className="h-full flex flex-wrap justify-center gap-4 p-4">
          {animes?.results &&
            animes.results.map((anime) => (
              <VerticalCard key={anime.id} anime={anime} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
