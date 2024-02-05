import { FC, ReactNode } from "react";

import { Box } from "@chakra-ui/react";

interface PageContentProps {
  children: ReactNode;
}

export const PageContent: FC<PageContentProps> = ({ children }) => {
  return (
    <Box
      paddingY={"2rem"}
      paddingX={"4rem"}
      width={"100%"}
      height={"calc(100vh - 7rem)"}
      overflowY={"auto"}
    >
      {children}
    </Box>
  );
};
