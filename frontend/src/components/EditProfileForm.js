import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/users";
import "./stylesheets/EditProfileForm.css";

function EditProfileForm({ user, handleCloseModal }) {
  const [about, setAbout] = useState(user.about);
  const [picture, setPicture] = useState(user.picture);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      about,
      picture,
      userId: user.id,
    };
    dispatch(updateUser(payload));
  };

  return (
    <div className="profile-edit-container">
      <div className="column-primary">
        <div className="profile-edit-label">Edit User Profile</div>
      </div>
      <div className="column-secondary">
        <div className="profile-form-container">
          <form onSubmit={handleSubmit}>
            <div className="profile-form-label">Change Avatar</div>
            <input
              type="text"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
            <div className="profile-form-label">Change Bio</div>
            <textarea
              rows="5"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
            <div className="edit-form-buttons">
              <span>
                <button className="edit-save" type="submit">
                  Save
                </button>
              </span>
              <button className="edit-cancel" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfileForm;
