import React, { memo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IClientFilmData } from "../../redux/reducers/films/types/types";
import FilmCard from "../film-card/film-card";
import { IRootState } from "../../redux/reducers/types/types";
import Loader from "../loader/loader";
import { loadAdditionFilmsRequest } from "../../redux/reducers/films/reducer";
import { RoutePathes } from "../../constants/constants";

interface IFilmsProps {
  className?: string
  films: Array<IClientFilmData>
}

const Films = ({ className, films }: IFilmsProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: IRootState) => state.films.loadingAdditionFilms);
  const isSearching = useSelector((state: IRootState) => state.films.isSearching);

  const handleScroll = () => {
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && !isSearching && !isLoading) {
      dispatch(loadAdditionFilmsRequest());
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSearching, films, isLoading]);

  const createFilmsCards = useCallback(() => {
    return films.map((film: IClientFilmData) => {
      const { id, ...props } = film;
      return <Link key={film.id} to={`${RoutePathes.FILM_DETAILS}/${id}`}><FilmCard data={props} /></Link>;
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
