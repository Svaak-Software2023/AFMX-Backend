const mongoose = require("mongoose");

const countrySchema = mongoose.Schema({
  countryId: {
    type: Number,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  countryShortName: {
    type: String,
    required: true,
  },
  countryPhoneCode: {
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

module.exports = mongoose.model("Country", countrySchema);
