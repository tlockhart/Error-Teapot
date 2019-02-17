module.exports = function (sequelize, DataTypes) {
  const Artist = sequelize.define('Artist', {
    artistName: {
      type: DataTypes.STRING,
      unique: true, // can't have dups
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    avatarUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  Artist.associate = function (models) {
    // Artist and Artifacts Association: An Artist has many Artifacts
    Artist.hasMany(
      models.Artifact,
    ); /* , {
          //onDelete: "CASCADE",// When an Artist is deleted, also delete any associated Artifacts
          foreignKey: {
            allowNull: true
          }
        }); */
  };
  return Artist;
};
