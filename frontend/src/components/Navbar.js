import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import LoginFormModal from "../LoginFormModal";
import "./stylesheets/Navbar.css";

function Navbar({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

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
          <NavLink to="">Demo</NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar">
      <form action="/search" method="get" className="search">
        <input type="text" placeholder="Search poems & more" />
        <div>
          <i class="fas fa-search"></i>
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
