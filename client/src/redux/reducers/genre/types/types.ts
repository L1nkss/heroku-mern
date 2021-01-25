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