import { csrfFetch } from "./csrf";

const VOTE_POEM_COMMENT = "votes/VOTE_POEM_COMMENT";
const GET_ALL_VOTES_POEM_COMMENT = "votes/GET_VOTE_POEM_COMMENT";

const createVote = (vote) => ({
  type: VOTE_POEM_COMMENT,
  vote,
});

export const getAllVotes = (votes) => ({
  type: GET_ALL_VOTES_POEM_COMMENT,
  votes,
});

export const postVote = (payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${payload.commentId}/votes`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const vote = await res.json();
    dispatch(createVote(vote));
  }
};

export const getVotes = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}/votes`);

  if (res.ok) {
    const votes = await res.json();
    dispatch(getAllVotes(votes));
  }
};

const initialState = {};

const poemCommentVoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case VOTE_POEM_COMMENT:
      const newState = {
        ...state,
        [action.vote.id]: action.vote,
      };
      return newState;
    case GET_ALL_VOTES_POEM_COMMENT: {
      const allVotes = {};
      action.votes.forEach((vote) => {
        allVotes[vote.id] = vote;
      });
      return {
        ...allVotes,
        ...state,
      };
    }
    default:
      return state;
  }
};

export default poemCommentVoteReducer;
