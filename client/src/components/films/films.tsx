import React, { memo, useCallback } from "react";
import { IClientFilmData } from "../../redux/reducers/films/types/types";
import FilmCard from "../film-card/film-card";

interface IFilmsProps {
  className?: string
  films: Array<IClientFilmData>
}

const Films = ({ className, films }: IFilmsProps) => {
  const createFilmsCards = useCallback(() => {
    return films.map((film: IClientFilmData) => {
      return <FilmCard key={film.id} genreIds={film.genreIds} title={film.title} rating={film.voteAverage} poster={film.backdropPath} />;
    });
  }, [films]);
  return (
    <div className={`films ${className}`}>
      {createFilmsCards()}
    </div>
  );
};

Films.defaultProps = {
  className: "",
};

export default memo(Films);
