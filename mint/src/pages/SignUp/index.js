import React from "react";
import { Link, Redirect } from 'react-router-dom';

import { isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";

import SignUpForm from "./SignUpForm";
function SignUpPage() {
  const auth = useSelector(state => state.firebase.auth);
  if (isLoaded(auth) && !isEmpty(auth)) {
    return <Redirect to="/home" />;
  } else {
    return (
      <section className="spad-3 signform">
        <div className="container holder">
          <div className="card shadow-lg o-hidden border-0 my-1">
            <div className="card-body p-0">
              <div className="row no-gutters">
                <div className="col-lg-5 d-none d-lg-flex">
                  <div className="flex-grow-1 bg-register-image"></div>
                </div>
                <div className="col-lg-7">
                  <div className="p-5 form-container">
                    <div className="text-center">
                      <h4 className="mb-4">Create an Account!</h4>
                    </div>
                    <SignUpForm />
                    <div className="text-center">
                      <Link className="small" to="/sign-in">Already have an account? Login!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SignUpPage;