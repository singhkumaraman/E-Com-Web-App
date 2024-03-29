require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDataBase = require("./database/database");
app.use(cors());
connectDataBase();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.listen(5000, () => {
  console.log("Server Running ");
});
