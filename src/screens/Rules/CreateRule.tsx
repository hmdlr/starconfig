import { useActions } from "../../hooks/useActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRules } from "../../hooks/useRules";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack
} from "@chakra-ui/react";
import { IBrand } from "@hmdlr/types";
import { RuleBlock } from "../../components/Rule";
import useLoadingOverlay from "../../hooks/useLoading";


type FormData = {
  ruleName: string;
  ruleAuthUrl: string;
};

export const CreateRule = () => {
  const { setActions } = useActions();
  const navigate = useNavigate();
  const { create, enhance, loadAllRules, rules } = useRules();
  const { showLoading, hideLoading, LoadingOverlay } = useLoadingOverlay();

  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

  const [createdRuleId, setCreatedRuleId] = useState<string | null>(null);
  const [enhanced, setEnhanced] = useState<IBrand | null>(null);

  const [createButtonAvailable, setCreateButtonAvailable] = useState<boolean>(true);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    showLoading();
    const created = await create({
      name: data.ruleName,
      authUrl: data.ruleAuthUrl,
      domain: new URL(data.ruleAuthUrl).hostname,
      title: data.ruleName,
    });

    setCreatedRuleId(created.id);

    await enhance(created);
    // we now know the rule has favicon available, so we request it again on the server
    await loadAllRules();

    return () => {
      hideLoading();
    }
  };

  useEffect(() => {
    // set enhanced once found in rules
    if (createdRuleId && rules) {
      const found = rules.find(rule => rule.id === createdRuleId);
      if (found) {
        setEnhanced(found);
        hideLoading();
        setCreateButtonAvailable(false)
        // update the context action, cannot cancel now

        setActions({
          'Go back': () => navigate(`/rules`),
        });

      }
    }
  }, [createdRuleId, rules]);

  useEffect(() => {
    setContextActions();
  }, []);

  const setContextActions = () => {
    setActions({
      'Cancel': () => navigate(`/rules`),
    });
  };

  return (
      <LoadingOverlay>
        <Container maxW="container.sm">
          <Box mt={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4} align="start">
                <FormControl isInvalid={!!errors.ruleName}>
                  <FormLabel htmlFor="ruleName">Rule Name</FormLabel>
                  <Input
                      id="ruleName"
                      type="text"
                      {...register('ruleName', { required: 'Rule Name is required' })}
                  />
                  <FormErrorMessage>{errors.ruleName?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.ruleAuthUrl}>
                  <FormLabel htmlFor="ruleAuthUrl">Rule Auth URL</FormLabel>
                  <Input
                      id="ruleAuthUrl"
                      type="text"
                      {...register('ruleAuthUrl', { required: 'Rule Auth URL is required' })}
                  />
                  <FormErrorMessage>{errors.ruleAuthUrl?.message}</FormErrorMessage>
                </FormControl>

                <Button colorScheme="blue" type="submit" disabled={!createButtonAvailable}>
                  Create
                </Button>
              </VStack>
            </form>
          </Box>

          {enhanced && (
              <Box mt={8}>
                <Heading as="h2" size="md" mb={5}>Here is a preview of your rule:</Heading>
                <RuleBlock
                    rule={{
                      ...enhanced,
                      active: true,
                    }}
                    handleRuleClick={() => void 0}
                    showActionButton={false}
                />
                <Button
                    colorScheme="blue"
                    mt={5}
                    onClick={() => navigate(`/rules`)}
                >
                  Save
                </Button>
              </Box>
          )}
        </Container>
      </LoadingOverlay>
  );
};
