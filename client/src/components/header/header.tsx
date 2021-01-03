import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import Menu from "../menu/menu";

const Header: React.FC = () => {
  const isLogin = false; // убрать после подключения БД
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
      callback: () => console.log("Колбэк с выйти"),
      key: 2,
    },
  ];
  const authButtons = useMemo(() => {
    return (
      <>
        <button className="button" type="button">Логин</button>
        <button className="button button--orange" type="button">Регистрация</button>
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
          {isLogin ? authButtons : userProfile}
        </>
      </div>
    </header>
  );
};

export default memo(Header);
