import { ConfigModel } from "../../models/ConfigModel";

export type ConfigurationsState = {
  configurations: ConfigModel[];
  pagination: {
    total: number;
  };
  privateConfigurations: {
    items: ConfigModel[];
    count: number;
  };
  publicConfigurations: {
    items: ConfigModel[];
    count: number;
  };
};
