import React, { memo } from "react";

const Search: React.FC = () => {
  return (
    <div className="search">
      <i className="fas fa-search search__icon" />
      <input className="search__input" type="search" />
    </div>
  );
};

export default memo(Search);
