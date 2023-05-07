const User = require("../../database/schemaModelUsers");

const verifyEmail = async (res, req,) => {
    const verificationToken = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw res.status(404).json({ message:"User not found" })
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" })
    
    res.status(200).json({ message: "Verification successful" });
}

module.exports = verifyEmail;