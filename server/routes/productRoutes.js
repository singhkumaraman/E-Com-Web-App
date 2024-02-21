const express = require("express");
const router = express.Router();
const {
  fetchProduct,
  fetchSingleproduct,
} = require("../controllers/productControllers");
router.get("/allproducts", fetchProduct);
router.get("/:id", fetchSingleproduct);
module.exports = router;
