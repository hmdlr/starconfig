import { Box, Button, Heading, VStack } from "@chakra-ui/react";

import { useActions } from "../../hooks/useActions";

export const RightSidebar = () => {
  const { actions } = useActions();

  return (
    <Box
      w={{ base: "0", md: "20%" }}
      // borderLeftWidth="thin"
      // borderColor="#e3e3e3"
      p={3}
      overflowY="auto"
      flex="0 0 20%"
      display={{ base: "none", md: "flex" }}
      alignItems="center"
      flexDirection="column"
    >
      <VStack spacing={4} align="stretch" width="100%">
        {Object.entries(actions).map(([actionName, actionFunc], index) => (
          <Button key={index} onClick={() => actionFunc()}>
            {actionName}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};
