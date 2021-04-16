import React from 'react';
import { connect, useDispatch } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';


import Loader from './Loader';
import logo from '../assets/img/svg/logo.svg';

import { signout } from "../redux/actions/auth";

const NavbarPage = ({ auth }) => {
  const dispatch = useDispatch();
  return (
    <Navbar bg="light" expand="lg" fixed="top" className="shadow-sm py-3" animation="false">
      <div className="container">
        <Navbar.Brand>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />{' '}Mint
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse animation="false" id="basic-navbar-nav">
          <Nav className="ml-auto">
            {
              !auth.isLoaded ? <Loader /> : 
              !auth.isEmpty ? 
              <>
                <LinkContainer to="/home">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <button className="btn btn-primary btn-custom" type="button" onClick={(e) => dispatch(signout())}> Logout </button>
              </> : 
              <>
                <LinkContainer to="/sign-in">
                  <Nav.Link>Sign in</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/sign-up">
                  <Nav.Link>Sign up</Nav.Link>
                </LinkContainer>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.firebase.auth
  };
}

export default connect(mapStateToProps)(NavbarPage);