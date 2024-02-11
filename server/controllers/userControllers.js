const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const signup = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    if (name === "" || email === "" || password === "") {
      response.status(401).json({ error: "fill all the fields" });
    }
    const userexists = await User.findOne({ email: email });
    if (userexists) {
      response.status(401).json({ error: "user already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      const user = {
        name: name,
        email: email,
        password: encryptedPassword,
      };
      const createNewuser = await User.create(user);
      const flag = await createNewuser.save();
      console.log(flag);
      if (flag) {
        response.status(200).json({ message: "user successfully created" });
        return;
      } else {
        response.status(400).json({ error: "user not created" });
        return;
      }
    }
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
};
const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      response.status(401).json({ error: "User not found" });
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      response.status(200).json({
        user: user.name,
        id: user._id,
        token: generateToken(user._id),
      });
    } else {
      response.status(401).json({ error: "Wrong password" });
    }
  } catch (error) {
    response.status(500).json({ error: "Internal server error" });
  }
};
const generateToken = (id) => {
  return jwt.sign({ id }, "6204", {
    expiresIn: "1d",
  });
};
module.exports = {
  signup,
  login,
  generateToken,
};
