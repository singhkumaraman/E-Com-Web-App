const productReducer = (state, action) => {
  switch (action.type) {
    case "LOADING_PRODUCT":
      console.log(action.payload.products);
      return {
        ...state,
        allProducts: [...action.payload.products],
        filterproducts: [...action.payload.products],
      };

    case "UPDATE_FILTER":
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    case "FILTER_PRODUCTS":
      var { allProducts } = state;
      var product = [...allProducts];
      const { price, category } = state;
      if (category !== "all") {
        product = product.filter((i) => i.category === category);
      }
      if (category === "all") {
        product = [...allProducts];
      }
      if (price === 0) {
        product = [];
      } else {
        product = product.filter((i) => i.price <= price);
      }
      return {
        ...state,
        filterproducts: product,
      };
    case "SORT_PRODUCT":
      let filtered;
      const { filterproducts, sorted } = state;
      let temp = [...filterproducts];
      if (sorted === "a-z") {
        filtered = temp.sort((a, b) => a.title.localeCompare(b.title));
      }
      if (sorted === "z-a") {
        filtered = temp.sort((a, b) => b.title.localeCompare(a.title));
      }
      if (sorted === "lowest") {
        filtered = temp.sort((a, b) => a.price - b.price);
      }
      if (sorted === "highest") {
        filtered = temp.sort((a, b) => b.price - a.price);
      }
      return {
        ...state,
        filterproducts: filtered,
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        sorted: "lowest",
        text: "",
        category: "all",
        price: 10000,
        max: 10000,
        min: 0,
      };
    case "SEARCH":
      var { allProducts } = state;
      var product = [...allProducts]; 
      const { text } = state;
      if (text != "") {
        var searched = product.filter((v) =>
          v.title.toLowerCase().startsWith(text.toLowerCase())
        );
      }
      return {
        ...state,
        filterproducts: searched,
      };
    default:
      return state;
  }
};
export default productReducer;
