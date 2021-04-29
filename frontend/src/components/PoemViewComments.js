import React, { useEffect, useState } from "react";
import "./stylesheets/PoemViewComments.css";
import CommentContainer from "./CommentContainer";
import { useDispatch, useSelector } from "react-redux";
import { postComment, getComments } from "../store/comments";
import { useParams } from "react-router-dom";

function PoemViewComments() {
  const { poemId } = useParams();
  const dispatch = useDispatch();

  const [numComments, setNumComments] = useState(5);

  const comments = useSelector((state) => {
    return state.comment.list.map((commentId) => state.comment[commentId]);
  });

  const sessionUser = useSelector((state) => state.session);

  const [body, setBody] = useState("");

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getComments(poemId));
  }, [dispatch, poemId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      userId: user.id,
      body,
      poemId,
    };

    dispatch(postComment(payload));
    setBody("");
  };

  return (
    <div className="poem-comments-vertical">
      <div className="poem-comments-container">
        {sessionUser.user && (
          <form action="" onSubmit={handleSubmit}>
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
        )}
        <div className="poem-comments-list">
          <div className="individual-comment-container">
            {comments.slice(0, numComments).map((comment) => (
              <CommentContainer key={comment.id} comment={comment} />
            ))}
          </div>
          {comments.length > numComments ? (
            <div style={{ marginTop: "1rem" }}>
              <span
                className="show-more-comments"
                onClick={() => setNumComments(numComments + 5)}
              >
                Show More ({comments.length - numComments})
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default PoemViewComments;
