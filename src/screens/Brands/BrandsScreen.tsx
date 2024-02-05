import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Flex, Input, Text, useColorModeValue } from "@chakra-ui/react";

import { IBrand } from "@hmdlr/types";

import BrandEditor from "../../components/Brands/BrandEditor";
import PrivateBrandsContainer from "../../components/Brands/PrivateBrandsContainer";
import { PageContent } from "../../components/Utils/PageContent";
import { useActions } from "../../hooks/useActions";
import { useAuth } from "../../hooks/useAuth";
import { useColorModeImages } from "../../hooks/useColorModeImages";
import { fetchPublicBrandsAction } from "../../store/Brands/actions";
import { useAppDispatch } from "../../store/hooks";

export const BrandsScreen = () => {
  const dispatch = useAppDispatch();
  const { setActions } = useActions();
  const navigate = useNavigate();
  const { userId } = useAuth();

  const icons = useColorModeImages();

  // const publicBrands = useAppSelector(selectPublicBrands);

  const [selectedBrand, setSelectedBrand] = useState<IBrand>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  // const publicBrandsFuse = useMemo(() => {
  //   return new Fuse(publicBrands, { keys: ["name", "title"] });
  // }, [publicBrands]);

  // const filteredPublicBrands = useMemo(() => {
  //   if (!searchTerm) {
  //     return publicBrands;
  //   }
  //
  //   return publicBrandsFuse.search(searchTerm).map(({ item }) => item);
  // }, [publicBrands, publicBrandsFuse, searchTerm]);

  const onBrandClick = useCallback((brand: IBrand) => {
    setSelectedBrand(brand);
  }, []);

  // const renderBrand = useCallback(
  //   (brand: IBrand) => {
  //     return <BrandCard brand={brand} key={brand.id} onClick={onBrandClick} />;
  //   },
  //   [onBrandClick],
  // );

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
      {/*<Headline imgSrc={icons.pin02} headline={"System Provided Brands"} />*/}
      {/*<Box display={"flex"} flexWrap={"wrap"} gap={"1rem"} marginTop={"2rem"}>*/}
      {/*  {filteredPublicBrands.map(renderBrand)}*/}
      {/*</Box>*/}
      <PrivateBrandsContainer search={searchTerm} onClick={onBrandClick} />
      <BrandEditor brand={selectedBrand} onClose={closeBrandDetailModal} />
      {userId && (
        <Button
          mt={10}
          leftIcon={<img src={icons.filePLus} alt="plus" />}
          onClick={() => navigate("/rules/new")}
        >
          New Brand
        </Button>
      )}
    </PageContent>
  );
};
