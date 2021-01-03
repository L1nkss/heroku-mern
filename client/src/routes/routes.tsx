import {
  Switch, Route, Redirect,
} from "react-router-dom";
import { RoutePathes } from "../constants/constants";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path={RoutePathes.ROOT} exact>
        <Redirect to={RoutePathes.MOVIES} />
      </Route>
    </Switch>
  );
};

export default Routes;
