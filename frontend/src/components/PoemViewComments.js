import React, { useEffect, useState } from "react";
import "./stylesheets/PoemViewComments.css";
import CommentContainer from "./CommentContainer";
import { useDispatch, useSelector } from "react-redux";
import { postComment, getComments } from "../store/comments";
import { useParams } from "react-router-dom";

function PoemViewComments() {
  const { poemId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => {
    return state.comment.list.map((commentId) => state.comment[commentId]);
  });

  const [body, setBody] = useState("");

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getComments(poemId));
  }, [dispatch, poemId]);

  const commentComponents = comments.map((comment) => {
    return <CommentContainer key={comment.id} comment={comment} />;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: user.id,
      body,
      poemId,
    };

    dispatch(postComment(payload));
    setBody("")
  };

  return (
    <div className="poem-comments-vertical">
      <div className="poem-comments-container">
        <form onSubmit={handleSubmit}>
          <div className="poem-form-vertical">
            <div className="poem-form-flex">
              <div className="poem-text-container">
                <textarea
                  required
                  placeholder="Add a comment"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="poem-form-button">
            <button type="submit">Submit</button>
          </div>
        </form>
        <div className="poem-comments-list">
          <div className="individual-comment-container">
            {commentComponents}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoemViewComments;
