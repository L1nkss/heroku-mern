import React, { memo, useCallback, useMemo } from "react";

import { TDiscoverItem, TGenre } from "../../redux/reducers/genre/types/types";
import { isStringsEqual } from "../../utils/helpers";

type TItems = {
  label?: string,
  items: Array<TGenre | TDiscoverItem>
};

interface IMenuListProps {
  className?: string; // класс для родительского компонента
  data?: TItems[]
  withLabel?: boolean
  direction?: "column" | "row";
  activeItem?: string;
  callbackClick?: (item: TGenre, isActive: boolean) => void;
  render?: (className: string) => JSX.Element[];
}

const Menu: React.FC<IMenuListProps> = ({
  className = "",
  callbackClick,
  data,
  direction = "column",
  activeItem,
  withLabel = false,
  render,
}: IMenuListProps) => {
  const createMenuItem = useCallback((item) => {
    const isActive = (activeItem && isStringsEqual(item.name, activeItem)) || false;

    return (
      <li
        role="presentation"
        onClick={() => callbackClick && callbackClick(item, isActive)}
        className={`menu__item ${isActive && "menu__item--active"}`}
        key={item.id}
      >
        {item.name}
      </li>
    );
  }, [activeItem]);

  const menu = useMemo(() => {
    return data && data.map((list, index) => {
      const listItems = list.items.map(createMenuItem);
      return (
      // Отключаем правило с Index'ом, так как меняться массив не будет и соотственно индекс тоже
      // eslint-disable-next-line react/no-array-index-key
        <div className="menu__wrapper" key={index}>
          {withLabel && <div className="menu__header"><h4 className="menu__label">{list.label}</h4></div>}
          <ul className="menu__list">{listItems}</ul>
        </div>
      );
    });
  }, [activeItem, data]);

  return (
    <nav className={`menu ${className}`}>
      { render && render("menu__item") }
      { !render && menu }
    </nav>
  );
};

export default memo(Menu);
