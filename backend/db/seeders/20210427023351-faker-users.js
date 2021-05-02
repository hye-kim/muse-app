"use strict";
const bcrypt = require("bcryptjs");
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let users = [];

    const numNewUsers = 100;

    for (let i = 1; i < numNewUsers; i++) {
      let newUser = {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        hashedPassword: bcrypt.hashSync(`Password${i + 1}!`, 10),
        about: faker.lorem.sentence(),
        picture: faker.image.avatar(),
        createdAt: faker.datatype.datetime(),
        updatedAt: new Date(),
      };
      users.push(newUser);
    }
    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
