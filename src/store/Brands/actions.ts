import { createAsyncThunk } from "@reduxjs/toolkit";
import { scanphishApiClient } from "../../hooks/useClient";

export const fetchBrandsAction = createAsyncThunk(
  "brands/fetchBrands",
  async (arg, thunkAPI) => {
    try {
      const response = await scanphishApiClient.listBrands({});

      return response.items;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
