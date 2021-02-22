import { IMovieGenres } from "../genre/types/types";
import { IInitialUserState } from "../user/types/types";
import { IFilmState } from "../films/reducer";

export interface IRootState {
  genres: IMovieGenres;
  user: IInitialUserState;
  films: IFilmState;
}
