const express = require("express");
const router = express.Router();
const { fetchProduct } = require("../controllers/productControllers");
router.get("/allproducts", fetchProduct);
router.get("/:id", fetchSingleproduct);
module.exports = router;
