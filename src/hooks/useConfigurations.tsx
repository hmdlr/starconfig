import React, { useCallback, useEffect } from "react";

import { DeployedPaths } from "@hmdlr/sdk";
import { Microservice } from "@hmdlr/sdk/dist/Microservice";
import { IConfig, IConfigCreatePayload, UUID } from "@hmdlr/types";

import {
  ConfigModel,
  isDiffBetweenIConfigAndConfigModel,
  toConfigModel,
} from "../models/ConfigModel";
import { SplitSystemPrivateComponents } from "../models/SplitSystemPrivateComponents";
import { useAuth } from "./useAuth";
import { scanphishApiClient, useClient } from "./useClient";

export const configurationsContext = React.createContext<{
  /**
   * Get a config by id
   * @param id
   */
  get: (id: string) => Promise<ConfigModel | undefined>;
  /**
   * This will load all available configs, private and public, and split them into inUse and inactive.
   * @param ignoreCache
   */
  list: (
    ignoreCache?: boolean,
  ) => Promise<SplitSystemPrivateComponents<ConfigModel>>;
  /**
   * This will create a new config.
   * @param config
   */
  create: (config: IConfigCreatePayload) => Promise<IConfig>;
  /**
   * This will load all the available public configs from the server. This will populate configs.
   */
  loadPublicConfigs: () => Promise<ConfigModel[]>;
  /**
   * This will load all the configs belonging to a group from the server. This will populate configs.
   */
  loadConfigsForGroup: (groupId: string) => Promise<ConfigModel[]>;
}>(undefined!);

export const ProvideConfigurations = ({ children }: { children: any }) => {
  const configurations = useProvideConfigurations();
  return (
    <configurationsContext.Provider value={configurations}>
      {children}
    </configurationsContext.Provider>
  );
};

export const useConfigurations = () => {
  return React.useContext(configurationsContext);
};

function useProvideConfigurations() {
  const { client } = useClient();
  const { scanphish } = useClient().sdk;
  const { userId, listGroups } = useAuth();

  /**
   * This will hold all the configs that are available on the server.
   * The first action any client will do is to load all the configs.
   */
  const [cachedConfigs, setCachedConfigs] = React.useState(
    new SplitSystemPrivateComponents<ConfigModel>(),
  );

  const create = async (config: IConfigCreatePayload) => {
    const { config: createdConfig } = await createConfig(config);
    return createdConfig;
  };

  const loadConfigsForGroup = useCallback(async (groupId: string) => {
    const presets = await loadPresets();

    const { items } = await scanphish.listConfigs(
      {
        pageSize: 50,
      },
      true,
      groupId,
    );

    return items.map((config) => toConfigModel(config, presets, groupId));
  }, []);

  const loadPublicConfigs = useCallback(async () => {
    const presets = await loadPresets();

    const { items } = await scanphish.listConfigs(
      {
        pageSize: 50,
      },
      true,
      UUID.NIL,
    );

    return items.map((config) => toConfigModel(config, presets, UUID.NIL));
  }, []);

  const loadPresets = useCallback(async () => {
    const presets = await scanphish.listPresets();
    return presets;
  }, []);

  const get = async (id: string) => {
    const config = await scanphish.getConfig(id);

    const configs = await list();
    const cached = cachedConfigs.findById(id);
    if (!cached) {
      return (await list(true)).findById(id);
    }
    // check if there are any differences between the cached config and the one we just loaded
    if (isDiffBetweenIConfigAndConfigModel(config, cached)) {
      const presets = await loadPresets(); // todo also check if there are any differences between the presets
      const newConfig = toConfigModel(
        config,
        presets,
        cached?.belongingGroupId,
      );
      cachedConfigs.patch(newConfig);
      return newConfig;
    }
    return cached;
  };

  const list = async (ignoreCache?: boolean) => {
    if (!ignoreCache && cachedConfigs.hasComponents()) {
      return cachedConfigs;
    }

    const mInUseSystemComponents: ConfigModel[] = [];
    const mInactiveSystemComponents: ConfigModel[] = [];
    const mInUsePrivateComponents: ConfigModel[] = [];
    const mInactivePrivateComponents: ConfigModel[] = [];

    if (userId) {
      const availableGroups = await listGroups();

      for (const group of availableGroups) {
        if (group.id === UUID.NIL) {
          const configs = await loadPublicConfigs();

          configs.forEach((config) => {
            if (config.active) {
              mInUseSystemComponents.push(config);
            } else {
              mInactiveSystemComponents.push(config);
            }
          });
        } else {
          const configs = await loadConfigsForGroup(group.id);

          configs.forEach((config) => {
            if (config.active) {
              mInUsePrivateComponents.push(config);
            } else {
              mInactivePrivateComponents.push(config);
            }
          });
        }
      }
    } else {
      const configs = await loadPublicConfigs();

      configs.forEach((config) => {
        if (config.active) {
          mInUseSystemComponents.push(config);
        } else {
          mInactiveSystemComponents.push(config);
        }
      });
    }

    const splitSystemPrivateComponents = new SplitSystemPrivateComponents(
      mInUseSystemComponents,
      mInactiveSystemComponents,
      mInUsePrivateComponents,
      mInactivePrivateComponents,
    );

    // cache the configs
    setCachedConfigs(splitSystemPrivateComponents);

    return splitSystemPrivateComponents;
  };

  const createConfig = async (
    config: IConfigCreatePayload,
  ): Promise<{ config: IConfig }> => {
    const formData = new FormData();
    formData.append("name", config.name);
    if (config.logo) {
      formData.append("logo", config.logo.buffer, "logo");
    }

    return {
      config: await scanphishApiClient.createConfig({
        name: formData.get("name") as string,
      }),
    };
    //
    // return client
    //   .post<{ config: IConfig }>(
    //     `${DeployedPaths[Microservice.Scanphish]
    //       .replace("http://", "https://")
    //       .replace(".localhost", "")}/api/config`,
    //     formData,
    //     {
    //       withCredentials: true,
    //     },
    //   )
    //   .then((res: { data: any }) => res.data);
  };

  return {
    get,
    list,
    create,
    loadConfigsForGroup,
    loadPublicConfigs,
  };
}
