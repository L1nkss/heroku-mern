import React, { memo, useMemo } from "react";

import { IClientFilmData } from "../../redux/reducers/films/types/types";

import { RoutePathes } from "../../constants/constants";
import FilmCard from "../film-card/film-card";
import withLink from "../../utils/HOC/withLink";

interface IFilmListProps {
  size?: "normal" | "small"
  films: IClientFilmData[]
  hasLink?: boolean
}

const FilmList = ({ size = "normal", films, hasLink = true }: IFilmListProps) => {
  const filmCards = useMemo(() => {
    return films.map((element) => {
      const { id, ...data } = element;
      if (!hasLink) {
        return <FilmCard key={id} data={data} />;
      }
      const WrapperElement = withLink(`${RoutePathes.FILM_DETAILS}/${id}`, FilmCard);

      return <WrapperElement key={id} data={data} />;
    });
  }, [films]);

  const containerSize = useMemo(() => {
    let className = "";

    switch (size) {
      case "small": {
        className = "film-list--small";
        break;
      }

      default: {
        break;
      }
    }

    return className;
  }, [size]);
  return (
    <div className={`film-list ${containerSize}`}>
      {filmCards}
    </div>
  );
};

export default memo(FilmList);
