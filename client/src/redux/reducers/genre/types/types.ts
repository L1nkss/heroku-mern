export type TGenre = {
  id: number,
  name: string,
};

// Новый стейт и значения
export type TDiscoverNames = "Now playing" | "Popular" | "Top Rated" | "Upcoming";

export type TDiscoverItem = {
  id: number,
  name: TDiscoverNames,
};

type TMovieGenresList = {
  discover: {
    items: TDiscoverItem[],
    label: "Discover"
  }
  all: {
    items: TGenre[],
    label: "Genres",
  },
  active: string,
};

export interface IMovieGenres {
  loading: boolean,
  error: boolean,
  list: TMovieGenresList,
}
