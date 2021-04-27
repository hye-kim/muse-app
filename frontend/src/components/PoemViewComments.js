import React from "react";
import { Link } from "react-router-dom";
import "./stylesheets/PoemViewComments.css";

function PoemViewComments() {
  return (
    <div className="poem-comments-vertical">
      <div className="poem-comments-container">
        <form action="">
          <div className="poem-form-vertical">
            <div className="poem-form-flex">
              <div className="poem-text-container">
                <textarea placeholder="Add a comment"></textarea>
              </div>
            </div>
          </div>
          <div className="poem-form-button">
            <button type="submit">Submit</button>
          </div>
        </form>
        <div className="poem-comments-list">
          <div className="individual-comment-container">
            <div className="actual-comment">
              <div className="user-pic-timestamp-container">
                <div className="user-pic-timestamp">
                    <Link to="/users/1">
                        <div className="user-pic" style={{"backgroundImage": `url(https://assets.genius.com/images/default_avatar_32.png?1619473314)`}}>
                        </div>
                        <div className="user-info">
                            <div className="user-name-mu">
                                <span>
                                    monsterette {" "}
                                </span>
                                <span className="user-mu">
                                    193
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoemViewComments;
