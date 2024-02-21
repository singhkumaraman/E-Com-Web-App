const Product = require("../models/Products");
// import Product from "../models/Products";
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const checkOut = async (request, response) => {
  try {
    const items = await Product.find({});
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: request.body.items.map((i) => {
        const item = items.find((item) => item.id === i.id);
        return {
          price_data: {
            currency: "usd",
            product_data: { name: item.title },
            unit_amount: item.price * 100,
          },
          quantity: i.quantity,
        };
      }),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/orders/success`,
      cancel_url: `${process.env.CLIENT_URL}/orders/cancel`,
    });

    response.status(200).json({ session });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { checkOut };
