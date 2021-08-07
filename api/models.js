const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const bcrypt = require("bcrypt");
const { BCRYPT_SALT_ROUNDS } = require("./config");

class User extends Model {
  static byEmail = async (email) => {
    return await User.findByPk(email.toLowerCase());
  };
  static byUsername = async (username) => {
    return await User.findOne({
      where: {
        username: username.toLowerCase(),
      },
    });
  };
  static add = async (email, username, plaintextPassword) => {
    return await User.create({
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: await bcrypt.hash(plaintextPassword, BCRYPT_SALT_ROUNDS),
    });
  };
  verify = async (plaintextPassword) => {
    return await bcrypt.compare(plaintextPassword, this.password);
  };
}

User.init(
  {
    email: {
      type: DataTypes.TEXT,
      primaryKey: true,
    },
    username: {
      type: DataTypes.TEXT,
      unique: true,
    },
    password: DataTypes.TEXT,
  },
  { sequelize, modelName: "user" }
);

sequelize.sync();

module.exports = {
  User,
};
