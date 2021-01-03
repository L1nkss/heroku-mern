import React, { memo } from "react";
import Menu from "../menu/menu";
import Content from "../content/content";

import { genres } from "../../mocks/data";

const Main: React.FC = () => {
  return (
    <main className="main content-wrapper">
      <Menu
        className="genre-list"
        render={(className: string) => {
          return genres.map((genre: any) => {
            const elementClass = `${className} ${genre.name === "All" ? "menu__item--active" : ""}`;
            return <li key={genre.id} className={elementClass}>{genre.name}</li>;
          });
        }}
      />
      <Content />
    </main>
  );
};

export default memo(Main);
