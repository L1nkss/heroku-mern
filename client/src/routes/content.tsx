import { Redirect, Route, Switch } from "react-router-dom";
import { RoutePathes } from "../constants/constants";
import FilmDetails from "../components/film-details/film-details";
import Main from "../components/main/main";
import PrivateRoute from "../components/private-route/private-route";
import RedirectLogin from "../components/redirect-login/redirect-login";

// eslint-disable-next-line import/prefer-default-export
export const ContentRoutes: React.FC = () => {
  return (
    <>
      <Route path={`${RoutePathes.FILM_DETAILS}/:id?`} exact component={FilmDetails} />
      <Route path={RoutePathes.REDIRECT_LOGIN} component={RedirectLogin} />
      <Route path="/" exact component={Main} />
    </>
  );
};
