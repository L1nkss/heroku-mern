import React, {
  useCallback, useEffect, useMemo, useState,
} from "react";
import { RouteComponentProps } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { TRouteParams } from "../../constants/types/types";
import api from "../../services/api";
import FilmAdapter from "../../redux/reducers/films/utils/filmAdapter";
import { addFavoriteFilm } from "../../redux/reducers/user/reducer";
import Loader from "../loader/loader";
import { IMAGE_SIZE_URL } from "../../constants/constants";
import { IClientFilmDetails } from "../../redux/reducers/films/types/types";
import { IRootState } from "../../redux/reducers/types/types";

type MyProps = RouteComponentProps<TRouteParams>;

const FilmDetails: React.FC<MyProps> = ({ match }: MyProps) => {
  const [details, setDetails] = useState<IClientFilmDetails>();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userID = useSelector((state: IRootState) => state.user.data.id);
  const authStatus = useSelector((state: IRootState) => state.user.isLogin);
  const favoriteFilms = useSelector((state: IRootState) => state.user.data.favoriteFilms);
  const { id } = match.params;

  const getFilmDetailsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.getDetails(id);
      setDetails(FilmAdapter.transformFilmDetailsData(response.data));
    } catch (e) {
      console.log("Ошибка при получении информации о фильме", e);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getFilmDetailsData();
  }, [id]);

  const handleFavoriteIconFilmClick = useCallback(async () => {
    try {
      const data = {
        id,
        backdropPath: details?.backdropPath,
        userID,
      };
      const response = await axios.put("/api/users/addToFavorite", data);
      if (response.status === 200) {
        dispatch(addFavoriteFilm(response.data));
      }
    } catch (e) {
      console.log(e);
    }
  }, [details, userID]);

  const isFilmFavorite = useMemo(() => {
    if (!authStatus) return null;
    const filmStatus = favoriteFilms.findIndex((film) => film.id === id) !== -1;

    return filmStatus
      ? <AiFillHeart onClick={() => handleFavoriteIconFilmClick()} className="film-details__icon" />
      : <FaRegHeart onClick={() => handleFavoriteIconFilmClick()} className="film-details__icon" />;
  }, [authStatus, id, details, favoriteFilms]);

  console.log(isFilmFavorite);

  if (isLoading) return <Loader />;

  return (
    <section>
      <div className="content-wrapper film-details">
        <img src={`${IMAGE_SIZE_URL.SMALL}/${details?.posterPath}`} alt={`Постер фильма ${details?.title}`} />
        <div className="film-details__content">
          <header className="film-details__header">
            <h2>{details?.title}</h2>
            { isFilmFavorite }
          </header>
          <p className="film-details__release-date">{details?.releaseDate}</p>
        </div>
      </div>
    </section>
  );
};

export default FilmDetails;
