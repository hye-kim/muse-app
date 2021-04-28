import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as sessionActions from "../store/session";
import "./stylesheets/ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let profilePic;

  if (user.picture) {
    profilePic = <div className="profile-button-pic" style={{ backgroundImage: `url(${user.picture})` }}></div>;
  } else {
    profilePic = <i className="fas fa-user-circle" />;
  }

  return (
    <>
      <div className="profile-button">
        <div onClick={openMenu}>
          {profilePic}
        </div>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <span>Account</span>
          </div>
          <Link to={`/users/${user.id}`}>View Profile</Link>
          <Link onClick={logout}>Sign Out</Link>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
