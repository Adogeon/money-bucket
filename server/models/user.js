const Schema = require("mongoose").Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: String,
  password: String,
});

UserSchema.virtual("transactions", {
  ref: "transaction",
  localField: "_id",
  foreignField: "user",
});

UserSchema.virtual("buckets", {
  ref: "bucket",
  localField: "_id",
  foreignField: "user",
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = async function (inputPassword) {
  try {
    const isMatch = await bcrypt.compare(inputPassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

module.exports = UserSchema;
