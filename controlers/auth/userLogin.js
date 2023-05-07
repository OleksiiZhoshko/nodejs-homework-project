const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require('../../database/schemaModelUsers');

const { SECRET_KEY } = process.env;

const userLogin = async (req, res) => {
	const { email, password } = req.body;
	const registeredUser = await User.findOne({ email });

	if (!registeredUser) {
		throw res.status(401).json({ message: "Email or password is wrong" });
	}
	const isValidPassword = await bcrypt.compare(password, registeredUser.password);
	if (!isValidPassword) {
		throw res.status(401).json({ message: "Email or password is wrong" });
	}
	if (!User.verify) {
		throw res.status(400).json({ message:"Verification has already been passed" });
	}

	const payload = { id: registeredUser._id };

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
	await User.findByIdAndUpdate(registeredUser._id, { token });
	res.status(200).json({
		token,
		user: {
			email: registeredUser.email,
			subscription: registeredUser.subscription,
		},
	});
};

module.exports = { userLogin };