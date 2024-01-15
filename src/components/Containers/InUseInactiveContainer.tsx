import React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { useColorModeImages } from "../../hooks/useColorModeImages";
// css
import "./InUseInactiveContainer.css";

interface InUseInactiveContainerProps {
  inUseComponents: React.ReactNode[];
  inactiveComponents: React.ReactNode[];
}

export const InUseInactivePackageContainer = (
  props: InUseInactiveContainerProps,
) => {
  const { packageImageCheck, packageImageX } = useColorModeImages();

  const { inUseComponents, inactiveComponents } = props;

  const miniHeadlineColor = useColorModeValue("grayActive1", "grayActive2");

  return (
    <Flex gap={"2rem"} flexDirection={"column"}>
      {/* ========= In use ========= */}
      <Flex flexDirection={"column"} gap={"0.6rem"}>
        <Flex gap={"0.5rem"} alignItems={"center"}>
          <img src={packageImageCheck} alt="✔" />
          <span className={"miniHeadline"} color={miniHeadlineColor}>
            In use
          </span>
        </Flex>

        <Flex paddingX={"2rem"} paddingTop={"0.5rem"} gap={"1rem"}>
          {inUseComponents.length === 0 ? (
            <NotPresentComponents inUse={true} />
          ) : (
            inUseComponents.map((component, index) => (
              <div key={index}>{component}</div>
            ))
          )}
        </Flex>
      </Flex>
      {/* ========= Inactive ========= */}
      <Flex flexDirection={"column"} gap={"0.6rem"}>
        <Flex gap={"0.5rem"} alignItems={"center"}>
          <img src={packageImageX} alt="✖" />
          <span className={"miniHeadline"} color={miniHeadlineColor}>
            Inactive
          </span>
        </Flex>

        <Flex paddingX={"2rem"} gap={"1rem"}>
          {inactiveComponents.length === 0 ? (
            <NotPresentComponents inUse={false} />
          ) : (
            inactiveComponents.map((component, index) => (
              <div key={index}>{component}</div>
            ))
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

const NotPresentComponents = (
  // It will write "No in use configurations" if there are no in use components
  // and "No inactive configurations" if there are no inactive components
  props: { inUse: boolean },
) => {
  const { folderNone } = useColorModeImages();

  const { inUse } = props;

  return (
    <Flex gap={"0.3rem"} alignItems={"center"}>
      <img src={folderNone} alt="" />
      <span
        className={"miniHeadline"}
        style={{
          color: "#8C8C8C", // why th does it not listen to the variable?
        }}
      >
        No {inUse ? "in use" : "inactive"} configurations
      </span>
    </Flex>
  );
};
