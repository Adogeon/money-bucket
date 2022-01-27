const model = require("mongoose").model;

const UserSchema = require("./user");
const BucketSchema = require("./bucket");
const TransactionSchema = require("./transaction");

module.exports = {
  User: model("User", UserSchema, "user"),
  Transaction: model("Transaction", TransactionSchema, "transaction"),
  Bucket: model("Bucket", BucketSchema, "bucket"),
};
