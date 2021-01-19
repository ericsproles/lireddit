import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  textarea,
  ...props
}) => {
  let InputOrTextarea = Input;

  if (textarea) {
    InputOrTextarea = Textarea;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor="name">{label}</FormLabel>
      <InputOrTextarea {...field} {...props} id={field.name} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
    // <FormControl isInvalid={!!error}>
    //   {textarea ? (
    //     <>
    //       <FormLabel htmlFor="name">{label}</FormLabel>
    //       <Textarea {...field} {...props} id={field.name} />
    //       <FormErrorMessage>{error}</FormErrorMessage>
    //     </>
    //   ) : (
    //     <>
    //       <FormLabel htmlFor="name">{label}</FormLabel>
    //       <Input {...field} {...props} id={field.name} />
    //       <FormErrorMessage>{error}</FormErrorMessage>
    //     </>
    //   )}
    // </FormControl>
  );
};
