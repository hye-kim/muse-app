import { csrfFetch } from "./csrf";

const VOTE_ANNOTATION = "votes/VOTE_ANNOTATION";
const GET_ALL_VOTES_ANNOTATION = "votes/GET_VOTE_ANNOTATION";

const createVote = (vote) => ({
  type: VOTE_ANNOTATION,
  vote,
});

export const getAllVotes = (votes) => ({
  type: GET_ALL_VOTES_ANNOTATION,
  votes,
});

export const postVote = (payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/annotations/${payload.annotationId}/votes`, {
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

export const getVotes = (annotationId) => async (dispatch) => {
  const res = await fetch(`/api/annotations/${annotationId}/votes`);

  if (res.ok) {
    const votes = await res.json();
    dispatch(getAllVotes(votes));
  }
};

const initialState = {};

const poemCommentVoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case VOTE_ANNOTATION:
      const newState = {
        ...state,
        [action.vote.id]: action.vote,
      };
      return newState;
    case GET_ALL_VOTES_ANNOTATION: {
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
