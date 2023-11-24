import { IBrand, IConfig } from "@hmdlr/types";

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
