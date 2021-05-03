import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PoemViewComments from "./PoemViewComments";
import {
  getAnnotations,
  postAnnotation,
  destroyAnnotation,
  updateAnnotation,
} from "../store/annotation";
import { getVotes, postVote } from "../store/annotationvotes";
import "./stylesheets/PoemViewBody.css";

function PoemViewBody({ poem }) {
  const [showAnnotationButton, setShowAnnotationButton] = useState(false);
  const [showAnnotationForm, setShowAnnotationForm] = useState(false);
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [annotation, setAnnotation] = useState("");
  const [currentAnnotationId, setCurrentAnnotationId] = useState(-1);
  const [yOffset, setYOffset] = useState(0);
  const [startPos, setStartPos] = useState(0);
  const [endPos, setEndPos] = useState(0);
  const sessionUser = useSelector((state) => state.session.user);
  const { poemId } = useParams();
  const dispatch = useDispatch();
  const annotationsSorted = useSelector((state) => {
    return state.annotation.list.map(
      (annotationId) => state.annotation[annotationId]
    );
  });

  const annotations = useSelector((state) => state.annotation);

  useEffect(() => {
    dispatch(getAnnotations(poemId));
  }, [dispatch, poemId]);

  useEffect(() => {
    dispatch(getVotes(currentAnnotationId));
  }, [dispatch, currentAnnotationId]);

  function hide(e) {
    if (e.target !== this) return;
    setShowAnnotationButton(false);
    setShowAnnotationForm(false);
    setShowAnnotation(false);
  }

  document.querySelector(".lyrics-container")?.addEventListener("click", hide);

  document
    .querySelector(".poem-comments-container")
    ?.addEventListener("click", (e) => {
      setShowAnnotationButton(false);
      setShowAnnotationForm(false);
      setShowAnnotation(false);
    });

  document
    .querySelector(".poem-body-background")
    ?.addEventListener("click", hide);

  document.querySelector(".annotation-flex")?.addEventListener("click", hide);

  const votes = useSelector((state) => state.annotationvote);
  const votesArray = Object.entries(votes).map((el) => el[1]);
  const votesSum = votesArray
    .filter((el) => el.annotation_id === annotations[currentAnnotationId].id)
    .map((el) => el.vote)
    .reduce((a, b) => a + b, 0);

  const hasUpvoted = votesArray.find(
    (el) =>
      el.annotation_id === annotations[currentAnnotationId].id &&
      el.user_id === sessionUser?.id &&
      el.vote > 0
  );

  const hasDownvoted = votesArray.find(
    (el) =>
      el.annotation_id === annotations[currentAnnotationId].id &&
      el.user_id === sessionUser?.id &&
      el.vote < 0
  );

  function handleVote(voteType) {
    if (sessionUser == null) return;
    const payload = {
      userId: sessionUser.id,
      annotationId: annotations[currentAnnotationId].id,
      voteType,
    };
    dispatch(postVote(payload));
  }

  const handleDelete = () => {
    dispatch(destroyAnnotation(annotations[currentAnnotationId].id));
    setShowAnnotation(false);
    setAnnotation("");
  };

  const handleSelection = (e) => {
    e.preventDefault();
    setShowAnnotation(false);
    const selection = window.getSelection();
    const docFrag = selection.getRangeAt(0).cloneContents();
    let containsAnchor = docFrag.querySelector(".annotated") ? true : false;

    getHighlightPositions(
      document.getElementsByClassName("lyrics-container")[0]
    );

    if (
      selection.toString() !== " " &&
      selection.toString().length > 0 &&
      !containsAnchor
    ) {
      setYOffset(e.pageY - 350);
      setShowAnnotationButton(true);
    } else {
      setShowAnnotationButton(false);
    }
  };

  function getHighlightPositions(element) {
    let start = 0;
    let end = 0;

    if (typeof window.getSelection !== "undefined") {
      const sel = window.getSelection(); // highlighted selection object, which represents the text selected by user
      // if there is a range in the selection
      if (sel.rangeCount > 0) {
        let range = window.getSelection().getRangeAt(0); // returns a range object which contains the startOffset and endOffset
        let preCaretRange = range.cloneRange(); // clone the range to not mutate the original range

        preCaretRange.selectNodeContents(element); // sets the cloned range to contain the contents of the element, startOffset = 0, endOffset = the number of child nodes in the element
        preCaretRange.setEnd(range.startContainer, range.startOffset); // sets the end position of the range to the number of characters from the start of the start container to the boundary point of the range
        start = preCaretRange.toString().length; // sets the start position to the length of the range in string form
        preCaretRange.setEnd(range.endContainer, range.endOffset); // sets the end position of the range to the number of characters from the start of the endContainer to the boundary point of the range
        end = preCaretRange.toString().length; // sets the end position to the length of the range in string form
      }
    }

    setStartPos(start);
    setEndPos(end);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUser.id,
      body: annotation,
      poemId: poemId,
      startPos,
      endPos,
    };

    const newAnnotation = await dispatch(postAnnotation(payload));
    setAnnotation("");
    setShowAnnotationForm(false);
    setShowAnnotationButton(false);
    setCurrentAnnotationId(newAnnotation.id);
    setShowAnnotation(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUser.id,
      body: annotation,
      annotationId: annotations[currentAnnotationId].id,
    };
    dispatch(updateAnnotation(payload));
    setAnnotation("");
    setShowEditForm("");
    setShowAnnotation(true);
  };

  const createSections = () => {
    let str = poem?.body || "";
    let curIdx = 0;
    let lyrics = [];
    annotationsSorted.forEach((annotation, i) => {
      if (annotation.start_pos > curIdx) {
        lyrics.push(
          <span
            key={`not-annotated-${i}`}
            className="not-annotated"
            onMouseUp={handleSelection}
            onMouseDown={() => {
              setShowAnnotationButton(false);
            }}
          >
            {str.substring(curIdx, annotation.start_pos)}
          </span>
        );
      }
      lyrics.push(
        <span
          key={annotation.id}
          className="annotated"
          onClick={(e) => {
            setCurrentAnnotationId(annotation.id);
            setShowAnnotation(true);
            setShowAnnotationButton(false);
            setShowAnnotationForm(false);
            setShowEditForm(false);
            setYOffset(e.pageY - 400);
          }}
        >
          {str.substring(annotation.start_pos, annotation.end_pos)}
        </span>
      );
      curIdx = annotation.end_pos;
    });
    lyrics.push(
      <span
        key={"not-annotated"}
        className="not-annotated"
        onMouseUp={handleSelection}
      >
        {str.substring(curIdx, str.length)}
      </span>
    );
    return lyrics;
  };

  if (!poem) {
    return <div></div>;
  } else {
    return (
      <div className="poem-body-background">
        <div className="poem-body-container">
          <div className="poem-main-body">
            <div className="poem-lyrics">
              <h2>{poem.title} lyrics</h2>
              <div className="lyrics">
                <p className="lyrics-container">
                  {createSections().map((el) => el)}
                </p>
              </div>
              <PoemViewComments />
            </div>
          </div>
          <div className="annotation-body-container">
            {showAnnotationButton && (
              <div className="annotation-flex">
                <div
                  className="annotation-animate"
                  style={{ position: "relative", top: `${yOffset}px` }}
                >
                  <div className="annotation-unit">
                    {!sessionUser && (
                      <Link to="/signup">
                        <button className="annotation-signup-button">
                          Sign Up to Start Annotating
                        </button>
                      </Link>
                    )}
                    {sessionUser && !showAnnotationForm && (
                      <button
                        className="annotation-signup-button"
                        onClick={() => setShowAnnotationForm(true)}
                      >
                        Start a Muse Annotation
                      </button>
                    )}
                    {sessionUser && showAnnotationForm && (
                      <form className="annotation-form" onSubmit={handleSubmit}>
                        <div className="annotation-form-textarea">
                          <textarea
                            value={annotation}
                            onChange={(e) => setAnnotation(e.target.value)}
                            rows="8"
                            placeholder="Don't just put the lyric in your own words—drop some knowledge!"
                          ></textarea>
                        </div>
                        <hr />
                        <div className="annotation-form-buttons">
                          <span>
                            <button className="annotation-save" type="submit">
                              Save
                            </button>
                          </span>
                          <button
                            className="annotation-cancel"
                            onClick={(e) => {
                              // e.preventDefault();
                              setShowAnnotationForm(false);
                              setShowAnnotationButton(false);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}
            {showAnnotation && (
              <div className="annotation-flex">
                <div
                  className="annotation-animate"
                  style={{ position: "relative", top: `${yOffset}px` }}
                >
                  <div className="annotation-unit">
                    <div className="annotation-label">
                      <span>Muse Annotation by </span>
                      <span className="annotation-label-underline">
                        <Link
                          to={`/users/${annotations[currentAnnotationId].User.id}`}
                        >
                          {annotations[currentAnnotationId].User.username}
                        </Link>
                      </span>
                    </div>
                    {!showEditForm && (
                      <>
                        <div className="annotation-body">
                          {annotations[currentAnnotationId].body}
                        </div>
                        <div className="annotation-edit_and_delete">
                          <button
                            onClick={() => {
                              setShowEditForm(true);
                              setAnnotation(
                                annotations[currentAnnotationId].body
                              );
                            }}
                          >
                            Edit
                          </button>
                          <button onClick={handleDelete}>Delete</button>
                        </div>
                      </>
                    )}
                    {showEditForm && (
                      <form className="annotation-form" onSubmit={handleEdit}>
                        <div className="annotation-form-textarea">
                          <textarea
                            value={annotation}
                            onChange={(e) => setAnnotation(e.target.value)}
                            rows="8"
                          ></textarea>
                        </div>
                        <hr />
                        <div className="annotation-form-buttons">
                          <span>
                            <button className="annotation-save" type="submit">
                              Save
                            </button>
                          </span>
                          <button
                            className="annotation-cancel"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowEditForm(false);
                              setShowAnnotationButton(false);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                    <div className="annotation-votes-container">
                      <div className="annotations-votes">
                        <div
                          className={`upvote ${
                            hasUpvoted ? "has-upvoted" : ""
                          }`}
                          onClick={() => handleVote("upvote")}
                        >
                          <svg
                            src="thumbs_up.svg"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 21.62 21.36"
                          >
                            <path d="M16.52 21.29H6V8.5l.84-.13a3.45 3.45 0 0 0 1.82-1.09 13.16 13.16 0 0 0 .82-1.85c1.06-2.69 2-4.78 3.52-5.31a2.06 2.06 0 0 1 1.74.17c2.5 1.42 1 5 .16 6.95-.11.27-.25.6-.31.77a.78.78 0 0 0 .6.36h4.1a2.29 2.29 0 0 1 2.37 2.37c0 .82-1.59 5.4-2.92 9.09a2.39 2.39 0 0 1-2.22 1.46zm-8.52-2h8.56a.48.48 0 0 0 .31-.17c1.31-3.65 2.73-7.82 2.79-8.44 0-.22-.1-.32-.37-.32h-4.1A2.61 2.61 0 0 1 12.54 8 4.29 4.29 0 0 1 13 6.46c.45-1.06 1.64-3.89.7-4.43-.52 0-1.3 1.4-2.38 4.14a10 10 0 0 1-1.13 2.38A5.28 5.28 0 0 1 8 10.11zM0 8.4h4.86v12.96H0z"></path>
                          </svg>
                        </div>
                        <div
                          className={`vote-sum ${
                            votesSum > 0
                              ? "vote-positive"
                              : votesSum < 0
                              ? "vote-negative"
                              : ""
                          }`}
                        >
                          {votesSum > 0
                            ? `+${votesSum}`
                            : votesSum === 0
                            ? ``
                            : `${votesSum}`}
                        </div>
                        <div
                          className={`downvote ${
                            hasDownvoted ? "has-downvoted" : ""
                          }`}
                          onClick={() => handleVote("downvote")}
                        >
                          <svg
                            src="thumbs_down.svg"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 21.62 21.36"
                          >
                            <path d="M8 21.36a2.12 2.12 0 0 1-1.06-.29c-2.5-1.42-1-5-.16-6.95.11-.27.25-.6.31-.77a.78.78 0 0 0-.6-.36H2.37A2.29 2.29 0 0 1 0 10.64c0-.82 1.59-5.4 2.92-9.09A2.39 2.39 0 0 1 5.1.07h10.56v12.79l-.84.13A3.45 3.45 0 0 0 13 14.08a13.16 13.16 0 0 0-.82 1.85c-1.06 2.69-2 4.79-3.49 5.31a2.06 2.06 0 0 1-.69.12zM5.1 2.07a.48.48 0 0 0-.31.17C3.48 5.89 2.07 10.06 2 10.68c0 .22.1.32.37.32h4.1a2.61 2.61 0 0 1 2.61 2.4 4.29 4.29 0 0 1-.48 1.51c-.46 1.09-1.65 3.89-.7 4.42.52 0 1.3-1.4 2.38-4.14a10 10 0 0 1 1.13-2.38 5.27 5.27 0 0 1 2.25-1.56V2.07zM16.76 0h4.86v12.96h-4.86z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PoemViewBody;
