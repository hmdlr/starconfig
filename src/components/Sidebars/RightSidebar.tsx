import { Box } from "@chakra-ui/react";

export const RightSidebar = () => {
  return (
      <Box
          w={{ base: "0", md: "20%" }}
          borderLeftWidth="thin"
          borderColor="#e3e3e3"
          p={3}
          overflowY="auto"
          height="100vh"
          flex="0 0 20%"
      >
        {/* content of the right sidebar */}
      </Box>
  );
};
