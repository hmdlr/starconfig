import { useConfigurations } from "../../hooks/useConfigurations";
import { Configuration } from "../../components/Configuration";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

export const ConfigurationScreen = () => {

  const { configs, loadAllConfigs, handleChangeActiveState } = useConfigurations();

  useEffect(() => {
    loadAllConfigs();
  }, []);

  // render all configs
  return (
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, 24rem)" gap={4} px={5} py={3}>
        {configs.map((config) => (
            <Configuration
                key={config.id}
                config={config}
                changeActiveState={handleChangeActiveState}
            />
        ))}
      </Box>
  );
};
