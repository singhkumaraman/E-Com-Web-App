const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let product = action.payload;
      let existing = state.cart.find((ele) => ele.id === product.id);
      if (existing) {
        let updated = state.cart.map((ele) => {
          if (ele.id === product.id) {
            let newAmount = ele.quantity + 1;
            if (newAmount >= ele.max) {
              newAmount = ele.max;
            }
            return {
              ...ele,
              quantity: newAmount,
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
          quantity: 1,
          image: product.images[0],
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
    case "INCREASE_COUNT":
      let id = action.payload;
      let updated_pro = state.cart.map((e) => {
        if (e.id === id) {
          let newAmt = e.quantity + 1;
          if (newAmt >= e.max) {
            newAmt = e.max;
          }
          return {
            ...e,
            quantity: newAmt,
          };
        }
      });
      return {
        ...state,
        cart: updated_pro,
      };
    case "DECREASE_COUNT":
      let updated = state.cart.map((e) => {
        if (e.id === action.payload.id) {
          let newAmt = e.quantity - 1;
          if (newAmt == 0) {
            dispatch({ type: "REMOVE_ITEM", payload: action.payload });
            return {
              ...state,
            };
          }
          if (newAmt === e.min) {
            newAmt = e.min;
          }
          return {
            ...e,
            quantity: newAmt,
          };
        }
      });
      return {
        ...state,
        cart: updated,
      };
    default:
      return {
        ...state,
      };
  }
};

export default CartReducer;
