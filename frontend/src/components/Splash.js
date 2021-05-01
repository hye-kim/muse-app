import React from "react";
import Charts from "./Charts";
import Featured from "./Featured";
import "./stylesheets/Splash.css"

function Splash() {
  document.title = "Muse | Poem Lyrics & Knowledge"
  return (
    <div className="splash-container">
      <Featured />
      <Charts />
    </div>
  );
}

export default Splash;
