import React, { useCallback, useEffect } from "react";
import { useStorage } from "./useStorage";
import { FrontPaths } from "@hmdlr/utils";
import { IGroup } from "@hmdlr/types";
import { useClient } from "./useClient";

const authContext = React.createContext<{
  /**
   * The username of the currently logged in user
   */
  username: string | undefined;
  /**
   * The id of the currently logged in user
   */
  userId: string | undefined;
  /**
   * The path to the login page
   */
  loginPath: string;
  /**
   * The path to the register page
   */
  registerPath: string;
  /**
   * This will list all the groups the user is a member of
   */
  listGroups: () => Promise<IGroup[]>
}>(undefined!);

export const ProvideAuth = ({ children }: { children: any }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(authContext);
};

function useProvideAuth() {
  const { authphish } = useClient().sdk;

  const [username, setUsername] = React.useState<string>();
  const [userId, setUserId] = React.useState<string>();
  const { getUsername, getUserId } = useStorage();

  const loginPath = `${FrontPaths.auth}/auth`;
  const registerPath = `${FrontPaths.auth}/auth/register`;

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

  const listGroups = useCallback(async (
    pageNumber: number = 1,
    pageSize: number = -1,
  ) => {
    if (!authphish) {
      return [];
    }
    const { items } = await authphish.listGroups({
      pageNumber,
      pageSize
    });
    return items;
  }, [authphish]);

  return {
    username,
    userId,
    loginPath,
    registerPath,
    listGroups
  };
}
