import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,

  SIGNIN_SUCCESS,
  SIGNIN_ERROR,

  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,

  PROCESSING
} from "./actionTypes";

import firebase from "../../firebase";


// Sign Up action creators

const processing = (flag) => {
  return {
    type: PROCESSING,
    flag
  }
}

// Sign Up action creators

const receiveSignUp = () => {
  return {
    type: SIGNUP_SUCCESS
  }
}

const signUpError = (errorMsg) => {
  return {
    type: SIGNUP_ERROR,
    errorMsg
  }
}

// Signing up with Firebase
export const signup = (email, password, firstName, lastName) => async (dispatch, getState, getFirebase) => {
  try {
    const db = firebase.firestore();
    dispatch(processing(true));
    getFirebase()
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        getFirebase().auth().onAuthStateChanged(function(user) {
          db
          .collection("users")
          .doc(user.uid)
          .set({
            "firstName": firstName,
            "lastName": lastName,
            "displayName": firstName + " " + lastName
          })
          dispatch(processing(false));
          dispatch(receiveSignUp())
        });
      })
      .catch(function(error) {
        dispatch(processing(false));
        dispatch(signUpError(error.message));
      });
  } catch (error) {
    dispatch(processing(false));
    dispatch(signUpError(error.message));
  }
}

// Sign In

const receiveLogin = () => {
  return {
    type: SIGNIN_SUCCESS
  };
};

const loginError = (errorMsg) => {
  return {
    type: SIGNIN_ERROR,
    errorMsg
  };
};

// Signing in with Firebase
export const signinEmailPassword = (email, password) => async (dispatch, getState, getFirebase) => {
  try {
    dispatch(processing(true));
    getFirebase()
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        if (data.user) {
          dispatch(processing(false));
          dispatch(receiveLogin());
        }
      })
      .catch((error) => {
        dispatch(processing(false));
        if (error.code === "auth/user-not-found"){
          dispatch(loginError("There is no user record corresponding to this account."));
        } else if (error.code === "auth/wrong-password") {
          dispatch(loginError("Wrong email-password combination."));
        } else {
          dispatch(loginError("Failed to login"));
        }

        
      });
  } catch (error) {
    dispatch(processing(false));
    dispatch(loginError(error.message));
  }
};

// Sign Out
const receiveLogout = () => {
  return {
    type: SIGNOUT_SUCCESS
  };
};

const logoutError = (errorMsg) => {
  return {
    type: SIGNOUT_ERROR,
    errorMsg

  };
};

// Signing out with Firebase
export const signout = () => async (dispatch, getState, getFirebase) => {
  try {
    getFirebase()
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch((error) => {
      dispatch(processing(false));
      dispatch(logoutError(error.message));
    });
  } catch (err) {
    dispatch(logoutError("Failed to sign-out"));
  }
};


export const googleSignIn = () => async (dispatch, getState, getFirebase) => {

  dispatch(processing(true));
  try {
    getFirebase()
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((result) => {
      dispatch(processing(false));
      dispatch(receiveLogin());
    });
  
  } catch (error) {
    dispatch(processing(false));
    dispatch(loginError(error.message));
  }
}
