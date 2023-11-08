const mongoose = require("mongoose");

// Define a function to calculate the date for one week from now
function twoWeekFromNow() {
  const now = new Date();
  const oneWeekLater = new Date(now);
  oneWeekLater.setDate(now.getDate() + 15);
  return oneWeekLater;
}

const bannerSchema = mongoose.Schema({
  bannerId: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  businessURL: {
    type: String,
    required: true,
  },
  countryName: {
    type: String,
    default: "",
  },
  countryCode: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  bannerLocation: {
    type: String,
    default: "",
  },
  bannerImage: {
    type: String,
    required: true,
  },
  bannerImageTitle: {
    type: String,
    default: "",
  },
  bannerImageAltText: {
    type: String,
    default: "",
  },
  bannerImageLink: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: twoWeekFromNow, // Date in two week from now
  },
  description: {
    type: String,
    default: "",
  },
  clientId: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Banner", bannerSchema);
