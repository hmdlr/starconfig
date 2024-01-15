import { IBrand } from "@hmdlr/types";
import { FC, useCallback, useEffect } from "react";
import BrandsContainer from "./BrandsContainer";
import {
  selectCanLoadMorePrivateBrands,
  selectPrivateBrands,
} from "../../store/Brands/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPrivateBrandsAction } from "../../store/Brands/actions";
import { useColorModeImages } from "../../hooks/useColorModeImages";

interface PrivateBrandsContainerProps {
  onClick?: (brand: IBrand) => void;
}

const PrivateBrandsContainer: FC<PrivateBrandsContainerProps> = ({
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
    if (!privateBrands.length) {
      dispatch(fetchPrivateBrandsAction({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
