import React, { useEffect } from "react";
import { useStorage } from "./useStorage";

const loadGuardContext = React.createContext<{
  cacheLoaded: boolean;
  LoadGuard: React.FC;
}>({
  cacheLoaded: false,
  LoadGuard: () => null
});

export const useLoadGuard = () => React.useContext(loadGuardContext);

export const ProvideLoadGuard = ({children}: { children: any }) => {
  const {cacheLoaded, LoadGuard} = useProvideLoadGuard();
  return (
    <loadGuardContext.Provider value={{cacheLoaded, LoadGuard}}>
      {children}
    </loadGuardContext.Provider>
  );
};

function useProvideLoadGuard() {
  const [cacheLoaded, setCacheLoaded] = React.useState<boolean>(false);
  const {getUsername} = useStorage()

  const [username, setUsername] = React.useState<string | null | undefined>(undefined);

  useEffect(() => {
    setUsername(getUsername());
  }, []);

  useEffect(() => {
    if (username !== undefined) {
      setCacheLoaded(true);
    }
  }, [username]);

  const LoadGuard = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    }}>
    </div>
  );

  return {
    cacheLoaded,
    LoadGuard,
  };
}
