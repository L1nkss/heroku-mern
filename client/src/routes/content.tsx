import { Route } from "react-router-dom";
import { RoutePathes } from "../constants/constants";
import FilmDetails from "../views/details/film/film-details";
import Main from "../views/main/main";
import PrivateRoute from "../components/private-route/private-route";
import RedirectLogin from "../views/redirect-login/redirect-login";
import ActorDetails from "../views/details/actor/actor";
import UserFavoriteFilms from "../views/user-favorite-films/user-favorite-films";

// eslint-disable-next-line import/prefer-default-export
export const ContentRoutes: React.FC = () => {
  return (
    <>
      <Route path={`${RoutePathes.FILM_DETAILS}/:id?`} exact component={FilmDetails} />
      <Route path={`${RoutePathes.CREDITS}/:id?`} exact />
      <PrivateRoute Component={UserFavoriteFilms} path={RoutePathes.USER_FAVORITE_FILMS} exact />
      <Route path={`${RoutePathes.ACTOR}/:id?`} exact component={ActorDetails} />
      <Route path={RoutePathes.REDIRECT_LOGIN} component={RedirectLogin} />
      <Route path="/" exact component={Main} />
    </>
  );
};
