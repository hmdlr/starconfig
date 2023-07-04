import { Box, Button, Grid, Heading, useTheme } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import { useConfigurations } from "../../hooks/useConfigurations";
import { useActions } from "../../hooks/useActions";
import { useEffect, useState } from "react";
import { IBrand, IConfig } from "@hmdlr/types";
import useLoadingOverlay from "../../hooks/useLoading";
import { useRules } from "../../hooks/useRules";
import { RuleBlock } from "../../components/Rule";


const EditConfiguration = () => {
  const theme = useTheme();
  const primaryColor = theme.colors.primary;

  const params = useParams();
  const navigate = useNavigate();

  const { handleSubmit, register, formState: { errors } } = useForm();
  const { get } = useConfigurations();
  const { loadAllRules, rules, saveRulesToConfig } = useRules();
  const { setActions } = useActions();

  const { configId } = params;
  const { showLoading, hideLoading, LoadingOverlay } = useLoadingOverlay();

  const [editingConfig, setEditingConfig] = useState<IConfig | null>(null);

  const [activeRules, setActiveRules] = useState<IBrand[]>([]);
  const [inactiveRules, setInactiveRules] = useState<IBrand[]>([]);

  const onSubmit = async () => {
    // Send request to server to update the configuration
    if (!editingConfig) return;
    await saveRulesToConfig(activeRules, editingConfig?.id);
    navigate(`/configurations`);
  };

  useEffect(() => {
    setContextActions();
    loadAllRules();

    showLoading();
    const interval = setInterval(() => {
      requestConfig(interval);
    }, 1000);

    return () => {
      clearInterval(interval);
      hideLoading();
    };
  }, []);

  /*
    * When the rules are loaded, we can start displaying them & filtering based on
    * the active rules found in the configuration
   */
  useEffect(() => {
    if (!rules || !editingConfig) {
      return;
    }

    // move in active rules the rules that are active (in configuration)
    setActiveRules(editingConfig?.brands || []);

    // put in inactive rules the rules that are not active (in configuration)
    setInactiveRules(
        rules.filter((rule) => !editingConfig?.brands?.find((brand) => brand.id === rule.id))
    );
  }, [rules, editingConfig]);

  const requestConfig = (interval: NodeJS.Timeout) => {
    if (!configId) return;

    get(configId)
        .then((config) => {
          setEditingConfig(config);
          clearInterval(interval);
          hideLoading();
        })
        .catch((err) => {
          console.log('Kafka did not process the configuration yet... retrying');
        });
  };

  const makeRuleActive = (rule: IBrand) => {
    setActiveRules([...activeRules, rule]);
    setInactiveRules(inactiveRules.filter((r) => r.id !== rule.id));
  }

  const makeRuleInactive = (rule: IBrand) => {
    setInactiveRules([...inactiveRules, rule]);
    setActiveRules(activeRules.filter((r) => r.id !== rule.id));
  }

  const setContextActions = () => {
    setActions({
      'Cancel': () => navigate(`/configurations`),
    });
  };

  return (
      <LoadingOverlay>
        <Box p={4}>
          <Heading as="h1" size="lg" mb={4}>Edit configuration {editingConfig?.name}</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Heading as="h2" size="md" mb={4} mt={5}>
              Active rules
            </Heading>
            <Grid
                templateColumns="repeat(auto-fill, 12rem)"
                gap={4}
                px={5}
                py={3}
            >
              {activeRules.map((rule, idx) => (
                  <RuleBlock
                      rule={{ ...rule, active: true }}
                      handleRuleClick={() => makeRuleInactive(rule)}
                      key={idx}
                  />
              ))}
            </Grid>

            <Heading as="h2" size="md" mb={4}>
              Inactive rules
            </Heading>
            <Grid
                templateColumns="repeat(auto-fill, 12rem)"
                gap={4}
                px={5}
                py={3}
            >

              {inactiveRules.map((rule, idx) => (
                  <RuleBlock
                      rule={{ ...rule, active: false }}
                      handleRuleClick={() => makeRuleActive(rule)}
                      key={idx}
                  />
              ))}
            </Grid>

            <Button
                type="submit"
                colorScheme="green"
                mt={4}
            >
              Save
            </Button>
          </form>
        </Box>
      </LoadingOverlay>
  );
};

export default EditConfiguration;
