import { useActions } from "../../hooks/useActions";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useCreateBrand } from "../../hooks/Brands/useCreateBrand";
import BrandCard from "../../components/Brands/BrandCard";
import { PageContent } from "../../components/Utils/PageContent";

type FormData = {
  ruleName: string;
  ruleAuthUrl: string;
};

export const NewBrandScreen = () => {
  const { setActions } = useActions();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  const { createBrand, LoadingOverlay, brand, status } = useCreateBrand();

  const onSubmit = useCallback(() => {
    const { ruleName, ruleAuthUrl } = getValues();
    createBrand(ruleName, ruleAuthUrl);
  }, [createBrand, getValues]);

  useEffect(() => {
    setActions({
      Create: () => navigate(`/rules/new`),
    });
  }, [navigate, setActions]);

  return (
    <LoadingOverlay>
      <PageContent>
        <Box mt={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="start">
              <FormControl isInvalid={!!errors.ruleName}>
                <FormLabel htmlFor="ruleName">Rule Name</FormLabel>
                <Input
                  id="ruleName"
                  type="text"
                  {...register("ruleName", {
                    required: "Rule Name is required",
                  })}
                />
                <FormErrorMessage>{errors.ruleName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.ruleAuthUrl}>
                <FormLabel htmlFor="ruleAuthUrl">Rule Auth URL</FormLabel>
                <Input
                  id="ruleAuthUrl"
                  type="text"
                  {...register("ruleAuthUrl", {
                    required: "Rule Auth URL is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.ruleAuthUrl?.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                colorScheme="blue"
                type="submit"
                disabled={status === "pending"}
              >
                Create
              </Button>
            </VStack>
          </form>
        </Box>

        {brand && (
          <Box mt={8}>
            <Heading as="h2" size="md" mb={5}>
              Here is a preview of your rule:
            </Heading>
            <BrandCard brand={brand} />
            <Button
              colorScheme="blue"
              mt={5}
              onClick={() => navigate(`/rules`)}
            >
              Save
            </Button>
          </Box>
        )}
      </PageContent>
    </LoadingOverlay>
  );
};
