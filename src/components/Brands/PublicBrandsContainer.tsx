import { IBrand } from "@hmdlr/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FC, useEffect } from "react";
import { selectPublicBrands } from "../../store/Brands/selectors";
import BrandsContainer from "./BrandsContainer";
import { fetchPublicBrandsAction } from "../../store/Brands/actions";

interface PublicBrandsContainerProps {
  onClick?: (brand: IBrand) => void;
}

const PublicBrandsContainer: FC<PublicBrandsContainerProps> = ({ onClick }) => {
  const dispatch = useAppDispatch();

  const publicBrands = useAppSelector(selectPublicBrands);

  useEffect(() => {
    if (!publicBrands.length) {
      dispatch(fetchPublicBrandsAction());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return <BrandsContainer brands={publicBrands} onClick={onClick} />;
};

export default PublicBrandsContainer;
