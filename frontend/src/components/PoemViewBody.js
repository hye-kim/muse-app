import React from "react";
import PoemViewComments from "./PoemViewComments";
import "./stylesheets/PoemViewBody.css";

function PoemBody({ poem }) {
  if (!poem) {
    return <div></div>;
  } else {
    return (
      <div className="poem-body-background">
          <div className="poem-body-container">
            <div className="poem-main-body">
              <div className="poem-lyrics">
                <h2>{poem.title} lyrics</h2>
                <div className="lyrics">
                  <p>{poem.body}</p>
                </div>
                <PoemViewComments />
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default PoemBody;
