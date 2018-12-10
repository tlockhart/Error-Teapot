module.exports = function(sequelize, DataTypes) {
  var Artifact = sequelize.define("Artifact", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbImgUrl: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fullImgUrl: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT(11, 2),
      allowNull: false
    }
  });
  Artifact.associate = function(models) {
    // Artifact and Artist Association: An Artifact belongs to an Artist
    Artifact.belongsTo(models.Artist, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Artifact;
};
