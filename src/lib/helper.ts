import { Anime } from "../lib/types";

// export const debounce = (func, wait) => {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func(args);
//     }, wait);
//   };
// };

export function title(title: Anime["title"]) {
  return title.userPreferred &&
    title.userPreferred !== title.english &&
    title.userPreferred.length > 14
    ? title.english || title.romaji
    : title.romaji || title.english;
}

export const jsonFetcher = (url: string) =>
  fetch(url).then((res) => res.json());

export const sourceUrlToName = (url: string) => {
  return url.includes("gogoanime") ? "Gogoanime" : "Zoro";
};
