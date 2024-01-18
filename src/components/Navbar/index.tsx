import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import "./Navbar.css";
import { useColorModeImages } from "../../hooks/useColorModeImages";
import theme from "../../theme";

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const starphishColor = useColorModeValue("secondary", "gray.300");

  const { grayColor } = useColorModeValue(
    theme.colors.grayActive1,
    theme.colors.grayActive2,
  );
  // const { userId, loginPath, registerPath } = useAuth();

  const { starphishLogo } = useColorModeImages();

  const backgroundColor = useColorModeValue(
    theme.colors.lightModeBackground,
    theme.colors.darkModeBackground,
  );

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap={{ base: "wrap", md: "nowrap" }}
      paddingY="1rem"
      paddingX={{ base: "1rem", md: "2rem" }}
      bg={backgroundColor}
      // borderBottomWidth="thin"
      // borderColor={"#e3e3e3"}
    >
      {/* Logo on the far left, with text immediately after */}
      <Flex align="center" mr={5}>
        <img
          style={{
            height: "45px",
            width: "45px",
            objectFit: "contain",
          }}
          src={starphishLogo}
          alt="Starphish logo"
        />
        <Box ml={{ base: 2, md: 5 }}>
          <Text
            fontSize={{ base: "20px", md: "25px" }}
            color={starphishColor}
            fontWeight="extrabold"
          >
            Starphish
            <Text
              as="span"
              position="relative"
              top={{ base: "-14px", md: "-18px" }}
              fontSize={{ base: "12px", md: "16px" }}
              color="tertiary"
            >
              app
            </Text>
            <Text
              as="span"
              position="relative"
              fontSize={{ base: "16px", md: "22px" }}
              fontWeight="bold"
              color={grayColor}
              ml={{ base: "0px", md: "5px" }}
            >
              Cloud Workspace
            </Text>
          </Text>
        </Box>
      </Flex>

      <Spacer />

      {/* Avatar and theme changer button on the far right */}
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={3}
        alignItems="center"
      >
        {/*<Menu>*/}
        {/*  <MenuButton*/}
        {/*    as={IconButton}*/}
        {/*    aria-label="Options"*/}
        {/*    icon={<Box fontSize={{base: "20px", md: "30px"}}><AccountCircle color="action"/></Box>}*/}
        {/*    variant="ghost"*/}
        {/*  />*/}
        {/*  {userId ? (*/}
        {/*    <MenuList>*/}
        {/*      <MenuItem>Profile</MenuItem>*/}
        {/*      <MenuItem>Settings</MenuItem>*/}
        {/*      <MenuItem>Logout</MenuItem>*/}
        {/*    </MenuList>*/}
        {/*  ) : (*/}
        {/*    <MenuList>*/}
        {/*      <MenuItem><a href={loginPath} className={'menuAnchor'}>Login</a></MenuItem>*/}
        {/*      <MenuItem><a href={registerPath} className={'menuAnchor'}>Register</a></MenuItem>*/}
        {/*    </MenuList>*/}
        {/*  )}*/}

        {/*</Menu>*/}
        <IconButton
          size="md"
          fontSize="lg"
          aria-label={`Switch to ${
            colorMode === "light" ? "dark" : "light"
          } mode`}
          variant="ghost"
          color="current"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        />
      </Stack>
    </Flex>
  );
};
