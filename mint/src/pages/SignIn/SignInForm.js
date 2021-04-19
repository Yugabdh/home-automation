import React from "react";
import { useState } from "react";

import { useSelector, useDispatch } from 'react-redux';

import { signinEmailPassword, googleSignIn } from "../../redux/actions/auth";
import { useHistory } from "react-router-dom";

import Loader from "../../components/Loader";

function SignInForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');

  const handleSubmit = (event) => {
    if (event){
      event.preventDefault();
    }
    dispatch(signinEmailPassword(email, password, () => history.push("/home")));
    setEmail('');
    setPassword('');
  }

  const loginWithGoogle = (event) => {
    if (event) {
      event.preventDefault();
    }
    dispatch(googleSignIn());
  }

  const errorMessages = useSelector((state) => state.authReducer.errorMsg);
  const processing = useSelector((state) => state.authReducer.flag);

  return (
    <form className="user" onSubmit={e => handleSubmit(e)}>
      <div className="form-group">
        <input 
          className="form-control form-control-user"
          type="email" id="email"
          aria-describedby="emailHelp"
          placeholder="Enter Email Address..."
          name="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
      </div>
      <div className="form-group">
        <input
          className="form-control form-control-user" 
          type="password"
          id="password" 
          placeholder="Password"
          name="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
      </div>

      { 
        errorMessages && (
          <p className="text-danger">
            {errorMessages}
          </p>
        )
      }

      <hr />
      <button
        className="btn btn-primary btn-block" 
        type="submit"
      >
        Login
      </button>
      <button className="btn btn-danger btn-block" onClick={loginWithGoogle}>
        { processing && (<Loader />)}
        <i className="fa fa-google"></i> Sign-in with Google
      </button>
    </form>
  )
}

export default SignInForm;