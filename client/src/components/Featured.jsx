import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

import Card from "./Card";

const Featured = () => {
  const context = useContext(ProductContext);
  const FeaturedProducts = context.featuresProducts;
  // let Loading = context.Loading;
  // if (Loading) return <div>Loading....</div>;
  return (
    <div className="bg-gray-100 rounded-lg p-10">
      <div>
        <h1 className="text-4xl font-bold text-center font-mono">
          {" "}
          Our Featured Products
        </h1>
      </div>
      <div className="flex">
        {FeaturedProducts.map((val, i) => (
          <Card {...val} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
