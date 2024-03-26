import { IBrand, IConfig, UUID } from "@hmdlr/types";

export interface ConfigModel extends IConfig {
  id: string;
  name: string;
  creatorId: string;
  logo: string;
  brands: IBrand[];
  active: boolean;
  official: boolean;
  belongingGroupId: string;
}

export const toConfigModel = (
  config: IConfig,
  presets: IConfig[] = [],
  belongingGroupId: string = UUID.NIL,
): ConfigModel => {
  return {
    ...config,
    active: presets.some((preset) => preset.id === config.id),
    official: belongingGroupId === UUID.NIL,
    belongingGroupId,
  };
};

export const isDiffBetweenIConfigAndConfigModel = (
  a: IConfig,
  b: ConfigModel,
) =>
  a.id !== b.id ||
  a.name !== b.name ||
  a.logo !== b.logo ||
  a.creatorId !== b.creatorId ||
  a.brands.length !== b.brands.length ||
  a.brands.some((brand, i) => brand.id !== b.brands[i].id);
