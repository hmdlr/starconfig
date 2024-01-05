import { Box } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import React, { useCallback, useEffect, useMemo } from "react";
import { IBrand } from "@hmdlr/types";
import { useAppSelector } from "../../store/hooks";
import { selectConfigurationById } from "../../store/Configurations/selectors";
import BrandCard from "../../components/Brands/BrandCard";
import { selectPublicBrands } from "../../store/Brands/selectors";
import { Headline } from "../../components/Headline/Headline";
import { useColorModeImages } from "../../hooks/useColorModeImages";

const EditConfiguration = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const icons = useColorModeImages();
  const { setActions } = useActions();

  const configId = useMemo(
    () => pathname.split("/").splice(pathname.split("/").length - 2, 1)[0],
    [pathname],
  );

  const config = useAppSelector(selectConfigurationById(configId));

  const publicBrands = useAppSelector(selectPublicBrands);

  const availableBrands = useMemo(() => {
    return publicBrands.filter((brand) => {
      return !config?.brands.find((b) => b.id === brand.id);
    });
  }, [config?.brands, publicBrands]);

  const renderActiveBrand = useCallback((brand: IBrand) => {
    return <BrandCard brand={brand} key={brand.id} active={true} />;
  }, []);

  const renderAvailableBrand = useCallback((brand: IBrand) => {
    return <BrandCard brand={brand} key={brand.id} active={false} />;
  }, []);

  useEffect(() => {
    setActions({
      Cancel: () => navigate(`/configurations/${configId}`),
    });
  }, [configId, navigate, setActions]);

  return (
    <Box paddingY={"2rem"} paddingX={"4rem"} width={"100%"} height={"100%"}>
      <Headline
        imgSrc={icons.folder}
        headline={"Manage rules of the configuration"}
      />
      <Box marginTop={"2rem"}>
        <Headline imgSrc={icons.file} headline={"Actively Protected Brands"} />
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} gap={"1rem"}>
        {availableBrands.map(renderActiveBrand)}
      </Box>
      <Box marginTop={"1rem"}>
        <Headline imgSrc={icons.file} headline={"Available Brands"} />
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} gap={"1rem"}>
        {availableBrands.map(renderAvailableBrand)}
      </Box>
    </Box>
  );
};

export default EditConfiguration;
