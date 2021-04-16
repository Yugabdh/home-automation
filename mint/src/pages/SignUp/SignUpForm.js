import React from "react";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { signup } from "../../redux/actions/auth";

function SignUpForm() {
  const dispatch = useDispatch();
  // Creating states
  const [ firstName, setFirstName] = useState('');
  const [ lastName, setLastName] = useState('');
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [ passwordRepeat, setPasswordRepeat] = useState('');

  const [ errorsForm, setErrorsForm ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRepeat: ''
  });

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!firstName) {
      isValid = false;
      errors["firstName"] = "Please enter your first-name.";
    }

    if (!lastName) {
      isValid = false;
      errors["lastName"] = "Please enter your last-name.";
    }

    if (!email) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof email !== "undefined") {
        
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    if (!password) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    if (typeof password !== "undefined") {
      if (password.length <= 7) {
        isValid = false;
        errors["password"] = "Password should be at least be 8 character long.";
      }
    }

    if (!passwordRepeat) {
      isValid = false;
      errors["passwordRepeat"] = "Please enter your password.";
    }

    if (typeof passwordRepeat !== "undefined") {
      if (password !== passwordRepeat) {
        isValid = false;
        errors["passwordRepeat"] = "Password should be same.";
      }
    }
    setErrorsForm({...errors});
    return isValid;
  }

  const handleSubmit = (event) => {
    if(event){
      event.preventDefault();
    }
    console.log(firstName, lastName, email, password, passwordRepeat)
    const val = validate();
    
    // Dispatch signup action
    if (val) {
      dispatch(signup(email, password, firstName, lastName));
      // Clear form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setPasswordRepeat('');
    }
  }

  const errorMessages = useSelector((state) => state.authReducer.errorMsg);

  // Like instance variable 
  const firstRender = useRef(true)
  useEffect(() => {
    // To avoid running on first render
    if (firstRender.current) {
      firstRender.current = false  // it's no longer the first render
      return // skip the code below
    }
    // Run our validation function
  }, [firstName, lastName, email, password, passwordRepeat])

  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <div className="form-group row">
          <div className="col-sm-6">
            <input
              className="form-control form-control-user" 
              type="text"
              id="firstName" 
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} 
              required
            />
            { errorsForm.firstName ? <div className="text-danger">{errorsForm.firstName}</div>: null }            
          </div>

          <div className="col-sm-6">
            <input 
              className="form-control form-control-user" 
              type="text"
              id="lastName" 
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            { errorsForm.lastName ? <div className="text-danger">{errorsForm.lastName}</div>: null }            
          </div>
        </div>

        <div className="form-group">
          <input
            className="form-control form-control-user" 
            type="email"
            id="email"
            aria-describedby="emailHelp" 
            placeholder="Email Address"
            name="email"
            value={ email }
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          { errorsForm.email ? <div className="text-danger">{errorsForm.email}</div>: null }
        </div>

        <div className="form-group row">
          <div className="col-sm-6">
            <input
              className="form-control form-control-user"
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={ password }
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            { errorsForm.password ? <div className="text-danger">{errorsForm.password}</div>: null }
          </div>
          <div className="col-sm-6">
            <input
              className="form-control form-control-user"
              type="password"
              id="passwordRepeat"
              placeholder="Repeat Password"
              name="passwordRepeat"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              required
            />
            { errorsForm.passwordRepeat ? <div className="text-danger">{errorsForm.passwordRepeat}</div>: null }
          </div>
        </div>

        { 
          errorMessages && (
            <p className="text-danger">
              {errorMessages}
            </p>
          )
        }

        <button className="btn btn-primary btn-block" type="submit">
          Register Account
        </button>
        <hr />
        <button className="btn btn-danger btn-block" type="button">
          <i className="fa fa-google"></i> Sign-in with Google
        </button>
      </form>
    </>
  );
}

export default SignUpForm;