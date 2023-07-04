import { IBrand } from "@hmdlr/types";
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

  return {
    loadAllRules,
    rules,
    saveRulesToConfig,
  };
}
