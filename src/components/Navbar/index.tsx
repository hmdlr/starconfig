import {
  Flex,
  Spacer,
  Box,
  Text,
  useColorModeValue,
  IconButton,
  useColorMode,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const starphishColor = useColorModeValue("secondary", "gray.300");

  return (
      <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap={{ base: "wrap", md: "nowrap" }}
          padding="1.5rem"
          bg="transparent"
          borderBottomWidth="thin"
          borderColor={"#e3e3e3"}
      >
        {/* Logo on the far left, with text immediately after */}
        <Flex align="center" mr={5}>
          <img
              style={{ height: '60px', width: '60px', objectFit: 'contain' }}
              src="/logo.svg"
              alt="Starphish logo"
          />
          <Box ml={{ base: 2, md: 5 }}>
            <Text fontSize={{ base: "24px", md: "35px" }} color={starphishColor} fontWeight="extrabold">
              Starphish
              <Text
                  as="span"
                  position="relative"
                  top={{ base: "-15px", md: "-20px" }}
                  fontSize={{ base: "14px", md: "22px" }}
                  color="tertiary"
              >
                app
              </Text>
            </Text>
          </Box>
        </Flex>

        <Spacer />

        {/* Avatar and theme changer button on the far right */}
        <Stack direction={{ base: 'column', md: 'row' }} spacing={3} alignItems="center">
          <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<Box fontSize={{ base: "20px", md: "30px" }}><AccountCircle color="action" /></Box>}
                variant="ghost"
            />
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>

          <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
              variant="ghost"
              color="current"
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
        </Stack>
      </Flex>
  );
}
