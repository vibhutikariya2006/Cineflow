const mongoose = require("mongoose");
const { env } = require("./env");

exports.connectDB = async () => {
  try {
    await mongoose
      .connect(env.MONGOOSE_URL)
      .then(() => console.log("Database connected"))
      .catch(() => console.log("Error to connect DB"));
  } catch (error) {
    console.error("Error: ", error);
  }
};