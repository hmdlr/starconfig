import { IBrand, IBrandCreatePayload } from "@hmdlr/types";
import React, { useCallback } from "react";
import { useClient } from "./useClient";

export const rulesContext = React.createContext<{
  /**
   * Load all available rules
   */
  loadAllRules: () => Promise<void>;
  /**
   * All available rules
   */
  rules: IBrand[];
  /**
   * Will replace the rules of a config with the given rules
   * @param rules
   * @param configId
   */
  saveRulesToConfig: (rules: IBrand[], configId: string) => Promise<void>;
  /**
   * Create a new rule
   * @param config
   */
  create: (config: IBrandCreatePayload) => Promise<IBrand>;
  /**
   * Send crawler, come back with possible logos
   * @param config
   */
  enhance: (config: IBrand) => Promise<string[]>;
}>(undefined!);

export const ProvideRules = ({ children }: { children: any }) => {
  const rules = useProvideRules();
  return <rulesContext.Provider value={rules}>{children}</rulesContext.Provider>;
};

export const useRules = () => {
  return React.useContext(rulesContext);
};

function useProvideRules() {
  const { scanphish } = useClient().sdk;

  const [rules, setRules] = React.useState<IBrand[]>([]);

  const loadAllRules = useCallback(async () => {
    const { items } = await scanphish.listBrands({ pageSize: 50 });
    setRules(items);
  }, []);

  const saveRulesToConfig = useCallback(async (rules: IBrand[], configId: string) => {
    await scanphish.addRulesetsToConfig(configId, rules.map((r) => r.id));
  }, []);

  const create = useCallback(async (config: IBrandCreatePayload) => {
    const { brand } = await scanphish.createBrand(config);
    return brand;
  }, []);

  const enhance = useCallback(async (config: IBrand) => {
    const { candidates } = await scanphish.enhanceBrand(config.id);
    return candidates;
  }, []);

  return {
    loadAllRules,
    rules,
    saveRulesToConfig,
    create,
    enhance
  };
}
