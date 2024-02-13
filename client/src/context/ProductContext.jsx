import { createContext, useEffect, useReducer } from "react";
import reducer from "../reducers/productReducer";
const initialState = {
  filterproducts: [],
  allProducts: [],
  sorted: "lowest",
  text: "",
  category: "all",
  price: 10000,
  max: 10000,
  min: 0,
};
export const ProductContext = createContext();
export function ProductContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products/fetch", {
        method: "GET",
        headers: {
          "Context-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log(data);
      dispatch({ type: "LOADING_PRODUCT", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  const updateFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    dispatch({ type: "UPDATE_FILTER", payload: { name, value } });
  };
  const sorting = () => {
    // dispatch({ type: "SORT" });
  };
  const clearFilter = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };
  // const getSingleProduct = async (id) => {
  //   const response = await fetch(`https://dummyjson.com/products/${id}`, {
  //     method: "GET",
  //     headers: {
  //       "Context-Type": "application/json",
  //     },
  //   });
  //   if (response.status === 200) {
  //     const data = await response.json();
  //     dispatch({ type: "SINGLE_PRODUCT", payload: data });
  //   } else {
  //     dispatch({ type: "SINGLE_ERROR" });
  //   }
  // };
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
  }, [state.category, state.sorted, state.min, state.max, state.price]);
  useEffect(() => {
    dispatch({ type: "SORT_PRODUCT" });
  }, [state.category, state.sorted, state.min, state.max, state.price]);
  useEffect(() => {
    dispatch({ type: "SEARCH" });
  }, [state.text]);

  return (
    <ProductContext.Provider
      value={{ ...state, sorting, updateFilter, clearFilter }}
    >
      {children}
    </ProductContext.Provider>
  );
}
