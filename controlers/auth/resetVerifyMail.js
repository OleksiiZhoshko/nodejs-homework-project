const User = require("../../database/schemaModelUsers");
require("dotenv").config();
const { BASE_URL } = process.env;
const sendMeil = require("../../helpers/sendEmail");

const resetVerifyMail = async (req, res) => {
  const { email }  = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }
  const veryfiEmail = {
    to: email,
    text: "Your Contacts verification link",
    subject: "Verify mail",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}>Click verify mail</a>`,
  };

  sendMeil(veryfiEmail);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = resetVerifyMail;
