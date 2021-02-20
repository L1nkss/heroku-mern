import React, {
  memo, useCallback, useMemo, useRef, useState,
} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import debounce from "lodash.debounce";
import Menu from "../menu/menu";
import LoginForm from "../loginForm/loginForm";
import { IRootState } from "../../redux/reducers/types/types";
import { setUserDataToDefault } from "../../redux/reducers/user/reducer";
import RegisterForm from "../registerForm/registerForm";
import Popup from "../popup/popup";
import history from "../../utils/history";
import { IMAGE_SIZE_URL, RoutePathes } from "../../constants/constants";
import Search from "../search/search";
import api from "../../services/api";
import FilmAdapter from "../../utils/adapters/film";
import { IClientFilmData } from "../../redux/reducers/films/types/types";
import noImage from "../film-card/images/no-image.png";

/*
 todo
 не очень красиво с formToShow, исправить по возможности выбор контента для Popup'a
 */
const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [formToShow, setFormToShow] = useState("");
  const isLogin = useSelector((state: IRootState) => state.user.isLogin);
  const userName = useSelector((state: IRootState) => state.user.data.username);
  const [dropDownOptions, setDropDownOptions] = useState<IClientFilmData[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const options = useMemo(() => {
    return (
      <ul className="header__search-dropdown">
        {dropDownOptions.map((element) => {
          const image = element.posterPath ? `${IMAGE_SIZE_URL.SMALL}/${element.posterPath}` : noImage;
          return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <li
              className="header__search-dropdown-item"
              key={element.id}
              onClick={() => {
                // Обнуляем список доступных вариантов у dropdown
                setDropDownOptions([]);
                // Убираем значение у search из input'a
                if (searchRef.current) {
                  searchRef.current.value = "";
                }
                history.push(`${RoutePathes.FILM_DETAILS}/${element.id}`);
              }}
            >
              <img
                className="header__search-dropdown-poster"
                src={image}
                alt={`Постеур фильма ${element.title}`}
              />
              <div className="header__search-dropdown-title">
                {element.title}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }, [dropDownOptions]);

  const SearchFilm = useCallback(debounce(async (evt: React.ChangeEvent<HTMLInputElement>, setLoadingStatus) => {
    try {
      if (evt.target.value === "") {
        setDropDownOptions([]);
        return;
      }
      const response = await api.searchMovieByTitle({ query: evt.target.value });

      setDropDownOptions(FilmAdapter.transformData(response.data.results));
    } catch (e) {
      console.log("Ошибка при поиске фильма", e);
    } finally {
      setLoadingStatus(false);
    }
  }, 500), []);

  const togglePopupStatus = () => {
    setShowPopup((prevState) => !prevState);
  };

  const toggleButtonsClick = () => {
    if (formToShow === "login") return <LoginForm successCb={togglePopupStatus} />;
    if (formToShow === "registration") return <RegisterForm successCb={togglePopupStatus} />;
    return <></>;
  };
  const userMenuActions = [
    {
      label: "Избранные фильмы",
      callback: () => history.push(RoutePathes.USER_FAVORITE_FILMS),
      key: 3,
    },
    {
      label: "Выйти",
      callback: async () => {
        try {
          const response = await axios.post("/api/logout");
          if (response.status === 200) {
            dispatch(setUserDataToDefault());
          }
        } catch (e) {
          console.log("Ошибка", e);
        }
      },
      key: 2,
    },
  ];
  const authButtons = useMemo(() => {
    return (
      <div>
        <button
          className="button button--ghost"
          type="button"
          onClick={() => {
            setFormToShow("login");
            togglePopupStatus();
          }}
        >
          Логин
        </button>
        <button
          className="button"
          type="button"
          onClick={() => {
            setFormToShow("registration");
            togglePopupStatus();
          }}
        >
          Регистрация
        </button>
      </div>
    );
  }, []);

  const userProfile = useMemo(() => {
    return (
      <div className="header__user-menu">
        <h3 className="header__user-name">
          {userName}
          {/* <Menu */}
          {/*  className="header__dropdown" */}
          {/*  render={(className: string) => { */}
          {/*    return userMenuActions.map((element) => { */}
          {/*      return ( */}
          {/*        <li */}
          {/*          role="presentation" */}
          {/*          key={element.key} */}
          {/*          onKeyDown={element.callback} */}
          {/*          onClick={element.callback} */}
          {/*          className={className} */}
          {/*        > */}
          {/*          {element.label} */}
          {/*        </li> */}
          {/*      ); */}
          {/*    }); */}
          {/*  }} */}
          {/* /> */}
        </h3>
      </div>
    );
  }, [userName]);
  return (
    <header className="header">
      <div className="content-wrapper header__content">
        <h1 className="header__title">
          <Link to="/">Movie app</Link>
          <p className="header__source-link">
            provided by
            <a href="https://www.themoviedb.org/?language=en" rel="noreferrer" target="_blank"> TMD</a>
          </p>
        </h1>
        <Search ref={searchRef} callback={SearchFilm} options={dropDownOptions} optionsView={options} className="header__search" />
        {isLogin ? userProfile : authButtons}
      </div>
      { showPopup && <Popup handleCloseClick={togglePopupStatus}>{toggleButtonsClick()}</Popup>}
    </header>
  );
};

export default memo(Header);
