import { IBrand } from "@hmdlr/types";
import React, { FC, useCallback } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useColorModeImages } from "../../hooks/useColorModeImages";

interface BrandCardProps {
  brand: IBrand;
  active?: boolean;
  onClick?: (brand: IBrand) => void;
}

const BrandCard: FC<BrandCardProps> = ({ brand, onClick }) => {
  const { file } = useColorModeImages();

  const _onClick = useCallback(() => {
    onClick?.(brand);
  }, [brand, onClick]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"6rem"}
      width={"5rem"}
      alignItems={"center"}
      onClick={_onClick}
    >
      <img src={file} alt={brand.name} />
      <Text
        fontSize={"md"}
        noOfLines={2}
        textAlign={"center"}
        marginTop={"0.25rem"}
      >
        {brand.name}
      </Text>
    </Box>
  );
};

export default BrandCard;
