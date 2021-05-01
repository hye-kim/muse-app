import { csrfFetch } from "./csrf";

const GET_ALL_ANNOTATIONS = "annotations/GET_ALL_ANNOTATIONS";
const CREATE_ANNOTATION = "annotations/CREATE_ANNOTATION";

const getAllAnnotations = (annotations) => ({
  type: GET_ALL_ANNOTATIONS,
  annotations,
});

const createAnnotation = (annotation) => ({
  type: CREATE_ANNOTATION,
  annotation,
});

export const getAnnotations = (poemId) => async (dispatch) => {
  const res = await fetch(`/api/annotations/${poemId}`);

  if (res.ok) {
    const annotations = await res.json();
    dispatch(getAllAnnotations(annotations));
  }
};

export const postAnnotation = (payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/annotations/${payload.poemId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    const annotation = await res.json();
    dispatch(createAnnotation(annotation));
  }
};

const initialState = { list: [] };

const sortAnnotations = (annotations) => {
  return annotations
    .sort((annotationA, annotationB) => {
      return annotationA.start_pos - annotationB.start_pos;
    })
    .map((annotation) => annotation.id);
};

const annotationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ANNOTATIONS: {
      const allAnnotations = {};
      action.annotations.forEach((annotation) => {
        allAnnotations[annotation.id] = annotation;
      });
      return {
        ...allAnnotations,
        ...state,
        list: sortAnnotations(action.annotations),
      };
    }
    case CREATE_ANNOTATION: {
      if (!state[action.annotation.id]) {
        const newState = {
          ...state,
          [action.annotation.id]: action.annotation,
        };
        const annotationList = newState.list.map((id) => newState[id]);
        annotationList.push(action.annotation);
        newState.list = sortAnnotations(annotationList);
        return newState;
      }
      return {
        ...state,
        [action.annotation.id]: {
          ...state[action.annotation.id],
          ...action.annotation,
        },
      };
    }
    default:
      return state;
  }
};

export default annotationReducer;
