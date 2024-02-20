import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
const ProductsList = ({ items }) => {
  const context = useContext(CartContext);
  return (
    <div className="grid grid-cols-3 gap-6 items-center">
      {items ? (
        <>
          {items.map((_, i) => (
            <Link to={`/product/${_.id}`} key={i}>
              <div className="rounded-md border p-4 ">
                <img
                  src={_.images[0]}
                  alt="Laptop"
                  className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
                />
                <div className="p-4">
                  <h1 className="inline-flex items-center text-lg font-semibold">
                    {_.brand}
                  </h1>
                  <p className="mt-3 text-sm text-gray-600">{_.category}</p>
                  <p className="mt-3 text-sm text-gray-600">
                    {_.description.substring(0, 40) + "..."}
                  </p>
                  <div className="mt-5 flex items-center space-x-2">
                    <span className="block text-sm font-semibold">
                      Price :{" "}
                    </span>
                    <span className="block cursor-pointer rounded-md  p-1 px-2 text-xs font-medium">
                      {Intl.NumberFormat("en-IN", {
                        maximumSignificantDigits: 3,
                        style: "currency",
                        currency: "INR",
                      }).format(_.price)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      context.addToCart(_);
                    }}
                    type="button"
                    className="mt-4 w-full rounded-sm bg-green-500 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <>"OOPS!! no products available"</>
      )}
    </div>
  );
};
export default ProductsList;
