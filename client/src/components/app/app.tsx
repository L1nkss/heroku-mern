import React, { memo } from "react";
import Header from "../header/header";
import Main from "../main/main";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  );
};

export default memo(App);
