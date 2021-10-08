const mongoose = require("mongoose");
const URI = "mongodb://localhost/expensesAPP";
// require("dotenv").config({ path: "variables.env" });
mongoose
  .connect(URI, {
    // auth: {
    //   user: "root",
    //   password: "root",
    // },
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;
