import React, { FC, useCallback } from "react";

import { Box, Button, HStack } from "@chakra-ui/react";

import { useColorModeImages } from "../../hooks/useColorModeImages";
import { ConfigModel } from "../../models/ConfigModel";
import { Headline } from "../Headline/Headline";
import ConfigurationCard from "./ConfigurationCard";

interface BrandsContainerProps {
  title?: string;
  icon?: string;
  configurations: ConfigModel[];
  brandAreActive?: boolean;
  onClick?: (configuration: ConfigModel) => void;
  canLoadMore?: boolean;
  onLoadMore?: () => void;
  disabled?: (Configuration: ConfigModel) => boolean;
}

const ConfigurationsContainer: FC<BrandsContainerProps> = ({
  title,
  icon,
  configurations,
  onClick,
  brandAreActive,
  canLoadMore,
  onLoadMore,
  disabled,
}) => {
  const icons = useColorModeImages();

  const renderBrand = useCallback(
    (configuration: ConfigModel) => {
      return (
        <ConfigurationCard
          configuration={configuration}
          key={configuration.id}
          onClick={onClick}
          active={brandAreActive}
          disabled={disabled?.(configuration)}
        />
      );
    },
    [brandAreActive, disabled, onClick],
  );

  return (
    <Box>
      {title && icon && <Headline imgSrc={icon} headline={title} />}
      <Box display={"flex"} flexWrap={"wrap"} gap={"1rem"}>
        {configurations.map(renderBrand)}
      </Box>
      {canLoadMore && onLoadMore && (
        <HStack justifyContent={"center"}>
          <Button
            onClick={onLoadMore}
            variant={"outline"}
            marginTop={"0.5rem"}
            width={"2rem"}
            padding={"0"}
          >
            <img src={icons.chevronDownDouble} alt={"Chevron Down Double"} />{" "}
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default ConfigurationsContainer;
