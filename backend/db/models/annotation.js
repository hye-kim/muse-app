"use strict";
module.exports = (sequelize, DataTypes) => {
  const Annotation = sequelize.define(
    "Annotation",
    {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      start_pos: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      end_pos: {
        type: DataTypes.INTEGER,
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
  Annotation.associate = function (models) {
    Annotation.belongsTo(models.User, { foreignKey: "user_id"})
    Annotation.belongsTo(models.Poem, { foreignKey: "poem_id"})
  };
  return Annotation;
};
