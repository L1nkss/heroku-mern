import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Menu from "../menu/menu";
import Content from "../content/content";
import { isStringsEqual } from "../../utils/helpers";
import { TGenre } from "../../redux/reducers/genre/types/types";
import { changeActiveGenre } from "../../redux/reducers/genre/reducer";
import { IRootState } from "../../redux/reducers/types/types";

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state: IRootState) => state.genres.list);
  const activeGenre = useSelector((state: IRootState) => state.genres.active);

  const handleGenreClick = useCallback((genre: TGenre) => {
    if (isStringsEqual(genre.name, activeGenre)) return;

    dispatch(changeActiveGenre(genre.id));
  }, [activeGenre]);
  return (
    <main className="main content-wrapper">
      <Menu
        className="genre-list"
        render={(className: string) => {
          return genres.map((genre: TGenre) => {
            const isActive = isStringsEqual(activeGenre, genre.name);
            const elementClass = `${className} ${isActive ? "menu__item--active" : ""}`;
            return <li role="presentation" key={genre.id} className={elementClass} onClick={() => handleGenreClick(genre)}>{genre.name}</li>;
          });
        }}
      />
      <Content />
    </main>
  );
};

export default memo(Main);
