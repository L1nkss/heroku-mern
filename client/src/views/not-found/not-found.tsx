import React, { memo } from "react";

const NotFound: React.FC = () => {
  return (
    <div className="content-wrapper ta-c">
      <div>
        <p>Sorry, access denied</p>
        <p>
          Try to login your profile
        </p>
      </div>
    </div>
  );
};

export default memo(NotFound);
