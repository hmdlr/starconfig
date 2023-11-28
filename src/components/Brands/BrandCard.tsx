import { IBrand } from "@hmdlr/types";
import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useColorModeImages } from "../../hooks/useColorModeImages";

interface BrandCardProps {
  brand: IBrand;
  active?: boolean;
  onClick?: (brand: IBrand) => void;
}

const BrandCard: FC<BrandCardProps> = ({ brand }) => {
  const { file } = useColorModeImages();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"6rem"}
      width={"5rem"}
      alignItems={"center"}
    >
      <img src={file} alt={brand.name} />
      <Text noOfLines={2} textAlign={"center"} marginTop={"0.5rem"}>
        {brand.name}
      </Text>
    </Box>
  );
};

export default BrandCard;
