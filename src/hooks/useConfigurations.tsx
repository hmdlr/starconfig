import React, { useCallback } from "react";
import { IConfig, IConfigCreatePayload, UUID } from "@hmdlr/types";
import { DeployedPaths, Microservice } from "@hmdlr/utils/dist/Microservice";
import { IBrand } from "@hmdlr/types/dist/brands/IBrand";
import { ConfigModel } from "../models/ConfigModel";
import { useClient } from "./useClient";
import { useAuth } from "./useAuth";

export const configurationsContext = React.createContext<{
  /**
   * This will load all the available public configs from the server. This will populate configs.
   */
  loadPublicConfigs: () => Promise<ConfigModel[]>;
  /**
   * This will load all the configs belonging to a group from the server. This will populate configs.
   */
  loadConfigsForGroup: (groupId: string) => Promise<ConfigModel[]>;
  /**
   * The currently selected config
   */
  currentEditConfig: IConfig | undefined;
  /**
   * This will create a new config.
   * @param config
   */
  create: (config: IConfigCreatePayload) => Promise<IConfig>;
  /**
   * Get a config by id
   * @param id
   */
  get: (id: string) => Promise<IConfig>;
  /**
   * This will load all available configs, private and public, and split them into inUse and inactive.
   */
  retrieveSplitConfigs: () => Promise<{
    inUseSystemComponents: ConfigModel[];
    inactiveSystemComponents: ConfigModel[];
    inUsePrivateComponents: ConfigModel[];
    inactivePrivateComponents: ConfigModel[];
  }>;
}>(undefined!);

export const ProvideConfigurations = ({children}: { children: any }) => {
  const configurations = useProvideConfigurations();
  return <configurationsContext.Provider value={configurations}>{children}</configurationsContext.Provider>;
};

export const useConfigurations = () => {
  return React.useContext(configurationsContext);
};

function useProvideConfigurations() {
  const {scanphish} = useClient().sdk;
  const {
    userId,
    listGroups
  } = useAuth();
  const {client} = useClient();

  const [rulesets, setRulesets] = React.useState<IBrand[]>([]);
  const [currentEditConfig, setCurrentEditConfig] = React.useState<IConfig | undefined>(undefined);

  // const handleChangeActiveState = (config: ConfigModel) => {
  //   const newConfigs = configs.map((c) => {
  //     if (c.id === config.id) {
  //       return {
  //         ...c,
  //         active: !c.active
  //       };
  //     }
  //     return c;
  //   });
  //   setConfigs(newConfigs);
  //
  //   // update on the backend as well
  //   if (config.active) {
  //     scanphish.deletePreset(config.id);
  //   } else {
  //     scanphish.savePreset(config.id);
  //   }
  // };

  const create = async (config: IConfigCreatePayload) => {
    const {config: createdConfig} = await createConfig(config);
    return createdConfig;
  };

  const createConfig = (config: IConfigCreatePayload): Promise<{ config: IConfig }> => {
    const formData = new FormData();
    formData.append('name', config.name);
    if (config.logo) {
      formData.append('logo', config.logo.buffer, 'logo');
    }

    return client.post<{ config: IConfig }>(
      `${DeployedPaths[Microservice.Scanphish]}/api/config`,
      formData,
      {
        withCredentials: true,
      }
    ).then((res: { data: any; }) => res.data);
  };

  const loadConfigsForGroup = useCallback(async (groupId: string) => {
    const presets = await loadPresets();

    const {items} = await scanphish.listConfigs({
      pageSize: 50
    }, true, groupId);

    return items.map((config) => ({
      ...config,
      active: presets.some((preset) => preset.id === config.id),
      official: groupId === UUID.NIL
    }))
  }, []);

  const loadPublicConfigs = useCallback(async () => {
    const presets = await loadPresets();

    const {items} = await scanphish.listConfigs({
      pageSize: 50
    }, true, UUID.NIL);

    return items.map((config) => ({
      ...config,
      active: presets.some((preset) => preset.id === config.id),
      official: true
    }))
  }, []);

  const loadPresets = useCallback(async () => {
    const presets = await scanphish.listPresets();
    return presets;
  }, []);

  const get = useCallback(async (id: string) => {
    const config = await scanphish.getConfig(id);
    return config;
  }, []);

  const retrieveSplitConfigs = useCallback(async () => {
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

    return {
      inUseSystemComponents: mInUseSystemComponents,
      inactiveSystemComponents: mInactiveSystemComponents,
      inUsePrivateComponents: mInUsePrivateComponents,
      inactivePrivateComponents: mInactivePrivateComponents
    };
  }, []);

  return {
    rulesets,
    currentEditConfig,
    create,
    loadConfigsForGroup,
    loadPublicConfigs,
    get,
    retrieveSplitConfigs
  };
}


