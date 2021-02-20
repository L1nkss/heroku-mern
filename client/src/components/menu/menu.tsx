import React, { memo, useMemo } from "react";
import { TDiscoverItem, TGenre } from "../../redux/reducers/genre/types/types";
import { isStringsEqual } from "../../utils/helpers";

type TItems = {
  label?: string,
  items: Array<TGenre | TDiscoverItem>
};

interface IMenuListProps {
  className?: string; // класс для родительского компонента
  data: TItems
  withLabel?: boolean
  direction?: "column" | "row";
  activeItem: string;
  callbackClick: (item: TGenre, isActive: boolean) => void;
}

const Menu: React.FC<IMenuListProps> = ({
  className = "", callbackClick, data, direction = "column", activeItem, withLabel = false,
}: IMenuListProps) => {
  const menuList = useMemo(() => {
    const items = data.items.map((element) => {
      const isActive = isStringsEqual(element.name, activeItem);

      return (
        <li
          role="presentation"
          onClick={() => callbackClick(element, isActive)}
          className={`menu__item ${isActive && "menu__item--active"}`}
          key={element.id}
        >
          {element.name}
        </li>
      );
    });

    return (
      <>
        {withLabel && <div className="menu__header"><h4 className="menu__label">{data.label}</h4></div>}
        <ul className="menu__list">{items}</ul>
      </>
    );
  }, [activeItem, data]);
  // const menuList = useMemo(() => {
  //   const [discover, genresItems] = data;
  //   const discoverMenu = discover.items.map((element) => {
  //     return (
  //       <>
  //         {withLabel && <h3>{discover.label}</h3>}
  //         <li className="menu__item" key={element.id}>{element.name}</li>
  //       </>
  //     );
  //   });
  //   return [...discoverMenu];
  // }, [data, activeItem]);
  console.log(data);
  // const menuItems = useMemo(() => {
  //   return data.map((element) => {
  //     return (
  //       <li key={element.id} className="menu__item">{element.name}</li>
  //     );
  //   });
  // }, [data]);
  return (
    <nav className={`menu ${className}`}>
      {/* <ul className="menu__list"> */}
      {/*   {render("menu__item")} */}
      {/* </ul> */}
      { menuList }
    </nav>
  );
};

// Menu.defaultProps = {
//   className: "",
//   render: () => <li>1</li>,
//   direction: "",
// };

export default memo(Menu);
