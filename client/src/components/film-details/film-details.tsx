import React, { useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { TRouteParams } from "../../constants/types/types";
import api from "../../services/api";
import FilmAdapter from "../../redux/reducers/films/utils/filmAdapter";
import Loader from "../loader/loader";
import { IMAGE_SIZE_URL } from "../../constants/constants";
import { IClientFilmDetails } from "../../redux/reducers/films/types/types";

type MyProps = RouteComponentProps<TRouteParams>;

const FilmDetails: React.FC<MyProps> = ({ match }: MyProps) => {
  const [details, setDetails] = useState<IClientFilmDetails>();
  const [isLoading, setIsLoading] = useState(false);
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

  if (isLoading) return <Loader />;

  return (
    <section>
      <div className="content-wrapper film-details">
        <img src={`${IMAGE_SIZE_URL.SMALL}/${details?.posterPath}`} alt={`Постер фильма ${details?.title}`} />
        <div className="film-details__content">
          <header className="film-details__header">
            <h2>{details?.title}</h2>
            { false ? <AiFillHeart className="film-details__icon" /> : <FaRegHeart className="film-details__icon" />}
          </header>
          <p className="film-details__release-date">{details?.releaseDate}</p>
        </div>
      </div>
    </section>
  );
};

export default FilmDetails;
