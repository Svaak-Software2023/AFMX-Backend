const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now  // Set default value to current date
  }
});

module.exports = mongoose.model("Contact", contactSchema);
