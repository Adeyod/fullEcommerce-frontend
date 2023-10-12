import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './productSlice';
import cartReducer, { getTotal } from './cartSlice';
import favouriteReducer from './favouriteSlice';

const globalStore = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    favour: favouriteReducer,
  },
});

globalStore.dispatch(getTotal());

export default globalStore;
