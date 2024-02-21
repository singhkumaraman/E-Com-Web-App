const express = require("express");
const router = express.Router();
const { checkOut } = require("../controllers/paymentsControllers");
router.post("/payment-session", checkOut);
module.exports = router;
