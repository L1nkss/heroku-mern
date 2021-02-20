import React, {
  memo, useCallback, useEffect, useState, useRef, useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import Menu from "../../components/menu/menu";
import { CONSTANT_GENRES } from "../../constants/constants";
import { IRootState } from "../../redux/reducers/types/types";
import { isStringsEqual } from "../../utils/helpers";
import { changeCategory } from "../../redux/reducers/genre/reducer";
import { TCategoryListItem } from "../../redux/reducers/genre/types/types";
import Films from "../../components/films/films";
import Loader from "../../components/loader/loader";
import { IClientFilmData } from "../../redux/reducers/films/types/types";
import FilmList from "../../components/film-list/film-list";

const Content: React.FC = () => {
  const [filmsByGenre, setFfilmsByGenre] = useState<Array<IClientFilmData>>([]);
  const dispatch = useDispatch();
  // const searchInputRef = useRef<HTMLInputElement>(null);
  const filmCategory = useSelector((state: IRootState) => state.genres.category);
  const activeGenre = useSelector((state: IRootState) => state.genres.active);
  const genreCategory = useSelector((state: IRootState) => state.genres.category);
  // const isFilmLoading = useSelector((state: IRootState) => state.films.loading);
  const [isFilmLoading, setIsFilmLoading] = useState<boolean>(false);
  // const films = useSelector((state: IRootState) => state.films.films);

  const handleCategoryClick = useCallback((category: TCategoryListItem) => {
    if (isStringsEqual(category.name, filmCategory)) return;
    dispatch(changeCategory(category.id));
  }, [filmCategory]);

  const contentHeader = useMemo(() => {
    return activeGenre === "All"
      ? (
        <div className="content__header">
          <Menu
            direction="row"
            render={(className: string) => {
              return CONSTANT_GENRES.map((movie: any) => {
                const isActive = isStringsEqual(movie.name, filmCategory);
                const elementClass = `${className} ${isActive ? "menu__item--active" : ""}`;
                return <li role="presentation" className={elementClass} key={movie.id} onClick={() => handleCategoryClick(movie)}>{movie.name}</li>;
              });
            }}
          />
        </div>
      )
      : null;
  }, [activeGenre, handleCategoryClick]);

  // useEffect(() => {
  //   setFilmsToShow(films);
  // }, [films]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeGenre, genreCategory]);

  return (
    <div className="content">
      {contentHeader}
      <div className="content__films">
        { isFilmLoading
          ? <Loader />
          // : <Films isSearching={searchInputRef.current && searchInputRef?.current.value !== ""} films={filmsToShow} />}
          : (
            <FilmList />
          )}
      </div>
    </div>
  );
};

export default memo(Content);
