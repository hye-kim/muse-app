import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./stylesheets/Navbar.css";
import * as sessionActions from "../store/session";

function Navbar({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <div className="right">
        <div className="auth-links">
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/login">Sign In</NavLink>
          {/* <LoginFormModal /> */}
          <Link to="" onClick={() => dispatch(sessionActions.loginDemo())}>Demo</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar">
      <form action="/search" method="get" className="search">
        <input type="text" placeholder="Search poems & more" />
        <div>
          <i className="fas fa-search"></i>
        </div>
      </form>
      <NavLink exact to="/" activeClassName="" className="logo">
        MUSE
      </NavLink>
      {isLoaded && sessionLinks}
    </div>
  );
}

export default Navbar;
