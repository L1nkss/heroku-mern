// Типы для  серверных данных
import { TGenre } from "../../redux/reducers/genre/types/types";

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

// Интерфейс для данных с сервера о подробной информации о фильме
// Наследуемся от IServerFilmData, убираем поле genre_ids
export interface IServerFilmDetails extends Omit<IServerFilmData, "genre_ids"> {
  genres: Array<TGenre>,
  budget: number,
  runtime: number,
  tagline: string,
}

// Отзывы
export interface IServerReview {
  author: string;
  content: string;
  id: string;
  created_at: string;
}
