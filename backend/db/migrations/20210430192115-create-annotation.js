"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Annotations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      start_pos: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      end_pos: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      poem_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Poems" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Annotations");
  },
};
