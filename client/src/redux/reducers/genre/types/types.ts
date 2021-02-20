export type TGenre = {
  id: number,
  name: string,
};

export type TCategory = "Now playing" | "Popular" | "Top Rated" | "Upcoming";

export type TCategoryListItem = {
  id: number,
  name: TCategory
};

export interface IGenres {
  list: TGenre[],
  loading: boolean,
  error: boolean,
  active: string,
  category: TCategory,
  categoryList: Array<TCategoryListItem>
}

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
