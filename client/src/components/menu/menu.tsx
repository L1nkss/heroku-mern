import React, { memo } from "react";

interface IMenuListProps {
  className?: string; // класс для родительского компонента
  render?: any;
  direction?: string;
}

const Menu: React.FC<IMenuListProps> = ({
  className, render, direction,
}: IMenuListProps) => {
  return (
    <nav className={`menu ${className}`}>
      <ul className={`menu__list ${direction && "menu__list--row"}`}>
        {render("menu__item")}
      </ul>
    </nav>
  );
};

Menu.defaultProps = {
  className: "",
  render: () => <li>1</li>,
  direction: "",
};

export default memo(Menu);
