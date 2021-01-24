import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Header from "../header/header";
import Main from "../main/main";
import Loader from "../loader/loader";
import { getGenresRequest } from "../../redux/reducers/genre/reducer";
import {
  getUserDataRequest, getUserDataSuccess, getUserDataNoUser,
} from "../../redux/reducers/user/reducer";
import { getFilmsRequest } from "../../redux/reducers/films/reducer";
import { ENDPOINTS } from "../../constants/constants";
import { isFetchingDone } from "./selectors/selectors";
import { ContentRoutes } from "../../routes/content";

const App: React.FC = () => {
  const [isUserAuthChecked, setUserAuthStatus] = useState(false);
  const dispatch = useDispatch();
  const isDataLoaded = useSelector(isFetchingDone);

  useEffect(() => {
    const checkAuthStatus = async () => {
      dispatch(getUserDataRequest()); // загружаем информацию о пользователе
      try {
        const response = await axios.get(ENDPOINTS.checkToken);
        if (response.status === 200) {
          const {
            username, email, id, favoriteFilms,
          } = response.data;
          dispatch(getUserDataSuccess({
            username, email, id, favoriteFilms,
          }));
        }
      } catch (e) {
        if (e.response.status === 401) {
          dispatch(getUserDataNoUser());
        }
      } finally {
        setUserAuthStatus(true);
      }
    };
    dispatch(getGenresRequest()); // загружаем жанры
    dispatch(getFilmsRequest()); // Загружаем фильмы
    checkAuthStatus(); // проверяем статус авторизацияя
  }, []);

  return (
    <div className="app">
      {
        // Проверяем, что данные загрузились с сервера и информация о пользователе получена
        isDataLoaded && isUserAuthChecked
          ? (
            <>
              <Header />
              <ContentRoutes />
            </>
          )
          : <Loader />
      }
    </div>
  );
};

export default memo(App);
