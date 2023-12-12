import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { IBrand } from "@hmdlr/types";

export const selectBrandSlice = (state: RootState) => state.brands;

export const selectAllBrands = createSelector(
  selectBrandSlice,
  (state) => state.brands,
);

export const selectBrandById = (id: IBrand["id"]) =>
  createSelector(selectAllBrands, (brands) =>
    brands.find((brand) => brand.id === id),
  );
