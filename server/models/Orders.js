const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order_type: {
      type: String,
      enum: ["purchase", "return"],
    },
    amount: {
      type: Number,
      required: true,
    },
    old_orders: {
      type: mongoose.Schema.Types.ObjectId,
      req: "Orders",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Orders", OrderSchema);
