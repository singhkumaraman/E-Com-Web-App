import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
const CartAmountToggle = ({ count, increment, decrement }) => {
  return (
    <div className="flex gap-5">
      <div>
        <button
          onClick={() => {
            decrement();
          }}
        >
          <FaMinus />
        </button>
      </div>
      <div>{count}</div>
      <div>
        <button
          onClick={() => {
            increment();
          }}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default CartAmountToggle;
