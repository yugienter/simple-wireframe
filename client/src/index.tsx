import React from "react";
import ReactDOM from "react-dom";

import "config/api.conf";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ModalProvider } from "./context/ModalContext";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <ModalProvider>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </ModalProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
