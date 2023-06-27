import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import './app.css';
import { ProvideStorage } from "./hooks/useStorage";
import { ProvideClient } from "./hooks/useClient";
import { ProvideAuth } from "./hooks/useAuth";
import { ProvideLoadGuard } from "./hooks/useLoadGuard";
import { LoadGuardRouter } from "./LoadGuardRouter";


export const App = () => (
    <ChakraProvider theme={theme}>
      <ProvideStorage>
        <ProvideAuth>
          <ProvideClient>
            <ProvideLoadGuard>
              <LoadGuardRouter />
            </ProvideLoadGuard>
          </ProvideClient>
        </ProvideAuth>
      </ProvideStorage>
    </ChakraProvider>
);
