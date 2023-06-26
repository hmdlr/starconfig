import { Box, Stack } from "@chakra-ui/react";
import { Explore, Topic } from '@mui/icons-material';
import { RiFolderSettingsFill } from 'react-icons/ri';
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
          height="100vh"
          flex="0 0 20%"
          display={{ base: "none", md: "flex" }}
      >
        <Stack spacing={4}>
          <RoutingButton icon={<Explore />} to={'/'}>Getting started</RoutingButton>
          <RoutingButton icon={<RiFolderSettingsFill />} to={'/configurations'}>Configurations</RoutingButton>
          <RoutingButton icon={<Topic />} to={'/rules'}>Rules</RoutingButton>
        </Stack>
      </Box>
  );
};
