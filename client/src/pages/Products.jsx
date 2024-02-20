import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductsList from "../components/ProductsList";
const Products = () => {
  const context = useContext(ProductContext);
  const { filterproducts, updateFilter, clearFilter, text, price, max, min } =
    context;
  return (
    <div className="py-10 px-22 mx-16 my-10">
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-1 border border-gray-300 rounded-md h-[620px]">
          <div className="px-6 py-2">
            <span className="font-semibold text-gray-400">Search</span>
            <input
              type="text"
              name="text"
              className="border border-gray-500 rounded-md m-1"
              placeholder=" search"
              value={text}
              onChange={updateFilter}
            />
          </div>
          <div className="px-6 py-2">
            <span className="font-semibold text-gray-400">Sort by:</span>
            <form action="#">
              <label htmlFor="sort"></label>
              <select name="sorted" id="sort" onClick={updateFilter}>
                <option value="lowest">Price(lowest)</option>
                <option value="highest">Price(highest)</option>
                <option value="a-z">Price(a-z)</option>
                <option value="z-a">Price(z-a)</option>
              </select>
            </form>
          </div>
          <div className="px-6 py-2">
            <span className="font-semibold text-gray-400">Filter by:</span>
            <div className="flex flex-col justify-start items-start">
              <span className="font-semibold">Category</span>
              <button
                name="category"
                value="all"
                className="hover:underline hover:font-bold cursor-pointer py-2"
                onClick={updateFilter}
              >
                All
              </button>
              <button
                name="category"
                value="smartphones"
                className="hover:underline hover:font-bold cursor-pointer py-2"
                onClick={updateFilter}
              >
                Smartphones
              </button>
              <button
                name="category"
                value="laptops"
                className="hover:underline hover:font-bold cursor-pointer py-2"
                onClick={updateFilter}
              >
                Laptops
              </button>
              <button
                name="category"
                value="fragrances"
                className="hover:underline hover:font-bold cursor-pointer py-2"
                onClick={updateFilter}
              >
                Fragrances
              </button>
              <button
                value="groceries"
                name="category"
                className="hover:underline hover:font-bold cursor-pointer py-2"
                onClick={updateFilter}
              >
                Groceries
              </button>
              <button
                value="home-decoration"
                name="category"
                className="hover:underline hover:font-bold cursor-pointer py-2"
                onClick={updateFilter}
              >
                Home-decoration
              </button>
            </div>
          </div>
          <div className="px-6 py-2">
            <span className="font-semibold text-gray-400">Price:</span>
            <div className=" py-2 ">
              <p className="py-1">
                {" "}
                {Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                  style: "currency",
                  currency: "INR",
                }).format(price)}
              </p>
              <input
                name="price"
                type="range"
                min={min}
                max={max}
                value={price}
                onChange={updateFilter}
                className="w-1/2 border rounded-md "
              />
            </div>
          </div>
          <div className="px-6">
            <button
              className="px-10 py-2 border border-red-500 text-white bg-red-500 rounded-md"
              onClick={clearFilter}
            >
              Clear Filter
            </button>
          </div>
        </div>
        <div className="col-span-4">
          <ProductsList items={filterproducts} />
        </div>
      </div>
    </div>
  );
};

export default Products;
