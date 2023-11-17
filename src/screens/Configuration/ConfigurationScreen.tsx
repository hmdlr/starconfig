import { Box, Flex, useColorModeValue, useTheme } from "@chakra-ui/react";
import { UUID } from "@hmdlr/types";
import { useNavigate } from "react-router-dom";
import React, { ReactNode, useCallback, useEffect } from "react";
import { useConfigurations } from "../../hooks/useConfigurations";
import { Configuration } from "../../components/Configuration";
import { useActions } from "../../hooks/useActions";
import { useAuth } from "../../hooks/useAuth";
import { useColorModeImages } from "../../hooks/useColorModeImages";
import { Headline } from "../../components/Headline/Headline";
import { InUseInactivePackageContainer } from "../../components/Containers/InUseInactiveContainer";
import { ConfigModel } from "../../models/ConfigModel";
import './ConfigurationScreen.css';

export const ConfigurationScreen = () => {
  const {
    loginImage,
    pin02,
    eyeOff
  } = useColorModeImages();
  const {
    userId,
    loginPath,
    listGroups
  } = useAuth();

  const {setActions} = useActions();
  const {
    loadConfigsForGroup,
    loadPublicConfigs,
  } = useConfigurations();
  const navigate = useNavigate();

  const loginTextColor = useColorModeValue("secondary", "gray.400");
  const theme = useTheme();
  const loginAnchorTextColor = theme.colors.primary;


  const [inUseSystemComponents, setInUseSystemComponents] = React.useState<ReactNode[]>([]);
  const [inactiveSystemComponents, setInactiveSystemComponents] = React.useState<ReactNode[]>([]);

  const [inUsePrivateComponents, setInUsePrivateComponents] = React.useState<ReactNode[]>([]);
  const [inactivePrivateComponents, setInactivePrivateComponents] = React.useState<ReactNode[]>([]);

  useEffect(() => {
    (async () => {
      const mInUseSystemComponents: ConfigModel[] = [];
      const mInactiveSystemComponents: ConfigModel[] = [];
      const mInUsePrivateComponents: ConfigModel[] = [];
      const mInactivePrivateComponents: ConfigModel[] = [];

      if (userId) {
        const availableGroups = await listGroups();

        for (const group of availableGroups) {
          if (group.id === UUID.NIL) {
            const configs = await loadPublicConfigs();

            configs.forEach((config) => {
              if (config.active) {
                mInUseSystemComponents.push(config);
              } else {
                mInactiveSystemComponents.push(config);
              }
            });
          } else {
            const configs = await loadConfigsForGroup(group.id);

            configs.forEach((config) => {
              if (config.active) {
                mInUsePrivateComponents.push(config);
              } else {
                mInactivePrivateComponents.push(config);
              }
            });
          }
        }
      } else {
        const configs = await loadPublicConfigs();

        configs.forEach((config) => {
          if (config.active) {
            mInUseSystemComponents.push(config);
          } else {
            mInactiveSystemComponents.push(config);
          }
        });
      }

      setInUseSystemComponents(mInUseSystemComponents.map(toConfigComponent));
      setInactiveSystemComponents(mInactiveSystemComponents.map(toConfigComponent));
      setInUsePrivateComponents(mInUsePrivateComponents.map(toConfigComponent));
      setInactivePrivateComponents(mInactivePrivateComponents.map(toConfigComponent));
    })()

    setContextActions();
  }, [loadConfigsForGroup, loadPublicConfigs, userId]);

  const toConfigComponent = useCallback((config: ConfigModel) => {
    return (
      <Configuration
        config={config}
      />
    );
  }, []);

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
          <InUseInactivePackageContainer
            inUseComponents={inUseSystemComponents}
            inactiveComponents={inactiveSystemComponents}
          />
        </Box>

        {
          userId && (
            <Box>
              <Headline imgSrc={eyeOff} headline={"Private Configurations"}/>
              <InUseInactivePackageContainer
                inUseComponents={inUsePrivateComponents}
                inactiveComponents={inactivePrivateComponents}
              />
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
