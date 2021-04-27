"use strict";
module.exports = (sequelize, DataTypes) => {
  const Poet = sequelize.define(
    "Poet",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {}
  );
  Poet.associate = function (models) {
    Poet.hasMany(models.Poem, {
      foreignKey: "poet_id",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return Poet;
};
