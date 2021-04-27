"use strict";
module.exports = (sequelize, DataTypes) => {
  const Poem = sequelize.define(
    "Poem",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
      poet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Poets" },
      },
    },
    {}
  );
  Poem.associate = function (models) {
    Poem.belongsTo(models.Poet, { foreignKey: "poet_id" });
  };
  return Poem;
};
