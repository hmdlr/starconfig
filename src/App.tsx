import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar";
import { RightSidebar } from "./components/Sidebars/RightSidebar";
import theme from "./theme";
import { LeftSidebar } from "./components/Sidebars/LeftSidebar";
import './app.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GettingStarted } from "./components/GettingStarted";


export const App = () => (
    <ChakraProvider theme={theme}>
      <Router>
        <Flex direction="column" minHeight="100vh">
          <Navbar/>

          <Flex direction="row" flexGrow="1">
            <LeftSidebar/>
            <Box flexGrow="1">
              <Routes>
                <Route path="/getting-started" element={<GettingStarted />} />
                <Route path="/configurations" element={<>Configurations</>} />
              </Routes>
            </Box>
            <RightSidebar/>
          </Flex>
        </Flex>
      </Router>
    </ChakraProvider>
);
