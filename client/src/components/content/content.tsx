import React, {
  memo, useCallback, useEffect, useState, useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import Menu from "../menu/menu";
import { CONSTANT_GENRES } from "../../constants/constants";
import Search from "../search/search";
import { IRootState } from "../../redux/reducers/types/types";
import { isStringsEqual } from "../../utils/helpers";
import { changeCategory } from "../../redux/reducers/genre/reducer";
import { TCategoryListItem } from "../../redux/reducers/genre/types/types";
import Films from "../films/films";
import Loader from "../loader/loader";
import { IClientFilmData } from "../../redux/reducers/films/types/types";

const Content: React.FC = () => {
  const [filmsToShow, setFilmsToShow] = useState<Array<IClientFilmData>>([]);
  const dispatch = useDispatch();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filmCategory = useSelector((state: IRootState) => state.genres.category);
  const activeGenre = useSelector((state: IRootState) => state.genres.active);
  const genreCategory = useSelector((state: IRootState) => state.genres.category);
  const isFilmLoading = useSelector((state: IRootState) => state.films.loading);
  const films = useSelector((state: IRootState) => state.films.films);

  const handleCategoryClick = useCallback((category: TCategoryListItem) => {
    if (isStringsEqual(category.name, filmCategory)) return;
    dispatch(changeCategory(category.id));
  }, [filmCategory]);

  useEffect(() => {
    setFilmsToShow(films);
  }, [films]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeGenre, genreCategory]);

  // Используем debounce, чтобы не вызывать каждый поиск фильмов при вводе текста в строку поиска
  const handleSearchInput = useCallback(debounce((evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value === "") {
      setFilmsToShow(films);
      return;
    }

    const filterFilms = films.filter((film) => {
      const filmTitle = film.title.toLowerCase();

      return filmTitle.indexOf(evt.target.value.toLowerCase()) !== -1;
    });

    setFilmsToShow(filterFilms);
  }, 500), [films]);
  return (
    <div className="content">
      <div className="content__header">
        {
          activeGenre === "All"
          && (
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
          )
        }
        <Search className="content__search" callback={handleSearchInput} ref={searchInputRef} />
      </div>
      <div className="content__films">
        { isFilmLoading
          ? <Loader />
          : <Films isSearching={searchInputRef.current && searchInputRef?.current.value !== ""} films={filmsToShow} />}
      </div>
    </div>
  );
};

export default memo(Content);
