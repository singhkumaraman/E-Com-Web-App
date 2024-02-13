const mongoose = require("mongoose");
const PaymentsSchema = mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payement_method: {
      type: String,
      enum: ["UPI", "CREDIT_CARD", "DEBIT_CARD", "NET_BANKING"],
    },
  },
  {
    timestamp: true,
  }
);
module.exports = mongoose.model("Payments", PaymentsSchema);
