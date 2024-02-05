import { ChakraProvider } from "@chakra-ui/react";

import { LoadGuardRouter } from "./LoadGuardRouter";
import "./app.css";
import { ProvideAuth } from "./hooks/useAuth";
import { ProvideClient } from "./hooks/useClient";
import { ProvideColorModeImages } from "./hooks/useColorModeImages";
import { ProvideLoadGuard } from "./hooks/useLoadGuard";
import { ProvideModal } from "./hooks/useModal";
import { ProvideStorage } from "./hooks/useStorage";
import StoreProvider from "./store/StoreProvider";
import theme from "./theme";

export const App = () => (
  <StoreProvider>
    <ChakraProvider theme={theme}>
      <ProvideStorage>
        <ProvideClient>
          <ProvideModal>
            <ProvideAuth>
              <ProvideColorModeImages>
                <ProvideLoadGuard>
                  <LoadGuardRouter />
                </ProvideLoadGuard>
              </ProvideColorModeImages>
            </ProvideAuth>
          </ProvideModal>
        </ProvideClient>
      </ProvideStorage>
    </ChakraProvider>
  </StoreProvider>
);
