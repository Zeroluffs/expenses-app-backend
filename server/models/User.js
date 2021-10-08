const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, dropDups: true },
    password: String,
    createdAt: String,
    earnings: Number,
    expenses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Expense",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
