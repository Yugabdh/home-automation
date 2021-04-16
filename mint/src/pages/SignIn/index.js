import React from "react";
import { Link, Redirect } from 'react-router-dom';

import SignInForm from "./SignInForm";

import { isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";

function SignUpPage() {
  const auth = useSelector(state => state.firebase.auth);
  
  if(isLoaded(auth) && !isEmpty(auth)) {
    return <Redirect to="/home" />;
  } else {
    return (
      <section className="spad-3 signform">
        <div className="container holder">
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-12 col-xl-10">
              <div className="card shadow-lg o-hidden border-0 my-5">
                <div className="card-body p-0">
                  <div className="row no-gutters">
                    <div className="col-lg-6 d-none d-lg-flex">
                      <div className="flex-grow-1 bg-register-image"></div>
                    </div>
                    <div className="col-lg-6">
                      <div className="p-5 form-container">
                        <div className="text-center">
                          <h4 className="mb-4">Welcome Back!</h4>
                        </div>
                        <SignInForm />
                        <div className="text-center">
                          <Link className="small" to="/sign-up">Create an Account!</Link>
                        </div>
                      </div>
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