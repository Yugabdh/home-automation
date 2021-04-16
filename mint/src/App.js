import './assets/style/style.scss';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Provider makes redux store available for connect call
import { Provider } from "react-redux";
// For redux firebase context
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import configureStore from "./configureStore";

import firebase from "./firebase";

import NavbarPage from './components/NavbarPage';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import SigninPage from './pages/SignIn';
import SignupPage from './pages/SignUp';

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


function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps} >
        <Router>
          <header>
            <NavbarPage/>
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={SigninPage} />
              <ProtectedRoute
                path="/home"
              >
                <HomePage />
              </ProtectedRoute>
              <Route path="/sign-in" component={SigninPage} />
              <Route path="/sign-up" component={SignupPage} /> 
            </Switch>
          </main>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;