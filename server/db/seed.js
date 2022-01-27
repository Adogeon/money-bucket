const mongoose = require("mongoose");
const { User, Bucket, Transaction } = require("./modles/product");

mongoose
  .connect("mongodb:/localhost:27017/money-bucket", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN !!!");
  });

const seedDB = async () => {
  const user1 = await User.create({ username: "thomas", password: "123456" });

  const bucket1 = await Bucket.create({});

  const seedBuckets = [
    { name: "Essential", limit: 100, type: "bucket", user: user1.id },
    { name: "Food", limit: 200, type: "bucket", user: user1.id },
    { name: "Media", limit: 50, type: "bucket", user: user1.id },
  ];

  const seedBucketResult = await Bucket.insertMany(seedBuckets);
  const bucketIds = seedBucketResult.insertedIds;

  const seedTransaction = [
    {
      date: "02/12/21",
      summary: "Video games",
      amount: 30,
      type: "CR",
      bucket: bucketIds[2],
      user: user1.id,
    },
    {
      date: "02/15/21",
      summary: "Streaming service",
      amount: 10,
      type: "CR",
      bucket: bucketIds[2],
      user: user1.id,
    },
    {
      date: "02/12/21",
      summary: "Grocery",
      amount: 50,
      type: "CR",
      bucket: bucketIds[1],
      user: user1.id,
    },
    {
      date: "02/14/21",
      summary: "Socks",
      amount: 40,
      type: "CR",
      bucket: bucketIds[0],
      user: user1.id,
    },
  ];
  await Transaction.insertMany(seedTransaction);
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("SEEDING FINISHED");
});
