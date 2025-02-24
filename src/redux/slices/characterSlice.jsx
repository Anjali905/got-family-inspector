import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCharacters: [], // Store all characters
  houses: [], // Store unique house names
  loading: false,
  error: null,
};

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    fetchCharactersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCharactersSuccess: (state, action) => {
      state.loading = false;
      state.allCharacters = action.payload;

      // Extract Unique Houses (Best Practice)
      state.houses = [
        ...new Set(action.payload.map((char) => char.family).filter(Boolean)),
      ];
    },
    fetchCharactersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCharactersRequest,
  fetchCharactersSuccess,
  fetchCharactersFailure,
} = characterSlice.actions;

export default characterSlice.reducer;
