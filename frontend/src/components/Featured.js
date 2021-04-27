import React from "react";
import "./stylesheets/Featured.css";
import MainStory from "./MainStory";
import SubStory from "./SubStory";

function Featured() {
  return (
    <div className="featured">
      <div className="featured-grid">
        <MainStory />
        <SubStory
          title="5 Poets to Help You Love Poetry"
          author="Greg Cowles"
          date="Apr 14 2021"
          imgUrl="https://static01.nyt.com/images/2021/04/18/books/12books-burst-slide-F7MI/12books-burst-slide-F7MI-mediumThreeByTwo210.jpg?quality=100&auto=webp"
          location="https://www.nytimes.com/interactive/2021/04/14/books/poetry-appreciation.html"
        />
        <SubStory
          title="Al Young, Poet With A Musical Bent, Is Dead at 81"
          author="Neil Genzlinger"
          date="Apr 23 2021"
          imgUrl="https://static01.nyt.com/images/2021/04/25/obituaries/Young-01/Young-01-mediumThreeByTwo210.jpg?quality=100&auto=webp"
          location="https://www.nytimes.com/2021/04/23/books/al-young-dead.html"
        />
        <SubStory
          title="Exposed: The secret love letters of TS Eliot"
          author="Maria Cramer"
          date="Jan 22 2020"
          imgUrl="https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/05/02/13/ts-eliot-1.jpg?width=990&auto=webp&quality=75"
          location="https://www.independent.co.uk/news/world/secret-love-letters-ts-eliot-poetry-literature-a9281296.html"
        />
        <SubStory
          right={true}
          title="Lana Del Rey announces new spoken word album: ‘It’s my own reparative act’"
          author="Roisin O'Connor"
          date="Dec 20 2019"
          imgUrl="https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/08/30/13/2019-08-06T185408Z-1061555499-RC12EE8136E0-RTRMADP-3-PEOPLE-GUILLERMO-DEL-TORO.JPG?width=990&auto=webp&quality=75"
          location="https://www.independent.co.uk/arts-entertainment/music/news/lana-del-rey-new-album-spoken-word-poetry-book-release-date-a9254521.html"
        />
      </div>
    </div>
  );
}

export default Featured;
