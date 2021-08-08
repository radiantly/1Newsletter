const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite3",
});
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
  get mails() {
    return Mail.findAll({
      where: {
        username: this.username,
      },
    });
  }
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

class Mail extends Model {
  static add = async (username, from, html) => {
    return await Mail.create({
      username: username.toLowerCase(),
      from,
      body: html,
    });
  };
  get fromName() {
    return this.from.replace(/<.*?>/, "").trim();
  }
}

Mail.init(
  {
    username: DataTypes.TEXT,
    from: DataTypes.TEXT,
    body: DataTypes.TEXT,
  },
  { sequelize, modelName: "mail" }
);

sequelize.sync();

module.exports = {
  User,
  Mail,
};
