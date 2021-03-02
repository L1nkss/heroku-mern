import React, { memo } from "react";

const ErrorPage: React.FC = () => {
  return (
    <div className="error-view">
      <div className="error-view__wrapper">
        Ups, something got wrong.
        <p>Try to reload the page</p>
      </div>
    </div>
  );
};

export default memo(ErrorPage);
