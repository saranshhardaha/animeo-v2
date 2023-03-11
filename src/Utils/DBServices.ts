import axios from "axios";
const BaseURL = "https://api.enime.moe/";
// const BaseURL = "http://192.168.29.38:3050/";
async function GetDataFromURL(URL: string, Params?: any) {
  try {
    const { data } = await axios.get(URL, {
      params: Params,
    });
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
export async function fetchPopular(PageNo = 1) {
  const ReqURL = BaseURL + "popular";
  const Params = {
    page: PageNo,
    perPage: 10,
  };
  return await GetDataFromURL(ReqURL, Params);
}
export async function fetchEpisodes(animeID: string) {
  const ReqURL = BaseURL + "mapping/anilist/" + animeID;
  var anime = await GetDataFromURL(ReqURL);
  anime.episodes = anime?.episodes.sort((a: any, b: any) => {
    return a.number > b.number ? 1 : -1;
  });
  return anime;
}
export async function fetchSource(episodeID: string) {
  const ReqURL = BaseURL + "source/" + episodeID;
  return await GetDataFromURL(ReqURL);
}
