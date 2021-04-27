export const LOAD = "poems/LOAD";

const load = (list) => ({
  type: LOAD,
  list,
});

// export const getOnePoem = (poemId) => async (dispatch) => {
//   const res = await fetch(`/api/poems/${poemId}`);

//   if (res.ok) {
//     const poem = await res.json();
//     dispatch(getPoem(poem));
//     return poem;
//   }
// };

export const getPoems = () => async (dispatch) => {
  const res = await fetch(`/api/poems/`);

  if (res.ok) {
    const list = await res.json();
    dispatch(load(list));
  }
};

const initialState = {};

const poemReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allPoems = {};
      action.list.forEach((poem) => {
        allPoems[poem.id] = poem;
      })
      return {
        ...allPoems,
        ...state,
      }
    }
    default:
      return state;
  }
};

export default poemReducer;
