const User = require("../../database/schemaModelUsers");

const updateSubscription = async (req, res) => {
  const { authorization = "" } = req.headers;
  const token = authorization.split(" ")[1];
  const user = await User.findOne({ token });
  const updatedUserSubscription = await User.findByIdAndUpdate(
    user._id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedUserSubscription);
};

module.exports = { updateSubscription };
