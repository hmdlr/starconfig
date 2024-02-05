import React, { FC, useCallback, useMemo } from "react";

import { Box, Text, useColorModeValue } from "@chakra-ui/react";

import { IBrand } from "@hmdlr/types";

import { useColorModeImages } from "../../hooks/useColorModeImages";

interface BrandCardProps {
  brand: IBrand;
  active?: boolean;
  onClick?: (brand: IBrand) => void;
  disabled?: boolean;
}

const BrandCard: FC<BrandCardProps> = ({
  brand,
  onClick,
  active,
  disabled,
}) => {
  const { file, plusSquare, minusSquare } = useColorModeImages();

  const brandTitleColor = useColorModeValue("grayActive1", "grayActive2");

  const _onClick = useCallback(() => {
    onClick?.(brand);
  }, [brand, onClick]);

  const bottomIcon = useMemo(() => {
    if (active === undefined) {
      return null;
    }

    return active ? minusSquare : plusSquare;
  }, [active, minusSquare, plusSquare]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"6rem"}
      height={active === undefined ? "5rem" : "7rem"}
      cursor={active === undefined ? "pointer" : "default"}
      onClick={_onClick}
      opacity={disabled ? 0.5 : 1}
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
      {bottomIcon && (
        <Box marginTop={"0.5rem"} cursor={"pointer"}>
          <img src={bottomIcon} alt={"Bottom Icon"} />
        </Box>
      )}
    </Box>
  );
};

export default BrandCard;
