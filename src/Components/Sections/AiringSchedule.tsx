import { IAnimeResult, ISearch, ITitle, META } from "@consumet/extensions";
import React, { useState, useEffect } from "react";
import * as Icon from "react-feather";

const anilist = new META.Anilist();
const AiringSchedule = () => {
  const [schedule, setSchedule] = useState<ISearch<IAnimeResult> | null>();
  const ToLocalDate = (epoch: number) => {
    return new Date(epoch * 1000);
  };

  useEffect(() => {
    async function FetchResults() {
      await anilist.fetchAiringSchedule().then((data) => {
        setSchedule(data);
      });
    }
    FetchResults();
  }, []);
  return (
    
    <div className="flex flex-col gap-2">
      <h2 className="p-1 text-xl">Airing schedule</h2>
      <div className="flex flex-col gap-1 p-2 min-h-[14rem] rounded-md bg-white/5 max-h-[26rem] overflow-scroll scrollbar-hide">
        {schedule &&
          schedule.results.map((anime) => (
            <a href={`/anime/${anime.id}`} key={anime.id} className="group hover:bg-white/10 cursor-pointer flex items-center justify-between gap-2 rounded-md w-full bg-white/5">
              <div className="flex items-center gap-2 w-full p-3 text-sm md:text-base">
                <p className="text-neutral-400">
                  {ToLocalDate(anime.airingAt as number).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
                <h4 className="line-clamp-1">{(anime.title as ITitle).romaji} </h4>
              </div>
              <div className="flex items-center justify-start px-4 gap-2 bg-white/5 rounded-md p-2 mr-2 opacity-60 group-hover:opacity-100 w-full text-xs max-w-[8rem]">
                <Icon.Play fill="#fff" size={12} />
                <p>Episode <span>{anime.episode as string}</span></p>

              </div>
            </a>
          ))}
      </div>
  </div>
  );
};

export default AiringSchedule;
