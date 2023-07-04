import { IBrand } from "@hmdlr/types";
import { Flex, Image, useColorModeValue, useTheme } from "@chakra-ui/react";
import { BiPlus, BiTrash } from "react-icons/all";
import { AddBox, PlusOneRounded } from "@mui/icons-material";

export const RuleBlock = (props: {
  rule: IBrand & { active: boolean },
  handleRuleClick: (rule: IBrand) => void
  showActionButton?: boolean
}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const grayBackground = useColorModeValue("gray.300", "gray.600");

  const { rule, handleRuleClick } = props;

  let showActionButton = props.showActionButton;
  if (props.showActionButton === undefined) {
    // default, it should show the action buttons
    showActionButton = true;
  }

  return (
      <Flex
          w={'12rem'}
          h={'3rem'}
          bg={grayBackground}
          borderRadius={'0.5rem'}
      >
        <Flex
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            w={'100%'}
            h={'100%'}
            p={'0.5rem'}
        >
          <Image src={rule.favicon} alt={`favicon`} height={'20px'}/>
          <Flex
              fontSize={'1.25rem'}
              fontWeight={'bold'}
          >
            {/* display first 12 characters, then ellipsis */}
            {rule.name.length > 12 ? rule.name.substring(0, 12) + '...' : rule.name}
          </Flex>
          {/* if it is active, display a trash material icon */}
          {showActionButton && rule.active && (
              <Flex
                  borderRadius={'0.25rem'}
                  alignItems={'center'}
                  gap={'0.5rem'}
              >
                <BiTrash
                    style={{ color: primaryColor, cursor: 'pointer' }}
                    onClick={() => handleRuleClick(rule)}
                />
              </Flex>
          )}
          {/* if it is inactive, display a plus material icon */}
          {showActionButton && !rule.active && (
              <Flex
                  borderRadius={'0.25rem'}
                  alignItems={'center'}
                  gap={'0.5rem'}
              >
                <BiPlus
                    style={{ color: primaryColor, cursor: 'pointer' }}
                    onClick={() => handleRuleClick(rule)}
                />
              </Flex>
          )}
        </Flex>
      </Flex>
  );
};
