const User = require('../../database/schemaModelUsers');
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid")
const sendMeil = require("../../helpers/sendEmail")
const { BASE_URL } = process.env

const createUser = async (req, res) => {
	const { email, password } = req.body;
	const registeredUser = await User.findOne({ email });
	if (registeredUser) {
		throw res.status(409).json({ message: "Email in use" });
	}
	const avatarURL = gravatar.url(req.body.email);
	const hashPassword = await bcrypt.hash(password, 10);
	const verificationToken = nanoid();
	const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });
	const veryfiEmail = {
		to: email,
		subject: "Verify mail",
		html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}>Click verify mail</a>`,
	}

	await sendMeil(veryfiEmail);

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
};

module.exports = { createUser };