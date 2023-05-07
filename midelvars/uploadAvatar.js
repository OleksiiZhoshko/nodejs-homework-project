const multer = require("multer");
const path = require("path");

const tempDirr = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDirr,
  filename: (__, file, cd) => {
    cd(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
}).single("avatarURL");

module.exports = upload;
