module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      unique: true, //can't have dups
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true, //can't have dups
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Users;
};
