const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Product = require("../models/Products");
const addProduct = async (request, response) => {
  const data = request.body;
  const product = {
    id: data.id,
    brand: data.brand,
    category: data.category,
    description: data.description,
    discountPercentage: data.discountPercentage,
    images: data.images,
    price: data.price,
    rating: data.rating,
    stock: data.stock,
    thumbnail: data.thumbnail,
    title: data.title,
  };
  const newProduct = await Product.create(product);
  const flag = newProduct.save();
  if (flag) {
    response.status(200).json({ message: "Product added" });
  }
};
module.exports = { addProduct };
