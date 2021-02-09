import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import { AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";
import { FaYoutube } from "react-icons/fa";
import { RouteMatchProps } from "../../constants/types/types";
import api from "../../services/api";
import FilmAdapter from "../../utils/adapters/film";
import ReviewsAdapter, { IClientReview } from "../../utils/adapters/reviews";
import { addFavoriteFilm } from "../../redux/reducers/user/reducer";
import Loader from "../../components/loader/loader";
import {
  IMAGE_SIZE_URL, RoutePathes, YOUTUBE_LINK, getVideoThumbnail,
} from "../../constants/constants";
import { IClientFilmData, IClientFilmDetails } from "../../redux/reducers/films/types/types";
import { IRootState } from "../../redux/reducers/types/types";
import ReviewList from "../../components/review-list/review-list";
import FilmCard from "../../components/film-card/film-card";
import withLink from "../../utils/HOC/withLink";
import CreditsAdapter, { IClientCredits } from "../../utils/adapters/credits";
import Credits from "../../components/credits/credits";
import history from "../../utils/history";
import Popup from "../../components/popup/popup";
import { TGenre } from "../../redux/reducers/genre/types/types";
import { changeActiveGenre } from "../../redux/reducers/genre/reducer";

type TVideo = {
  id: string;
  key: string;
  name: string;
  site: string;
};

interface IFilmDetailsState {
  data: IClientFilmDetails,
  videos: TVideo[],
  reviews: IClientReview[],
  recommendations: IClientFilmData[],
  credits: IClientCredits[]
}

const FilmDetails: React.FC<RouteMatchProps> = ({ match }: RouteMatchProps) => {
  const [details, setDetails] = useState<IFilmDetailsState>();
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userID = useSelector((state: IRootState) => state.user.data.id);
  const authStatus = useSelector((state: IRootState) => state.user.isLogin);
  const favoriteFilms = useSelector((state: IRootState) => state.user.data.favoriteFilms);
  const { id } = match.params;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePopupClick = useCallback(() => {
    setShowPopup((prevState) => !prevState);
  }, [id]);

  const getFilmDetailsData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Получаем все нужные данные о фильме и записываем в state
      const response = await api.getDetails(id);
      const responseVideo = await api.getVideo(id);
      const responseRecommendations = await api.getRecommendations(id);
      const reviews = await api.getReviews(id);
      const credits = await api.getCredits(id);
      setDetails(
        {
          data: FilmAdapter.transformFilmDetailsData(response.data),
          videos: responseVideo.data.results,
          reviews: ReviewsAdapter.transformData(reviews.data.results),
          recommendations: FilmAdapter.transformData(responseRecommendations.data.results),
          credits: CreditsAdapter.transformData(credits.data.cast),
        },
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

  const filmRecommendations = useMemo(() => {
    return details?.recommendations.slice(0, 3).map((element) => {
      const WrapperComponent = withLink(`${RoutePathes.FILM_DETAILS}/${element.id}`, FilmCard);
      return <WrapperComponent data={element} key={element.id} size="small" />;
    });
  }, [details, id]);

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

  const handleGenreClick = useCallback((genre: TGenre) => {
    dispatch(changeActiveGenre(genre.id));
    history.push(RoutePathes.ROOT);
  }, [id]);

  // Блоки с информацией о фильме

  // Заголовок
  const header = useMemo(() => {
    const data = [
      {
        id: 1,
        result: moment(details?.data.releaseDate).format("MMMM DD, YYYY"),
      },
      {
        id: 3,
        result: `${details?.data.runtime} min`,
      },
    ];
    return (
      <header className="film-details__header">
        <span className="film-details__title">{details?.data.title}</span>
        <ul className="film-details__sub-header">
          { data.map((element) => {
            return <li className="film-details__sub-header-item" key={element.id}>{element.result}</li>;
          })}
        </ul>
      </header>
    );
  }, [details]);

  // Жанры фильма
  const genres = useMemo(() => {
    if (details?.data.genres.length === 0) return null;
    return (
      <ul className="film-details__genre-list">
        { details?.data.genres.map((genre) => {
          return <li className="film-details__genre" role="presentation" onClick={() => handleGenreClick(genre)}>{genre.name}</li>;
        })}
      </ul>
    );
  }, [details]);

  // Описание фильма
  const overview = useMemo(() => {
    if (details?.data.overview.length === 0) return null;
    return (
      <>
        <p>{details?.data.overview}</p>
      </>
    );
  }, [details]);

  // Актеры
  const credits = useMemo(() => {
    if (details?.credits.length === 0) return null;
    return (
      <div className="film-details__credits">
        <Credits data={details?.credits.slice(0, 5)} />
        <button
          onClick={() => history.push(`${RoutePathes.CREDITS}/${id}`)}
          className="button"
          type="button"
        >
          Show more
        </button>
      </div>
    );
  }, [details]);

  // Фильмы, которые возможно понравятся
  const moreFilms = useMemo(() => {
    if (filmRecommendations?.length === 0) return null;
    /* todo Сделать как компонент Films с пропсом размер */
    return (
      <div className="films films--small">
        {filmRecommendations}
      </div>
    );
  }, [details]);

  // Превьюшка трейлера под постером
  const trailerPreview = useMemo(() => {
    const imageSrc = details && getVideoThumbnail(details.videos[0].key, "max");

    return (
      <div
        role="presentation"
        className="film-details__trailer-preview"
      >
        <img src={imageSrc} alt="Трейлер фильма" />
        <button
          type="button"
          className="button button--icons film-details__trailer-button"
        >
          <FaYoutube className="button__icon" />
          Trailer
        </button>
      </div>
    );
  }, [details]);

  // Отзывы о фильме
  const reviews = useMemo(() => {
    if (details?.reviews.length === 0) return null;

    return <ReviewList reviews={details?.reviews} />;
  }, [details]);

  // Данные по информации о фильме
  const detailsInformation = useMemo(() => {
    const data = [
      {
        id: 1,
        result: genres,
        header: "Genres",
      },
      {
        id: 2,
        result: overview,
        header: "Overview",
      },
      {
        id: 3,
        result: credits,
        header: "Credits",
      },
      {
        id: 4,
        result: moreFilms,
        header: "More You Might Like",
      },
      {
        id: 5,
        result: reviews,
        header: "User Reviews",
      },
    ];

    return data.map((element) => {
      if (!element.result) return null;
      return (
        <div className="film-details__info" key={element.id}>
          <h3 className="film-details__info-header">
            {element.header}
            {" "}
            :
          </h3>
          { element.result }
        </div>
      );
    });
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
          { trailerPreview }
        </div>
        <div className="film-details__content">
          { header }
          <div>
            {detailsInformation}
          </div>
        </div>
      </div>
      {/* Модальное окно с трейлером */}
      {(showPopup && details?.videos.length) && (
      <Popup handleCloseClick={handlePopupClick}>
        <div className="film-details__trailer" key={details?.videos[0].id}>
          <iframe
            className="film-details__iframe-trailer"
            allowFullScreen
            title="video"
            src={`${YOUTUBE_LINK}${details?.videos[0].key}`}
            frameBorder="0"
          />
        </div>
      </Popup>
      )}
    </section>
  );
};

export default FilmDetails;