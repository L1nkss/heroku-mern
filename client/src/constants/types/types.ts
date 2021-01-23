type GenreName = "Popular" | "Now playing" | "Top Rated" | "Upcoming";

export type TConstantGenres = {
  id: number,
  name: GenreName;
};

export type TRouteParams = { id: string };
