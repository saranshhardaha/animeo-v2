export type Episode = {
  id: string;
  number: number;
  anime: Anime;
  title: string | undefined;
  createdAt: string;
  airedAt: Date;
  description: string | undefined;
  image: string | undefined;
  sources: Source[];
  episodes: Episode[];
};
export type Anime = {
  id: string;
  slug: string;
  description: string | undefined;
  title: {
    english: string;
    native: string;
    romaji: string;
    userPreferred: string;
  };
  status: "RELEASING" | "FINISHED" | "NOT_YET_AIRED" | "HIATUS";
  coverImage: string;
  bannerImage: string;
  currentEpisode: number;
  episodes: Episode[];
  mappings: {
    mal?: number;
    anidb?: number;
    kitsu?: number;
    anilist?: number;
  };
};
export type Source = {
  id: string;
  website: string;
  subtitle?: string;
  url: string;
  priority: number;
};

export type AniSkip = {
  statusCode: number;
  results?: AniSkipResult[];
};

export type AniSkipResult = {
  interval: {
    startTime: number;
    endTime: number;
  };
  type: string;
};