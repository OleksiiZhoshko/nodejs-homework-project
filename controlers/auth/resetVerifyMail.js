const User = require("../../database/schemaModelUsers");
const { BASE_URL } = process.env;
const sendMeil = require("../../helpers/sendEmail");

const resetVerifyMail = async (res, req) => {
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        throw res.status(404).json({ message: "User not found" })
    }
    if (user.verify) {
        throw res.status(400).json({ message: "Verification has already been passed" })
    }
    	const veryfiEmail = {
		to: email,
		subject: "Verify mail",
		html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}>Click verify mail</a>`,
    }
    
    await sendMeil(veryfiEmail);

    res.status(200).json({message: "Verification email sent"});
}

module.exports = resetVerifyMail;