import axios from "axios";
const BaseURL = "https://api.enime.moe/";
// const BaseURL = "http://192.168.29.38:3050/";
async function getDataFromURL<T>(URL: string, params?: any): Promise<T> {
  try {
    const { data } = await axios.get<T>(URL, { params });
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function fetchPopular(pageNo: number = 1) {
  const reqURL = `${BaseURL}popular`;
  const params = {
    page: pageNo,
    perPage: 10,
  };
  return await getDataFromURL(reqURL, params);
}

export async function fetchEpisodes(animeID: string) {
  const reqURL = `${BaseURL}mapping/anilist/${animeID}`;
  const anime = await getDataFromURL<any>(reqURL);
  anime.episodes.sort(
    (a: { number: number }, b: { number: number }) => a.number - b.number
  );
  return anime;
}

export async function fetchSource(episodeID: string) {
  const reqURL = `${BaseURL}source/${episodeID}`;
  return await getDataFromURL(reqURL);
}
