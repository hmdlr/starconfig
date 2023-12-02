import { IBrand } from "@hmdlr/types";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import BrandCard from "./BrandCard";
import ControlledInput from "../Utils/ControlledInput";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import BrandEditorRow from "./BrandEditorRow";
import { useUpdateBrand } from "../../hooks/Brands/useUpdateBrand";

interface BrandEditorProps {
  brand?: IBrand;
  onClose: () => void;
}

const BrandEditor = ({ brand, onClose }: BrandEditorProps) => {
  const { control, setValue, getValues, handleSubmit } = useForm({
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
    const { id, name } = getValues();

    updateBrand(id, name);
  }, [getValues, updateBrand]);

  useEffect(() => {
    if (brand) {
      setValue("id", brand.id);
      setValue("name", brand.name);
      setValue("domain", brand.domain);
      setValue("authUrl", brand.authUrl);
      setValue("title", brand.title);
    }
  }, [brand, setValue]);

  useEffect(() => {
    status === "success" && onClose();
  }, [onClose, status]);

  return (
      <Modal isOpen={!!brand} onClose={onClose} isCentered={true} size={"xl"}>
        <ModalOverlay/>
        <ModalContent>
          <Flex justifyContent={"center"} marginTop={"1rem"}>
            <BrandCard brand={brand!} />
          </Flex>
          <ModalBody>
            <Flex direction={"column"} rowGap={"1rem"}>
              <BrandEditorRow title={"Name"}>
                <ControlledInput
                  name={"name"}
                  control={control}
                  placeholder={"Name"}
                  className={'monospaced'}
                />
              </BrandEditorRow>
              <BrandEditorRow title={"Domain"}>
                <ControlledInput
                  name={"domain"}
                  control={control}
                  placeholder={"Domain"}
                  className={'monospaced'}
                />
              </BrandEditorRow>
              <BrandEditorRow title={"Auth URL"}>
                <ControlledInput
                  name={"authUrl"}
                  control={control}
                  placeholder={"Auth URL"}
                  className={'monospaced'}
                />
              </BrandEditorRow>
              <BrandEditorRow title={"Page title"}>
                <ControlledInput
                  name={"title"}
                  control={control}
                  placeholder={"Page title"}
                  className={'monospaced'}
                />
              </BrandEditorRow>
              <BrandEditorRow title={"Id"}>
                <ControlledInput
                  name={"id"}
                  control={control}
                  placeholder={"Id"}
                  isDisabled={true}
                  className={'monospaced'}
                />
              </BrandEditorRow>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={status === "pending"}
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
