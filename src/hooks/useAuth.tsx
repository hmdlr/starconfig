import React, { useCallback, useEffect } from "react";
import { useStorage } from "./useStorage";
import { IGroup } from "@hmdlr/types";
import { useClient } from "./useClient";
import { useModal } from "./useModal";
import { FrontPaths } from "@hmdlr/sdk";

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
  listGroups: () => Promise<IGroup[]>;
  /**
   * This will greet the freshly signed in user
   */
  greetFreshlySignedInUser: () => void;
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
  const { callModal } = useModal();

  const [username, setUsername] = React.useState<string>();
  const [userId, setUserId] = React.useState<string>();
  const { getUsername, getUserId } = useStorage();

  const loginPath = `${FrontPaths.auth}/auth?redirect=${document.location.href}?signin=completed`;
  const registerPath = `${FrontPaths.auth}/auth/register`;

  const listGroups = useCallback(
    async (pageNumber: number = 1, pageSize: number = -1) => {
      if (!authphish) {
        return [];
      }
      const { items } = await authphish.listGroups({
        pageNumber,
        pageSize,
      });
      return items;
    },
    [authphish],
  );

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

  const greetFreshlySignedInUser = useCallback(() => {
    // get if the url has query param "signin=completed"
    const urlParams = new URLSearchParams(window.location.search);
    const signinCompleted = urlParams.get("signin") === "completed";

    if (signinCompleted) {
      // todo: store this inside a markdown and display MD in modal
      callModal(
        `🚀 Starphish Upgrade Unlocked!`,
        `Great news! 
You've logged in successfully to Starphish. Your shield against phishing is now armed with powerful configurations. Defend confidently as you browse various brands with personalized protection. Explore and stay secure!

🌐 Starphish - Your Ultimate Phishing Guardian!`,
      );
    }
  }, []);

  return {
    username,
    userId,
    loginPath,
    registerPath,
    listGroups,
    greetFreshlySignedInUser,
  };
}
