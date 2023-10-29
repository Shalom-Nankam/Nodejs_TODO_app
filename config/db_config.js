const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  mongoose.connect(process.env.MONGODB_URL);

  mongoose.connection.on("connected", () => {
    console.log("==================> connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("=============> error occured " + err.toString());
  });
};

module.exports = { connect };
