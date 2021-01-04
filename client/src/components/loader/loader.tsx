import React, { memo } from "react";

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <svg className="loader__icon" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30" />
      </svg>
    </div>
  );
};

export default memo(Loader);
