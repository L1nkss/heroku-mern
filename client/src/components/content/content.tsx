import React, { memo } from "react";
import Menu from "../menu/menu";
import { movieGet } from "../../mocks/data";
import Search from "../search/search";

const Content: React.FC = () => {
  return (
    <div className="content">
      <div className="content__header">
        <Menu
          className="content__header-menu"
          direction="row"
          render={(className: string) => {
            return movieGet.map((movie: any) => {
              return <li className={className} key={movie.id}>{movie.name}</li>;
            });
          }}
        />
        <Search />
      </div>
    </div>
  );
};

export default memo(Content);
