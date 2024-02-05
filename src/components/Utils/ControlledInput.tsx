import { useCallback } from "react";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { FieldPath } from "react-hook-form/dist/types";
import { ControllerProps } from "react-hook-form/dist/types/controller";

import { Input, InputProps } from "@chakra-ui/react";

interface ControlledInputProps<TFieldValues extends FieldValues>
  extends InputProps {
  name: FieldPath<TFieldValues>;
  control: UseControllerProps<TFieldValues>["control"];
  rules?: UseControllerProps<TFieldValues>["rules"];
}

const ControlledInput = <TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  ...otherProps
}: ControlledInputProps<TFieldValues>) => {
  const renderInput = useCallback<ControllerProps<TFieldValues>["render"]>(
    ({ field }) => {
      return <Input {...field} {...otherProps} />;
    },
    [otherProps],
  );

  return (
    <Controller
      render={renderInput}
      name={name}
      control={control}
      rules={rules}
    />
  );
};

export default ControlledInput;
