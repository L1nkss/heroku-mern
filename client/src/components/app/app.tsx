import React, { memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Header from "../header/header";
import Main from "../main/main";
import Loader from "../loader/loader";
import { getGenresRequest } from "../../redux/reducers/genre/reducer";
import { IRootState } from "../../redux/reducers/types/types";
import { setLoginStatus } from "../../redux/reducers/user/reducer";
import { getFilmsRequest } from "../../redux/reducers/films/reducer";

const App: React.FC = () => {
  const isGenreLoading = useSelector((state: IRootState) => state.genres.loading);
  const isFilmsLoading = useSelector((state: IRootState) => state.films.loading);
  const isContentLoaded = useMemo(() => {
    return !isGenreLoading && !isFilmsLoading; // проверяем, что жанры и фильмы загрузились
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/api/checkToken");
        if (response.status === 200) {
          dispatch(setLoginStatus(true));
        }
      } catch (e) {
        dispatch(setLoginStatus(false));
      }
    };
    dispatch(getGenresRequest()); // загружаем жанры
    dispatch(getFilmsRequest()); // Загружаем фильмы
    checkAuthStatus(); // проверяем статус авторизацияя
  }, []);
  return (
    <div className="app">
      {
        isContentLoaded
          ? (
            <>
              <Header />
              <Main />
            </>
          )
          : <Loader />
      }
    </div>
  );
};

export default memo(App);
