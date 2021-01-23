import React, { memo } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

export interface ISearchProps {
  className?: string
  callback: (evt: React.ChangeEvent<HTMLInputElement>) => void
}

const Search = React.forwardRef<HTMLInputElement, ISearchProps>(({ className, callback }: ISearchProps, ref) => {
  const handleBlue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.target.value = "";
  };
  return (
    <div className={`search ${className}`}>
      <BiSearchAlt2 className="search__icon" />
      <input ref={ref} className="search__input" type="search" onChange={callback} onBlur={handleBlue} />
    </div>
  );
});

export default memo(Search);
