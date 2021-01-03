import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import App from "./components/app/app";
import history from "./utils/history";

import "./style/style.scss";

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root"),
);
