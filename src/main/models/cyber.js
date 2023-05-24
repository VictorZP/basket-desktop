const { Schema, model } = require("mongoose");

const Joi = require("joi");

const cyberSchema = Schema(
	{
		cyberName: {
			type: String,
			lowerCase: true,
			trim: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},
	{
		versionKey: false,
	}
);

const JoiCyberAddSchema = Joi.object({
	cyberName: Joi.string().trim().required(),
});
const Cyber = model("cyber", cyberSchema);

const joiSchemas = {
	JoiCyberAddSchema,
};

module.exports = { Cyber, joiSchemas };
