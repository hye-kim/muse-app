import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { destroyComment } from "../store/comments";
import "./stylesheets/CommentContainer.css";

function CommentContainer({ comment }) {
  const sessionUser = useSelector((state) => state.session.user);

  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleDelete = () => {
    dispatch(destroyComment(comment.poem_id, comment.id))
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  let timestamp = comment.createdAt;
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

  if (comment.User) {
    return (
      <div className="comment-container">
        <div className="user-pic-timestamp-container">
          <div className="user-pic-timestamp">
            <Link to={`/users/${comment.User.id}`}>
              <div
                className="user-pic"
                style={{
                  backgroundImage: comment.User.picture ? `url(${comment.User.picture})` : `url(data:image/jpeg;base64,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)`
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
        <div>
          <div className="voting">
            <div className="upvote">
              <svg
                src="thumbs_up.svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 21.62 21.36"
              >
                <path d="M16.52 21.29H6V8.5l.84-.13a3.45 3.45 0 0 0 1.82-1.09 13.16 13.16 0 0 0 .82-1.85c1.06-2.69 2-4.78 3.52-5.31a2.06 2.06 0 0 1 1.74.17c2.5 1.42 1 5 .16 6.95-.11.27-.25.6-.31.77a.78.78 0 0 0 .6.36h4.1a2.29 2.29 0 0 1 2.37 2.37c0 .82-1.59 5.4-2.92 9.09a2.39 2.39 0 0 1-2.22 1.46zm-8.52-2h8.56a.48.48 0 0 0 .31-.17c1.31-3.65 2.73-7.82 2.79-8.44 0-.22-.1-.32-.37-.32h-4.1A2.61 2.61 0 0 1 12.54 8 4.29 4.29 0 0 1 13 6.46c.45-1.06 1.64-3.89.7-4.43-.52 0-1.3 1.4-2.38 4.14a10 10 0 0 1-1.13 2.38A5.28 5.28 0 0 1 8 10.11zM0 8.4h4.86v12.96H0z"></path>
              </svg>
            </div>
            <div className="downvote">
              <svg
                src="thumbs_down.svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 21.62 21.36"
              >
                <path d="M8 21.36a2.12 2.12 0 0 1-1.06-.29c-2.5-1.42-1-5-.16-6.95.11-.27.25-.6.31-.77a.78.78 0 0 0-.6-.36H2.37A2.29 2.29 0 0 1 0 10.64c0-.82 1.59-5.4 2.92-9.09A2.39 2.39 0 0 1 5.1.07h10.56v12.79l-.84.13A3.45 3.45 0 0 0 13 14.08a13.16 13.16 0 0 0-.82 1.85c-1.06 2.69-2 4.79-3.49 5.31a2.06 2.06 0 0 1-.69.12zM5.1 2.07a.48.48 0 0 0-.31.17C3.48 5.89 2.07 10.06 2 10.68c0 .22.1.32.37.32h4.1a2.61 2.61 0 0 1 2.61 2.4 4.29 4.29 0 0 1-.48 1.51c-.46 1.09-1.65 3.89-.7 4.42.52 0 1.3-1.4 2.38-4.14a10 10 0 0 1 1.13-2.38 5.27 5.27 0 0 1 2.25-1.56V2.07zM16.76 0h4.86v12.96h-4.86z"></path>
              </svg>
            </div>
          </div>
          {sessionUser?.id === comment.User.id && (
            <div className="delete-dropdown">
              <div className="delete" onClick={openMenu}>
                <svg
                  src="down_arrow.svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 21.32 10.91"
                >
                  <path d="M10.66 10.91L0 1.5 1.32 0l9.34 8.24L20 0l1.32 1.5-10.66 9.41"></path>
                </svg>
                {showMenu && (
                  <div className="delete-dropdown-menu">
                    <div className="delete-dropdown-content">
                      <span onClick={handleDelete}>Delete</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default CommentContainer;
