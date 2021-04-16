import { combineReducers } from "redux";

// Firebase addons
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import authReducer from "./auth";

// Combined root reducer
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  authReducer: authReducer
});

export default rootReducer;