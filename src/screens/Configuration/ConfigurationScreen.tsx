import { useConfigurations } from "../../hooks/useConfigurations";
import { Configuration } from "../../components/Configuration";
import React, { useCallback, useEffect } from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { IconBorder } from "../../components/IconBorder";
import { useColorModeImages } from "../../hooks/useColorModeImages";
import './ConfigurationScreen.css';
import { Headline } from "../../components/Headline/Headline";
import { InUseInactivePackageContainer } from "../../components/Containers/InUseInactiveContainer";

export const ConfigurationScreen = () => {
  const {
    loginImage,
    pin02,
    eyeOff
  } = useColorModeImages();
  const {
    userId,
    loginPath
  } = useAuth();

  const {setActions} = useActions();
  const {configs, loadAllConfigs, handleChangeActiveState} = useConfigurations();
  const navigate = useNavigate();

  const loginTextColor = useColorModeValue("secondary", "gray.400");

  useEffect(() => {
    loadAllConfigs();
    setContextActions();
  }, [loadAllConfigs]);

  const setContextActions = useCallback(() => {
    setActions(
      userId ? {
        "Create": () => navigate(`/configurations/new`)
      } : {
        "Login": () => window.open(loginPath, "_self")
      });
  }, [userId, loginPath]);

  return (
    <Box
      paddingY={'2rem'}
      paddingX={'4rem'}
    >
      <Flex flexDirection={"column"} gap={"3rem"}>
        <Box>
          <Headline imgSrc={pin02} headline={"System Provided Configurations"} />
          <InUseInactivePackageContainer inUseComponents={[]} inactiveComponents={[]} />
        </Box>

        <Box>
          <Headline imgSrc={eyeOff} headline={"Private Configurations"} />
          <InUseInactivePackageContainer inUseComponents={[]} inactiveComponents={[]} />
        </Box>
      </Flex>
      {/* If userId is undefined, display a component to let user know he can see more configs if he logs in */}
      {
        !userId && (
          <Box className={'loginPopup'}>
            <a href={loginPath}>
              <Box
                className={'loginPopupContent'}
              >
                <IconBorder node={<img src={loginImage} alt="Login"/>}/>
                <Box
                  id={'loginFirstMessage'}
                  color={loginTextColor}
                >
                  You can see more configurations if you log in!
                </Box>
              </Box>
            </a>
          </Box>
        )
      }
    </Box>
  );
};
