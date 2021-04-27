import { Link } from "react-router-dom";
import "./stylesheets/PoemTile.css";

function PoemTile({ poem }) {
  return (
    <Link className="poem-item" to={`/poems/${poem.id}`}>
      <div className="poem-rank">1</div>
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
    </Link>
  );
}

export default PoemTile;
