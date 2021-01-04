import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";
import { BASE_URL } from "../constants/constants";

// const { REACT_APP_API_TOKEN } = process.env;
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

  getGenres = (params = {}) => {
    return this.init().get("/genre/movie/list");
  };
}

export default new Api(
  BASE_URL,
  process.env.REACT_APP_API_TOKEN,
);
