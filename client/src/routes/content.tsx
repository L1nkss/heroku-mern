import { Redirect, Route, Switch } from "react-router-dom";
import { RoutePathes } from "../constants/constants";
import FilmDetails from "../components/film-details/film-details";
import Main from "../components/main/main";
import NotFound from "../components/not-found/not-found";

// eslint-disable-next-line import/prefer-default-export
export const ContentRoutes: React.FC = () => {
  return (
    <>
      <Route path={`${RoutePathes.FILM_DETAILS}/:id?`} exact component={FilmDetails} />
      <Route path="/" exact component={Main} />
    </>
  );
};
