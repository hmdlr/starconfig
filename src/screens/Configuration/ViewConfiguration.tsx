import { Box } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectConfigurationById } from "../../store/Configurations/selectors";
import { IBrand } from "@hmdlr/types";
import BrandCard from "../../components/Brands/BrandCard";
import { useActions } from "../../hooks/useActions";
import ConfigurationBreadcrumb from "../../components/Configuration/ConfigurationBreadcrumb";
import { fetchConfigurationByIdAction } from "../../store/Configurations/actions";
import { PageContent } from "../../components/Utils/PageContent";

export const ViewConfiguration = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { setActions } = useActions();
  const dispatch = useAppDispatch();

  const configId = useMemo(() => pathname.split("/").pop(), [pathname]);

  const config = useAppSelector(selectConfigurationById(configId));

  const renderBrand = useCallback((brand: IBrand) => {
    return <BrandCard brand={brand} key={brand.id} />;
  }, []);

  useEffect(() => {
    setActions({
      Edit: () => navigate(`/configurations/${configId}/edit`),
    });
  }, [configId, navigate, setActions]);

  useEffect(() => {
    if (configId) {
      dispatch(fetchConfigurationByIdAction(configId));
    }
  }, [configId, dispatch]);

  return (
    <PageContent>
      <ConfigurationBreadcrumb config={config} />
      <Box display={"flex"} flexWrap={"wrap"} gap={"1rem"} marginTop={"2rem"}>
        {config?.brands.map(renderBrand)}
      </Box>
    </PageContent>
  );
};
