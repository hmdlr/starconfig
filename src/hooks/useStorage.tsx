import React from "react";

export const storageContext = React.createContext<{
  getUserId: () => string | undefined;
  getUsername: () => string | undefined;
}>(undefined!);

export const ProvideStorage = ({ children }: { children: any }) => {
  const storage = useProvideStorage();
  return <storageContext.Provider value={storage}>{children}</storageContext.Provider>;
};

export const useStorage = () => {
  return React.useContext(storageContext);
};

function useProvideStorage() {
  const getUserId = (): string | undefined => {
    return document.cookie.split(';').find(row => row.startsWith('user-id'))?.split('=')[1];
  };

  const getUsername = (): string | undefined => {
    return document.cookie.split(';').find(row => row.startsWith('username'))?.split('=')[1];
  };

  return {
    getUserId,
    getUsername
  };
}
