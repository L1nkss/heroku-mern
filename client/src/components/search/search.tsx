import React, { memo } from "react";

export interface ISearchProps {
  className?: string
}

const Search: React.FC<ISearchProps> = ({ className }: ISearchProps) => {
  return (
    <div className={`search ${className}`}>
      <i className="fas fa-search search__icon" />
      <input className="search__input" type="search" />
    </div>
  );
};

export default memo(Search);
