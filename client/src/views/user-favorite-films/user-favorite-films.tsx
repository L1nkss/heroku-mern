import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";

import Loader from "../../components/loader/loader";
import FilmList from "../../components/film-list/film-list";
import { IRootState } from "../../redux/reducers/types/types";

const UserFavoriteFilms: React.FC = () => {
  const userFavoriteFilms = useSelector((state: IRootState) => state.user.data.favoriteFilms);
  const isUserDataLoading = useSelector((state: IRootState) => state.user.loading);

  const userFilms = useMemo(() => {
    if (userFavoriteFilms.length === 0) {
      return (
        <div className="error-view">
          Sorry, no films there
        </div>
      );
    }
    return <FilmList films={userFavoriteFilms} />;
  }, [userFavoriteFilms]);

  if (isUserDataLoading) return <Loader />;

  return (
    <div className="content-wrapper">
      { userFilms }
    </div>
  );
};

export default memo(UserFavoriteFilms);
