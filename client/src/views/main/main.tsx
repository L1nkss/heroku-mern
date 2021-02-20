import React, { memo, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Menu from "../../components/menu/menu";
import Content from "../content/content";
import { isStringsEqual } from "../../utils/helpers";
import { TGenre } from "../../redux/reducers/genre/types/types";
import { changeActive } from "../../redux/reducers/genre/reducer";
import { IRootState } from "../../redux/reducers/types/types";

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const allGenres = useSelector((state: IRootState) => state.genres.list.all);
  const discoverGenres = useSelector((state: IRootState) => state.genres.list.discover);
  const activeGenre = useSelector((state: IRootState) => state.genres.list.active);
  const handleMenuItemClick = useCallback((item: TGenre, isItemActive: boolean) => {
    // Если мы кликнули уже на активный жанр, ничего не делаем
    if (isItemActive) return;
    dispatch(changeActive(item.id));
  }, [activeGenre]);
  const asideMenu = useMemo(() => {
    const discoverMenu = <Menu callbackClick={handleMenuItemClick} activeItem={activeGenre} data={discoverGenres} withLabel />;
    const genresMenu = <Menu callbackClick={handleMenuItemClick} activeItem={activeGenre} data={allGenres} withLabel />;

    return (
      <>
        {discoverMenu}
        {genresMenu}
      </>
    );
  }, [activeGenre, allGenres]);
  // const activeGenre = useSelector((state: IRootState) => state.genres.active);

  // const handleGenreClick = useCallback((genre: TGenre) => {
  //   if (isStringsEqual(genre.name, activeGenre)) return;
  //
  //   dispatch(changeActive(genre.id));
  // }, [activeGenre]);
  return (
    <main className="main content-wrapper">
      <aside className="main__aside-menu">
        { asideMenu }
      </aside>
      {/* <Menu */}
      {/*  className="genre-list" */}
      {/*  render={(className: string) => { */}
      {/*    return genres.map((genre: TGenre) => { */}
      {/*      const isActive = isStringsEqual(activeGenre, genre.name); */}
      {/*      const elementClass = `${className} ${isActive ? "menu__item--active" : ""}`; */}
      {/*      return <li role="presentation" key={genre.id} className={elementClass} onClick={() => handleGenreClick(genre)}>{genre.name}</li>; */}
      {/*    }); */}
      {/*  }} */}
      {/* /> */}
      <Content />
    </main>
  );
};

export default memo(Main);
