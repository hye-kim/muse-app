'use strict';
const faker = require("faker");
const { User, Poem } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let comments = [];
    const numUsers = await User.count();
    const numPoems = await Poem.count();

    const numComments = numPoems * 3;

    for (let i = 0; i < numComments; i++) {
      let newComment = {
        user_id: Math.floor(Math.random() * numUsers + 1),
        body: faker.lorem.sentence(),
        poem_id: Math.floor(Math.random() * numPoems + 1),
        createdAt: faker.date.recent(),
        updatedAt: new Date(),
      };
      comments.push(newComment);
    }
    return queryInterface.bulkInsert("PoemComments", comments, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PoemComments", null, {});
  },
};
