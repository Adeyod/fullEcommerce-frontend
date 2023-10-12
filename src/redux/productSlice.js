import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productLists: [],
  loading: false,
  error: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productStart: (state) => {
      state.loading = true;
    },
    productSuccess: (state, action) => {
      state.loading = false;
      state.productLists = action.payload;
      state.error = false;
    },
    productFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { productFailure, productStart, productSuccess } =
  productSlice.actions;

export default productSlice.reducer;
