import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
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
import "./ConfigurationScreen.css";
import { useAppDispatch } from "../../store/hooks";
import { configurationsSlice } from "../../store/Configurations/slice";
import {
  fetchPrivateBrandsAction,
  fetchPublicBrandsAction,
} from "../../store/Brands/actions";
import { PageContent } from "../../components/Utils/PageContent";

export const ConfigurationScreen = () => {
  const toast = useToast();
  const { info, pin02, eyeOff, folderPlus } = useColorModeImages();
  const { userId, loginPath } = useAuth();
  const { list } = useConfigurations();
  const { setActions } = useActions();
  const navigate = useNavigate();

  const [inUseSystemComponents, setInUseSystemComponents] = React.useState<
    ReactNode[]
  >([]);
  const [inactiveSystemComponents, setInactiveSystemComponents] =
    React.useState<ReactNode[]>([]);

  const [inUsePrivateComponents, setInUsePrivateComponents] = React.useState<
    ReactNode[]
  >([]);
  const [inactivePrivateComponents, setInactivePrivateComponents] =
    React.useState<ReactNode[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const {
        inUseSystemComponents: mInUseSystemComponents,
        inactiveSystemComponents: mInactiveSystemComponents,
        inUsePrivateComponents: mInUsePrivateComponents,
        inactivePrivateComponents: mInactivePrivateComponents,
      } = await list();

      // TODO: Refactor this to use the store instead of state, and remove the hacky dispatch
      dispatch(
        configurationsSlice.actions.setConfigurations([
          ...mInUseSystemComponents,
          ...mInactiveSystemComponents,
          ...mInUsePrivateComponents,
          ...mInactivePrivateComponents,
        ]),
      );

      setInUseSystemComponents(mInUseSystemComponents.map(toConfigComponent));
      setInactiveSystemComponents(
        mInactiveSystemComponents.map(toConfigComponent),
      );
      setInUsePrivateComponents(mInUsePrivateComponents.map(toConfigComponent));
      setInactivePrivateComponents(
        mInactivePrivateComponents.map(toConfigComponent),
      );
    })();

    setContextActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // TODO: temporary hack until complete redux refactor
    dispatch(fetchPrivateBrandsAction({ loadMore: false }));
    dispatch(fetchPublicBrandsAction);
  }, [dispatch]);

  const toConfigComponent = useCallback((config: ConfigModel) => {
    return <Configuration config={config} />;
  }, []);

  const setContextActions = useCallback(() => {
    setActions(
      userId
        ? {
            Create: () => navigate(`/configurations/new`),
          }
        : {
            Login: () => window.open(loginPath, "_self"),
          },
    );
  }, [setActions, userId, navigate, loginPath]);

  useEffect(() => {
    if (!userId) {
      toast({
        title: "You can use the configurations if you log in!",
        status: "info",
        duration: 15000,
        isClosable: true,
        variant: "top-accent",
        // make it so that click on the toast takes you to the login page
        render: () => (
          <Card>
            <CardBody>
              <Flex
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={"1rem"}
              >
                <img src={info} alt="info" />
                <Text
                  style={{
                    fontWeight: 600,
                  }}
                >
                  You can use the configurations if you{" "}
                  <a
                    href={loginPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#3182ce",
                      textDecoration: "underline",
                    }}
                  >
                    log in
                  </a>
                  !
                </Text>
              </Flex>
            </CardBody>
          </Card>
        ),
      });
    }

    return () => {
      toast.closeAll();
    };
  }, [userId]);

  return (
    <PageContent>
      <Flex flexDirection={"column"} gap={"3rem"}>
        <Box>
          <Headline
            imgSrc={pin02}
            headline={"System Provided Configurations"}
          />
          <InUseInactivePackageContainer
            inUseComponents={inUseSystemComponents}
            inactiveComponents={inactiveSystemComponents}
          />
        </Box>

        {userId && (
          <Box>
            <Headline imgSrc={eyeOff} headline={"Private Configurations"} />
            <InUseInactivePackageContainer
              inUseComponents={inUsePrivateComponents}
              inactiveComponents={inactivePrivateComponents}
            />

            <Button
              mt={10}
              leftIcon={<img src={folderPlus} alt="plus" />}
              onClick={() => navigate(`/configurations/new`)}
            >
              New Configuration
            </Button>
          </Box>
        )}
      </Flex>
    </PageContent>
  );
};
