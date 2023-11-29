import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { LeftSidebar } from "./components/Sidebars/LeftSidebar";
import { GettingStarted } from "./screens/GettingStarted";
import { ConfigurationScreen } from "./screens/Configuration/ConfigurationScreen";
import { RightSidebar } from "./components/Sidebars/RightSidebar";
import { useLoadGuard } from "./hooks/useLoadGuard";
import { Navbar } from "./components/Navbar";
import { ProvideConfigurations } from "./hooks/useConfigurations";
import { ProvideActions } from "./hooks/useActions";
import CreateConfiguration from "./screens/Configuration/CreateConfiguration";
import { ProvideRules } from "./hooks/useRules";
import { BrandsScreen } from "./screens/Brands/BrandsScreen";
import { NewBrandScreen } from "./screens/Brands/NewBrandScreen";
import { useModal } from "./hooks/useModal";
import { useAuth } from "./hooks/useAuth";
import { ViewConfiguration } from "./screens/Configuration/ViewConfiguration";

export const LoadGuardRouter = () => {
  const { cacheLoaded, LoadGuard } = useLoadGuard();
  // const { AuthGuard } = useAuthGuard();
  const { Modal } = useModal();
  const { greetFreshlySignedInUser } = useAuth();

  useEffect(() => {
    if (!cacheLoaded) {
      return;
    }
    greetFreshlySignedInUser();
  }, [cacheLoaded]);

  return (
    <div style={{ zIndex: 2, width: "100%", flexDirection: "column" }}>
      {!cacheLoaded && <LoadGuard />}
      {cacheLoaded && (
        <>
          {/*<AuthGuard/>*/}
          <ProvideActions>
            <ProvideConfigurations>
              <Router>
                <Modal />
                <Flex
                  direction="column"
                  height="100%"
                  width="100%"
                  position={"fixed"}
                >
                  <Navbar />

                  <Flex direction="row" flexGrow="1">
                    <LeftSidebar />
                    <Box flexGrow="1">
                      <Routes>
                        <Route path="/" element={<GettingStarted />} />
                        <Route
                          path="/configurations"
                          element={<ConfigurationScreen />}
                        />
                        <Route
                          path={"/configurations/new"}
                          element={<CreateConfiguration />}
                        />
                        <Route
                          path={"/configurations/:configId"}
                          element={
                            <ProvideRules>
                              <ViewConfiguration />
                            </ProvideRules>
                          }
                        />
                        <Route path={"/rules"} element={<BrandsScreen />} />
                        <Route
                          path={"/rules/new"}
                          element={<NewBrandScreen />}
                        />
                      </Routes>
                    </Box>
                    <RightSidebar />
                  </Flex>
                </Flex>
              </Router>
            </ProvideConfigurations>
          </ProvideActions>
        </>
      )}
    </div>
  );
};
