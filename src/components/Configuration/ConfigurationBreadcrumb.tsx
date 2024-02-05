import React, { FC } from "react";
import { Link } from "react-router-dom";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

import { useColorModeImages } from "../../hooks/useColorModeImages";
import { ConfigModel } from "../../models/ConfigModel";

type ConfigurationBreadcrumbProps = {
  config?: ConfigModel;
  edit?: boolean;
};

const ConfigurationBreadcrumb: FC<ConfigurationBreadcrumbProps> = ({
  config,
  edit,
}) => {
  const icons = useColorModeImages();

  return (
    <Breadcrumb
      spacing={"8px"}
      separator={<img src={icons.chevronRight} alt=">" />}
    >
      <BreadcrumbItem>
        <BreadcrumbLink href="/configurations" fontWeight={"bold"}>
          Configurations
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink
          as={Link}
          to={`/configurations/${config?.id}`}
          fontWeight={"bold"}
        >
          {config?.name}
        </BreadcrumbLink>
      </BreadcrumbItem>
      {edit && (
        <BreadcrumbItem as={Link} to={`/configurations/${config?.id}/edit`}>
          <BreadcrumbLink href="#" fontWeight={"bold"}>
            Edit
          </BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  );
};

export default ConfigurationBreadcrumb;
