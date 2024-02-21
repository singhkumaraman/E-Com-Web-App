import { Trash } from "lucide-react";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const nav = useNavigate();
  const context = useContext(CartContext);
  const { cart, removeItem } = context;
  let total = cart.reduce((sum, cur) => {
    if (cur) return sum + cur.price * cur.quantity;
    return 0;
  }, 0);
  const payment = async () => {
    const items = cart.map((e) => ({ id: e.id, quantity: e.quantity }));
    console.log(items);

    try {
      const response = await fetch(
        "http://localhost:5000/api/payment-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (data.url) {
        nav(data.url); // Assuming the nav function is correctly implemented
      } else {
        console.error("Error: No payment URL received from the server");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-0">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section
            aria-labelledby="cart-heading"
            className="rounded-lg bg-white lg:col-span-8"
          >
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul role="list" className="divide-y divide-gray-200">
              {cart &&
                cart.map((product, i) => (
                  <div key={i} className="">
                    <li className="flex py-6 sm:py-6 ">
                      <div className="flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href={product.href}
                                  className="font-semibold text-black"
                                >
                                  {product.name}
                                </a>
                              </h3>
                            </div>
                            {/* <div className="mt-1 flex text-sm">
                            <p className="text-sm text-gray-500">
                              {product.color}
                            </p>
                            {product.size ? (
                              <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                {product.size}
                              </p>
                            ) : null}
                          </div> */}
                            <div className="mt-1 flex items-end">
                              <p className="text-sm font-medium text-gray-900">
                                {Intl.NumberFormat("en-IN", {
                                  maximumSignificantDigits: 3,
                                  style: "currency",
                                  currency: "USD",
                                }).format(product.price * product.quantity)}
                              </p>
                              &nbsp;&nbsp;
                              <p className="text-sm font-medium text-green-500">
                                {product.discount}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <div className="mb-2 flex">
                      <div className="min-w-24 flex">
                        <button
                          type="button"
                          className="h-7 w-7"
                          onClick={() => {
                            context.decreaseCount(product.id);
                          }}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="mx-1 h-7 w-9 rounded-md border text-center"
                          defaultValue={product.quantity}
                        />
                        <button
                          type="button"
                          className="flex h-7 w-7 items-center justify-center"
                          onClick={() => {
                            context.increaseCount(product.id);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div className="ml-6 flex text-sm">
                        <button
                          type="button"
                          className="flex items-center space-x-1 px-2 py-1 pl-0"
                          onClick={() => {
                            removeItem(product.id);
                          }}
                        >
                          <Trash size={12} className="text-red-500" />
                          <span className="text-xs font-medium text-red-500">
                            Remove
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </ul>
          </section>
          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
          >
            <h2
              id="summary-heading"
              className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
            >
              Price Details
            </h2>
            <div>
              <dl className=" space-y-1 px-2 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">{`Price (${cart.length} item)`}</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {Intl.NumberFormat("en-IN", {
                      maximumSignificantDigits: 3,
                      style: "currency",
                      currency: "USD",
                    }).format(total)}
                  </dd>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <dt className="flex items-center text-sm text-gray-800">
                    <span>Discount</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">- $ 0</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="flex text-sm text-gray-800">
                    <span>Delivery Charges</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">Free</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                  <dt className="text-base font-medium text-gray-900">
                    Total Amount
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    {Intl.NumberFormat("en-IN", {
                      maximumSignificantDigits: 3,
                      style: "currency",
                      currency: "USD",
                    }).format(total)}
                  </dd>
                </div>
              </dl>
              <div className="px-2 pb-4 font-medium text-green-700">
                You will save $ 0 on this order
              </div>
            </div>
            <button
              onClick={() => {
                payment();
              }}
              className="text-xl bg-green-500 text-white px-8 py-1 rounded mx-2"
            >
              Checkout
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Cart;
