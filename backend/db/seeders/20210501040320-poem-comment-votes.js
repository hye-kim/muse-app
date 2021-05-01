'use strict';
// Importing User so that I can query with it
const { User, PoemComment } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    function makeVotes(numUsers, numComments, numVotes) {
      const votes = [];
      let pairs = [];

      for (let i = 0; i < numVotes; i++) {
        let newPair = [Math.floor(Math.random() * numComments + 1), Math.floor(Math.random() * numUsers + 1)]
        let exists = pairs.find(el => el[0] === newPair[0] && el[1] === newPair[1])

        if(!exists) {
          pairs.push(newPair);
          votes.push({
            vote: Math.floor(Math.random() * (1 + 1 + 1) - 1),
            comment_id: newPair[0],
            user_id: newPair[1],
            createdAt: new Date(),
            updatedAt: new Date()
          })
        }
      }
      return votes;
    }
    const numUsers = await User.count();
    const numComments = await PoemComment.count();
    let newVotes = makeVotes(numUsers, numComments, 1500);
    return queryInterface.bulkInsert('PoemCommentVotes', newVotes, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PoemCommentVotes', null, {});
  }
};
