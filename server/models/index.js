const model = require("mongoose").model;

const UserSchema = require("./user");
const BucketSchema = require("./bucket");
const TransactionSchema = require("./transaction");

module.exports = {
  User: model("user", UserSchema),
  Transaction: model("transaction", TransactionSchema),
  Bucket: model("bucket", BucketSchema),
};
