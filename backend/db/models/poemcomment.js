"use strict";
module.exports = (sequelize, DataTypes) => {
  const PoemComment = sequelize.define(
    "PoemComment",
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
  PoemComment.associate = function (models) {
    PoemComment.belongsTo(models.User, { foreignKey: "user_id" });
    PoemComment.belongsTo(models.Poem, { foreignKey: "poem_id" });
    PoemComment.hasMany(models.PoemCommentVote, {
      foreignKey: "comment_id",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return PoemComment;
};
