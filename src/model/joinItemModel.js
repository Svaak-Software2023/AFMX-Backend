const mongoose = require("mongoose");

const joinItemSchema = new mongoose.Schema({
  afmxJoinId: {
    type: String,
    required: true,
  },
  afmxJoinImageVideo: {
    type: String,
    required: true,
  },
  afmxJoinDescription: {
    type: String,
    default: "",
  },
  afmxSlide: {
    type: Number,
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
    default: true, // set a default value true based on requirements
  },
});

module.exports = mongoose.model("JoinItem", joinItemSchema);
