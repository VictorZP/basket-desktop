const mongoose = require("mongoose");

const { DB_HOST } = require("../helpers/variables.js");

mongoose
	.connect(DB_HOST)
	.then((db) => console.log("DB is connected"))
	.catch((err) => console.log(err));
