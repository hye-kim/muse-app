"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users" },
      },
      poem_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Poems" },
      },
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, { foreignKey: "user_id" });
    Comment.belongsTo(models.Poem, { foreignKey: "poem_id" });
  };
  return Comment;
};
