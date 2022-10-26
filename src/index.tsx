import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import * as C from "components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <C.Game />
  </React.StrictMode>
);
