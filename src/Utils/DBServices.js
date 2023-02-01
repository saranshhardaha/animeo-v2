import axios from "axios";
const BaseURL = "https://animeo-api-v2.vercel.app/";
const BaseURLDev = "http://192.168.29.38:3050/";
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
  const ReqURL = BaseURLDev + "meta/anilist/trending";
  const Params = {
    page: PageNo,
    perPage: 20,
  };
  return GetDataFromURL(ReqURL, Params);
}
export async function GetPopularAnimes(PageNo = 1) {
  const ReqURL = BaseURLDev + "meta/anilist/popular";
  const Params = {
    page: PageNo,
    perPage: 20,
  };
  return GetDataFromURL(ReqURL, Params);
}
export async function GetAnimeDetails(AnimeID) {
  const ReqURL = BaseURLDev + "meta/anilist/info/" + AnimeID;
  return GetDataFromURL(ReqURL);
}
