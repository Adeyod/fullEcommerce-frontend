import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  loading: false,
  error: false,
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { payload } = action;
      let cpyCartItem = [...state.cartItems];
      const index = cpyCartItem.findIndex((item) => item._id === payload._id);

      if (index === -1) {
        cpyCartItem.push({
          ...payload,
          quantity: 1,
        });
      } else {
        cpyCartItem[index] = {
          ...cpyCartItem[index],
          quantity: cpyCartItem[index].quantity + 1,
        };
      }
      state.cartItems = cpyCartItem;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    deleteFromCart: (state, action) => {
      let newUpdatedCurrentItem = [...state.cartItems];
      const index = newUpdatedCurrentItem.findIndex(
        (item) => item._id === action.payload._id
      );

      const { quantity } = newUpdatedCurrentItem[index];

      if (quantity <= 1) {
        newUpdatedCurrentItem = newUpdatedCurrentItem.filter(
          (item) => item._id !== action.payload._id
        );
      } else {
        newUpdatedCurrentItem[index] = {
          ...newUpdatedCurrentItem[index],
          quantity: newUpdatedCurrentItem[index].quantity - 1,
        };
      }
      state.cartItems = newUpdatedCurrentItem;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      let newCurrentItem = [...state.cartItems];
      newCurrentItem = newCurrentItem.filter(
        (item) => item._id !== action.payload._id
      );
      state.newCurrentItem = newCurrentItem;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
    getTotal: (state) => {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItems) => {
          const { price, quantity } = cartItems;
          // const actualDiscountValue = price * (discountPercentage / 100);
          // const actualPrice = price - actualDiscountValue;

          const itemTotalValue = price * quantity;

          cartTotal.total += itemTotalValue;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total.toFixed(2);
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  removeFromCart,
  clearCart,
  getTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
