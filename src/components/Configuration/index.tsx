import { Badge, Flex, useColorModeValue, useTheme, Image, Button } from "@chakra-ui/react";
import { ConfigModel } from "../../models/ConfigModel";
import { Settings } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Configuration = (props: {
  config: ConfigModel,
  changeActiveState: (config: ConfigModel) => void
}) => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;
  const grayBackground = useColorModeValue("gray.300", "gray.600");
  const navigate = useNavigate();

  const { config } = props;
  const userId = useAuth().getId();

  // Extract the first logo of each brand
  const logos = config.brands.map(brand => brand.favicon);

  return (
      <Flex
          w={'24rem'}
          h={'8rem'}
          bg={grayBackground}
          borderRadius={'0.5rem'}
      >
        {/* a title in the top left corner, and in the right top corner an image of a gear */}
        <Flex
            direction={'column'}
            justifyContent={'space-between'}
            w={'100%'}
            h={'100%'}
            p={'0.5rem'}
        >
          <Flex
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
          >
            <Flex
                fontSize={'1.25rem'}
                fontWeight={'bold'}
            >
              {config.name}
            </Flex>
            <Flex
                borderRadius={'0.25rem'}
                alignItems={'center'}
                gap={'0.5rem'}
            >
              <Badge
                  colorScheme={config.creatorId === userId ? 'purple' : 'cyan'}
                  variant="solid"
              >
                {config.creatorId === userId ? 'PRIVATE' : 'PUBLIC'}
              </Badge>
              <Settings
                  style={{ color: primaryColor, cursor: 'pointer' }}
                  onClick={() => navigate(`/configurations/${config.id}`)}
              />
            </Flex>
          </Flex>
          <Flex
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
          >
            <Flex
                direction={'row'}
                gap={'0.5rem'}
            >
              {logos.slice(0, 3).map((logo, index) => (
                  <Image src={logo} alt={`brand logo ${index + 1}`} key={index} height={'20px'} />
              ))}
            </Flex>
            <Button
                size={'xs'}
                colorScheme={config.active ? 'red' : 'green'}
                borderRadius={'8px'}
                onClick={() => props.changeActiveState(config)}
            >
              {config.active ? 'Disable' : 'Enable'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
  );
};
