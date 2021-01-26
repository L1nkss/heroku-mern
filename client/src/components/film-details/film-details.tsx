import React, {
  useCallback, useEffect, useMemo, useState,
} from "react";
import { RouteComponentProps } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";
import { TRouteParams } from "../../constants/types/types";
import api from "../../services/api";
import FilmAdapter from "../../redux/reducers/films/utils/filmAdapter";
import { addFavoriteFilm } from "../../redux/reducers/user/reducer";
import Loader from "../loader/loader";
import { IMAGE_SIZE_URL, YOUTUBE_LINK } from "../../constants/constants";
import { IClientFilmDetails } from "../../redux/reducers/films/types/types";
import { IRootState } from "../../redux/reducers/types/types";

type MyProps = RouteComponentProps<TRouteParams>;

interface IFilmDetailsState {
  data: IClientFilmDetails,
  videos: any,
}

const FilmDetails: React.FC<MyProps> = ({ match }: MyProps) => {
  const [details, setDetails] = useState<IFilmDetailsState>();
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
      const responseVideo = await api.getVideo(id);
      setDetails(
        { data: FilmAdapter.transformFilmDetailsData(response.data), videos: responseVideo.data.results },
      );
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
        backdropPath: details?.data?.backdropPath,
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
    const className = "film-details__icon-container";

    return (
      <div
        role="presentation"
        onClick={() => handleFavoriteIconFilmClick()}
        className={`${className} ${filmStatus ? "film-details__icon-container--favorite" : ""}`}
      >
        <AiFillHeart className="film-details__icon" />
      </div>
    );
  }, [authStatus, id, details, favoriteFilms]);

  const trailers = useMemo(() => {
    console.log(details);
    // const trailersToShow = details?.videos.splice(0, 3);
    return details?.videos
      .slice(0, 3)
      .map((video: any) => {
        return (
          <div className="film-details__trailer" key={video.id}>
            <iframe className="film-details__iframe-trailer" allowFullScreen title="video" src={`${YOUTUBE_LINK}${video.key}`} frameBorder="0" />
          </div>
        );
      });
  }, [details, id]);

  const subHeader = useMemo(() => {
    const data = [
      {
        id: 1,
        result: moment(details?.data.releaseDate).format("MMMM DD, YYYY"),
      },
      {
        id: 2,
        result: details?.data.genres.map((genre) => genre.name).join(", "),
      },
      {
        id: 3,
        result: details?.data.runtime,
      },
    ];

    return (
      <ul className="film-details__sub-header">
        {data.map((element) => {
          return <li className="film-details__sub-header-item" key={element.id}>{element.result}</li>;
        })}
      </ul>
    );
  }, [details]);

  if (isLoading) return <Loader />;

  return (
    <section>
      <div className="content-wrapper film-details">
        <div className="film-details__image-container">
          <img
            className="film-details__image"
            src={`${IMAGE_SIZE_URL.SMALL}/${details?.data.posterPath}`}
            alt={`Постер фильма ${details?.data.title}`}
          />
          { isFilmFavorite }
        </div>
        <div className="film-details__content">
          <header className="film-details__header">
            <h2>{details?.data.title}</h2>
            { subHeader }
          </header>
          <div>
            <div>
              <span>Overview: </span>
              <p>{details?.data.overview}</p>
            </div>
            { details?.videos.length > 0
            && (
            <div>
              <span>Trailers: </span>
              <div className="film-details__trailer-list">
                { trailers }
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilmDetails;
