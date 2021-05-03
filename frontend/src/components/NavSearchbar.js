import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPoems } from "../store/poems";
import { getAllUsers } from "../store/users";
import "./stylesheets/NavSearchbar.css";

function NavSearchbar() {
  const poems = useSelector((state) => Object.values(state.poem));
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getPoems());
  }, [dispatch]);

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setSearchInput("");
      setSearchResults([]);
    }
    if (e.target.value.length > 0) {
      let filteredResults = poems.filter((el) =>
        el.title?.toLowerCase().includes(e.target.value) || el.Poet?.name.toLowerCase().includes(e.target.value)
      );
      setSearchInput(e.target.value);
      setSearchResults(filteredResults);
    }
  };

  const hideSearchResults = () => {
      setShowSearchResults(false)
      setSearchInput("")
  }

  // e.relatedTarget.tagName === "A"

  return (
    <div>
      <form className="search">
        <input
          placeholder="Search poems & more"
          value={searchInput}
          onChange={handleSearch}
          onFocus={() => setShowSearchResults(true)}
          onBlur={(e) => {
              if(e.relatedTarget == null || e.relatedTarget.classList[0] !== "search-poem-card") {
                  hideSearchResults()
              }
          }}
        />
        <div className="search-icon">
          <i className="fas fa-search"></i>
        </div>
        {showSearchResults && (
          <div className="search-dropdown-container">
            <div className="search-dropdown">
              <div className="search-dropdown-header">
                <span>Search Results</span>
              </div>
              <div className="search-dropdown-results">
                <div>
                  {searchResults.length > 0 ? (
                    <>
                      <div className="search-results-label">Songs</div>
                      <div>
                        {searchResults.map((poem) => (
                          <div
                            className="search-result-container"
                            key={poem.id}
                          >
                            <Link
                              to={`/poems/${poem.id}`}
                              className="search-poem-card"
                              onClick={hideSearchResults}
                            >
                              <div
                                className="search-poem-thumbnail"
                                style={{
                                  backgroundImage: `url(${poem.Poet.picture})`,
                                }}
                              ></div>
                              <div className="search-poem-info">
                                <div className="poem_card-title_and_subtitle">
                                  <div className="poem_card-title">
                                    {poem.title}
                                  </div>
                                  <div className="poem_card-subtitle">
                                    {poem.Poet.name}
                                  </div>
                                </div>
                                <div className="poem_card-view-count">
                                  <span>
                                    <svg
                                      src="eye.svg"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 22 15.45"
                                    >
                                      <path d="M11 2c4 0 7.26 3.85 8.6 5.72-1.34 1.87-4.6 5.73-8.6 5.73S3.74 9.61 2.4 7.73C3.74 5.86 7 2 11 2m0-2C4.45 0 0 7.73 0 7.73s4.45 7.73 11 7.73 11-7.73 11-7.73S17.55 0 11 0z"></path>
                                      <path d="M11 5a2.73 2.73 0 1 1-2.73 2.73A2.73 2.73 0 0 1 11 5m0-2a4.73 4.73 0 1 0 4.73 4.73A4.73 4.73 0 0 0 11 3z"></path>
                                    </svg>{" "}
                                    {poem.view_count}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="no-results">No results</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default NavSearchbar;
