import { TUserFavoriteFilms } from "../../../../../../server/src/models/user";

export type TUserData = {
  username: string,
  email: string,
  id: string,
  favoriteFilms: TUserFavoriteFilms[],
};

export interface IInitialUserState {
  isLogin: boolean;
  loading: boolean;
  data: TUserData;
}
