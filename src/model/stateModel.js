const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
  stateId: {
    type: Number,
    required: true,
  },
  countryId: {
    type: Number,
    required: true,
  },
  stateName: {
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

module.exports = mongoose.model("State", stateSchema);
