import React, { Component } from "react";
import AnimeCard from "./AnimeCard";

export default class AnimeCardsScroll extends Component {
  render() {
    return (
      <>
        <div className="flex items-center justify-between my-4">
          <p className="text-2xl font-bold border-l-4 border-black px-2 leading-7">
            {this.props.Title}
          </p>
          <a href="" className="flex items-center gap-1 hover:underline">
            <p className="text-lg font-semibold px-1">All</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        </div>
        <div className="flex gap-2 h-full w-full overflow-x-auto overflow-y-clip scrollbar-hide">
          {this.props.Animes.map((anime) => (
            <AnimeCard Anime={anime} />
          ))}
        </div>
      </>
    );
  }
}
