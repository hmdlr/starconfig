import { IBrand } from "@hmdlr/types";

export type BrandsState = {
  publicBrands: IBrand[];
  privateBrands: IBrand[];
  privateBrandsPagination: {
    total: number;
  };
};
