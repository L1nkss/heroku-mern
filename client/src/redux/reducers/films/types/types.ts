// Серверные данные по фильмам
import {TGenre} from "../../genre/types/types";

export interface IServerFilmData {
  adult: boolean,
  backdrop_path: string,
  genre_ids: Array<number>,
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean
  vote_average: number
  vote_count: number
}

// Интерфейс информации о фильме
export interface IClientFilmData {
  adult: boolean,
  backdropPath: string,
  genreIds: Array<number>,
  id: number,
  originalLanguage: string,
  originalTitle: string,
  overview: string,
  popularity: number,
  posterPath: string,
  releaseDate: string,
  title: string,
  video: boolean
  voteAverage: number
  voteCount: number
}

// Интерфейс для данных с сервера о подробной информации о фильме
// Наследуемся от IServerFilmData, убираем поле genre_ids
export interface IServerFilmDetails extends Omit<IServerFilmData, "genre_ids"> {
  genres: Array<TGenre>,
  budget: number,
  runtime: number,
  tagline: string,
}

export interface IClientFilmDetails extends Omit<IClientFilmData, "genreIds"> {
  genres: Array<TGenre>,
  budget: number,
  runtime: number,
  tagline: string,
}
