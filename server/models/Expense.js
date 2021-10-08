const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExpenseSchema = new Schema(
  {
    name: String,
    cost: Number,
    type: String,
    createdAt: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
