import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Modal } from "../context/Modal";
import ProfileContributionTile from "./ProfileContributionTile";
import "./stylesheets/UserProfile.css";
import EditProfileForm from "./EditProfileForm";
import { getAllUsers } from "../store/users";

function UserProfile() {
  const { userId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [numContributions, setNumContributions] = useState(5);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showContributions, setShowContributions] = useState(true);

  const user = useSelector((state) => state.user[userId]);
  const sessionUser = useSelector((state) => state.session.user);

  document.title = `${user?.username} | Muse`;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleCloseModal = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const openMenu = () => {
    if (showDropdown) return;
    setShowDropdown(true);
  };

  useEffect(() => {
    if (!showDropdown) return;

    const closeMenu = () => {
      setShowDropdown(false);
    };


    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showDropdown]);

  const contributions = [...user.Annotations, ...user.PoemComments];

  contributions.sort((contributionA, contributionB) => {
    return (
      new Date(contributionB.updatedAt) - new Date(contributionA.updatedAt)
    );
  });

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="banner-container">
          <div
            className="banner-image"
            style={{
              backgroundImage: `url(${
                user?.picture
                  ? user?.picture
                  : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUREhIWEBMXFRcTFxIQFRUVFhUWFxIYFxcaGBgYHSggGBomGxMXITEhJSkrLi4uGB8zODUtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcBAgj/xABEEAACAQIBBgoGBwcEAwAAAAAAAQIDBBEFEiExQVEGByIyYXGBkaGxE0JiwdHhFFJygrLi8CNDU5LC0vEkY5OiFTNz/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AO4gAAAAAB42B6eN4aXoI66yrFaIcp73q+ZFV7mU+c8fd2ATdbKdOOp532dXe9HcaNXLEvVil14v4EYANqeUKj9Z9mC8kjFK5m/Wl/NL4mIAfWez7jczXrS/ml8TEANqGUai9Z9uD80bVLLEvWin1Yr4kWALDRylTltzftau9aF2m2mVMzULqUOa8PLuAs4I60yrGWifJe/Z8iRTAAAAAAAAAAAAAYLy6VNYvXsW/wCQH1cXEYLGT7NrIK8v5T0aluWr5mG4uJTeLZiAAAAAAACQno5zUftNR8wAMP0ul/Fp/wDJD4maGnmtS+y1LyAAAAAABt2d/KGjXHc/duNQAWi3rxmsYvs2rrMpV7a4lB4plhtLlTWK17Vu+QGcAAAAAAPGwMdzXUI5z7FvZXLmu5vFmbKN1ny0aloX6/Ww1AAAAAAAV/hBwsoWzdNL09Za6cHhGH25bH0LT1Glw34TOivo1CWFZrlzWulFrQl7bXculnOEgJzKXC28rYr0voY/UochYdMuc+8hKjctMm5PfJuXmAB8eijuXcjJSm4vGEpQe+EnHyPABYMmcMrulgpTVxD6tbS8Oia0rxL5kDhHQu9EG4VUsXRqYZ2G1xa0TXV3HIz2E2mpRbjKLxjKLwcWtTT2MDuQK7wP4SfSoOFTBXEFjLDQqkfrxWx/WXbtLEAAAAy21dwlijEALRbV1OOcu7czKV7Jt3mS06nof66PiWFMAAABHZYuc2OYtb19Xz9zJBvDSVm7rZ8nLf8ApeGAGEAAAAANTK1+rejUry05kcUvrSeiK7W0bZTuMy5wo0aS9eo5PqhHR4yA5/VqynKU5vOnJuUpPbJvFs+QAAAAAAAAAM1jeTo1IVqbwnCWcunen0NYp9Z2axu41qcK0OZOKmujHWux4rsOJnReLW7crepSf7upivs1Fj5p94FuAAAAACcyPc50cx61q6vl70QZms62ZJS/WG3wAs4PEwBqZVq5tNr62js1vwWHaV4lMuVOUo7lj3v8viRYAAAAAAKRxoU+Rby9upHvin7i7lZ4xLfOs87bTqwl2Sxi/NAcyAAAAAAAAAAAv3FhT/Z3EvbhHug37ygnTuLy3zbNS21Kk59iwjH8LAsoAAAAAEABYclVc6mujk+9eDQNLIdTS471j3P83gANbKk8akuvDuSXmmah9154yb3tv/sz4AAAAAABA8N7yNOyqqSznUwpRXTJ44/dUcSeKPxoTebbx2Z1SXbmxXkwKIAAAAAAAAAAB1bgTeRqWdJRWa6adGUfajpx7U8e85SX3ivk8y4WzPpvtzWvcBdgAAAAAAAbeSp4VI9eHen78Aa9GeDT3NfiQA+ZHhkuIYSa3Nr/ALMxgAAAAAAqfGRZuVtCql/6qmMvszWbj1Jpd5bDHXoxnGUJrOhKLjKL2xawaA4gCV4R5CnaVMxvPpyxdOptlFPVJbJLFY79ZFAAAAAAAAADpHFxZuFtKq1h6WpivswWan1N5xTuDOQJXdRxxzKUMHUntSeqMVtk8H1azrNKlGMYwglGMUoxitSilgkB9gAAAAAAA9jr7V5nh90IYyS3tfiQA2MqQwqS68e9J+eJqEplynpUt6w7n+bwIsAAAAAAAACtcYNj6S0c0uVRkqn3XyZ+DT7DmJ3CrRjOMoS5s4uD6pLB+ZxO5t5U5zpS50JOD64vD59oGMAAAAAAPqjRc5Rpx505KCw3yeHvA6bxfWXo7NTeutJ1Purkw8E+8sh8UaCpxjTjzYRUF1RWHuPsAAAAAAAADbyVDGpHo0+D9+ANrIVPTKW5Yd7/AC+IA3Mq0s6m+jlfHwbK8y2tFYvKGZJx/WGzw94GEAAAAAAAA53xj5LUKsLmOhVeTNf7kFr7Y4dqOiFC4zrpOVCitaUqr6M7kx8E2BSQAAAAAuHFxktTqzuZaVS5EF/uSXO7I6ullPLtxY3aUq9B65KNWPTm8mXg0wL6AAAAAAAAEDPZUM+ajs29W3w9wE3kulm0108r4eCR4biQAEfle2zo5y1rX1fL4kgAKkDcylaZktHNer4dnwNMAAAACRD5b4TW1tjGcvSVf4NLBy+89UF16egCQyhe06FOVaq82EVp3t7Ix3yepI49lXKE7itOvPRKb5q1RitEYroS95sZdy5WupqVVpRjzKUOZDH8UvaZGgAAAAAA2cm306FWFanzoPHB6pLVKL6GsUawA7TkzKFO4pRrUnjCWx64S2wlukvmbRxzImWa1rPPpPQ8M+nLmVEt62PdJaUdLyHwlt7nBRl6Orto1GlLH2XqmurT0ATADQAAAAidyRbZsc563q6vn8CPyZaZ8sXzVr+H6+BYAAAAAADHXoqcXF/4e8rl1buEsGWcw3VsprB9j3fICsIiss8Ibe20VJ51T+DT5U+3ZHtK5w9ytfUKrt3H6NTeObUptuVaO/0mHJ6YrBooeHxfT17wLHlrhjc18Ywf0ak9GbTfLkvanr7FgVxI9AAAAAAAAAAAADxo9AFiyLwyuaGEZv6TSWjNqPlxXs1NfY8S+ZG4RW1zopzzan8GpyZ9myfYchPGvj1dW4DujM1rbucsEUHgDlS+r1VQUfpNJYZ1Sq2nRj/9MNPRF4tnX7W2UFgte17/AJAfVCioLNX+XvMgAAAAAAAAAGllfJVG5pujWgpwe/WnscXrT6Ucb4XcAq9pjUp43Fvrz4rlwXtxX4lo34HcQB+Xwdr4TcXNtcN1KP8Apar0vNWNOT9qGx9Kw6mcwy9wSu7TF1aTcF+9pcun2taY/eSAgwAAAAAAAAAAAJzIPBG8u8HSpOMH+9q4wh2N6ZfdTAgy4cEeANe7wqVcbe3157XLmvYi9ntPRp0Yl84M8XVtbNVK3+pqrSnNYU4v2YbX0vHsLoBp5JyXRtqao0YKnBbFrb2uT1t9LNwAAAAAAAAAAAAAAAAACu5X4EWNxi5UFTm/Xo/s5dejQ31plQyjxS63QueqNaH9Uf7QAK9d8W2UIc2nCr006kfKeBE3PBW9p8+2qLqSfkwANT/xFxjh6Cp/IzbtuCt9U5ltUfWkvNnoAlrTi2yhPnU4UumpUj5QziwZO4pdTr3PXGjD+qX9oAFvyRwJsbfBwoKc169b9pLrWOhPqSLEAAAAAAAAAAAAH//Z"
              })`,
            }}
          ></div>
        </div>
        <div className="column-layout">
          <div className="column-primary">
            <div
              className="user-avatar"
              style={{
                backgroundImage: `url(${
                  user?.picture
                    ? user?.picture
                    : "data:image/jpeg;base64,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"
                })`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="profile-body">
        <div className="column-primary">
          <div className="profile-description">
            <div className="profile-identity">
              <h1>@{user?.username}</h1>
            </div>
            {sessionUser?.id === user?.id && (
              <div className="profile-edit">
                <div
                  className="profile-edit-button"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <svg
                    src="pencil.svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 21.94 22"
                  >
                    <path d="M16.92 0L2.16 14.73 0 22l7.18-2.22L21.94 5zM6.16 18.09l-1.7.52-1.12-1.12.52-1.75 13.07-13L19.24 5z"></path>
                  </svg>{" "}
                  Edit
                </div>
              </div>
            )}
            <div className="profile-about-container">
              <div className="profile-about">
                <span>
                  {user?.about
                    ? user?.about
                    : `${user?.username} is keeping quiet for now`}
                </span>
                {showModal && (
                  <Modal onClose={() => setShowModal(false)}>
                    <EditProfileForm
                      user={user}
                      handleCloseModal={handleCloseModal}
                    />
                  </Modal>
                )}
              </div>
              <div className="profile-stats-label">Stats</div>
              <div className="profile-stats">
                <div className="stats-panel">
                  <div className="stats">
                    <div className="stat-and-label">
                      <div className="stat-and-label-primary">
                        <svg
                          src="blockquote.svg"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 22 22"
                        >
                          <path d="M15 10.47h1.7v4.3h-4.4v-3.75c0-2.78.63-5.3 4.39-5.52v2.22c-1.26 0-1.69.88-1.69 2.75zm-7 0h1.7v4.3H5.3v-3.75c0-2.78.63-5.3 4.39-5.52v2.22C8.43 7.72 8 8.6 8 10.47z"></path>
                          <path d="M20.09 1.91v18.18H1.91V1.91h18.18M22 0H0v22h22V0z"></path>
                        </svg>
                        <span> {user?.Annotations.length}</span>
                      </div>
                      <div className="stat-and-label-subtext">Annotations</div>
                    </div>
                  </div>
                  <div className="stats">
                    <div className="stat-and-label">
                      <div className="stat-and-label-primary">
                        <svg
                          src="blockquote.svg"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 22 22"
                        >
                          <path d="M15 10.47h1.7v4.3h-4.4v-3.75c0-2.78.63-5.3 4.39-5.52v2.22c-1.26 0-1.69.88-1.69 2.75zm-7 0h1.7v4.3H5.3v-3.75c0-2.78.63-5.3 4.39-5.52v2.22C8.43 7.72 8 8.6 8 10.47z"></path>
                          <path d="M20.09 1.91v18.18H1.91V1.91h18.18M22 0H0v22h22V0z"></path>
                        </svg>
                        <span> {user?.PoemComments.length}</span>
                      </div>
                      <div className="stat-and-label-subtext">Comments</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="column-secondary">
          <div className="profile-contributions">
            <span>{`${user?.username}'s ${
              showContributions
                ? "contributions"
                : showComments
                ? "Comments"
                : "Annotations"
            }`}</span>
            <div className="profile-contributions-dropdown" onClick={openMenu}>
              <span>{`${
                showContributions
                  ? "All contributions"
                  : showComments
                  ? "Comments"
                  : "Annotations"
              }`}</span>
              <svg
                src="down_arrow.svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 21.32 10.91"
              >
                <path d="M10.66 10.91L0 1.5 1.32 0l9.34 8.24L20 0l1.32 1.5-10.66 9.41"></path>
              </svg>
              {showDropdown && (
                <div className="dropdown-menu">
                  {!showContributions && (
                    <div
                      onClick={() => {
                        setShowContributions(true);
                        setShowAnnotations(false);
                        setShowComments(false);
                      }}
                    >
                      All Contributions
                    </div>
                  )}
                  <div
                    onClick={() => {
                      setShowAnnotations(true);
                      setShowComments(false);
                      setShowContributions(false);
                    }}
                  >
                    Annotations
                  </div>
                  <div
                    onClick={() => {
                      setShowAnnotations(false);
                      setShowComments(true);
                      setShowContributions(false);
                    }}
                  >
                    Comments
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="profile-contributions-list">
            {contributions.length === 0 && (
              <div className="contributions-unit">
                {`Looks like ${user.username} doesn't have any contributions.`}
              </div>
            )}
            {contributions.length > 0 &&
              showContributions &&
              contributions.slice(0, numContributions).map((contribution) => {
                return (
                  <ProfileContributionTile
                    key={contribution.id}
                    contribution={contribution}
                    user={user}
                  />
                );
              })}
            {contributions.length > 0 &&
              showComments &&
              user.PoemComments.slice(0, numContributions).map(
                (contribution) => {
                  return (
                    <ProfileContributionTile
                      key={contribution.id}
                      contribution={contribution}
                      user={user}
                    />
                  );
                }
              )}
            {contributions.length > 0 &&
              showAnnotations &&
              user.Annotations.slice(0, numContributions).map(
                (contribution) => {
                  return (
                    <ProfileContributionTile
                      key={contribution.id}
                      contribution={contribution}
                      user={user}
                    />
                  );
                }
              )}
            <div className="annotations-load-container">
              {showContributions && contributions.length > numContributions ? (
                <div
                  className="annotations-load"
                  onClick={() => setNumContributions(numContributions + 5)}
                >
                  Load More
                </div>
              ) : (
                ""
              )}
              {showAnnotations && user.Annotations.length > numContributions ? (
                <div
                  className="annotations-load"
                  onClick={() => setNumContributions(numContributions + 5)}
                >
                  Load More
                </div>
              ) : (
                ""
              )}
              {showComments && user.PoemComments.length > numContributions ? (
                <div
                  className="annotations-load"
                  onClick={() => setNumContributions(numContributions + 5)}
                >
                  Load More
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
