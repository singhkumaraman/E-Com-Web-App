const User = require("../models/Users");
const Admin = require("../models/Admin");
const Seller = require("../models/Seller");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// registration based on roles.
const signup = async (request, response) => {
  try {
    const { name, email, password, role } = request.body;
    if (name === "" || email === "" || password === "") {
      response.status(401).json({ error: "FILL_ALL_FIELDS" });
    }
    const userexists = await User.findOne({ email: email });
    if (userexists) {
      response.status(401).json({ error: "USER_ALREADY_EXISTS" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      const user = {
        name: name,
        email: email,
        password: encryptedPassword,
        role: role,
      };
      const createNewuser = await User.create(user);
      const flag = await createNewuser.save();
      if (role === "SELLER") {
        const seller = {
          user_id: createNewuser._id,
          org_name: "helloworld seller",
        };
        const createSeller = await Seller.create(seller);
        const check = await createSeller.save();
      }
      if (flag) {
        response.status(201).json({ message: "USER_CREATED" });
        return;
      } else {
        response.status(400).json({ error: "USER_NOT_CREATED" });
        return;
      }
    }
  } catch (e) {
    response.status(500).json({ error: e });
  }
};
const login = async (request, response) => {
  try {
    const { email, password, role } = request.body;
    const user = await User.findOne({ email: email });
    const admin = await Admin.findOne({ user_id: user._id });
    const seller = await Seller.findOne({ user_id: user._id });
    if (!user) {
      response.status(400).json({ error: "USER_NOT_REGISTERED" });
    }
    const verifypassword = await bcrypt.compare(password, user.password);
    if (verifypassword) {
      const token = generateToken(user._id);
      if (role === "ADMIN" && admin) {
        response.status(200).json({
          token: token,
          role: role,
          user: user.name,
        });
      } else if (role === "SELLER" && seller) {
        response.status(200).json({
          token: token,
          role: role,
          user: user.name,
        });
      } else if (role === "CUSTOMER" && user && !admin) {
        response.status(200).json({
          token: token,
          role: role,
          user: user.name,
        });
      } else {
        response.status(401).json({ error: "UNAUTHORISED" });
      }
    } else {
      response.status(401).json({ error: "WRONG_PASSWORD" });
    }
  } catch (e) {
    response.status(500).json({ error: e });
  }
};
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};
module.exports = {
  signup,
  login,
  generateToken,
};
