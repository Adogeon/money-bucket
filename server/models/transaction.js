const Schema = require("mongoose").Schema;
const SchemaObjectId = Schema.Types.ObjectId;

const TransactionSchema = new Schema({
  name: String,
  amount: Number,
  bucket: { type: SchemaObjectId, ref: "bucket" },
  type: String,
  user: { type: SchemaObjectId, ref: "user" },
});

module.exports = TransactionSchema;
