const Schema = require("mongoose").Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: String,
  password: String,
});

UserSchema.virtual("transactions", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "user",
});

UserSchema.virtual("buckets", {
  ref: "Bucket",
  localField: "_id",
  foreignField: "user",
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  user.password = await bcrypt.hash(user.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (inputPassword) {
  try {
    const isMatch = await bcrypt.compare(inputPassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

UserSchema.set("toJSON", { virtuals: true });

module.exports = UserSchema;
