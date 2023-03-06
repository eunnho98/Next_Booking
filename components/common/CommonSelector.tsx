import { Box, Select, Text } from '@chakra-ui/react';
import React from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from 'react-hook-form';

interface IProps<T extends FieldValues>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: Omit<
    RegisterOptions<T>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  icons?: JSX.Element;
  options?: string[];
  disabledOptions?: string[];
  errorMessage?: string;
  placeholder?: string;
  valueProp?: string;
  myChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function CommonSelector({
  icons,
  control,
  name,
  rules,
  options = [],
  disabledOptions = [],
  errorMessage,
  placeholder,
  myChange,
  valueProp,
}: IProps<any>) {
  const {
    field: { onChange },
  } = useController({ name, rules, control });

  let {
    field: { value },
  } = useController({ name, rules, control });

  if (value === '' && valueProp !== '') {
    value = valueProp;
  }
  return (
    <Box width="100%" height="50px">
      <Select
        fontSize="16px"
        cursor="pointer"
        width="100%"
        height="100%"
        borderRadius="4px"
        placeholder={placeholder}
        size="lg"
        value={value || ''}
        onChange={(e) => {
          onChange(e);
          // eslint-disable-next-line no-unused-expressions
          myChange && myChange(e);
        }}
      >
        {disabledOptions.map((option, index) => (
          <option key={index} value={option} disabled>
            {option}
          </option>
        ))}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <Text mt="4px" fontWeight={600} fontSize="xs" color="#d93900">
        {errorMessage}
      </Text>
    </Box>
  );
}

export default CommonSelector;
