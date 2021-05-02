# Welcome to Muse!

### **Live Link: [Muse](https://aa-muse.herokuapp.com/)**

 **Muse** is a clone of [Genius](https://genius.com/) centered around poems. The site allows users to view poems, add annotations to lines that provide insight on what the poet might have been trying to convey, and add comments to poems for further discussion with other users.

 Check out the [wiki](https://github.com/hye-kim/muse-app/wiki)

##  Technologies
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
- Add / view / delete/ edit annotations on poem lyrics
- View user profiles and edit your own
- Search for poems / poets
- Upvote / downvote comments and annotations

## Technical Details
Users can add annotations to poem lyrics by highlighting lyrics.

Annotations are stored via start and end indices of the original poem body. Obtaining the position of the selection is based off of the `Selection` and `Range` Web APIs and interfaces

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

## Future Implementations
