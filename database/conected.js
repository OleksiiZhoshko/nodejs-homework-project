const mongoose = require("mongoose");

const connectToDB = async () => {
  await mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDB;