import React, { memo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import { IClientFilmData } from "../../redux/reducers/films/types/types";
import FilmCard from "../film-card/film-card";
import { IRootState } from "../../redux/reducers/types/types";
import Loader from "../loader/loader";
import { loadAdditionFilmsRequest } from "../../redux/reducers/films/reducer";
import { RoutePathes } from "../../constants/constants";
import withLink from "../../utils/HOC/withLink";

interface IFilmsProps {
  className?: string
  films: Array<IClientFilmData>,
  isSearching: boolean | null,
}

const Films = ({ className, films, isSearching = false }: IFilmsProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: IRootState) => state.films.loadingAdditionFilms);

  const handleScroll = useCallback(debounce(() => {
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && !isSearching && !isLoading) {
      dispatch(loadAdditionFilmsRequest());
    }
  }, 500), [isSearching, isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSearching, films, isLoading]);

  const createFilmsCards = useCallback(() => {
    return films.map((film: IClientFilmData) => {
      const WrapperComponent = withLink(`${RoutePathes.FILM_DETAILS}/${film.id}`, FilmCard);
      return <WrapperComponent key={film.id} data={film} />;
    });
  }, [films]);
  return (
    <>
      <div className={`films ${className}`}>
        {createFilmsCards()}
      </div>
      { isLoading
      && (
      <div className="films__loader">
        <Loader />
      </div>
      )}
    </>
  );
};

Films.defaultProps = {
  className: "",
};

export default memo(Films);
