import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import * as C from "components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<div style={{display: "flex"}}>
  <C.Game id={"1"}/>
  <C.Game id={"2"} />
</div>);
