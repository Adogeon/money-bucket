const mongoose = require("mongoose");
const { User, Bucket, Transaction } = require("./models");

const seedDB = async () => {
	await mongoose.connection.collections["user"].drop();
	await mongoose.connection.collections["transaction"].drop();
	await mongoose.connection.collections["bucket"].drop();

	const user1 = await User.create({ username: "thomas", password: "123456" });

	const seedBuckets = [
		{ name: "Essential", limit: 100, type: "bucket", user: user1.id },
		{ name: "Food", limit: 200, type: "bucket", user: user1.id },
		{ name: "Media", limit: 50, type: "bucket", user: user1.id },
		{ name: "Clothing", limit: 100, type: "bucket", user: user1.id },
	];

	const seedBucketResult = await Bucket.insertMany(seedBuckets);
	const bucketIds = seedBucketResult.map((bucket) => bucket._id);

	const seedTransaction = [
		{
			date: new Date("02/12/23"),
			summary: "Video games",
			amount: 30,
			type: "CR",
			bucket: bucketIds[2],
			user: user1.id,
		},
		{
			date: new Date("02/15/23"),
			summary: "Streaming service",
			amount: 10,
			type: "CR",
			bucket: bucketIds[2],
			user: user1.id,
		},
		{
			date: new Date("02/12/23"),
			summary: "Grocery",
			amount: 50,
			type: "CR",
			bucket: bucketIds[1],
			user: user1.id,
		},
		{
			date: new Date("02/14/23"),
			summary: "Socks",
			amount: 40,
			type: "CR",
			bucket: bucketIds[3],
			user: user1.id,
		},
		{
			date: new Date("04/10/23"),
			summary: "Video games",
			amount: 30,
			type: "CR",
			bucket: bucketIds[2],
			user: user1.id,
		},
		{
			date: new Date("04/15/23"),
			summary: "Streaming service",
			amount: 10,
			type: "CR",
			bucket: bucketIds[2],
			user: user1.id,
		},
		{
			date: new Date("04/22/23"),
			summary: "Grocery",
			amount: 50,
			type: "CR",
			bucket: bucketIds[1],
			user: user1.id,
		},
		{
			date: new Date("03/01/23"),
			summary: "Video games",
			amount: 30,
			type: "CR",
			bucket: bucketIds[2],
			user: user1.id,
		},
		{
			date: new Date("03/15/23"),
			summary: "Streaming service",
			amount: 10,
			type: "CR",
			bucket: bucketIds[2],
			user: user1.id,
		},
		{
			date: new Date("03/15/23"),
			summary: "Grocery",
			amount: 50,
			type: "CR",
			bucket: bucketIds[1],
			user: user1.id,
		},
	];
	await Transaction.insertMany(seedTransaction);
};

mongoose
	.connect("mongodb://127.0.0.1:27017/moneybucket", {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("MONGO CONNECTION OPEN !!!");
		return seedDB();
	})
	.then(() => {
		mongoose.connection.close();
		console.log("SEEDING FINISHED");
	})
	.catch((error) => {
		console.error(error);
	});
