import React, { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Menu from "../menu/menu";
import Popup from "../popup/popup";
import LoginForm from "../loginForm/loginForm";
import { IRootState } from "../../redux/reducers/types/types";
import { setLoginStatus } from "../../redux/reducers/user/reducer";

/*
 todo
 не очень красиво с formToShow, исправить по возможности выбор контента для Popup'a
 */
const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [formToShow, setFormToShow] = useState("");
  const isLogin = useSelector((state: IRootState) => state.user.isLogin);

  const togglePopupStatus = () => {
    setShowPopup((prevState) => !prevState);
  };

  const loginForm = () => {
    return (
      <form>
        <div>
          <input type="text" placeholder="Username" required />
        </div>
        <div>
          <input type="password" placeholder="Password" required />
        </div>
      </form>
    );
  };
  const toggleButtonsClick = () => {
    if (formToShow === "login") return <LoginForm />;
    return <></>;
  };
  const userMenuActions = [
    {
      label: "Избранные фильмы",
      callback: () => console.log("Колбэк с фильмами"),
      key: 3,
    },
    {
      label: "Настройки",
      callback: () => console.log("Колбэк с настройкой"),
      key: 1,
    },
    {
      label: "Выйти",
      callback: async () => {
        try {
          const response = await axios.post("/api/logout");
          if (response.status === 200) dispatch(setLoginStatus(false));
        } catch (e) {
          console.log("Ошибка", e);
        }
      },
      key: 2,
    },
  ];
  const authButtons = useMemo(() => {
    return (
      <>
        <button
          className="button"
          type="button"
          onClick={() => {
            setFormToShow("login");
            togglePopupStatus();
          }}
        >
          Логин
        </button>
        <button
          className="button button--orange"
          type="button"
          onClick={() => {
            setFormToShow("registration");
            togglePopupStatus();
          }}
        >
          Регистрация
        </button>
      </>
    );
  }, []);

  const userProfile = useMemo(() => {
    return (
      <div className="header__user-menu">
        <h3 className="header__user-name">
          userTest
          <Menu
            className="header__dropdown"
            render={(className: string) => {
              return userMenuActions.map((element) => {
                return (
                  <li
                    role="presentation"
                    key={element.key}
                    onKeyDown={element.callback}
                    onClick={element.callback}
                    className={className}
                  >
                    {element.label}
                  </li>
                );
              });
            }}
          />
        </h3>
      </div>
    );
  }, []);
  return (
    <header className="header">
      <div className="content-wrapper header__content">
        <h1 className="header__title">
          <Link to="/">The movie pet project</Link>
        </h1>
        <>
          {isLogin ? userProfile : authButtons}
        </>
      </div>
      { showPopup && <Popup closeClickCallback={togglePopupStatus}>{toggleButtonsClick()}</Popup>}
    </header>
  );
};

export default memo(Header);
