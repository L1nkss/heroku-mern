import React, { useCallback, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TGenre } from "../../redux/reducers/genre/types/types";
import { IRootState } from "../../redux/reducers/types/types";

import { RoutePathes } from "../../constants/constants";
import Menu from "../menu/menu";
import { changeActive } from "../../redux/reducers/genre/reducer";
import history from "../../utils/history";

interface IGenreMenu {
  className?: string
}

const GenreMenu: React.FC<IGenreMenu> = ({ className = "" }: IGenreMenu) => {
  const dispatch = useDispatch();
  const allGenres = useSelector((state: IRootState) => state.genres.list.all);
  const discoverGenres = useSelector((state: IRootState) => state.genres.list.discover);
  const activeGenre = useSelector((state: IRootState) => state.genres.list.active);

  const handleMenuItemClick = useCallback((item: TGenre, isItemActive: boolean) => {
    // Если мы кликнули уже на активный жанр, ничего не делаем
    if (isItemActive) return;
    // Переходим на главную страницу
    history.push(RoutePathes.ROOT);
    dispatch(changeActive(item.id));
  }, [activeGenre]);

  const menu = useMemo(() => {
    const test = <Menu callbackClick={handleMenuItemClick} activeItem={activeGenre} data={[discoverGenres, allGenres]} withLabel />;
    // const discoverMenu = <Menu callbackClick={handleMenuItemClick} activeItem={activeGenre} data={discoverGenres} withLabel />;
    // const genresMenu = <Menu callbackClick={handleMenuItemClick} activeItem={activeGenre} data={allGenres} withLabel />;

    return (
      <div>
        {test}
        {/* {discoverMenu} */}
        {/* {genresMenu} */}
      </div>
    );
  }, [activeGenre, allGenres]);

  return menu;
};

export default memo(GenreMenu);
