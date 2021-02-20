import React, { memo, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Menu from "../../components/menu/menu";
import Content from "../content/content";
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
  return (
    <main className="main content-wrapper">
      <aside className="main__aside-menu">
        { asideMenu }
      </aside>
      <Content />
    </main>
  );
};

export default memo(Main);
