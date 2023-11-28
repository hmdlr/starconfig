import { FC, ReactElement } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

interface StoreProviderProps {
  children: ReactElement;
}

const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default StoreProvider;
