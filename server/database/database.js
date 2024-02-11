const mongoose = require("mongoose");
const connectDataBase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://aman:aman@cluster0.fuorplv.mongodb.net/Ecom"
    );
    console.log("Database Connected");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
};

module.exports = connectDataBase;
