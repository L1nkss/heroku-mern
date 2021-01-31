import { IClientFilmDetails } from "../../redux/reducers/films/types/types";
import { IServerFilmData, IServerFilmDetails } from "../../services/types/types";

export default class FilmAdapter {
  static transformElement(element: IServerFilmData) {
    return {
      adult: element.adult,
      backdropPath: element.backdrop_path,
      genreIds: element.genre_ids,
      id: element.id,
      originalLanguage: element.original_language,
      originalTitle: element.original_title,
      overview: element.overview,
      popularity: element.popularity,
      posterPath: element.poster_path,
      releaseDate: element.release_date,
      title: element.title,
      video: element.video,
      voteAverage: element.vote_average,
      voteCount: element.vote_count,
    };
  }

  static transformData(data: Array<IServerFilmData>) {
    return data.map(this.transformElement);
  }

  static transformFilmDetailsData(element: IServerFilmDetails): IClientFilmDetails {
    return {
      adult: element.adult,
      backdropPath: element.backdrop_path,
      genres: element.genres,
      id: element.id,
      originalLanguage: element.original_language,
      originalTitle: element.original_title,
      overview: element.overview,
      popularity: element.popularity,
      posterPath: element.poster_path,
      releaseDate: element.release_date,
      title: element.title,
      video: element.video,
      voteAverage: element.vote_average,
      voteCount: element.vote_count,
      budget: element.budget,
      runtime: element.runtime,
      tagline: element.tagline,
    };
  }
}
