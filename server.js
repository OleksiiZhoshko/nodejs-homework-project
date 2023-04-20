const app = require("./app");
const connectToDB = require("./database/conected");
require("dotenv").config();

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(process.env.PORT, (error) => {
      if (error) {
        console.log("Server running error", error);
      }
      console.log("Database connection successful");
    });
  } catch (err) {
    console.log(`Server not running: "${err.message}"`);
    process.exit(1);
  }
};

startServer();