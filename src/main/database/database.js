const mongoose = require("mongoose");

const { DB_HOST } = process.env;

mongoose
	.connect(DB_HOST)
	.then((db) => console.log("DB is connected"))
	.catch((err) => console.log(err));
