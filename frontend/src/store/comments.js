import { csrfFetch } from "./csrf";

export const GET_ALL_COMMENTS = "comments/GET_ALL_COMMENTS";
const CREATE_COMMENT = "comments/CREATE_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

const getAllComments = (comments) => ({
  type: GET_ALL_COMMENTS,
  comments,
});

export const createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment,
});

export const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId
})

export const getComments = (poemId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${poemId}`);

  if (res.ok) {
    const comments = await res.json();
    dispatch(getAllComments(comments));
  }
};

export const postComment = (payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/poems/${payload.poemId}/comments`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const comment = await res.json();
    dispatch(createComment(comment));
  }
};

export const destroyComment = (commentId) => async dispatch => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
    method: "delete",
  })

  if (res.ok) {
    dispatch(deleteComment(commentId))
  }
}

const initialState = { list: [] };

const sortComments = (comments) => {
  return comments
    .sort((commentA, commentB) => {
      return new Date(commentB.createdAt) - new Date(commentA.createdAt);
    })
    .map((comment) => comment.id);
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS: {
      const allComments = {};
      action.comments.forEach((comment) => {
        allComments[comment.id] = comment;
      });
      return {
        ...allComments,
        ...state,
        list: sortComments(action.comments),
      };
    }
    case CREATE_COMMENT: {
      if (!state[action.comment.id]) {
        const newState = {
          ...state,
          [action.comment.id]: action.comment,
        };
        const commentList = newState.list.map((id) => newState[id]);
        commentList.push(action.comment);
        newState.list = sortComments(commentList);
        return newState;
      }
      return {
        ...state,
        [action.comment.id]: {
          ...state[action.comment.id],
          ...action.comment,
        },
      };
    }
    case DELETE_COMMENT: {
      const newState = {...state}
      delete newState[action.commentId]
      newState.list = newState.list.filter(id => id !== action.commentId)
      return newState
    }
    default:
      return state;
  }
};

export default commentReducer;
