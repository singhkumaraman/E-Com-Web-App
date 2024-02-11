import React from "react";
import { Link } from "react-router-dom";
const Card = (curr) => {
  const { id, price, category, image, name } = curr;
  return (
    <Link to={`/product/${id}`}>
      <div className="p-24 font-semibold">
        <div>
          <img src={image} className="rounded-xl " />
        </div>
        <div className="flex justify-between mt-4">
          <div>{name}</div>
          <div className="text-green-500">
            {Intl.NumberFormat("en-IN", {
              maximumSignificantDigits: 3,
              style: "currency",
              currency: "INR",
            }).format(price / 100)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
