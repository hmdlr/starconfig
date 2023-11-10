import { useColorModeValue } from "@chakra-ui/react";
import React from "react";

export const colorModeImagesContext = React.createContext<{
  loginImage: string,
  compass: string,
  packageImage: string,
  puzzlePiece: string
}>(undefined!);

export const ProvideColorModeImages = ({children}: {children: any}) => {
  const colorModeImages = useProvideColorModeImages();
  return <colorModeImagesContext.Provider value={colorModeImages}>{children}</colorModeImagesContext.Provider>;
};

export const useColorModeImages = () => {
  return React.useContext(colorModeImagesContext);
};

function useProvideColorModeImages() {
  const loginImage = useColorModeValue("/images/log-in-01.svg", "/images/log-in-01-dark.svg");
  const compass = useColorModeValue("/images/compass.svg", "/images/compass-dark.svg");
  const packageImage = useColorModeValue("/images/package.svg", "/images/package-dark.svg");
  const puzzlePiece = useColorModeValue("/images/puzzle-piece-01.svg", "/images/puzzle-piece-01-dark.svg");

  return {
    loginImage,
    compass,
    packageImage,
    puzzlePiece
  };
}
