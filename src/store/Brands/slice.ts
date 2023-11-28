import { createSlice } from "@reduxjs/toolkit";
import { BrandsState } from "./types";
import { fetchBrandsAction } from "./actions";

const initialState: BrandsState = {
  brands: [],
};

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
      state.brands = action.payload;
    });
  },
});
