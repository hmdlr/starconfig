import { FC, useCallback, useEffect } from "react";

import { IBrand } from "@hmdlr/types";

import { useColorModeImages } from "../../hooks/useColorModeImages";
import { fetchPrivateBrandsAction } from "../../store/Brands/actions";
import {
  selectCanLoadMorePrivateBrands,
  selectPrivateBrands,
} from "../../store/Brands/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import BrandsContainer from "./BrandsContainer";

const SEARCH_TIMEOUT = 500;

interface PrivateBrandsContainerProps {
  search?: string;
  onClick?: (brand: IBrand) => void;
}

const PrivateBrandsContainer: FC<PrivateBrandsContainerProps> = ({
  search,
  onClick,
}) => {
  const dispatch = useAppDispatch();

  const icons = useColorModeImages();

  const privateBrands = useAppSelector(selectPrivateBrands);
  const canLoadMorePrivateBrands = useAppSelector(
    selectCanLoadMorePrivateBrands,
  );

  const loadMore = useCallback(() => {
    dispatch(fetchPrivateBrandsAction({ loadMore: true }));
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(fetchPrivateBrandsAction({ search }));
    }, SEARCH_TIMEOUT);

    return () => clearTimeout(timeout);
  }, [dispatch, search]);

  return (
    <BrandsContainer
      title={"Private Brands"}
      icon={icons.eyeOff}
      brands={privateBrands}
      onClick={onClick}
      canLoadMore={canLoadMorePrivateBrands}
      onLoadMore={loadMore}
    />
  );
};

export default PrivateBrandsContainer;
