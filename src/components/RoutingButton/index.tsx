import { Box, Flex, Text, useColorModeValue, useTheme } from "@chakra-ui/react";
import React from "react";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { IconBorder } from "../IconBorder";

interface RoutingButtonProps {
  icon: ReactElement;
  children: React.ReactNode;
  to: string;
}

export const RoutingButton: React.FC<RoutingButtonProps> = ({
                                                              icon,
                                                              children,
                                                              to
                                                            }) => {
  const secondaryColor = useColorModeValue("secondary", "gray.400");

  return (
    <Link
      to={to}
    >
      <Flex align="center">
       <IconBorder node={React.cloneElement(icon)}/>
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
