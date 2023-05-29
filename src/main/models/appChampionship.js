const { Schema, model, default: mongoose } = require("mongoose");

const Joi = require("joi");

const teamSchema = Schema({
	teamId: { type: mongoose.ObjectId },
	customName: {
		type: String,
		trim: true,
	},
	fibaliveTeamName: {
		type: String,
		trim: true,
	},
	betsapiTeamName: {
		type: String,
		trim: true,
	},
	otherSiteName: {
		type: String,
		trim: true,
	},
});

const appChampionshipSchema = Schema(
	{
		championshipName: {
			type: String,
			trim: true,
		},
		fibaliveName: {
			type: String,
			trim: true,
		},
		betsapiName: {
			type: String,
			trim: true,
		},
		otherSiteName: {
			type: String,
			trim: true,
		},
		cyberName: {
			type: String,
			trim: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
		teamNames: [teamSchema],
	},
	{
		versionKey: false,
	}
);

const JoiAppChampAddSchema = Joi.object({
	championshipName: Joi.string().trim().required(),
	fibaliveName: Joi.string().allow("").trim(),
	betsapiName: Joi.string().allow("").trim(),
	otherSiteName: Joi.string().allow("").trim(),
	cyberName: Joi.string().trim().required(),
});

const AppChamp = model("appChampionship", appChampionshipSchema);

const joiSchemas = {
	JoiAppChampAddSchema,
};

module.exports = { AppChamp, joiSchemas };
