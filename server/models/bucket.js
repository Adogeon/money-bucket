const Schema = require("mongoose").Schema;
const SchemaObjectId = Schema.Types.ObjectId;

const BucketSchema = new Schema({
  name: String,
  user: { type: SchemaObjectId, ref: "user" },
});

module.exports = BucketSchema;
