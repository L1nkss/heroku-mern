import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { IRootState } from "../../redux/reducers/types/types";
import { RoutePathes } from "../../constants/constants";

const PrivateRoute: React.FC<any> = ({ Component, ...options }: any) => {
  const authStatus = useSelector((state: IRootState) => state.user.isLogin);

  return (
    <Route
      {...options}
      render={(props) => (authStatus
        ? (
          <Component {...props} />
        ) : (
          <Redirect to={RoutePathes.REDIRECT_LOGIN} />
        ))}
    />
  );
};

export default PrivateRoute;
