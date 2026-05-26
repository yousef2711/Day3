const mongoose = require("mongoose");
const { DB_URI, DB_NAME } = require("./appConfig");

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(`${DB_URI}/${DB_NAME}`);
    console.log("✅✅ DB connection is successful");
  } catch (error) {
    console.error("❌❌ DB connection failed", error);
    throw error;
  }
};

module.exports = connectDb;
