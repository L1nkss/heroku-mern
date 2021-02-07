import React, { memo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { TRouteParams } from "../../constants/types/types";

export type MyProps = RouteComponentProps<TRouteParams>;

const ActorPage = ({ match }: MyProps) => {
  return (
    <section>
      <div className="content-wrapper actor">
        <h1>hello</h1>
      </div>
    </section>
  );
};

export default memo(ActorPage);
