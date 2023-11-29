import { FC, ReactElement } from "react";
import { Flex, Text } from "@chakra-ui/react";

interface BrandEditorProps {
  title: string;
  icon?: string;
  children: ReactElement;
}

export const BrandEditor: FC<BrandEditorProps> = ({ children, title }) => {
  return (
    <Flex alignItems={"center"}>
      <Text width={"7rem"} textAlign={"center"} paddingRight={"1rem"}>
        {title}
      </Text>
      {children}
    </Flex>
  );
};

export default BrandEditor;
