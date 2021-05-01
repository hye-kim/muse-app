import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import poemReducer from "./poems";
import commentReducer from "./comments";
import poemVoteReducer from "./poemvotes";
import annotationReducer from "./annotation"
import annotationVoteReducer from "./annotationvotes"

const rootReducer = combineReducers({
  session: sessionReducer,
  poem: poemReducer,
  comment: commentReducer,
  poemvote: poemVoteReducer,
  annotation: annotationReducer,
  annotationvote: annotationVoteReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
