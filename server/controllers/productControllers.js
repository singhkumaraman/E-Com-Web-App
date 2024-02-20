const Products = require("../models/Products");
const fetchProduct = async (resquest, response) => {
  try {
    const products = await Products.find({});
    response.status(200).json(products);
  } catch (e) {
    response.status(500).json({ message: "internal server error" });
  }
};
const fetchSingleproduct = async (request, response) => {
  try {
    const singleProduct = await Products.findOne({ id: request.params.id });
    response.status(200).json(singleProduct);
  } catch (e) {
    response.status(500).json({ message: "internal server error" });
  }
};
module.exports = { fetchProduct, fetchSingleproduct };
