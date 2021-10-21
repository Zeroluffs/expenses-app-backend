const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExpenseSchema = new Schema(
  {
    id: Number,
    name: String,
    cost: Number,
    type: String,
    userID: String,
    createdAt: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
