const bcrypt = require("bcrypt");
const saltRounds = 8;

module.exports = (sequelize, DataTypes) => {
  const UsersModel = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING
    }
  });
  UsersModel.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
  });
  return UsersModel;
};

