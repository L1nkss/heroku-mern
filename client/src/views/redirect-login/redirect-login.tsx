import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { IRootState } from "../../redux/reducers/types/types";
import { RoutePathes } from "../../constants/constants";

const RedirectLogin = () => {
  const isLogin = useSelector((state: IRootState) => state.user.isLogin);

  if (isLogin) return <Redirect to={RoutePathes.ROOT} />;
  return (
    <div className="content-wrapper ta-c">
      <div>
        <p>Sorry, access denied</p>
        <p>
          Try to login your profile
        </p>
      </div>
    </div>
  );
};

export default RedirectLogin;
