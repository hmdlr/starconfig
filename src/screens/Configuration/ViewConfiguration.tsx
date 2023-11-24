import { Box, Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import { useColorModeImages } from "../../hooks/useColorModeImages";
import { useConfigurations } from "../../hooks/useConfigurations";
import { useEffect, useState } from "react";
import { ConfigModel } from "../../models/ConfigModel";
import { useLocation } from "react-router-dom";

export const ViewConfiguration = () => {
  const {
    chevronRight
  } = useColorModeImages();

  const {
    get
  } = useConfigurations();

  // get the part after the last '/'
  const {
    pathname
  } = useLocation();

  const [config, setConfig] = useState<ConfigModel | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const configId = pathname.split('/').pop();
      if (!configId) {
        return;
      }
      const config = await get(configId);
      setConfig(config);
    })()
  }, [pathname])

  return (
    <Box
      paddingY={'2rem'}
      paddingX={'4rem'}
      width={'100%'}
      height={'100%'}
    >
      <Breadcrumb spacing={'8px'} separator={<img src={chevronRight} alt=">"/>}>
        <BreadcrumbItem>

        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  );
}
