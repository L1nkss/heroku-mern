import { IGenres } from "../genre/types/types";
import { IInitialUserState } from "../user/types/types";
import { IFilmState } from "../films/reducer";

export interface IRootState {
  genres: IGenres;
  user: IInitialUserState;
  films: IFilmState;
}
