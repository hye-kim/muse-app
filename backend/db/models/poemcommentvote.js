"use strict";
module.exports = (sequelize, DataTypes) => {
  const PoemCommentVote = sequelize.define(
    "PoemCommentVote",
    {
      vote: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users" },
      },
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "PoemComments" },
      },
    },
    {}
  );
  PoemCommentVote.associate = function (models) {
    PoemCommentVote.belongsTo(models.User, { foreignKey: "user_id" });
    PoemCommentVote.belongsTo(models.PoemComment, { foreignKey: "comment_id" });
  };
  return PoemCommentVote;
};
