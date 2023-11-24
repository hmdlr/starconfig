import React from "react";

export const storageContext = React.createContext<{
  getUserId: () => string | undefined;
  getUsername: () => string | null;
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
    return splitDocument().find(row => row.startsWith('user-id'))?.split('=')[1];
  };

  const getUsername = (): string | null => {
    return splitDocument().find(row => row.startsWith('username'))?.split('=')[1] || null;
  };

  const splitDocument = () => document.cookie.split(';').map(c => c.trim());

  return {
    getUserId,
    getUsername
  };
}
