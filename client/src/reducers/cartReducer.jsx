const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let { id, amount, product } = action.payload;
      let existing = state.cart.find((ele) => ele.id === id);
      if (existing) {
        let updated = state.cart.map((ele) => {
          if (ele.id === id) {
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
          id: id,
          name: product.name,
          amount,
          image: product.image[0].url,
          price: product.price,
          max: product.stock,
        };
        return {
          ...state,
          cart: [...state.cart, cart_product],
        };
      }

    case "REMOVE_ITEM":
      const _id = action.payload;
      let updatedCart = state.cart.filter((e) => {
        return e.id !== _id;
      });
      return {
        ...state,
        cart: updatedCart,
      };
    default:
      return {
        ...state,
      };
  }
};

export default CartReducer;
