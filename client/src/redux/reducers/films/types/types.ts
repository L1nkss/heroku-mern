// Серверные данные по фильмам
import { TGenre } from "../../genre/types/types";

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

export interface IClientFilmDetails extends Omit<IClientFilmData, "genreIds"> {
  genres: Array<TGenre>,
  budget: number,
  runtime: number,
  tagline: string,
}
