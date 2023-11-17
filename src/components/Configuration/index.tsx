import { Flex, useColorModeValue } from "@chakra-ui/react";
import { ConfigModel } from "../../models/ConfigModel";
import { useColorModeImages } from "../../hooks/useColorModeImages";

export const Configuration = (props: {
  config: ConfigModel,
}) => {
  const {
    folder,
    checkVerified01
  } = useColorModeImages()
  const {config} = props;

  const first3LogosOfRules = config.brands.map(brand => brand.favicon);
  const secondaryColor = useColorModeValue("secondary", "gray.400");
  const configIconsContainerBgColor = useColorModeValue("#CBD5DF", "#4a5568");

  return (
    <Flex
      border={'1px solid #E3E3E3'}
      flexDirection={'column'}
      borderRadius={'0.5rem'}
      paddingX={'0.8rem'}
      paddingY={'0.8rem'}
    >
      <Flex
        direction={'row'}
        gap={'0.5rem'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <img
          src={folder}
          alt={'folder'}
        />
        <Flex
          fontSize={'1.25rem'}
          fontWeight={'bold'}
          color={secondaryColor}
        >
          {config.name}
        </Flex>
        {
          config.official && (
            <img
              src={checkVerified01}
              alt={'official'}
            />
          )
        }
      </Flex>
      {
        config.official && (
          // for Official configs, we also display the first 3 logos of the rules
          <Flex
            direction={'row'}
            gap={'0.5rem'}
            alignItems={'center'}
            justifyContent={'center'}
            backgroundColor={configIconsContainerBgColor}
            borderRadius={'0.25rem'}
            paddingY={'0.35rem'}
            paddingX={'0.5rem'}
            width={'fit-content'}
          >
            {
              first3LogosOfRules.map((logo, index) => (
                <img
                  src={logo}
                  alt={`${index + 1}`}
                  key={index}
                  style={{
                    maxHeight: '15px',
                  }}
                />
              ))
            }
          </Flex>
        )
      }
    </Flex>
  );
};
