import React, { FC, useCallback } from "react";

import { Box, Button, HStack } from "@chakra-ui/react";

import { IBrand } from "@hmdlr/types";

import { useColorModeImages } from "../../hooks/useColorModeImages";
import { Headline } from "../Headline/Headline";
import BrandCard from "./BrandCard";

interface BrandsContainerProps {
  title: string;
  icon: string;
  brands: IBrand[];
  brandAreActive?: boolean;
  onClick?: (brand: IBrand) => void;
  canLoadMore?: boolean;
  onLoadMore?: () => void;
  disabled?: (brand: IBrand) => boolean;
}

const BrandsContainer: FC<BrandsContainerProps> = ({
  title,
  icon,
  brands,
  onClick,
  brandAreActive,
  canLoadMore,
  onLoadMore,
  disabled,
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
          disabled={disabled?.(brand)}
        />
      );
    },
    [brandAreActive, disabled, onClick],
  );

  return (
    <Box>
      <Headline imgSrc={icon} headline={title} />
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
