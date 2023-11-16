import React, { useCallback } from "react";
import { IConfig, IConfigCreatePayload } from "@hmdlr/types";
import { DeployedPaths, Microservice } from "@hmdlr/utils/dist/Microservice";
import { IBrand } from "@hmdlr/types/dist/brands/IBrand";
import { ConfigModel } from "../models/ConfigModel";
import { useClient } from "./useClient";

export const configurationsContext = React.createContext<{
  /**
   * All configs available
   */
  configs: ConfigModel[];
  /**
   * This will load all the available configs from the server. This will populate configs.
   */
  loadAllConfigs: () => Promise<void>;
  /**
   * This will load all the public configs from the server. This will populate configs.
   */
  loadPublicConfigs: () => Promise<void>;
  /**
   * Action when the user sets a config as active/inactive
   * @param config
   */
  handleChangeActiveState: (config: ConfigModel) => void;
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
}>(undefined!);

export const ProvideConfigurations = ({ children }: { children: any }) => {
  const configurations = useProvideConfigurations();
  return <configurationsContext.Provider value={configurations}>{children}</configurationsContext.Provider>;
};

export const useConfigurations = () => {
  return React.useContext(configurationsContext);
};

function useProvideConfigurations() {
  const { scanphish } = useClient().sdk;

  const { client } = useClient();

  const [configs, setConfigs] = React.useState<ConfigModel[]>([]);
  const [rulesets, setRulesets] = React.useState<IBrand[]>([]);
  const [currentEditConfig, setCurrentEditConfig] = React.useState<IConfig | undefined>(undefined);

  const handleChangeActiveState = (config: ConfigModel) => {
    const newConfigs = configs.map((c) => {
      if (c.id === config.id) {
        return {
          ...c,
          active: !c.active
        };
      }
      return c;
    });
    setConfigs(newConfigs);

    // update on the backend as well
    if (config.active) {
      scanphish.deletePreset(config.id);
    } else {
      scanphish.savePreset(config.id);
    }
  };

  const create = async (config: IConfigCreatePayload) => {
    const { config: createdConfig } = await createConfig(config);
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

  const loadAllConfigs = useCallback(async () => {
    const presets = await loadPresets();

    const { items } = await scanphish.listConfigs({
      pageSize: 50
    }, true, false);

    setConfigs(items.map((config) => ({
      ...config,
      active: presets.some((preset) => preset.id === config.id)
    })));
  }, []);

  const loadPublicConfigs = useCallback(async () => {
    const presets = await loadPresets();

    const { items } = await scanphish.listConfigs({
      pageSize: 50
    }, true, true);

    setConfigs(items.map((config) => ({
      ...config,
      active: presets.some((preset) => preset.id === config.id)
    })));
  }, []);

  const loadPresets = useCallback(async () => {
    const presets = await scanphish.listPresets();
    console.log(presets);
    return presets;
  }, []);

  const get = useCallback(async (id: string) => {
    const config = await scanphish.getConfig(id);
    return config;
  }, []);

  return {
    configs,
    rulesets,
    currentEditConfig,
    handleChangeActiveState,
    create,
    loadAllConfigs,
    loadPublicConfigs,
    get
  };
}


