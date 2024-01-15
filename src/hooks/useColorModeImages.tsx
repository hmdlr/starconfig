import { useColorModeValue } from "@chakra-ui/react";
import React from "react";

export const colorModeImagesContext = React.createContext<
  ReturnType<typeof useProvideColorModeImages>
>(undefined!);

export const ProvideColorModeImages = ({ children }: { children: any }) => {
  const colorModeImages = useProvideColorModeImages();
  return (
    <colorModeImagesContext.Provider value={colorModeImages}>
      {children}
    </colorModeImagesContext.Provider>
  );
};

export const useColorModeImages = () => {
  return React.useContext(colorModeImagesContext);
};

function useProvideColorModeImages() {
  const loginImage = useColorModeValue(
    "/images/light/log-in-03.svg",
    "/images/dark/log-in-03.svg",
  );
  const compass = useColorModeValue(
    "/images/light/compass.svg",
    "/images/dark/compass.svg",
  );
  const packageImage = useColorModeValue(
    "/images/light/package.svg",
    "/images/dark/package.svg",
  );
  const packageImageX = useColorModeValue(
    "/images/light/package-x.svg",
    "/images/dark/package-x.svg",
  );
  const packageImageCheck = useColorModeValue(
    "/images/light/package-check.svg",
    "/images/dark/package-check.svg",
  );
  const puzzlePiece = useColorModeValue(
    "/images/light/puzzle-piece-01.svg",
    "/images/dark/puzzle-piece-01.svg",
  );
  const pin02 = useColorModeValue(
    "/images/light/pin-02.svg",
    "/images/dark/pin-02.svg",
  );
  const eyeOff = useColorModeValue(
    "/images/light/eye-off.svg",
    "/images/dark/eye-off.svg",
  );
  const folder = useColorModeValue(
    "/images/light/folder.svg",
    "/images/dark/folder.svg",
  );
  const folderPlus = useColorModeValue(
    "/images/light/folder-plus.svg",
    "/images/dark/folder-plus.svg",
  );
  const folderNone = useColorModeValue(
    "/images/folder-closed.svg",
    "/images/folder-closed.svg",
  );
  const checkVerified01 = useColorModeValue(
    "/images/light/check-verified-01.svg",
    "/images/dark/check-verified-01.svg",
  );
  const starphishLogo = useColorModeValue(
    "/images/light/logo.svg",
    "/images/dark/logo.svg",
  );
  const chevronRight = useColorModeValue(
    "/images/light/chevron-right.svg",
    "/images/dark/chevron-right.svg",
  );
  const file = useColorModeValue(
    "/images/light/file.svg",
    "/images/dark/file.svg",
  );

  const edit = useColorModeValue(
    "/images/light/edit.svg",
    "/images/dark/edit.svg",
  );

  const eye = useColorModeValue(
    "/images/light/eye.svg",
    "/images/dark/eye.svg",
  );

  const annotationInfo = useColorModeValue(
    "/images/light/annotation-info.svg",
    "/images/dark/annotation-info.svg",
  );

  const fingerprint = useColorModeValue(
    "/images/light/fingerprint.svg",
    "/images/dark/fingerprint.svg",
  );

  const homeLine = useColorModeValue(
    "/images/light/home-line.svg",
    "/images/dark/home-line.svg",
  );

  const image = useColorModeValue(
    "/images/light/image.svg",
    "/images/dark/image.svg",
  );

  const link = useColorModeValue(
    "/images/light/link.svg",
    "/images/dark/link.svg",
  );

  const stickerCircle = useColorModeValue(
    "/images/light/sticker-circle.svg",
    "/images/dark/sticker-circle.svg",
  );

  const chevronDownDouble = useColorModeValue(
    "/images/light/chevron-down-double.svg",
    "/images/dark/chevron-down-double.svg",
  );

  const searchBrand = useColorModeValue(
    "/images/light/search-brand.svg",
    "/images/dark/search-brand.svg",
  );

  const plusSquare = useColorModeValue(
    "/images/light/plus-square.svg",
    "/images/dark/plus-square.svg",
  );

  const minusSquare = useColorModeValue(
    "/images/light/minus-square.svg",
    "/images/dark/minus-square.svg",
  );

  const filePLus = useColorModeValue(
    "/images/light/file-plus.svg",
    "/images/dark/file-plus.svg",
  );

  const fileMinus = useColorModeValue(
    "/images/light/file-minus.svg",
    "/images/dark/file-minus.svg",
  );

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
    chevronRight,
    file,
    edit,
    eye,
    annotationInfo,
    fingerprint,
    homeLine,
    image,
    link,
    stickerCircle,
    chevronDownDouble,
    searchBrand,
    plusSquare,
    minusSquare,
    filePLus,
    fileMinus,
  };
}
