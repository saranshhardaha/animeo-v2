import axios from "axios";
const BaseURL = "https://animeo-api-v2.vercel.app/";
// const BaseURL = "http://192.168.29.38:3050/";
async function GetDataFromURL(URL, Params) {
  try {
    const { data } = await axios.get(URL, {
      params: Params
    });
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
export async function GetTrendingAnimes(PageNo = 1) {
  const ReqURL = BaseURL + "meta/anilist/trending";
  const Params = {
    page: PageNo,
    perPage: 20,
  };
  return GetDataFromURL(ReqURL, Params);
}
export async function GetPopularAnimes(PageNo = 1) {
  const ReqURL = BaseURL + "meta/anilist/popular";
  const Params = {
    page: PageNo,
    perPage: 20,
  };
  return GetDataFromURL(ReqURL, Params);
}
export async function GetAnimeDetails(AnimeID) {
  const ReqURL = BaseURL + "meta/anilist/info/" + AnimeID;
  return GetDataFromURL(ReqURL);
}
export async function GetEpisodeDetails(episodeID) {
  const ReqURL = BaseURL + "meta/anilist/watch/" + episodeID;
  return GetDataFromURL(ReqURL);
}

