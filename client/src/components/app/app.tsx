import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../header/header";
import Main from "../main/main";
import Loader from "../loader/loader";
import { getGenresRequest } from "../../redux/reducers/genre/reducer";
import { IRootState } from "../../redux/reducers/types/types";

const App: React.FC = () => {
  const isGenreLoading = useSelector((state: IRootState) => state.genres.loading);
  const isContentLoaded = !isGenreLoading; // проверяем, что жанры и фильмы загрузились
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenresRequest()); // загружаем жанры
  }, [dispatch]);
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
