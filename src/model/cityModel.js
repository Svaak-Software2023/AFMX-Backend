const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
  cityId: {
    type: Number,
    required: true,
  },
  stateId: {
    type: Number,
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("City", citySchema);
