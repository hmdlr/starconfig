import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchPublicBrandsAction } from "../../store/Brands/actions";
import { selectAllBrands } from "../../store/Brands/selectors";
import { Box, Input, Text } from "@chakra-ui/react";
import { IBrand } from "@hmdlr/types";
import BrandCard from "../../components/Brands/BrandCard";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import BrandEditor from "../../components/Brands/BrandEditor";
import Fuse from "fuse.js";

export const BrandsScreen = () => {
  const dispatch = useAppDispatch();
  const { setActions } = useActions();
  const navigate = useNavigate();

  const brands = useAppSelector(selectAllBrands);

  const [selectedBrand, setSelectedBrand] = useState<IBrand>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const brandsFuse = useMemo(() => {
    return new Fuse(brands, { keys: ["name", "title"] });
  }, [brands]);

  const filteredBrands = useMemo(() => {
    if (!searchTerm) {
      return brands;
    }

    return brandsFuse.search(searchTerm).map(({ item }) => item);
  }, [brands, brandsFuse, searchTerm]);

  const onBrandClick = useCallback((brand: IBrand) => {
    setSelectedBrand(brand);
  }, []);

  const renderBrand = useCallback(
    (brand: IBrand) => {
      return <BrandCard brand={brand} key={brand.id} onClick={onBrandClick} />;
    },
    [onBrandClick],
  );

  const closeBrandDetailModal = useCallback(() => {
    setSelectedBrand(undefined);
  }, []);

  useEffect(() => {
    dispatch(fetchPublicBrandsAction());
  }, [dispatch]);

  useEffect(() => {
    setActions({
      "Add brand": () => navigate("/rules/new"),
    });
  }, [navigate, setActions]);

  return (
    <Box padding={"2rem"}>
      <Input
        maxWidth={"20rem"}
        placeholder="Enter your search term"
        // TODO: debounce this
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Text marginY={"1rem"}>Private brands</Text>
      <Box display={"flex"} flexWrap={"wrap"} gap={"1rem"}>
        {filteredBrands.map(renderBrand)}
      </Box>
      <BrandEditor brand={selectedBrand} onClose={closeBrandDetailModal} />
    </Box>
  );
};
