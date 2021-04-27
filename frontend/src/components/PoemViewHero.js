import React from "react";
import "./stylesheets/PoemViewHero.css";
import { Link } from "react-router-dom";

function PoemViewHero({ poem }) {
  if (!poem) {
    return <div></div>;
  } else {
    return (
      <div
        className="banner"
        style={{ backgroundImage: `url(${poem.Poet.picture})` }}
      >
        <div className="banner-inner">
          <div className="banner-primary">
            <div className="header-image-container">
              <div className="header-image">
                <img src={poem.Poet.picture} alt="" />
              </div>
            </div>
            <div className="header-info-container">
              <div className="header-info">
                <h1>{poem.title}</h1>
                <h2>
                  <Link to={`/poets/${poem.poet_id}`}>{poem.Poet.name}</Link>
                </h2>
              </div>
            </div>
          </div>
          <div className="banner-secondary">
            <div className="banner-secondary-content">
              <div className="banner-secondary-data">
                <div
                  className="poem-view-count"
                >
                  <svg
                    src="eye.svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 15.45"
                  >
                    <path d="M11 2c4 0 7.26 3.85 8.6 5.72-1.34 1.87-4.6 5.73-8.6 5.73S3.74 9.61 2.4 7.73C3.74 5.86 7 2 11 2m0-2C4.45 0 0 7.73 0 7.73s4.45 7.73 11 7.73 11-7.73 11-7.73S17.55 0 11 0z"></path>
                    <path d="M11 5a2.73 2.73 0 1 1-2.73 2.73A2.73 2.73 0 0 1 11 5m0-2a4.73 4.73 0 1 0 4.73 4.73A4.73 4.73 0 0 0 11 3z"></path>
                  </svg>
                  <span>
                    {"  "}{poem.view_count}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PoemViewHero;
