import { Redirect, Route, Switch } from "react-router-dom";
import { RoutePathes } from "../constants/constants";
import FilmDetails from "../views/details/film/film-details";
import Main from "../components/main/main";
import PrivateRoute from "../components/private-route/private-route";
import RedirectLogin from "../views/redirect-login/redirect-login";
import CreditList from "../views/credit-list/credit-list";
import Actor from "../views/details/actor/actor";
import UserFavoriteFilms from "../views/user-favorite-films/user-favorite-films";

// eslint-disable-next-line import/prefer-default-export
export const ContentRoutes: React.FC = () => {
  return (
    <>
      <Route path={`${RoutePathes.FILM_DETAILS}/:id?`} exact component={FilmDetails} />
      <Route path={`${RoutePathes.CREDITS}/:id?`} exact component={CreditList} />
      <Route path={RoutePathes.USER_FAVORITE_FILMS} exact component={UserFavoriteFilms} />
      <Route path={`${RoutePathes.ACTOR}/:id?`} exact component={Actor} />
      <Route path={RoutePathes.REDIRECT_LOGIN} component={RedirectLogin} />
      <Route path="/" exact component={Main} />
    </>
  );
};
