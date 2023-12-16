import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import { IBrand } from "@hmdlr/types";

export const selectBrandSlice = (state: RootState) => state.brands;

export const selectPublicBrands = createSelector(
  selectBrandSlice,
  (state) => state.publicBrands,
);

export const selectPublicBrandById = (id: IBrand["id"]) =>
  createSelector(selectPublicBrands, (brands) =>
    brands.find((brand) => brand.id === id),
  );

export const selectPrivateBrands = createSelector(
  selectBrandSlice,
  (state) => state.privateBrands,
);

export const selectPrivateBrandById = (id: IBrand["id"]) =>
  createSelector(selectPrivateBrands, (brands) =>
    brands.find((brand) => brand.id === id),
  );
