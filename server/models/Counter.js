const mongoose = require("mongoose");
const { Schema } = mongoose;

const CounterSchema = new Schema({
  _id: {
    type: String,
  },
  count: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Counter", CounterSchema);
