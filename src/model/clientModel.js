const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  clientId: {
    type: String,
    required: true,
  },
  clientPrifix: {
    type: String,
    default: "",
  },
  clientFirstName: {
    type: String,
    required: true,
  },
  clientMiddleName: {
    type: String,
    default: "",
  },
  clientLastName: {
    type: String,
    default: "",
  },
  clientSuffix: {
    type: String,
    default: "",
  },
  clientProfileImage: {
    type: String,
    required: true,
  },
  clientSSN: {
    type: String,
    required: true,
  },
  clientAddress1: {
    type: String,
    required: true,
  },
  clientAddress2: {
    type: String,
    default: "",
  },
  clientPostalCode: {
    type: String,
    default: "",
  },
  clientCity: {
    type: String,
    default: "",
  },
  stateId: {
    type: String,
    default: "",
  },
  countryId: {
    type: String,
    default: "",
  },
  clientPassword: {
    type: String,
    required: true,
  },
  clientPhone: {
    type: String,
    default: "",
  },
  clientEmail: {
    type: String,
    required: true,
  },
  clientLinkedInProfile: {
    type: String,
    default: "",
  },
  clientWebsite: {
    type: String,
    default: "",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  token: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Client", clientSchema);
