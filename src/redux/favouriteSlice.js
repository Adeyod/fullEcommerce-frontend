import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  favourLists: localStorage.getItem('favourLists')
    ? JSON.parse(localStorage.getItem('favourLists'))
    : [],
  // toggleColor: localStorage.getItem('toggleColor')
  //   ? JSON.parse(localStorage.getItem('toggleColor'))
  //   : [],

  // color: false,
};

const favouriteSlice = createSlice({
  name: 'favour',
  initialState,
  reducers: {
    addToFavour: (state, action) => {
      const { payload } = action;
      console.log(payload);
      let cpyFavour = [...state.favourLists];
      const index = cpyFavour.findIndex((item) => item._id === payload._id);

      if (index === -1) {
        cpyFavour.push(payload);
        // state.color = true;

        toast.success(`${payload.title} has been added to your favourites`);
      } else {
        cpyFavour = cpyFavour.filter((item) => item._id !== payload._id);
        // state.color = false;
        toast.error(`${payload.title} has been removed from your favourites`);
      }
      state.favourLists = cpyFavour;

      localStorage.setItem('favourLists', JSON.stringify(state.favourLists));
    },
    // addToggleColor: (state, action) => {
    //   const { payload } = action;
    //   console.log(payload);
    //   let newToggleColor = [...state.toggleColor];
    //   const index = newToggleColor.findIndex(
    //     (item) => item._id === payload._id
    //   );
    //   console.log(index);
    //   if (index === -1) {
    //     newToggleColor.push(payload);
    //     console.log(newToggleColor);
    //     state.color = true;
    //   } else {
    //     newToggleColor = newToggleColor.filter(
    //       (item) => item._id !== payload._id
    //     );
    //     state.color = false;
    //   }
    //   state.toggleColor = newToggleColor;
    //   console.log(state.toggleColor);
    //   localStorage.setItem('toggleColor', JSON.stringify(state.toggleColor));
    // },
  },
});

export const { addToFavour } = favouriteSlice.actions;

export default favouriteSlice.reducer;
