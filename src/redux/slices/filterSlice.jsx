import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedHouse: "All",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.selectedHouse = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
