const express = require("express");
const router = express.Router();
const { fetchProduct } = require("../controllers/productControllers");
router.get("/allproducts", fetchProduct);
module.exports = router;
