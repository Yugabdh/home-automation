import React from "react";

// Provider makes redux store available for connect call
import { Provider } from "react-redux";

// For redux firebase context
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import configureStore from "./configureStore";

import firebase from "./firebase/";

const rrfConfig = {
  userProfile: "users", // This collection will be created in firestore
  useFirestoreForProfile: true,
};

const initialState = {};

const store = configureStore(initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};

function Root() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        {...rrfProps}
      >
        <Router>
          <App />
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default Root;