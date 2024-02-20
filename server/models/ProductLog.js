const mongoose = require("mongoose");

const ProductLogs = mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    req: "Seller",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  log_type: {
    type: String,
    required: true,
  },
  cart: {
    type: Boolean,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  net_amount: {
    type: Number,
    required: true,
  },
});
