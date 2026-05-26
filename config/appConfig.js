require("dotenv").config();

module.exports = {
  PORT: Number(process.env.PORT) || 3000,
  DB_URI: process.env.DB_URI || "mongodb://localhost:27017",
  DB_NAME: process.env.DB_NAME || "iti-ism2026",
};
