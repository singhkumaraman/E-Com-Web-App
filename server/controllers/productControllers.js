const Products = require("../models/Products");
const fetchProduct = async (resquest, response) => {
  try {
    const products = await Products.find({});
    response.status(200).json(products);
  } catch (e) {
    response.status(500).json({ message: "internal server error" });
  }
};
module.exports = { fetchProduct };
