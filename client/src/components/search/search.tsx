import React, { memo } from "react";

export interface ISearchProps {
  className?: string
  callback: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

const Search: React.FC<ISearchProps> = ({ className, callback }: ISearchProps) => {
  return (
    <div className={`search ${className}`}>
      <i className="fas fa-search search__icon" />
      <input className="search__input" type="search" onChange={callback} />
    </div>
  );
};

export default memo(Search);
