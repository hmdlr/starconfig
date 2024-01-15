import { IBrand } from "@hmdlr/types";
import React, { FC, useCallback } from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import BrandCard from "./BrandCard";
import { useColorModeImages } from "../../hooks/useColorModeImages";
import { Headline } from "../Headline/Headline";

interface BrandsContainerProps {
  brands: IBrand[];
  brandAreActive?: boolean;
  onClick?: (brand: IBrand) => void;
  canLoadMore?: boolean;
  onLoadMore?: () => void;
}

const BrandsContainer: FC<BrandsContainerProps> = ({
  brands,
  onClick,
  brandAreActive,
  canLoadMore,
  onLoadMore,
}) => {
  const icons = useColorModeImages();

  const renderBrand = useCallback(
    (brand: IBrand) => {
      return (
        <BrandCard
          brand={brand}
          key={brand.id}
          onClick={onClick}
          active={brandAreActive}
        />
      );
    },
    [brandAreActive, onClick],
  );

  return (
    <Box>
      <Headline imgSrc={icons.eyeOff} headline={"Private Brands"} />
      <Box display={"flex"} flexWrap={"wrap"} gap={"1rem"}>
        {brands.map(renderBrand)}
      </Box>
      {canLoadMore && onLoadMore && (
        <HStack justifyContent={"center"}>
          <Button
            onClick={onLoadMore}
            variant={"outline"}
            marginTop={"0.5rem"}
            width={"2rem"}
            padding={"0"}
          >
            <img src={icons.chevronDownDouble} alt={"Chevron Down Double"} />{" "}
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default BrandsContainer;
