export const RoutePathes = {
  ROOT: "/",
  ERROR: "/error",
  FILM_DETAILS: "/film-details",
  NOT_FOUND: "/not-found",
  REDIRECT_LOGIN: "/redirect-login",
  USER_FAVORITE_FILMS: "/user-favorite-films",
};

export const ENDPOINTS = {
  registration: "api/auth/signup",
  login: "api/auth/signin",
  checkToken: "/api/checkToken",
};

export const GENRE_TYPE_ALL = [
  {
    id: 63467,
    name: "All",
  },
];

export const REGULARS = {
  SEARCH_YEAR: "^\\d{4}",
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

export const YOUTUBE_LINK = "https://www.youtube.com/embed/";

// список жанров для получения данных с сервера
export const GENRES_TYPES_TO_SERVER = {
  [CONSTANT_GENRES[0].name]: "now_playing",
  [CONSTANT_GENRES[1].name]: "popular",
  [CONSTANT_GENRES[2].name]: "top_rated",
  [CONSTANT_GENRES[3].name]: "upcoming",
};

const CORS_URL = "https://cors-anywhere.herokuapp.com/";

// export const IMAGE_URL = "https://image.tmdb.org/t/p/w342/";

export const IMAGE_SIZE_URL = {
  SMALL: "https://image.tmdb.org/t/p/w342/",
  BIG: "https://image.tmdb.org/t/p/w1280/",
};

export const BASE_URL = "https://api.themoviedb.org/3";
