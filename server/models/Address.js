const mongoose = require("mongoose");
const AddressSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  complete_address: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Address", AddressSchema);
