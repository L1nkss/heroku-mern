import {
  Switch, Route,
} from "react-router-dom";
import { RoutePathes } from "../constants/constants";
import App from "../views/app/app";
import ErrorPage from "../views/error/error";
import NotFound from "../views/not-found/not-found";

// eslint-disable-next-line import/prefer-default-export
export const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={RoutePathes.ERROR} exact component={ErrorPage} />
      <Route path={RoutePathes.ROOT} component={App} />
      <Route path={RoutePathes.NOT_FOUND} component={NotFound} />
    </Switch>
  );
};
