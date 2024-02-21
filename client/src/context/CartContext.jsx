import { createContext, useEffect, useReducer } from "react";
import reducer from "../reducers/cartReducer";
const initialState = {
  cart: [],
  total_item: 0,
  total_price: 0,
  shipping_charges: 60,
};
export const CartContext = createContext();
export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const removeItem = (id) => {
    //     dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  const increaseCount = (id) => {
    dispatch({ type: "INCREASE_COUNT", payload: id });
  };
  const decreaseCount = (id) => {
    dispatch({ type: "DECREASE_COUNT", payload: id });
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, decreaseCount, increaseCount }}
    >
      {children}
    </CartContext.Provider>
  );
}
