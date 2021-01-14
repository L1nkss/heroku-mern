// Сервеные данные по фильмам
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
