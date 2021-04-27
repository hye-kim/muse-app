import "./stylesheets/SubStory.css";

function SubStory({ right, title, author, date, imgUrl, location }) {
  let containerClass = "sub-news-container";
  if (right) {
    containerClass = "sub-news-container-right";
  }
  return (
    <div className={containerClass}>
      <div className="sub-news-text">
        <a href={location}>
          <div className="sub-news-header">
            <div className="sub-news-label">
              <span>news</span>
            </div>
            <div className="sub-news-title">
              <h2>
                {title}
              </h2>
            </div>
          </div>
          <div>
            <div>
              <span className="sub-news-author">{`by ${author} / `}</span>
              <span className="sub-news-date">{date}</span>
            </div>
            <div className="sub-news-image-container">
              <div className="sub-news-image" style={{"background-image": `url(${imgUrl})`}}></div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default SubStory;
