import React, { useCallback, useEffect } from "react";
import { getParsedJwt } from "../utils/utils";
import { useStorage } from "./useStorage";

const authContext = React.createContext<{
  /**
   * The username of the currently logged in user
   */
  username: string | undefined;
  /**
   * The JWT token of the currently logged in user
   */
  token: string | undefined;
  /**
   * Get the id of the currently logged in user
   */
  getId(): string | undefined;
}>(undefined!);

export const ProvideAuth = ({ children }: { children: any }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(authContext);
};

function useProvideAuth() {
  const [username, setUsername] = React.useState<string>();
  const [token, setToken] = React.useState<string>();
  const { getStoredToken } = useStorage();

  /* On page startup */
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      setToken(token);
      setUsername(getParsedJwt<{ username: string }>(token)?.username);
    }
  }, []);

  const getId = useCallback((): string | undefined => {
    if (!token) return;
    return getParsedJwt<{ id: string }>(token)?.id;

  }, [token]);

  return {
    username,
    token,
    getId
  };
}
