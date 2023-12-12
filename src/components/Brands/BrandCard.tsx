import { IBrand } from "@hmdlr/types";
import React, { FC, useCallback } from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useColorModeImages } from "../../hooks/useColorModeImages";

interface BrandCardProps {
  brand: IBrand;
  active?: boolean;
  onClick?: (brand: IBrand) => void;
}

const BrandCard: FC<BrandCardProps> = ({ brand, onClick }) => {
  const { file } = useColorModeImages();

  const brandTitleColor = useColorModeValue("grayActive1", "grayActive2");

  const _onClick = useCallback(() => {
    onClick?.(brand);
  }, [brand, onClick]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"6rem"}
      height={"5rem"}
      cursor={"pointer"}
      onClick={_onClick}
    >
      <img src={file} alt={brand.name} />
      <Text
        fontSize={"14px"}
        fontWeight={"800"}
        color={brandTitleColor}
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
