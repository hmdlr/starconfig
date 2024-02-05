import { Box, Stack, useColorModeValue } from "@chakra-ui/react";

import env from "../../env";
import { useColorModeImages } from "../../hooks/useColorModeImages";
import theme from "../../theme";
import { RoutingButton } from "../RoutingButton";
import "./LeftSidebar.css";

export const LeftSidebar = () => {
  const { compass, packageImage, puzzlePiece, download } = useColorModeImages();

  const backgroundColor = useColorModeValue(
    theme.colors.lightModeBackground,
    theme.colors.darkModeBackground,
  );

  return (
    <Box
      className="reverse-corner"
      backgroundColor={backgroundColor}
      w={{ base: "0", md: "230px" }}
      paddingY="1rem"
      paddingX={{ base: "1rem", md: "2rem" }}
      overflowY="auto"
      display={{ base: "none", md: "flex" }}
    >
      <Stack spacing={4}>
        <RoutingButton icon={<img src={compass} alt="start" />} to={"/"}>
          Getting started
        </RoutingButton>
        <RoutingButton
          icon={<img src={download} alt="download" />}
          to={env.chromeStoreUrl}
        >
          Download
        </RoutingButton>
        <RoutingButton
          icon={<img src={packageImage} alt="configs" />}
          to={"/configurations"}
        >
          Configurations
        </RoutingButton>
        <RoutingButton
          icon={<img src={puzzlePiece} alt="rules" />}
          to={"/rules"}
        >
          Brands
        </RoutingButton>
      </Stack>
    </Box>
  );
};
