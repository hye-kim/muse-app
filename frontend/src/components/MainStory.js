import "./stylesheets/MainStory.css";

function MainStory() {
  return (
    <>
      <div className="main-news-container">
        <div className="main-news-text">
          <a href="https://www.nytimes.com/2017/01/19/nyregion/new-york-today-searching-for-poe.html">
            <div className="main-news-header">
              <div className="main-news-label">
                <span font-weight="normal">news</span>
              </div>
              <div className="main-news-title">
                <h2>New York Today: A Bird’s Eye View of Poe</h2>
              </div>
              <div className="main-news-subtitle">
                Although Edgar Allan Poe was born in Boston and buried in
                Baltimore, we like to think that he was a New Yorker, through
                and through.{" "}
              </div>
            </div>
            <div>
              <div>
                <span className="main-news-author">
                  by Jonathan Wolfe /{" "}
                </span>
                <span className="main-news-date">
                  Jan 19 2017
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
      <a href="https://www.nytimes.com/2017/01/19/nyregion/new-york-today-searching-for-poe.html" className="main-news-image-link">
        <div className="main-news-image"></div>
      </a>
    </>
  );
}

export default MainStory;
