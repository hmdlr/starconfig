import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useTheme,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useConfigurations } from "../../hooks/useConfigurations";
import { useActions } from "../../hooks/useActions";
import { useEffect } from "react";
import { Headline } from "../../components/Headline/Headline";
import { useColorModeImages } from "../../hooks/useColorModeImages";

type CreateConfigurationFormData = {
  configurationName: string;
};

const CreateConfiguration = () => {
  const theme = useTheme();
  const icons = useColorModeImages();

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateConfigurationFormData>();
  const { create } = useConfigurations();
  const { setActions } = useActions();

  const onSubmit = async (data: CreateConfigurationFormData) => {
    // send request to server to create the configuration
    // navigate to the configuration editor after we receive a response

    const createdConfig = await create({
      name: data.configurationName,
    });
    navigate(`/configurations/${createdConfig.id}`);
  };

  useEffect(() => {
    setContextActions();
  }, []);

  const setContextActions = () => {
    setActions({
      Cancel: () => navigate(`/configurations`),
    });
  };

  return (
    <Box paddingY={"2rem"} paddingX={"4rem"} width={"100%"} height={"100%"}>
      <Heading as="h1" size="lg" mb={4}>
        Create configuration
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.configurationName} isRequired>
          <FormLabel htmlFor="configurationName">Configuration name</FormLabel>
          <Input
            id="configurationName"
            placeholder="Social shield"
            width={"50%"}
            {...register("configurationName", {
              required: "Configuration name is required",
            })}
          />
          {errors.configurationName && (
            <FormErrorMessage>
              {errors.configurationName.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <Button type="submit" colorScheme="green" mt={4}>
          Next
        </Button>
      </form>
      <Box marginTop={"2rem"}>
        <Headline
          imgSrc={icons.annotationInfo}
          headline={"A configuration bundles together a set of more rules "}
        />
      </Box>
    </Box>
  );
};

export default CreateConfiguration;
