import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
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
import EditConfiguration from "./screens/Configuration/EditConfiguration";
import { ProvideRules } from "./hooks/useRules";
import { RulesScreen } from "./screens/Rules/RulesScreen";
import { CreateRule } from "./screens/Rules/CreateRule";

export const LoadGuardRouter = () => {
  const { cacheLoaded, LoadGuard } = useLoadGuard();
  // const { AuthGuard } = useAuthGuard();

  return (
      <div style={{ zIndex: 2, width: '100%', flexDirection: 'column' }}>
        {!cacheLoaded && (
            <LoadGuard/>
        )}
        {cacheLoaded && (
            <>
              {/*<AuthGuard/>*/}
              <ProvideActions>

                <Router>
                  <Flex direction="column" minHeight="100vh">
                    <Navbar/>

                    <Flex direction="row" flexGrow="1">
                      <LeftSidebar/>
                      <Box flexGrow="1">
                        <Routes>
                          <Route path="/" element={<GettingStarted/>}/>
                          <Route path="/configurations"
                                 element={<ProvideConfigurations><ConfigurationScreen/></ProvideConfigurations>}/>
                          <Route path={"/configurations/new"}
                                 element={<ProvideConfigurations><CreateConfiguration/></ProvideConfigurations>}/>
                          <Route path={"/configurations/:configId"}
                                 element={(
                                     <ProvideConfigurations>
                                       <ProvideRules>
                                         <EditConfiguration/>
                                       </ProvideRules>
                                     </ProvideConfigurations>
                                 )}/>
                          <Route path={"/rules"} element={<ProvideRules><RulesScreen /></ProvideRules>}/>
                          <Route path={"/rules/new"} element={<ProvideRules><CreateRule /></ProvideRules>}/>
                        </Routes>
                      </Box>
                      <RightSidebar/>
                    </Flex>
                  </Flex>
                </Router>
              </ProvideActions>
            </>
        )}
      </div>

  );
};
