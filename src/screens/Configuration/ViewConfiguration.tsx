import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectConfigurationById } from "../../store/Configurations/selectors";
import { useColorModeImages } from "../../hooks/useColorModeImages";
import { IBrand } from "@hmdlr/types";
import BrandCard from "../../components/Brands/BrandCard";
import { useActions } from "../../hooks/useActions";

export const ViewConfiguration = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { setActions } = useActions();
  const icons = useColorModeImages();

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

  // useEffect(() => {
  //   (async () => {
  //     const configId = pathname.split("/").pop();
  //     console.log(configId);
  //     if (!configId) {
  //       return;
  //     }
  //     try {
  //       const config = await get(configId);
  //       setConfig(config);
  //     } catch (e) {
  //       if (e.response.status === 401) {
  //         callModal(
  //           "Unauthorized 🚫",
  //           "You are either not logged in or you do not have the required permissions to view this page.",
  //         );
  //         return navigate("/configurations");
  //       }
  //     }
  //   })();
  // }, [pathname]);

  return (
    <Box paddingY={"2rem"} paddingX={"4rem"} width={"100%"} height={"100%"}>
      <Breadcrumb
        spacing={"8px"}
        separator={<img src={icons.chevronRight} alt=">" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/configurations" fontWeight={"bold"}>
            Configurations
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#" fontWeight={"bold"}>
            {config?.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box display={"flex"} flexWrap={"wrap"} gap={"1rem"}>
        {config?.brands.map(renderBrand)}
      </Box>
    </Box>
  );
};
