import React, { useEffect } from "react";
import { useStorage } from "./useStorage";

const authContext = React.createContext<{
  /**
   * The username of the currently logged in user
   */
  username: string | undefined;
  /**
   * The id of the currently logged in user
   */
  userId: string | undefined;
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
  const [userId, setUserId] = React.useState<string>();
  const { getUsername, getUserId } = useStorage();

  /* On page startup */
  useEffect(() => {
    const mUsername = getUsername();
    const mUserId = getUserId();
    if (mUsername) {
      setUsername(mUsername);
    }
    if (mUserId) {
      setUserId(mUserId);
    }
  }, []);


  return {
    username,
    userId
  };
}
