import React, {
  memo, useCallback, useEffect,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import Loader from "../../components/loader/loader";
import FilmList from "../../components/film-list/film-list";
import { IRootState } from "../../redux/reducers/types/types";
import { loadAdditionFilmsRequest } from "../../redux/reducers/films/reducer";

const Content: React.FC = () => {
  const dispatch = useDispatch();
  const isFilmLoading = useSelector((state: IRootState) => state.films.loading);
  const isAdditionLoading = useSelector((state: IRootState) => state.films.loadingAdditionFilms);
  const films = useSelector((state: IRootState) => state.films.films);

  const handleScroll = useCallback(debounce(() => {
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && !isAdditionLoading) {
      dispatch(loadAdditionFilmsRequest());
    }
  }, 500), []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [films]);

  return (
    <div className="content">
      <div className="content__films">
        { isFilmLoading
          ? <Loader />
          : (
            <FilmList films={films} />
          )}
        { isAdditionLoading && <div className="content__films-loading"><Loader /></div>}
      </div>
    </div>
  );
};

export default memo(Content);
