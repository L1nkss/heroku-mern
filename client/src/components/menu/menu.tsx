import React, { memo, useMemo } from "react";

import { TDiscoverItem, TGenre } from "../../redux/reducers/genre/types/types";
import { isStringsEqual } from "../../utils/helpers";

type TItems = {
  label?: string,
  items: Array<TGenre | TDiscoverItem>
};

interface IMenuListProps {
  className?: string; // класс для родительского компонента
  data?: TItems
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
  const menuList = useMemo(() => {
    const items = data && data.items.map((element) => {
      const isActive = (activeItem && isStringsEqual(element.name, activeItem)) || false;

      return (
        <li
          role="presentation"
          onClick={() => callbackClick && callbackClick(element, isActive)}
          className={`menu__item ${isActive && "menu__item--active"}`}
          key={element.id}
        >
          {element.name}
        </li>
      );
    });

    return (
      <>
        {withLabel && <div className="menu__header"><h4 className="menu__label">{data && data.label}</h4></div>}
        <ul className="menu__list">{items}</ul>
      </>
    );
  }, [activeItem, data]);

  return (
    <nav className={`menu ${className}`}>
      { render && render("menu__item") }
      { !render && menuList }
    </nav>
  );
};

export default memo(Menu);
