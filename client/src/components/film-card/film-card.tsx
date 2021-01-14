import React, { memo } from "react";
import { useSelector } from "react-redux";
import { IMAGE_URL } from "../../constants/constants";
import { IRootState } from "../../redux/reducers/types/types";
import { getRatingClass } from "../../utils/helpers";

interface IFilmCardProps {
  genreIds: Array<number>,
  title: string,
  rating: number,
  poster: string,
}

const FilmCard = (props: IFilmCardProps) => {
  const {
    genreIds, title, rating, poster,
  } = props;
  const allGenres = useSelector((state: IRootState) => state.genres.list);

  const getGenreNameById = () => {
    const currentGenres = genreIds.map((currentGenre) => {
      const idx = allGenres.findIndex((stateGenre) => stateGenre.id === currentGenre);

      return allGenres[idx].name;
    });

    return currentGenres;
  };
  return (
    <div className="film-card">
      <div className="film-card__poster">
        <img src={`${IMAGE_URL}${poster}`} alt={`Постер фильма ${title}`} width="100%" height="auto" />
      </div>
      <div className="film-card__wrapper">
        <h3 className="film-card__title">{ title }</h3>
        <p className="film-card__information">{getGenreNameById().join(" / ")}</p>
      </div>
      <div className={`film-card__rating film-card__rating--${getRatingClass(rating)}`}>
        {rating}
      </div>
    </div>
  );
};

export default memo(FilmCard);
