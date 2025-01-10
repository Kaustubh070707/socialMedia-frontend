import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "reqests",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      return null;
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
