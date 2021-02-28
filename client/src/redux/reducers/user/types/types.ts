import { IClientFilmData } from "../../films/types/types";

export type TUserData = {
  username: string,
  email: string,
  id: string,
  favoriteFilms: IClientFilmData[],
};

export interface IInitialUserState {
  isLogin: boolean;
  loading: boolean;
  data: TUserData;
}
