import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";

import { BASE_URL } from "../constants/constants";

dotenv.config();
class Api {
  private token: string | undefined;

  private url: string;

  client: AxiosInstance | null;

  constructor(url: string, token: string | undefined) {
    this.token = token;
    this.client = null;
    this.url = url;
  }

  init = () => {
    const headers: any = {
      Accept: "application/json",
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    this.client = axios.create({
      baseURL: this.url,
      timeout: 31000,
      withCredentials: false,
      headers,
    });

    return this.client;
  };

  getGenres = () => {
    return this.init().get("/genre/movie/list");
  };

  getFilms = (type: string, params = {}) => {
    return this.init().get(`/movie/${type}`, {
      params,
    });
  };

  getDetails = (id: number) => {
    return this.init().get(`/movie/${id}`);
  };

  getVideo = (id: number) => {
    return this.init().get(`/movie/${id}/videos`);
  };

  searchMovieByTitle = (params = {}) => {
    return this.init().get("/search/movie", {
      params,
    });
  };

  getPersonDetails = (id: number) => {
    return this.init().get(`/person/${id}`);
  };

  getRecommendations = (id: number) => {
    return this.init().get(`movie/${id}/recommendations`);
  };

  getCredits = (id: number) => {
    return this.init().get(`movie/${id}/credits`);
  };

  discoverFilms = (params = {}) => {
    return this.init().get("/discover/movie", {
      params,
    });
  };
}

export default new Api(
  BASE_URL,
  process.env.REACT_APP_API_TOKEN,
);
