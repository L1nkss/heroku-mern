export type TUserData = {
  username: string,
  email: string,
  id: string,
};

export interface IInitialUserState {
  isLogin: boolean;
  loading: boolean;
  data: TUserData;
}
