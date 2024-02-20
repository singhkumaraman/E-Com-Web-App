const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let product = action.payload;
      let existing = state.cart.find((ele) => ele.id === product.id);
      if (existing) {
        let updated = state.cart.map((ele) => {
          if (ele.id === product.id) {
            let newAmount = ele.amount + 1;
            if (newAmount >= ele.max) {
              newAmount = ele.max;
            }
            return {
              ...ele,
              amount: newAmount,
            };
          } else {
            return {
              ...ele,
            };
          }
        });
        return {
          ...state,
          cart: updated,
        };
      } else {
        const cart_product = {
          id: product.id,
          name: product.title,
          amount: 1,
          image: product.images[0],
          price: product.price,
          max: product.stock,
        };
        return {
          ...state,
          cart: [...state.cart, cart_product],
        };
      }

    // case "REMOVE_ITEM":
    //   const _id = action.payload;
    //   let updatedCart = state.cart.filter((e) => {
    //     return e.id !== _id;
    //   });
    //   return {
    //     ...state,
    //     cart: updatedCart,
    //   };
    default:
      return {
        ...state,
      };
  }
};

export default CartReducer;
