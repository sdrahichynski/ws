import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import * as C from "components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route index element={<C.Game />} />
        <Route path={"/chat"} element={<C.Chat />} />
      </Routes>

    </BrowserRouter>
  </>
);
