import { Box, Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import { useColorModeImages } from "../../hooks/useColorModeImages";
import { useConfigurations } from "../../hooks/useConfigurations";
import { useEffect, useState } from "react";
import { ConfigModel } from "../../models/ConfigModel";
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";

export const ViewConfiguration = () => {
  const {
    chevronRight
  } = useColorModeImages();

  const {
    get
  } = useConfigurations();

  const {
    callModal
  } = useModal();

  const {
    pathname
  } = useLocation();

  const navigate = useNavigate();

  const [config, setConfig] = useState<ConfigModel | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const configId = pathname.split('/').pop();
      if (!configId) {
        return;
      }
      try {
        const config = await get(configId);
        setConfig(config);
      } catch (e) {
        if (e.response.status === 401) {
          callModal('Unauthorized 🚫', 'You are either not logged in or you do not have the required permissions to view this page.');
          return navigate('/configurations');
        }
      }
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
          {config?.name}
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  );
}
