import { ConfigModel } from "../../models/ConfigModel";

export type ConfigurationsState = {
  configurations: ConfigModel[];
  pagination: {
    total: number;
  };
};
