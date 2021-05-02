import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./stylesheets/ProfileContributionTile.css";

function ProfileContributionTile({ contribution, user }) {
  const poem = useSelector((state) => state.poem[contribution.poem_id]);
  let timestamp = contribution.updatedAt;
  let timestampTime = new Date(Date.parse(timestamp));
  let formattedTime;
  let currentTime = new Date();

  let yearsDiff = currentTime.getFullYear() - timestampTime.getFullYear();
  let monthsDiff = currentTime.getMonth() - timestampTime.getMonth();
  let daysDiff = currentTime.getDate() - timestampTime.getDate();
  let hoursDiff = currentTime.getHours() - timestampTime.getHours();
  let minutesDiff = currentTime.getMinutes() - timestampTime.getMinutes();

  if (yearsDiff === 0) {
    if (monthsDiff === 0) {
      if (daysDiff === 0) {
        if (hoursDiff === 0) {
          formattedTime =
            minutesDiff < 3
              ? "a few minutes ago"
              : `${minutesDiff} minutes ago`;
        } else {
          formattedTime =
            hoursDiff < 2 ? "1 hour ago" : `${hoursDiff} hours ago`;
        }
      } else {
        formattedTime =
          daysDiff === 1 ? daysDiff + " day ago" : daysDiff + " days ago";
      }
    } else {
      formattedTime =
        monthsDiff < 2 ? "1 month ago" : `${monthsDiff} months ago`;
    }
  } else {
    formattedTime = yearsDiff < 2 ? "1 year ago" : `${yearsDiff} years ago`;
  }

  return (
    <div>
      <Link
        to={`/poems/${contribution.poem_id}`}
        className="profile-contribution-tile"
      >
        <div className="tile-content">
          <div className="tile-header">
            <span>{`${user.username} ${contribution.createdAt !== contribution.updatedAt ? "updated" : "added"} ${
              contribution.type === "annotation" ? "an annotation" : "a comment"
            } to a poem: `}</span>
            <span className="tile-timestamp">{formattedTime}</span>
          </div>
          <div className="tile-content-target">{`${poem.title} by ${poem.Poet.name}`}</div>
          <div className="tile-content-text">
            <p>{contribution.body}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProfileContributionTile;
