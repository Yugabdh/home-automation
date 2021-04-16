import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./redux/reducers";

import thunk from 'redux-thunk';
import { getFirebase } from 'react-redux-firebase';

function configureStore(initialState) {
  const middlewares = [
    thunk.withExtraArgument(getFirebase)
  ]

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  return store;
}

export default configureStore;