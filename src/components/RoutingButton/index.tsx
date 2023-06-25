import { Box, Flex, Text, useColorModeValue, useTheme } from "@chakra-ui/react";
import React from "react";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

interface RoutingButtonProps {
  icon: ReactElement;
  children: React.ReactNode;
  to: string;
}

export const RoutingButton: React.FC<RoutingButtonProps> = ({ icon, children, to }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const secondaryColor = useColorModeValue("secondary", "gray.400");

  return (
      <Link
          to={to}
      >
        <Flex align="center">
          <Box
              width="2.5625rem"
              height="2.5625rem"
              borderRadius="10px"
              border="1px solid #E3E3E3"
              background="rgba(217, 217, 217, 0.00)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink="0"
          >
            {React.cloneElement(icon, { style: { color: primaryColor, fontSize: 'xx-large' } })}
          </Box>
          <Text
              color={secondaryColor}
              fontSize="1.25rem"
              fontWeight="800"
              fontFamily="Lato"
              textAlign="center"
              mt="1"
              ml="2"
          >
            {children}
          </Text>
        </Flex>
      </Link>
  );
};
