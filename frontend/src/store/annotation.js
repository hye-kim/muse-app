import { csrfFetch } from "./csrf";

const GET_ALL_ANNOTATIONS = "annotations/GET_ALL_ANNOTATIONS";
const CREATE_ANNOTATION = "annotations/CREATE_ANNOTATION";
const DELETE_ANNOTATION = "annotations/DELETE_COMMENT";

const getAllAnnotations = (annotations) => ({
  type: GET_ALL_ANNOTATIONS,
  annotations,
});

const createAnnotation = (annotation) => ({
  type: CREATE_ANNOTATION,
  annotation,
});

const deleteAnnotation = (annotationId) => ({
  type: DELETE_ANNOTATION,
  annotationId,
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

export const destroyAnnotation = (annotationId) => async (dispatch) => {
  const res = await csrfFetch(`/api/annotations/${annotationId}`, {
    method: "delete",
  });

  if (res.ok) {
    dispatch(deleteAnnotation(annotationId));
  }
};

export const updateAnnotation = (payload) => async dispatch => {
  const {annotationId} = payload
  const res = await csrfFetch(`/api/annotations/${annotationId}`, {
    method: "put",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })

  if (res.ok) {
    const annotation = await res.json()
    dispatch(createAnnotation(annotation))
  }
}

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
    case DELETE_ANNOTATION: {
      const newState = { ...state };
      delete newState[action.annotationId];
      newState.list = newState.list.filter((id) => id !== action.annotationId);
      return newState;
    }
    default:
      return state;
  }
};

export default annotationReducer;
