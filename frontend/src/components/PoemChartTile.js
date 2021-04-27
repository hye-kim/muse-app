import { Link } from "react-router-dom";
import "./stylesheets/PoemChartTile.css";

function PoemChartTile({ poem, rank }) {
  return (
    <Link className="poem-item" to={`/poems/${poem.id}`}>
      <div className="poem-rank">{rank}</div>
      <div className="poem-image-title-container">
        <div className="poem-image-container">
          <div
            className="poem-image"
            style={{
              backgroundImage: `url(${poem.Poet.picture})`,
            }}
          ></div>
        </div>
        <h3 className="poem-title-lyrics-container">
          <div className="poem-title">{poem.title}</div>
          <div className="poem-lyrics">
            <span>Lyrics</span>
          </div>
        </h3>
      </div>
      <h4 className="poem-author">{poem.Poet.name}</h4>
      <div className="poem-trending-views-container">
        <div class="poem-trending-views"></div>
        <div className="poem-trending-views">
          <div className="poem-views-container">
            <div className="poem-views-icon">
              <svg viewBox="0 0 22 15.45">
                <path d="M11 2c4 0 7.26 3.85 8.6 5.72-1.34 1.87-4.6 5.73-8.6 5.73S3.74 9.61 2.4 7.73C3.74 5.86 7 2 11 2m0-2C4.45 0 0 7.73 0 7.73s4.45 7.73 11 7.73 11-7.73 11-7.73S17.55 0 11 0z"></path>
                <path d="M11 5a2.73 2.73 0 1 1-2.73 2.73A2.73 2.73 0 0 1 11 5m0-2a4.73 4.73 0 1 0 4.73 4.73A4.73 4.73 0 0 0 11 3z"></path>
              </svg>
            </div>
            <span className="poem-views-label">{poem.view_count}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PoemChartTile;
