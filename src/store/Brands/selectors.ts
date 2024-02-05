import { createSelector } from "@reduxjs/toolkit";

import { IBrand } from "@hmdlr/types";

import { RootState } from "../store";

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

export const selectCanLoadMorePrivateBrands = createSelector(
  selectBrandSlice,
  (state) => {
    return state.privateBrands.length < state.privateBrandsPagination.total;
  },
);

export const selectPrivateBrandById = (id: IBrand["id"]) =>
  createSelector(selectPrivateBrands, (brands) =>
    brands.find((brand) => brand.id === id),
  );
