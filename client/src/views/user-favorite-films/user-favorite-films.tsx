import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/reducers/types/types";
import withLink from "../../utils/HOC/withLink";
import { RoutePathes } from "../../constants/constants";
import FilmCard from "../../components/film-card/film-card";
import Loader from "../../components/loader/loader";

const UserFavoriteFilms: React.FC = () => {
  const userFavoriteFilms = useSelector((state: IRootState) => state.user.data.favoriteFilms);
  const isUserDataLoading = useSelector((state: IRootState) => state.user.loading);

  const renderFilms = useMemo(() => {
    if (userFavoriteFilms.length === 0) {
      return (
        <div>
          Sorry, no films there
        </div>
      );
    }
    return userFavoriteFilms.map((element) => {
      const WrapperComponent = withLink(`${RoutePathes.FILM_DETAILS}/${element.id}`, FilmCard);
      return <WrapperComponent data={element} key={element.id} />;
    });
  }, [userFavoriteFilms]);

  if (isUserDataLoading) return <Loader />;

  return (
    <div className="content-wrapper">
      <div className="films">
        {renderFilms}
      </div>
    </div>
  );
};

export default memo(UserFavoriteFilms);
