export const RoutePathes = {
  ROOT: "/",
  MOVIES: "/movies",
};

export const CONSTANT_GENRES = [
  {
    id: 6542,
    name: "Now playing",
  },
  {
    id: 5655,
    name: "Popular",
  },
  {
    id: 6571,
    name: "Top Rated",
  },
  {
    id: 7823,
    name: "Upcoming",
  },
];

// список жанров для получения данных с сервера
export const GENRES_TYPES_TO_SERVER = {
  [CONSTANT_GENRES[0].name]: "now_playing",
  [CONSTANT_GENRES[1].name]: "popular",
  [CONSTANT_GENRES[2].name]: "top_rated",
  [CONSTANT_GENRES[3].name]: "upcoming",
};

const CORS_URL = "https://cors-anywhere.herokuapp.com/";

export const IMAGE_URL = "https://image.tmdb.org/t/p/w342/";

export const BASE_URL = "https://api.themoviedb.org/3";
