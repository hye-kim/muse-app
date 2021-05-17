# Welcome to Muse!

### **Live Link: [Muse](https://aa-muse.herokuapp.com/)**

![Muse Homepage](/readme/homepage.gif)

**Muse** is a clone of [Genius](https://genius.com/) centered around poems. The site allows users to view poems, add annotations to lines that provide insight on what the poet might have been trying to convey, and add comments to poems for further discussion with other users.

Check out the [wiki](https://github.com/hye-kim/muse-app/wiki) for more information!

## Technologies

#### Front-End

- React
- Redux
- CSS

#### Back-End

- Express.js
- PostgreSQL
- Node.js

## Features

- View poems
- Add / view / delete comments on poems
- Add / view / delete / edit annotations on poem lyrics
- View user profiles and edit your own
- Search for poems / poets
- Upvote / downvote comments and annotations

## Instructions

To run this application:

1. Clone the repository
2. Run `npm install` in the root directory to add the node dependencies
3. Create a .env file in the `backend` directory according to the example file
4. Create a user in `psql` with your specified credentials in the .env file
5. Run `npm run db:create`, `npm run db:migrate`, `npm run db:seed:all` in the `backend` directory to set up the database
6. Run `npm start` in both the `frontend` and `backend` directories then navigate to `localhost:3000`

## Code Snippets

Users can add annotations to poem lyrics by highlighting lyrics.

Annotations are stored via start and end indices of the original poem body. Obtaining the position of the selection is based off of the `Selection` and `Range` Web APIs and interfaces.

```js
function getHighlightPositions(element) {
  let start = 0;
  let end = 0;

  if (typeof window.getSelection !== "undefined") {
    const sel = window.getSelection(); // highlighted selection object, which represents the text selected by user
    // if there is a range in the selection
    if (sel.rangeCount > 0) {
      let range = window.getSelection().getRangeAt(0); // returns a range object which contains the startOffset and endOffset
      let preCaretRange = range.cloneRange(); // clone the range to not mutate the original range

      preCaretRange.selectNodeContents(element); // sets the cloned range to contain the contents of the element, startOffset = 0, endOffset = the number of child nodes in the element
      preCaretRange.setEnd(range.startContainer, range.startOffset); // sets the end position of the range to the number of characters from the start of the start container to the boundary point of the range
      start = preCaretRange.toString().length; // sets the start position to the length of the range in string form
      preCaretRange.setEnd(range.endContainer, range.endOffset); // sets the end position of the range to the number of characters from the start of the endContainer to the boundary point of the range
      end = preCaretRange.toString().length; // sets the end position to the length of the range in string form
    }
  }

  setStartPos(start);
  setEndPos(end);
}
```
![Muse Annotation](/readme/annotation.gif)


## Future To Do Items
- [ ] Refactor the code base
- [ ] Add comments to annotations
- [ ] Add poet profile pages
- [ ] Add genres of poems to filter the charts by
- [ ] Implement a point system where users can earn more points by posting annotations and comments that are upvoted
- [X] Add the ability to see all types of submissions by users on their profile page
- [ ] Add the ability for users who have a certain amount of points to add poems
