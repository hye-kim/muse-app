import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./stylesheets/ProfileContributionTile.css"

function ProfileContributionTile({annotation, user}) {
const poem = useSelector(state => state.poem[annotation.poem_id])
  return (
    <div>
      <Link to={`/poems/${annotation.poem_id}`} className="profile-contribution-tile">
          <div className="tile-content">
              <span>{`${user.username} added an annotation to a poem: `}</span>
              <div className="tile-content-target">{`${poem.title} by ${poem.Poet.name}`}</div>
              <div className="tile-content-text">
                      <p>{annotation.body}</p>
              </div>
          </div>
      </Link>
    </div>
  );
}

export default ProfileContributionTile;
