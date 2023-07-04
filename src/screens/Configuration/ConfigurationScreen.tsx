import { useConfigurations } from "../../hooks/useConfigurations";
import { Configuration } from "../../components/Configuration";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";

export const ConfigurationScreen = () => {

  const { setActions } = useActions();
  const { configs, loadAllConfigs, handleChangeActiveState } = useConfigurations();
  const navigate = useNavigate();

  useEffect(() => {
    loadAllConfigs();
    setContextActions();
  }, [loadAllConfigs]);

  const setContextActions = () => {
    setActions({
      'Create': () => navigate(`/configurations/new`),
    })
  }

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
