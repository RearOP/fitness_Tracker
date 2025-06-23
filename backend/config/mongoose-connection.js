const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/${config.get("MONGODB_DB")}`)
  .then(() => {
    dbgr("MongoDB connected successfully");
  })
  .catch(function (err) {
    dbgr("MongoDB connection error: ", err.message);
  });
module.exports = mongoose.connection;
