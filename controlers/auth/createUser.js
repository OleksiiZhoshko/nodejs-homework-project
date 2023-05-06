const User = require('../../database/schemaModelUsers');
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const createUser = async (req, res) => {
	const { email, password } = req.body;
	const registeredUser = await User.findOne({ email });
	if (registeredUser) {
		throw res.status(409).json({ message: "Email in use" });
	}
	const avatarURL = gravatar.url(req.body.email);
	const hashPassword = await bcrypt.hash(password, 10);
	const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL});
	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
};

module.exports = { createUser };