"use strict";

const fetch = require("node-fetch");

const poets = [
  "Adam Lindsay Gordon",
  "Alan Seeger",
  "Alexander Pope",
  "Algernon Charles Swinburne",
  "Ambrose Bierce",
  "Amy Levy",
  "Andrew Marvell",
  "Ann Taylor",
  "Anne Bradstreet",
  "Anne Bronte",
  "Anne Killigrew",
  "Anne Kingsmill Finch",
  "Annie Louisa Walker",
  "Arthur Hugh Clough",
  "Ben Jonson",
  "Charles Kingsley",
  "Charles Sorley",
  "Charlotte Bronte",
  "Charlotte Smith",
  "Christina Rossetti",
  "Christopher Marlowe",
  "Christopher Smart",
  "Coventry Patmore",
  "Edgar Allan Poe",
  "Edmund Spenser",
  "Edward Fitzgerald",
  "Edward Lear",
  "Edward Taylor",
  "Edward Thomas",
  "Eliza Cook",
  "Elizabeth Barrett Browning",
  "Emily Bronte",
  "Emily Dickinson",
  "Emma Lazarus",
  "Ernest Dowson",
  "Eugene Field",
  "Francis Thompson",
  "Geoffrey Chaucer",
  "George Eliot",
  "George Gordon, Lord Byron",
  "George Herbert",
  "George Meredith",
  "Gerard Manley Hopkins",
  "Helen Hunt Jackson",
  "Henry David Thoreau",
  "Henry Vaughan",
  "Henry Wadsworth Longfellow",
  "Hugh Henry Brackenridge",
  "Isaac Watts",
  "James Henry Leigh Hunt",
  "James Thomson",
  "James Whitcomb Riley",
  "Jane Austen",
  "Jane Taylor",
  "John Clare",
  "John Donne",
  "John Dryden",
  "John Greenleaf Whittier",
  "John Keats",
  "John McCrae",
  "John Milton",
  "John Trumbull",
  "John Wilmot",
  "Jonathan Swift",
  "Joseph Warton",
  "Joyce Kilmer",
  "Julia Ward Howe",
  "Jupiter Hammon",
  "Katherine Philips",
  "Lady Mary Chudleigh",
  "Lewis Carroll",
  "Lord Alfred Tennyson",
  "Louisa May Alcott",
  "Major Henry Livingston, Jr.",
  "Mark Twain",
  "Mary Elizabeth Coleridge",
  "Matthew Arnold",
  "Matthew Prior",
  "Michael Drayton",
  "Oliver Goldsmith",
  "Oliver Wendell Holmes",
  "Oscar Wilde",
  "Paul Laurence Dunbar",
  "Percy Bysshe Shelley",
  "Philip Freneau",
  "Phillis Wheatley",
  "Ralph Waldo Emerson",
  "Richard Crashaw",
  "Richard Lovelace",
  "Robert Browning",
  "Robert Burns",
  "Robert Herrick",
  "Robert Louis Stevenson",
  "Robert Southey",
  "Robinson",
  "Rupert Brooke",
  "Samuel Coleridge",
  "Samuel Johnson",
  "Sarah Flower Adams",
  "Sidney Lanier",
  "Sir John Suckling",
  "Sir Philip Sidney",
  "Sir Thomas Wyatt",
  "Sir Walter Raleigh",
  "Sir Walter Scott",
  "Stephen Crane",
  "Thomas Campbell",
  "Thomas Chatterton",
  "Thomas Flatman",
  "Thomas Gray",
  "Thomas Hood",
  "Thomas Moore",
  "Thomas Warton",
  "Walt Whitman",
  "Walter Savage Landor",
  "Wilfred Owen",
  "William Allingham",
  "William Barnes",
  "William Blake",
  "William Browne",
  "William Cowper",
  "William Cullen Bryant",
  "William Ernest Henley",
  "William Lisle Bowles",
  "William Morris",
  "William Shakespeare",
  "William Topaz McGonagall",
  "William Vaughn Moody",
  "William Wordsworth",
];

const poems = [];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve) => {
      const poems = [];

      const poemFetches = poets.map((poet) =>
        fetch(`https://poetrydb.org/author/${poet}`).then((res) => res.json())
      );

      Promise.all(poemFetches).then((res) => {
        const links = res.map((el) => {
          return el;
        });
        for (let i = 0; i < links.length; i++) {
          const newPoem = {
            title: links[i][0].title,
            body: links[i][0].lines.join("\n"),
            view_count: Math.floor(Math.random() * 1000),
            poet_id: i + 1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
          poems.push(newPoem)
        }
        resolve(queryInterface.bulkInsert("Poems", poems, {}));
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Poems", null, {});
  },
};
