import React, { memo } from "react";
import Content from "../content/content";
import GenreMenu from "../../components/genre-menu/genre-menu";

const Main: React.FC = () => {
  return (
    <main className="main content-wrapper">
      <aside className="main__aside-menu">
        <GenreMenu />
      </aside>
      <Content />
    </main>
  );
};

export default memo(Main);
