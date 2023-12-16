import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchPrivateBrandsAction,
  fetchPublicBrandsAction,
} from "../../store/Brands/actions";
import {
  selectPrivateBrands,
  selectPublicBrands,
} from "../../store/Brands/selectors";
import { Box, Button, HStack, Input, Text } from "@chakra-ui/react";
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

  const publicBrands = useAppSelector(selectPublicBrands);
  const privateBrands = useAppSelector(selectPrivateBrands);

  const [selectedBrand, setSelectedBrand] = useState<IBrand>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const publicBrandsFuse = useMemo(() => {
    return new Fuse(publicBrands, { keys: ["name", "title"] });
  }, [publicBrands]);

  const filteredPublicBrands = useMemo(() => {
    if (!searchTerm) {
      return publicBrands;
    }

    return publicBrandsFuse.search(searchTerm).map(({ item }) => item);
  }, [publicBrands, publicBrandsFuse, searchTerm]);

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

  const loadMorePrivateBrands = useCallback(() => {
    dispatch(fetchPrivateBrandsAction({ loadMore: true }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPublicBrandsAction());
    dispatch(fetchPrivateBrandsAction({}));
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
      <Text marginY={"1rem"}>Public brands</Text>
      <Box display={"flex"} flexWrap={"wrap"} gap={"1rem"}>
        {filteredPublicBrands.map(renderBrand)}
      </Box>
      <Text marginY={"1rem"}>Private brands</Text>
      <Box display={"flex"} flexWrap={"wrap"} gap={"1rem"}>
        {privateBrands.map(renderBrand)}
      </Box>
      <HStack justifyContent={"center"}>
        <Button onClick={loadMorePrivateBrands} variant={"text"}>
          Load more
        </Button>
      </HStack>
      <BrandEditor brand={selectedBrand} onClose={closeBrandDetailModal} />
    </Box>
  );
};
