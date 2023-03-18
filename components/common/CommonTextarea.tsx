import { Box, Textarea } from '@chakra-ui/react';
import React from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from 'react-hook-form';

type TControl<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  placeholder?: string;
};
function CommonTextarea({ control, name, placeholder }: TControl<any>) {
  const {
    field: { onChange, onBlur, value },
  } = useController({ name, control });
  return (
    <Box borderColor="cyan.800" bgColor="gray.100">
      <Textarea
        color="black"
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
    </Box>
  );
}

export default CommonTextarea;
