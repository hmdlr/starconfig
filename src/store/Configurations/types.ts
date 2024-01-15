import { ConfigModel } from "../../models/ConfigModel";

export type ConfigurationsState = {
  configurations: {
    [key: string]: {
      items: ConfigModel[];
      count: number;
    };
  };
  pagination: {
    total: number;
  };
};
