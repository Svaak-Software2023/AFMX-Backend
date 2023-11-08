const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenShema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // this is the expiry time in seconds
  },
});

module.exports = mongoose.model("Token", TokenShema);
