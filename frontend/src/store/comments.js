export const GET_ALL_COMMENTS = "comments/GET_ALL_COMMENTS";
export const GET_COMMENT = "comments/GET_COMMENT";

const getAllComments = (comments) => ({
  type: GET_ALL_COMMENTS,
  comments,
});

// const getComment = (comment) => ({
//   type: GET_COMMENT,
//   comment,
// });

// export const getOneComment = (poemId, commentId) => async (dispatch) => {
//   const res = await fetch(`/api/poems/${poemId}`);

//   if (res.ok) {
//     const poem = await res.json();
//     dispatch(getComment(poem));
//     return poem;
//   }
// };

export const getComments = (poemId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${poemId}`);

  if (res.ok) {
    const comments = await res.json();
    dispatch(getAllComments(comments));
  }
};

const initialState = { list: [] };

const sortComments = (comments) => {
  return comments
    .sort((commentA, commentB) => {
      return commentB.created_At - commentA.created_At;
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
    // case GET_POEM: {
    //   return {
    //     ...state,
    //     [action.poem.id]: {
    //       ...state[action.poem.id],
    //       ...action.poem,
    //     },
    //   };
    // }
    default:
      return state;
  }
};

export default commentReducer;
