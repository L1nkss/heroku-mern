import React, { memo, useCallback, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import debounce from "lodash.debounce";

import Loader from "../loader/loader";

export interface ISearchProps {
  className?: string
  callback: (evt: React.ChangeEvent<HTMLInputElement>, setLoadingStatus) => void
  options?: Array<any>
  optionsView?: JSX.Element
}

const Search = React.forwardRef<HTMLInputElement, ISearchProps>(({
  className = "", callback, options = [], optionsView,
}: ISearchProps, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<string>("");

  // Возможно костыль добавлять задержку для unfocus.
  // Без этого click на фильм не срабатывает из-за того, что фокус пропадает сразу
  const handleBlur = useCallback(debounce(() => {
    setValue("");
  }, 500), []);

  const handleSearch = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
    setIsLoading(true);
    callback(evt, setIsLoading);
  }, [callback, options]);

  return (
    <div className={`search ${className}`}>
      <input
        id="search-input"
        ref={ref}
        className="search__input"
        type="search"
        onChange={handleSearch}
        onBlur={handleBlur}
        value={value}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="search-input" className="search__icon-wrapper">
        { isLoading ? <Loader iconClassName="search__icon-loader" /> : <BiSearchAlt2 className="search__icon" /> }
      </label>
      {
        (options?.length > 0 && value !== "")
        && (
        <div className="search__dropdown">
          {optionsView}
        </div>
        )
      }
    </div>
  );
});

export default memo(Search);
