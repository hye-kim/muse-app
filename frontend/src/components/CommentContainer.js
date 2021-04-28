import React from "react";
import { Link } from "react-router-dom";
import "./stylesheets/CommentContainer.css";

function CommentContainer({ comment }) {
  const formatTime = (date) => {
    let hour = date.getHours();
    let minute = date.getMinutes();
    let newHour;
    let newMinute;

    if (minute <= 9) {
      newMinute = "0" + minute;
    } else {
      newMinute = minute;
    }

    if (hour > 12) {
      newHour = hour - 12;
      return newHour + ":" + newMinute + " PM";
    } else if (hour === 0) {
      return "12:" + newMinute + " AM";
    } else {
      newHour = hour;

      if (newHour === 12) {
        return newHour + ":" + newMinute + " PM";
      } else {
        return newHour + ":" + newMinute + " AM";
      }
    }
  };

  let timestamp = comment.createdAt;
  let timestampTime = new Date(Date.parse(timestamp));
  let formattedTime;
  let currentTime = new Date();

  let yearDiff = currentTime.getFullYear() - timestampTime.getFullYear();
  let monthDiff = currentTime.getMonth() - timestampTime.getMonth();
  let dateDiff = currentTime.getDate() - timestampTime.getDate();

  if (yearDiff === 0) {
    if (monthDiff === 0) {
      if (dateDiff === 0) {
        formattedTime = formatTime(timestampTime);
      } else {
        formattedTime =
          dateDiff === 1 ? dateDiff + " Day Ago" : dateDiff + " Days Ago";
      }
    } else if (monthDiff === 1) {
      let daysDiff =
        currentTime.getDate() - 0 + (30.4167 - timestampTime.getDate());

      if (daysDiff > 30.4167) {
        formattedTime = "1 Month Ago";
      } else {
        formattedTime = Math.round(daysDiff) + " Days Ago";
      }
    } else {
      formattedTime = monthDiff + " Months Ago";
    }
  } else {
    formattedTime =
      yearDiff === 1 ? yearDiff + " Year Ago" : yearDiff + " Years Ago";
  }

  if (comment.User) {
    return (
      <div className="comment-container">
        <div className="user-pic-timestamp-container">
          <div className="user-pic-timestamp">
            <Link to={`/users/${comment.User.id}`}>
              <div
                className="user-pic"
                style={{
                  backgroundImage: `url(${comment.User.picture})`,
                }}
              ></div>
              <div className="user-info">
                <div className="user-name-mu">
                  <span>{comment.User.username} </span>
                  <span className="user-mu">193</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="user-timestamp">
            <span>{formattedTime}</span>
          </div>
        </div>
        <div className="comment-content">
          <p>{comment.body}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div></div>
    )
  }
}

export default CommentContainer;
