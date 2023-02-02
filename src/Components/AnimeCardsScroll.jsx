import React, { Component } from "react";
import AnimeCard from "./AnimeCard";

export default class AnimeCardsScroll extends Component {
  render() {
    return (
      <div className="max-w-[1440px] px-5">
        <div className="flex items-center justify-between my-4 ">
          <p className="text-2xl font-bold border-l-4 border-black px-2 leading-7">
            {this.props.Title}
          </p>
          <a href="" className="flex items-center gap-1 hover:underline">
            <p className="text-lg font-semibold px-1">All</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        </div>
        <div className="flex  flex-wrap gap-2 relative h-full w-full ">
          {this.props.Animes.map((anime) => (
            <AnimeCard Anime={anime} key={anime.id} />
          ))}
        </div>
      </div>
    );
  }
}
