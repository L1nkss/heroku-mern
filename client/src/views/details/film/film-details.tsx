import React, {
  useCallback, useEffect, useMemo, useState,
} from "react";
import { AiFillHeart, AiOutlineYoutube } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";

import {
  IMAGE_SIZE_URL, RoutePathes, YOUTUBE_LINK,
} from "../../../constants/constants";
import { RouteMatchProps } from "../../../constants/types/types";
import api from "../../../services/api";
import Loader from "../../../components/loader/loader";
import FilmList from "../../../components/film-list/film-list";
import Popup from "../../../components/popup/popup";
import Credits from "../../../components/credits/credits";
import { addFavoriteFilm } from "../../../redux/reducers/user/reducer";
import { IClientFilmData, IClientFilmDetails } from "../../../redux/reducers/films/types/types";
import { IRootState } from "../../../redux/reducers/types/types";
import { TGenre } from "../../../redux/reducers/genre/types/types";
import { changeActive } from "../../../redux/reducers/genre/reducer";
import {
  IDetailInformation,
  renderDetailsInformations,
  checkResultToUndefined,
  IDetailsInformationInit,
} from "../helpers/helpers";
import CreditsAdapter, { IClientCredits } from "../../../utils/adapters/credits";
import FilmAdapter from "../../../utils/adapters/film";
import history from "../../../utils/history";

type TVideo = {
  id: string;
  key: string;
  name: string;
  site: string;
};

interface IFilmDetailsState {
  data: IClientFilmDetails,
  videos: TVideo[],
  recommendations: IClientFilmData[],
  credits: IClientCredits[]
}

const FilmDetails: React.FC<RouteMatchProps> = ({ match }: RouteMatchProps) => {
  const [details, setDetails] = useState<IFilmDetailsState>();
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllCast, setShowAllCast] = useState<boolean>(false);
  const dispatch = useDispatch();

  const userID = useSelector((state: IRootState) => state.user.data.id);
  const authStatus = useSelector((state: IRootState) => state.user.isLogin);
  const favoriteFilms = useSelector((state: IRootState) => state.user.data.favoriteFilms);

  const { id } = match.params;

  const handlePopupClick = useCallback(() => {
    setShowPopup((prevState) => !prevState);
  }, [id]);

  const handleActorButtonClick = useCallback(() => {
    setShowAllCast((prevState) => !prevState);
  }, []);

  const getFilmDetailsData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Получаем все нужные данные о фильме и записываем в state
      const response = await api.getDetails(id);
      const responseVideo = await api.getVideo(id);
      const responseRecommendations = await api.getRecommendations(id);
      const credits = await api.getCredits(id);
      setDetails(
        {
          data: FilmAdapter.transformFilmDetailsData(response.data),
          videos: responseVideo.data.results,
          recommendations: FilmAdapter.transformData(responseRecommendations.data.results),
          credits: CreditsAdapter.transformData(credits.data.cast),
        },
      );
    } catch (e) {
      console.log("Ошибка при получении информации о фильме", e);
      // Если получили статус 404 при получении информации
      if (e.response.status === 404) {
        history.push(RoutePathes.NOT_FOUND);
      }
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
        voteAverage: details?.data.voteAverage,
        genreIds: details?.data.genres.map((element) => element.id),
        releaseDate: details?.data.releaseDate,
        title: details?.data.title,
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

  const rating = useMemo(() => {
    if (!details?.data.voteAverage) return undefined;

    return (
      <p className="film-details__info-text">
        {details?.data.voteAverage}
        {" "}
        /
        {" "}
        <strong>10</strong>
      </p>
    );
  }, [details, id]);

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
    dispatch(changeActive(genre.id));
    history.push(RoutePathes.ROOT);
  }, [id]);

  // Блоки с информацией о фильме

  // Иконка для просмотра трейлера
  const trailerPreview = useMemo(() => {
    if (details?.videos.length === 0) return null;

    return (
      <div
        role="presentation"
        className="film-details__trailer"
        onClick={handlePopupClick}
      >
        <AiOutlineYoutube className="film-details__trailer-icon" />
      </div>
    );
  }, [details]);

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
        <h2 className="film-details__title">{details?.data.title}</h2>
        <ul className="film-details__sub-header">
          { data.map((element) => {
            return <li className="film-details__sub-header-item" key={element.id}>{element.result}</li>;
          })}
        </ul>
        { trailerPreview }
      </header>
    );
  }, [details, trailerPreview]);

  // Жанры фильма
  const genres = useMemo(() => {
    if (details?.data.genres.length === 0) return undefined;
    return (
      <ul className="tags">
        { details?.data.genres.map((genre) => {
          return <li key={genre.id} className="tags__item" role="presentation" onClick={() => handleGenreClick(genre)}>{genre.name}</li>;
        })}
      </ul>
    );
  }, [details]);

  // Описание фильма
  const overview = useMemo(() => {
    if (details?.data.overview.length === 0) return undefined;
    return (
      <p className="film-details__info-text">{details?.data.overview}</p>
    );
  }, [details]);

  // Актеры
  const credits = useMemo(() => {
    if (details?.credits.length === 0) return undefined;
    const limit = 6;
    const castToShow = showAllCast ? details?.credits : details?.credits.slice(0, limit);
    return (
      <section className="film-details__section">
        <header className="film-details__section-header">
          <h3 className="film-details__section-title">Actors</h3>
          <button onClick={handleActorButtonClick} type="button" className="button button--ghost">
            {showAllCast ? "Show less" : "Show more"}
          </button>
        </header>
        <Credits data={castToShow} className="film-details__credits" />
      </section>
    );
  }, [details, showAllCast]);

  // Фильмы, которые возможно понравятся
  const moreFilms = useMemo(() => {
    if (details?.recommendations?.length === 0) return undefined;
    return (
      <section className="film-details__section">
        <header className="film-details__section-header">
          <h3 className="film-details__section-title">More films</h3>
        </header>
        <FilmList films={details?.recommendations || []} />
      </section>
    );
  }, [details]);

  // Данные по информации о фильме
  const detailsInformation: IDetailInformation[] = useMemo<IDetailInformation[]>(() => {
    const data: IDetailsInformationInit[] = [
      {
        id: 3,
        result: rating,
        header: "Rating",
        extraClass: "film-details__info--row",
      },
      {
        id: 1,
        result: genres,
        header: "Genres",
        extraClass: "film-details__info--row",
      },
      {
        id: 2,
        result: overview,
        header: "Overview",
      },
    ];

    return data.filter(checkResultToUndefined);
  }, [details]);

  if (isLoading) return <Loader />;

  return (
    <section>
      <div
        className="film-details__wrapper"
        style={
          {
            backgroundImage: (
              `linear-gradient(rgba(52, 41, 49, 0.8), rgba(0, 0, 0, 0.85)),
                url(${IMAGE_SIZE_URL.BIG}/${details?.data.backdropPath})`),
            width: "100%",
          }
        }
      >
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
            { header }
            <div>
              {renderDetailsInformations(detailsInformation, "film-details")}
            </div>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        { credits }
        { moreFilms }
      </div>
      {/* Модальное окно с трейлером */}
      {(showPopup && details?.videos.length) && (
      <Popup handleCloseClick={handlePopupClick}>
        <div className="film-details__iframe-wrapper" key={details?.videos[0].id}>
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
