'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnnotationVote = sequelize.define('AnnotationVote', {
    vote: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users" },
    },
    annotation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Annotations" },
    },
  }, {});
  AnnotationVote.associate = function(models) {
    AnnotationVote.belongsTo(models.User, { foreignKey: "user_id" });
    AnnotationVote.belongsTo(models.Annotation, { foreignKey: "annotation_id" });
  };
  return AnnotationVote;
};
