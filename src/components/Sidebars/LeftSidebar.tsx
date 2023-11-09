import { Box, Stack } from "@chakra-ui/react";
import { RoutingButton } from "../RoutingButton";

export const LeftSidebar = () => {
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
          <RoutingButton
            icon={<img src="/images/compass.svg" alt="start"/>}
            darkIcon={<img src="/images/compass-dark.svg" alt="start"/>}
            to={'/'}
          >
            Getting started
          </RoutingButton>
          <RoutingButton
            icon={<img src="/images/package.svg" alt="configs"/>}
            darkIcon={<img src="/images/package-dark.svg" alt="configs"/>}
            to={'/configurations'}
          >
            Configurations
          </RoutingButton>
          <RoutingButton
            icon={<img src="/images/puzzle-piece-01.svg" alt="rules"/>}
            darkIcon={<img src="/images/puzzle-piece-01-dark.svg" alt="rules"/>}
            to={'/rules'}
          >
            Rules
          </RoutingButton>
        </Stack>
      </Box>
  );
};
