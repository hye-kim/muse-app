export const GET_ALL_POEMS = "poems/GET_ALL_POEMS";
export const GET_POEM = "poems/GET_POEM";

const getAllPoems = (poems) => ({
  type: GET_ALL_POEMS,
  poems,
});

const getPoem = (poem) => ({
  type: GET_POEM,
  poem,
});

export const getOnePoem = (poemId) => async (dispatch) => {
  const res = await fetch(`/api/poems/${poemId}`);

  if (res.ok) {
    const poem = await res.json();
    dispatch(getPoem(poem));
    return poem;
  }
};

export const getPoems = () => async (dispatch) => {
  const res = await fetch(`/api/poems/`);

  if (res.ok) {
    const poems = await res.json();
    dispatch(getAllPoems(poems));
  }
};

const initialState = { list: [] };

const sortPoems = (poems) => {
  return poems
    .sort((poemA, poemB) => {
      return poemB.view_count - poemA.view_count;
    })
    .map((poem) => poem.id);
};

const poemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POEMS: {
      const allPoems = {};
      action.poems.forEach((poem) => {
        allPoems[poem.id] = poem;
      });
      return {
        ...state,
        ...allPoems,
        list: sortPoems(action.poems),
      };
    }
    case GET_POEM: {
      return {
        ...state,
        [action.poem.id]: {
          ...state[action.poem.id],
          ...action.poem,
        },
      };
    }
    default:
      return state;
  }
};

export default poemReducer;
