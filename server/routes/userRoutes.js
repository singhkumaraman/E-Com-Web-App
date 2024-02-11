const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/userControllers");
const { addProduct } = require("../controllers/adminControllers");
router.post("/login", login);
router.post("/signup", signup);
router.post("/add", addProduct);
module.exports = router;
