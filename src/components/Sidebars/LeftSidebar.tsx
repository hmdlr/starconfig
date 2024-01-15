import { Box, Stack } from "@chakra-ui/react";
import { RoutingButton } from "../RoutingButton";
import { useColorModeImages } from "../../hooks/useColorModeImages";

export const LeftSidebar = () => {
  const { compass, packageImage, puzzlePiece } = useColorModeImages();

  return (
    <Box
      w={{ base: "0", md: "20%" }}
      borderRightWidth="thin"
      borderColor="#e3e3e3"
      p={3}
      pl={6}
      overflowY="auto"
      flex="0 0 20%"
      display={{ base: "none", md: "flex" }}
    >
      <Stack spacing={4}>
        <RoutingButton icon={<img src={compass} alt="start" />} to={"/"}>
          Getting started
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
