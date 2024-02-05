import React, { ReactNode, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";

import { Configuration } from "../../components/Configuration";
import { InUseInactivePackageContainer } from "../../components/Containers/InUseInactiveContainer";
import { PageContent } from "../../components/Utils/PageContent";
import { useActions } from "../../hooks/useActions";
import { useAuth } from "../../hooks/useAuth";
import { useColorModeImages } from "../../hooks/useColorModeImages";
import { useConfigurations } from "../../hooks/useConfigurations";
import { ConfigModel } from "../../models/ConfigModel";
import {
  fetchPrivateBrandsAction,
  fetchPublicBrandsAction,
} from "../../store/Brands/actions";
import { configurationsSlice } from "../../store/Configurations/slice";
import { useAppDispatch } from "../../store/hooks";
import "./ConfigurationScreen.css";

const TABS_ORDER = ["#system", "#private"];

export const ConfigurationScreen = () => {
  const toast = useToast();
  const { info, folderPlus } = useColorModeImages();
  const { userId, loginPath } = useAuth();
  const { list } = useConfigurations();
  const { setActions } = useActions();
  const navigate = useNavigate();

  const activeTab = useMemo(
    () => (!userId ? 0 : Math.max(TABS_ORDER.indexOf(window.location.hash), 0)),
    [userId],
  );

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

  const onTabChange = useCallback((index: number) => {
    window.location.hash = TABS_ORDER[index] ?? "";
  }, []);

  return (
    <PageContent>
      <Tabs defaultIndex={activeTab} onChange={onTabChange}>
        <TabList>
          <Tab>System Provided Configurations</Tab>
          {userId && <Tab>Private Configurations</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel>
            <InUseInactivePackageContainer
              inUseComponents={inUseSystemComponents}
              inactiveComponents={inactiveSystemComponents}
            />
          </TabPanel>
          <TabPanel>
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
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PageContent>
  );
};
