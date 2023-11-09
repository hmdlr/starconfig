import React from "react";
import { Box } from "@chakra-ui/react";

export const IconBorder = (props: {
  node: React.ReactNode;
}) => {
  return (
    <Box
      width="2.5625rem"
      height="2.5625rem"
      borderRadius="10px"
      border="1px solid #E3E3E3"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexShrink="0"
    >
      {props.node}
    </Box>
  )
}
