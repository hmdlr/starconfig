import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import './app.css';
import { ProvideStorage } from "./hooks/useStorage";
import { ProvideClient } from "./hooks/useClient";
import { ProvideAuth } from "./hooks/useAuth";
import { ProvideLoadGuard } from "./hooks/useLoadGuard";
import { LoadGuardRouter } from "./LoadGuardRouter";
import { ProvideColorModeImages } from "./hooks/useColorModeImages";


export const App = () => (
  <ChakraProvider theme={theme}>
    <ProvideStorage>
      <ProvideClient>
        <ProvideAuth>
          <ProvideColorModeImages>
            <ProvideLoadGuard>
              <LoadGuardRouter/>
            </ProvideLoadGuard>
          </ProvideColorModeImages>
        </ProvideAuth>
      </ProvideClient>
    </ProvideStorage>
  </ChakraProvider>
);
