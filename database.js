const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
mongoose
  .connect(process.env.DB_URL, {
    // auth: {
    //   user: "root",
    //   password: "root",
    // },
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;
