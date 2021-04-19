import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,

  SIGNIN_SUCCESS,
  SIGNIN_ERROR,

  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,

  PROCESSING
} from "../actions/actionTypes";

const INTIAL_STATE = {
  errorMsg: ""
};

export default function authReducer(state = INTIAL_STATE, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        errorMsg: action.errorMsg
      };
    
    case SIGNIN_SUCCESS:
      return {
        ...state
      };
    
    case SIGNIN_ERROR:
      return {
        ...state,
        errorMsg: action.errorMsg
      };

    case SIGNOUT_SUCCESS:
      return {
        ...state
      };
    
    case SIGNOUT_ERROR:
      return {
        ...state,
        errorMsg: action.errorMsg
      };

    case PROCESSING:
      return {
        ...state,
        flag: action.flag
      };

    default:
      return state;
  }
}