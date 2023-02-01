import React, { Component } from 'react';
import DotIcon from "../Components/DotIcon";
import { RemoveHTMLTags } from "../Utils/Utils";

class AnimeCard extends Component {
  render() {
    return (
      <>
        <div
          key={this.props.Anime.id}
          className="flex flex-col relative max-w-[400px] min-w-[260px] group "
        >
          <div className="flex flex-col h-full relative">
            <img
              src={this.props.Anime.image}
              alt={this.props.Anime.title.english}
              className="w-full h-full bg-black"
            />
            <div className="absolute flex items-center gap-1 m-4 bg-white/30 backdrop-blur-3xl text-white  rounded-full font-semibold p-2 px-3 h-8 max-w-max">
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
              {(this.props.Anime.rating / 10).toFixed(1)}
            </div>
            <div className="p-2">
              <h1 className="font-bold text-lg truncate">
                {this.props.Anime.title.english}
              </h1>
              <div className="flex gap-1 font-semibold text-gray-600">
                <p>Ep {this.props.Anime.totalEpisodes}</p>
                <DotIcon Dark="true" />
                <p>{this.props.Anime.status}</p>
                <DotIcon Dark="true" />
                <p>{this.props.Anime.releaseDate}</p>
              </div>
            </div>
          </div>
          <div className="absolute z-10 left-1/3 top-1/3 w-96 hidden flex-col gap-4 text-white backdrop-blur-lg bg-black/60 transition-all duration-700 ease-in-out group-hover:flex p-5 ring-1 ring-white">
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-lg">
                {this.props.Anime.title.english}
              </h1>
              <div className="flex gap-1 font-semibold ">
                <p>Ep {this.props.Anime.totalEpisodes}</p>
                <DotIcon />
                <p>{this.props.Anime.duration}m</p>
                <DotIcon />
                <p>{this.props.Anime.status}</p>
                <DotIcon />
                <p>{this.props.Anime.releaseDate}</p>
              </div>
              <div className="flex gap-2 text-white/60">
                {this.props.Anime.genres.map((genre) => (
                  <p key={genre}>{genre}</p>
                ))}
              </div>
              <p className="line-clamp-6 text-white/90">
                {RemoveHTMLTags(this.props.Anime.description)}
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href={"/watch/" + this.props.Anime.id}
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
                <p className='text-sm'>Watch Now</p>
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
      </>
    );
  }
}

export default AnimeCard;