import React, { memo } from "react";
import { RouteMatchProps } from "../../constants/types/types";

const Actor = ({ match }: RouteMatchProps) => {
  return (
    <section>
      <div className="content-wrapper actor">
        <h1>hello</h1>
      </div>
    </section>
  );
};

export default memo(Actor);
