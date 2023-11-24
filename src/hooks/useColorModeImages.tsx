import { useColorModeValue } from "@chakra-ui/react";
import React from "react";

export const colorModeImagesContext = React.createContext<{
  starphishLogo: string,
  loginImage: string,
  compass: string,
  packageImage: string,
  packageImageX: string,
  packageImageCheck: string,
  puzzlePiece: string
  pin02: string,
  eyeOff: string,
  folder: string,
  folderPlus: string,
  folderNone: string,
  checkVerified01: string,
  chevronRight: string
}>(undefined!);

export const ProvideColorModeImages = ({children}: {children: any}) => {
  const colorModeImages = useProvideColorModeImages();
  return <colorModeImagesContext.Provider value={colorModeImages}>{children}</colorModeImagesContext.Provider>;
};

export const useColorModeImages = () => {
  return React.useContext(colorModeImagesContext);
};

function useProvideColorModeImages() {
  const loginImage = useColorModeValue("/images/light/log-in-03.svg", "/images/dark/log-in-03.svg");
  const compass = useColorModeValue("/images/light/compass.svg", "/images/dark/compass.svg");
  const packageImage = useColorModeValue("/images/light/package.svg", "/images/dark/package.svg");
  const packageImageX = useColorModeValue("/images/light/package-x.svg", "/images/dark/package-x.svg");
  const packageImageCheck = useColorModeValue("/images/light/package-check.svg", "/images/dark/package-check.svg");
  const puzzlePiece = useColorModeValue("/images/light/puzzle-piece-01.svg", "/images/dark/puzzle-piece-01.svg");
  const pin02 = useColorModeValue("/images/light/pin-02.svg", "/images/dark/pin-02.svg");
  const eyeOff = useColorModeValue("/images/light/eye-off.svg", "/images/dark/eye-off.svg");
  const folder = useColorModeValue("/images/light/folder.svg", "/images/dark/folder.svg");
  const folderPlus = useColorModeValue("/images/light/folder-plus.svg", "/images/dark/folder-plus.svg");
  const folderNone = useColorModeValue("/images/folder-closed.svg", "/images/folder-closed.svg");
  const checkVerified01 = useColorModeValue("/images/light/check-verified-01.svg", "/images/dark/check-verified-01.svg");
  const starphishLogo = useColorModeValue("/images/light/logo.svg", "/images/dark/logo.svg");
  const chevronRight = useColorModeValue("/images/light/chevron-right.svg", "/images/dark/chevron-right.svg");

  return {
    starphishLogo,
    loginImage,
    compass,
    packageImage,
    puzzlePiece,
    pin02,
    eyeOff,
    folder,
    folderPlus,
    folderNone,
    packageImageX,
    packageImageCheck,
    checkVerified01,
    chevronRight
  };
}
