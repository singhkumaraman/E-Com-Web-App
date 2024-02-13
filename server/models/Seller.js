const mongoose = require("mongoose");
const SellerSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  org_name: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Seller", SellerSchema);
