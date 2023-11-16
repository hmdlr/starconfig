import { useConfigurations } from "../../hooks/useConfigurations";
import { Configuration } from "../../components/Configuration";
import React, { useCallback, useEffect } from "react";
import { Box, Flex, useColorModeValue, useTheme } from "@chakra-ui/react";
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
  const {
    loadAllConfigs,
    loadPublicConfigs
  } = useConfigurations();
  const navigate = useNavigate();

  const loginTextColor = useColorModeValue("secondary", "gray.400");
  const theme = useTheme();
  const loginAnchorTextColor = theme.colors.primary;

  useEffect(() => {
    if (userId) {
      loadAllConfigs().then(() => {
        // no-op
      });
    } else {
      loadPublicConfigs().then(() => {
        // no-op
      });
    }
    setContextActions();
  }, [loadAllConfigs, loadPublicConfigs, userId]);

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
      width={'100%'}
      height={'100%'}
    >
      <Flex flexDirection={"column"} gap={"3rem"}>
        <Box>
          <Headline imgSrc={pin02} headline={"System Provided Configurations"}/>
          <InUseInactivePackageContainer inUseComponents={[]} inactiveComponents={[]}/>
        </Box>

        {
          userId && (
            <Box>
              <Headline imgSrc={eyeOff} headline={"Private Configurations"}/>
              <InUseInactivePackageContainer inUseComponents={[]} inactiveComponents={[]}/>
            </Box>
          )
        }
      </Flex>
      {/* If userId is undefined, display a component to let user know he can see more configs if he logs in */}
      {
        !userId && (
          <Box className={'loginPopup'}>
            <Box
              className={'loginPopupContent'}
            >
              <img src={loginImage} alt="Login"/>
              <Box
                id={'loginFirstMessage'}
                color={loginTextColor}
              >
                You can use the configurations if you&nbsp;
                <a
                  href={loginPath}
                  style={{
                    color: loginAnchorTextColor
                  }}
                >
                  log in!
                </a>
              </Box>
            </Box>
          </Box>
        )
      }
    </Box>
  );
};
