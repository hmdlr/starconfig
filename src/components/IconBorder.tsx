import React from "react";

import { Box } from "@chakra-ui/react";

export const IconBorder = (props: {
  node: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
}) => {
  return (
    <Box
      // width={props.width ?? "2.5625rem"}
      height={props.height ?? "2.5625rem"}
      padding={props.padding ?? "unset"}
      borderRadius="10px"
      // border="1px solid #E3E3E3"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexShrink="0"
    >
      {props.node}
    </Box>
  );
};
