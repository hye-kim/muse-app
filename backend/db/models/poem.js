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
        type: DataTypes.TEXT,
        allowNull: false,
      },
      view_count: {
        type: DataTypes.INTEGER,
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
    Poem.hasMany(models.PoemComment, {
      foreignKey: "poem_id",
      onDelete: "cascade",
      hooks: true,
    });
    Poem.hasMany(models.Annotation, {
      foreignKey: "poem_id",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return Poem;
};
