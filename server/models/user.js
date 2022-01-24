const Schema = require("mongoose").Schema;

const UserSchema = new Schema({
  username: String,
  hash: String,
});

module.exports = UserSchema;
