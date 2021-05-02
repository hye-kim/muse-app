'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'hye@hyekim.me',
        username: 'hyek',
        about: "I love boba!",
        picture: "https://i.kym-cdn.com/entries/icons/original/000/026/638/cat.jpg",
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo'] }
    }, {});
  }
};
