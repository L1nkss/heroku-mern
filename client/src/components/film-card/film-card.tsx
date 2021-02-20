import React, { memo } from "react";
import { useSelector } from "react-redux";
import { IMAGE_SIZE_URL, REGULARS } from "../../constants/constants";
import { IRootState } from "../../redux/reducers/types/types";
import { getRatingClass } from "../../utils/helpers";

import noImage from "./images/no-image.png";
import { IClientFilmData } from "../../redux/reducers/films/types/types";

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
    <div className={`film-card ${sizeClasses[size]}`}>
      <div className="film-card__poster">
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
    </div>
  );
};

export default memo(FilmCard);
