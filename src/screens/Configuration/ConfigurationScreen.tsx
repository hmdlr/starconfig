import { useConfigurations } from "../../hooks/useConfigurations";
import { Configuration } from "../../components/Configuration";
import React, { useCallback, useEffect } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import './ConfigurationScreen.css';
import { IconBorder } from "../../components/IconBorder";
import { useColorModeImages } from "../../hooks/useColorModeImages";

export const ConfigurationScreen = () => {
  const {
    loginImage
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
    <>
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, 24rem)" gap={4} px={5} py={3}>
        {configs.map((config) => (
          <Configuration
            key={config.id}
            config={config}
            changeActiveState={handleChangeActiveState}
          />
        ))}
      </Box>
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
    </>
  );
};
