import React, {
  memo, useMemo,
} from "react";
import { useSelector } from "react-redux";
import { IClientFilmData } from "../../redux/reducers/films/types/types";
import { IRootState } from "../../redux/reducers/types/types";

interface IFilmListProps {
  size?: "normal" | "small"
}

const FilmList = ({ size = "normal" }: IFilmListProps) => {
  const activeGenre = useSelector((state: IRootState) => state.genres.active);
  const genreCategory = useSelector((state: IRootState) => state.genres.category);
  console.log(activeGenre);
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
      <div>h</div>
    </div>
  );
};

export default memo(FilmList);
