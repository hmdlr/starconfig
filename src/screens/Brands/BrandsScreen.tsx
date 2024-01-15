import { useAppDispatch, useAppSelector } from "../../store/hooks";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { fetchPublicBrandsAction } from "../../store/Brands/actions";
import { selectPublicBrands } from "../../store/Brands/selectors";
import { Box, Flex, Input, Text, useColorModeValue } from "@chakra-ui/react";
import { IBrand } from "@hmdlr/types";
import BrandCard from "../../components/Brands/BrandCard";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import BrandEditor from "../../components/Brands/BrandEditor";
import Fuse from "fuse.js";
import { useColorModeImages } from "../../hooks/useColorModeImages";
import { Headline } from "../../components/Headline/Headline";
import PrivateBrandsContainer from "../../components/Brands/PrivateBrandsContainer";
import { PageContent } from "../../components/Utils/PageContent";

export const BrandsScreen = () => {
  const dispatch = useAppDispatch();
  const { setActions } = useActions();
  const navigate = useNavigate();

  const icons = useColorModeImages();

  const publicBrands = useAppSelector(selectPublicBrands);

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

  const brandTitleColor = useColorModeValue("grayActive1", "grayActive2");

  useEffect(() => {
    dispatch(fetchPublicBrandsAction());
  }, [dispatch]);

  useEffect(() => {
    setActions({
      "Add brand": () => navigate("/rules/new"),
    });
  }, [navigate, setActions]);

  return (
    <PageContent>
      <Input
        maxWidth={"20rem"}
        placeholder="Enter your search term"
        // TODO: debounce this
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Flex
        direction={"column"}
        marginTop={"1rem"}
        alignItems={"center"}
        width={"fit-content"}
        marginBottom={"2rem"}
      >
        <img
          src={icons.searchBrand}
          alt={"Search brand"}
          width={28}
          height={28}
        />
        <Text color={brandTitleColor} fontWeight={"600"}>
          Search
        </Text>
      </Flex>
      <Headline imgSrc={icons.pin02} headline={"System Provided Brands"} />
      <Box display={"flex"} flexWrap={"wrap"} gap={"1rem"} marginTop={"2rem"}>
        {filteredPublicBrands.map(renderBrand)}
      </Box>
      <PrivateBrandsContainer onClick={onBrandClick} />
      <BrandEditor brand={selectedBrand} onClose={closeBrandDetailModal} />
    </PageContent>
  );
};
