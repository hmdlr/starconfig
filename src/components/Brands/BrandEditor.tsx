import { IBrand } from "@hmdlr/types";
import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import BrandCard from "./BrandCard";
import ControlledInput from "../Utils/ControlledInput";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import BrandEditorRow from "./BrandEditorRow";
import { useUpdateBrand } from "../../hooks/Brands/useUpdateBrand";
import { useColorModeImages } from "../../hooks/useColorModeImages";

interface BrandEditorProps {
  brand?: IBrand;
  onClose: () => void;
}

const BrandEditor = ({ brand, onClose }: BrandEditorProps) => {
  const icons = useColorModeImages();

  const [editing, setEditing] = useState<boolean>(false);

  const { control, setValue, getValues, handleSubmit, setFocus } = useForm({
    defaultValues: {
      id: "",
      name: "",
      favicon: "",
      domain: "",
      authUrl: "",
      title: "",
    },
  });

  const { updateBrand, status } = useUpdateBrand();

  const onSubmit = useCallback(() => {
    const { id, name, authUrl } = getValues();

    updateBrand(id, name, authUrl);
  }, [getValues, updateBrand]);

  const toggleEditing = useCallback(() => {
    setEditing((prev) => {
      if (!prev) {
        setFocus("name");
      }
      return !prev;
    });
  }, [setFocus]);

  useEffect(() => {
    if (brand) {
      setValue("id", brand.id);
      setValue("name", brand.name);
      setValue("domain", brand.domain);
      setValue("authUrl", brand.authUrl);
      setValue("title", brand.title);
      setEditing(false);
    }
  }, [brand, setValue]);

  useEffect(() => {
    status === "success" && onClose();
  }, [onClose, status]);

  return (
    <Modal isOpen={!!brand} onClose={onClose} isCentered={true} size={"3xl"}>
      <ModalOverlay />
      <ModalContent>
        <IconButton
          position={"absolute"}
          right={"0.5rem"}
          top={"0.5rem"}
          aria-label={"Edit"}
          variant="outline"
          onClick={toggleEditing}
          icon={<img alt={"Edit"} src={editing ? icons.eye : icons.edit} />}
        />
        <Flex justifyContent={"center"} marginTop={"1rem"}>
          <BrandCard brand={brand!} />
        </Flex>
        <ModalBody>
          <Flex direction={"column"} rowGap={"1rem"}>
            <BrandEditorRow title={"Favicon"} icon={icons.image}>
              <Flex>
                <img
                  src={brand?.favicon}
                  alt={brand?.favicon}
                  height={"2rem"}
                />
              </Flex>
            </BrandEditorRow>
            <BrandEditorRow title={"Name"} icon={icons.stickerCircle}>
              <ControlledInput
                name={"name"}
                control={control}
                placeholder={"Name"}
                className={"monospaced"}
                isReadOnly={!editing}
                focusBorderColor={editing ? undefined : "brand.500"}
              />
            </BrandEditorRow>
            <BrandEditorRow title={"Auth URL"} icon={icons.link}>
              <ControlledInput
                name={"authUrl"}
                control={control}
                placeholder={"Auth URL"}
                className={"monospaced"}
                isReadOnly={!editing}
                focusBorderColor={editing ? undefined : "brand.500"}
              />
            </BrandEditorRow>
            <BrandEditorRow title={"Domain"} icon={icons.homeLine}>
              <ControlledInput
                name={"domain"}
                control={control}
                placeholder={"Domain"}
                className={"monospaced"}
                isReadOnly={true}
                isDisabled={editing}
                focusBorderColor={editing ? undefined : "brand.500"}
              />
            </BrandEditorRow>
            <BrandEditorRow title={"Page title"} icon={icons.annotationInfo}>
              <ControlledInput
                name={"title"}
                control={control}
                placeholder={"Page title"}
                className={"monospaced"}
                isReadOnly={true}
                isDisabled={editing}
                focusBorderColor={editing ? undefined : "brand.500"}
              />
            </BrandEditorRow>
            <BrandEditorRow title={"Id"} icon={icons.fingerprint}>
              <ControlledInput
                name={"id"}
                control={control}
                placeholder={"Id"}
                className={"monospaced"}
                isReadOnly={true}
                isDisabled={editing}
                focusBorderColor={editing ? undefined : "brand.500"}
              />
            </BrandEditorRow>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={status === "pending" || !editing}
            isLoading={status === "pending"}
            onClick={handleSubmit(onSubmit)}
          >
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BrandEditor;
