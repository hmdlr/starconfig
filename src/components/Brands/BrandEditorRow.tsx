import { FC, ReactElement } from "react";
import { Flex, Text, useColorModeValue, VStack } from "@chakra-ui/react";

interface BrandEditorProps {
  title: string;
  icon?: string;
  children: ReactElement;
}

export const BrandEditor: FC<BrandEditorProps> = ({
  children,
  title,
  icon,
}) => {
  const textColor = useColorModeValue("grayActive1", "grayActive2");

  return (
    <Flex alignItems={"center"}>
      <VStack align={"center"} width={"6rem"} paddingRight={"1rem"} gap={0}>
        {icon && <img src={icon} alt={icon} />}
        <Text fontWeight={"900"} color={textColor} textAlign={"center"}>
          {title}
        </Text>
      </VStack>
      <Flex flexGrow={1}>{children}</Flex>
    </Flex>
  );
};

export default BrandEditor;
