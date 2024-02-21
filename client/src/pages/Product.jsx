import { React, useContext, useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { CartContext } from "../context/CartContext";
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);
  const { addToCart } = useContext(CartContext);
  const getSingleProduct = async (id) => {
    const response = await fetch(`http://localhost:5000/api/product/${id}`, {
      method: "GET",
      headers: {
        "Context-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      setProduct(data);
    } else {
      throw error("Error 404");
    }
  };
  useEffect(() => {
    getSingleProduct(id);
  }, []);
  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
          <img
            alt="Opps!!"
            className="h-64 w-full rounded-xl object-cover lg:h-96 lg:w-1/2"
            src={product.images && product.images[0]}
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h2 className="text-2xl font-bold tracking-widest text-gray-500">
              {product.title}
            </h2>
            <p className="leading-relaxed">{product.description}</p>
            <div className="my-4 flex gap-2 items-center">
              <div>{product.rating} </div>
              <div>
                <Star size={16} className="text-yellow-500" />
              </div>
            </div>
            <div className="mb-5 mt-6 flex-col  items-center border-b-2 border-gray-100 pb-5">
              <div className="flex items-center gap-16">
                <div>
                  <TbTruckDelivery className="text-5xl text-blue-500 items-center" />
                  <span>Free Delivery</span>
                </div>
                <div>
                  <TbReplace className="text-5xl text-blue-500" />
                  <span>Replacement</span>
                </div>
                <div>
                  <MdSecurity className="text-5xl text-blue-500" />
                  <span>Secure</span>
                </div>
              </div>
              <br></br>
              <div className=" flex items-center justify-between">
                <div className=" flex items-center">
                  <span className="mr-3 text-sm font-semibold">Stock:</span>
                  <div className="relative">{product.stock}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="title-font text-xl font-bold text-gray-900">
                {Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                  style: "currency",
                  currency: "USD",
                }).format(product.price)}
              </span>
              <button
                type="button"
                onClick={() => {
                  addToCart(product);
                }}
                className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
