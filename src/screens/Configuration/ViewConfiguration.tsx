import { Box, Button, Flex, Switch, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectConfigurationById } from "../../store/Configurations/selectors";
import { IBrand } from "@hmdlr/types";
import BrandCard from "../../components/Brands/BrandCard";
import { useActions } from "../../hooks/useActions";
import ConfigurationBreadcrumb from "../../components/Configuration/ConfigurationBreadcrumb";
import {
  fetchConfigurationByIdAction,
  setConfigurationActiveAction,
} from "../../store/Configurations/actions";
import { PageContent } from "../../components/Utils/PageContent";
import { authphishApiClient } from "../../hooks/useClient";

export const ViewConfiguration = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { setActions } = useActions();
  const dispatch = useAppDispatch();

  const [isTogglingActive, setIsTogglingActive] = React.useState(false);

  const configId = useMemo(() => pathname.split("/").pop(), [pathname]);

  const config = useAppSelector(selectConfigurationById(configId));

  const [hasEditAccess, setHasEditAccess] = React.useState(false);

  const renderBrand = useCallback((brand: IBrand) => {
    return <BrandCard brand={brand} key={brand.id} />;
  }, []);

  const toggleActive = useCallback(() => {
    if (!config?.id) {
      return;
    }

    setIsTogglingActive(true);
    dispatch(
      setConfigurationActiveAction({
        id: config.id,
        active: !config?.active,
      }),
    )
      .unwrap()
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsTogglingActive(false);
      });
  }, [config, dispatch]);

  useEffect(() => {
    setActions({
      Edit: () => navigate(`/configurations/${configId}/edit`),
    });
  }, [configId, navigate, setActions]);

  useEffect(() => {
    if (configId) {
      dispatch(fetchConfigurationByIdAction(configId));

      authphishApiClient
        .hasEditAccess(configId)
        .then((hasAccess) => {
          setHasEditAccess(hasAccess);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [configId, dispatch]);

  return (
    <PageContent>
      <Flex justifyContent={"space-between"}>
        <ConfigurationBreadcrumb config={config} />
        <Flex alignItems={"center"} gap={"0.5rem"}>
          <Text>In Use:</Text>
          <Switch
            isDisabled={isTogglingActive}
            isChecked={config?.active}
            onChange={toggleActive}
          />
        </Flex>
      </Flex>
      <Box display={"flex"} flexWrap={"wrap"} gap={"1rem"} marginTop={"2rem"}>
        {config?.brands.map(renderBrand)}
      </Box>
      {hasEditAccess && (
        <Button
          marginTop={"2rem"}
          onClick={() => navigate(`/configurations/${configId}/edit`)}
        >
          Edit
        </Button>
      )}
    </PageContent>
  );
};
