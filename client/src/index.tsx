import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./components/app/app";
import history from "./utils/history";

import store from "./redux/store";
import "./style/style.scss";
import { AppRoutes } from "./routes/routes";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AppRoutes />
    </Router>
  </Provider>,
  document.getElementById("root"),
);
