import React, { memo } from "react";
import { useSelector } from "react-redux";

import { IClientFilmData } from "../../redux/reducers/films/types/types";
import { IRootState } from "../../redux/reducers/types/types";

import { IMAGE_SIZE_URL, REGULARS } from "../../constants/constants";
import { getRatingClass } from "../../utils/helpers";

import noImage from "./images/no-image.png";

interface IFilmCardProps {
  data: Omit<IClientFilmData, "id">,
  size?: "small" | "default",
}

const sizeClasses = {
  small: "film-card--small",
  default: "",
};

const FilmCard = ({ size = "default", data }: IFilmCardProps) => {
  const {
    genreIds, title, voteAverage, backdropPath, releaseDate,
  } = data;
  const image = backdropPath ? `${IMAGE_SIZE_URL.SMALL}${backdropPath}` : noImage;

  const allGenres = useSelector((state: IRootState) => state.genres.list.all.items);

  const getGenreNameById = () => {
    const currentGenres = genreIds.map((currentGenre) => {
      const idx = allGenres.findIndex((stateGenre) => stateGenre.id === currentGenre);

      return allGenres[idx].name;
    });

    return currentGenres;
  };
  return (
    <section className={`film-card ${sizeClasses[size]}`}>
      <div className={`film-card__poster ${backdropPath ? "" : "film-card__poster--no-image"}`}>
        <img className="film-card__image" src={image} alt={`Постер фильма ${title}`} width="100%" height="auto" />
      </div>
      <div className="film-card__wrapper">
        <h3 className="film-card__title">
          { title }
          {" "}
          {releaseDate && `(${releaseDate.match(REGULARS.SEARCH_YEAR)})`}
        </h3>
        <p className="film-card__information">{getGenreNameById().join(" / ")}</p>
      </div>
      {
        !!voteAverage
        && (
        <div className={`film-card__rating film-card__rating--${getRatingClass(voteAverage)}`}>
          {voteAverage}
        </div>
        )
      }
    </section>
  );
};

export default memo(FilmCard);
