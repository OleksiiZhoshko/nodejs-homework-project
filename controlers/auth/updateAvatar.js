const path = require("path");
const fs = require("fs/promises");
const User = require("../../database/schemaModelUsers")

const imgResizer = require("../../helpers/imjRegister");

const avatarPath = path.join(__dirname, "../../", "public", "avatars");

const updateUserAvatar = async (req, res) => {
  const { id } = req.user;

  if (!req.file) {
    return res.status(400).json({ message: "Please provide a file" });
  }

  const { path: tempPath, originalname } = req.file;
  const ext = path.extname(originalname);

  await imgResizer(tempPath);

  const filename = `${id}_avatar${ext}`;
  const newPath = path.join(avatarPath, filename);

  await fs.rename(tempPath, newPath);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(id, { avatarURL });
  res.status(200).json({ avatarURL });
};

module.exports = updateUserAvatar;
