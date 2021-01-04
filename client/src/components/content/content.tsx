import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Menu from "../menu/menu";
import { CONSTANT_GENRES } from "../../constants/constants";
import Search from "../search/search";
import { IRootState } from "../../redux/reducers/types/types";
import { isStringsEqual } from "../../utils/helpers";
import { changeCategory } from "../../redux/reducers/genre/reducer";
import { TCategory, TCategoryListItem } from "../../redux/reducers/genre/types/types";

const Content: React.FC = () => {
  const dispatch = useDispatch();
  const filmCategory = useSelector((state: IRootState) => state.genres.category);
  const activeGenre = useSelector((state: IRootState) => state.genres.active);
  const handleCategoryClick = useCallback((category: TCategoryListItem) => {
    if (isStringsEqual(category.name, filmCategory)) return;
    dispatch(changeCategory(category.id));
  }, [filmCategory]);
  return (
    <div className="content">
      <div className="content__header">
        {
          activeGenre === "All"
          && (
          <Menu
            direction="row"
            render={(className: string) => {
              return CONSTANT_GENRES.map((movie: any) => {
                const isActive = isStringsEqual(movie.name, filmCategory);
                const elementClass = `${className} ${isActive ? "menu__item--active" : ""}`;
                return <li role="presentation" className={elementClass} key={movie.id} onClick={() => handleCategoryClick(movie)}>{movie.name}</li>;
              });
            }}
          />
          )
        }
        <Search className="content__search" />
      </div>
    </div>
  );
};

export default memo(Content);
