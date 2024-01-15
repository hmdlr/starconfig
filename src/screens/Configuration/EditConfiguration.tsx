import { Box, Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IBrand } from "@hmdlr/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectConfigurationById } from "../../store/Configurations/selectors";
import BrandCard from "../../components/Brands/BrandCard";
import {
  selectPrivateBrands,
  selectPublicBrands,
} from "../../store/Brands/selectors";
import { Headline } from "../../components/Headline/Headline";
import { useColorModeImages } from "../../hooks/useColorModeImages";
import ControlledInput from "../../components/Utils/ControlledInput";
import { useForm } from "react-hook-form";
import ConfigurationBreadcrumb from "../../components/Configuration/ConfigurationBreadcrumb";
import {
  addBrandToConfigurationAction,
  fetchConfigurationByIdAction,
  removeBrandFromConfigurationAction,
  updateConfigurationNameAction,
} from "../../store/Configurations/actions";
import { PageContent } from "../../components/Utils/PageContent";
import BrandsContainer from "../../components/Brands/BrandsContainer";

const EditConfiguration = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const icons = useColorModeImages();
  const { setActions } = useActions();
  const dispatch = useAppDispatch();

  const [updateConfigurationNameFetching, setUpdateConfigurationNameFetching] =
    useState(false);

  const configId = useMemo(
    () => pathname.split("/").splice(pathname.split("/").length - 2, 1)[0],
    [pathname],
  );

  const config = useAppSelector(selectConfigurationById(configId));

  const publicBrands = useAppSelector(selectPublicBrands);
  const privateBrands = useAppSelector(selectPrivateBrands);

  const { control, getValues, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: config?.name ?? "",
    },
  });

  const onUpdateConfigurationNameError = useCallback((err: any) => {
    console.log(err);
  }, []);

  const updateConfigurationName = useCallback(() => {
    if (!config) {
      return;
    }

    setUpdateConfigurationNameFetching(true);
    dispatch(
      updateConfigurationNameAction({
        id: config.id,
        name: getValues().name.trim(),
      }),
    )
      .unwrap()
      .catch(onUpdateConfigurationNameError)
      .finally(() => {
        setUpdateConfigurationNameFetching(false);
      });
  }, [config, dispatch, getValues, onUpdateConfigurationNameError]);

  const activeBrands = useMemo(() => {
    return config?.brands ?? [];
  }, [config?.brands]);

  const availableBrands = useMemo(() => {
    return [...publicBrands, ...privateBrands].filter((brand) => {
      return !config?.brands.find((b) => b.id === brand.id);
    });
  }, [config?.brands, privateBrands, publicBrands]);

  const addBrandToConfiguration = useCallback(
    (brand: IBrand) => {
      if (!brand) {
        return;
      }

      dispatch(
        addBrandToConfigurationAction({
          configId: configId,
          brand,
        }),
      );
    },
    [configId, dispatch],
  );

  const removeBrandFromConfiguration = useCallback(
    (brand: IBrand) => {
      if (!brand) {
        return;
      }

      dispatch(
        removeBrandFromConfigurationAction({
          brand,
          configId,
        }),
      );
    },
    [configId, dispatch],
  );

  const renderAvailableBrand = useCallback(
    (brand: IBrand) => {
      return (
        <BrandCard
          brand={brand}
          key={brand.id}
          active={false}
          onClick={addBrandToConfiguration}
        />
      );
    },
    [addBrandToConfiguration],
  );

  useEffect(() => {
    setActions({
      Cancel: () => navigate(`/configurations/${configId}`),
    });
  }, [configId, navigate, setActions]);

  useEffect(() => {
    dispatch(fetchConfigurationByIdAction(configId)).catch((err) => {
      console.log(err);
    });
  }, [configId, dispatch]);

  useEffect(() => {
    if (!config) {
      return;
    }

    setValue("name", config.name);
  }, [config]);

  return (
    <PageContent>
      <ConfigurationBreadcrumb config={config} edit={true} />
      <ControlledInput
        name={"name"}
        control={control}
        rules={{
          required: { value: true, message: "Numele nu poate fi gol." },
        }}
        marginTop={"2rem"}
      />
      <Button
        marginTop={"1rem"}
        marginBottom={"2rem"}
        onClick={handleSubmit(updateConfigurationName)}
        isDisabled={updateConfigurationNameFetching}
        isLoading={updateConfigurationNameFetching}
      >
        Update Name
      </Button>
      <Headline
        imgSrc={icons.folder}
        headline={"Manage rules of the configuration"}
      />
      <Box marginTop={"2rem"}>
        <Headline imgSrc={icons.file} headline={"Actively Protected Brands"} />
      </Box>
      <BrandsContainer
        brands={activeBrands}
        onClick={removeBrandFromConfiguration}
        brandAreActive={true}
      />
      <Box marginTop={"1rem"}>
        <Headline imgSrc={icons.file} headline={"Available Brands"} />
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} gap={"1rem"}>
        {availableBrands.map(renderAvailableBrand)}
      </Box>
    </PageContent>
  );
};
export default EditConfiguration;
