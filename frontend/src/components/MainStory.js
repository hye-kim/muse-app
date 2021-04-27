import "./stylesheets/MainStory.css";

function MainStory( {title, subtitle, author, date, imgUrl, location}) {
  return (
    <>
      <div className="main-news-container">
        <div className="main-news-text">
          <a href={location}>
            <div className="main-news-header">
              <div className="main-news-label">
                <span>news</span>
              </div>
              <div className="main-news-title">
                <h2>{title}</h2>
              </div>
              <div className="main-news-subtitle">
               {subtitle}
              </div>
            </div>
            <div>
              <div className="main-news-author-date-container">
                <span className="main-news-author">
                  {`by ${author} /`}{" "}
                </span>
                <span className="main-news-date">
                  {date}
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
      <a href={location} className="main-news-image-link">
        <div className="main-news-image" style={{"backgroundImage": `url(${imgUrl})`}}></div>
      </a>
    </>
  );
}

export default MainStory;
