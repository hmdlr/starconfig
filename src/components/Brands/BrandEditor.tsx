import { IBrand } from "@hmdlr/types";
import {
  Button,
  Flex,
  HStack,
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
import { authphishApiClient } from "../../hooks/useClient";
import { useDeleteBrand } from "../../hooks/Brands/useDeleteBrand";

interface BrandEditorProps {
  brand?: IBrand;
  onClose: () => void;
}

const BrandEditor = ({ brand, onClose }: BrandEditorProps) => {
  const icons = useColorModeImages();

  const [editPermission, setEditPermission] = useState<boolean>(false);
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

  const { updateBrand, status: updateBrandStatus } = useUpdateBrand();
  const { requestDeleteBrand, status: deleteBrandStatus } = useDeleteBrand();

  const onSubmit = useCallback(() => {
    const { id, name, authUrl } = getValues();

    updateBrand(id, name, authUrl);
  }, [getValues, updateBrand]);

  const checkEditPermission = useCallback((brandId: string) => {
    authphishApiClient
      .hasEditAccess(brandId)
      .then(setEditPermission)
      .catch(console.error);
  }, []);

  const toggleEditing = useCallback(() => {
    setEditing((prev) => {
      if (!prev) {
        setFocus("name");
      }
      return !prev;
    });
  }, [setFocus]);

  const onDelete = useCallback(() => {
    if (brand) {
      requestDeleteBrand(brand.id);
    }
  }, [brand, requestDeleteBrand]);

  useEffect(() => {
    if (brand) {
      setValue("id", brand.id);
      setValue("name", brand.name);
      setValue("domain", brand.domain);
      setValue("authUrl", brand.authUrl);
      setValue("title", brand.title);
      setEditing(false);
      setEditPermission(false);
      checkEditPermission(brand.id);
    }
  }, [brand, checkEditPermission, setValue]);

  useEffect(() => {
    updateBrandStatus === "success" && onClose();
  }, [onClose, updateBrandStatus]);

  useEffect(() => {
    deleteBrandStatus === "success" && onClose();
  }, [deleteBrandStatus, onClose]);

  return (
    <Modal isOpen={!!brand} onClose={onClose} isCentered={true} size={"3xl"}>
      <ModalOverlay />
      <ModalContent>
        {editPermission && (
          <IconButton
            position={"absolute"}
            right={"0.5rem"}
            top={"0.5rem"}
            aria-label={"Edit"}
            variant="outline"
            onClick={toggleEditing}
            icon={<img alt={"Edit"} src={editing ? icons.eye : icons.edit} />}
          />
        )}
        <Flex justifyContent={"center"} marginTop={"1rem"}>
          <BrandCard brand={brand!} />
        </Flex>
        <ModalBody>
          <Flex direction={"column"} rowGap={"1rem"}>
            <BrandEditorRow title={"Favicon"} icon={icons.image}>
              <img
                src={brand?.favicon}
                alt={brand?.favicon}
                style={{ height: "4rem", maxWidth: "100%" }}
              />
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
          <HStack
            justifyContent={editPermission ? "space-between" : "flex-end"}
            width={"100%"}
          >
            {editPermission && (
              <Button
                isDisabled={deleteBrandStatus === "pending"}
                isLoading={deleteBrandStatus === "pending"}
                onClick={onDelete}
                colorScheme={"red"}
              >
                Delete
              </Button>
            )}
            <Button
              isDisabled={updateBrandStatus === "pending" || !editing}
              isLoading={updateBrandStatus === "pending"}
              onClick={handleSubmit(onSubmit)}
            >
              Update
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BrandEditor;
