import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
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
  rules?: Omit<
    RegisterOptions<T>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  icons?: JSX.Element;
  placeholder?: string;
  type: string;
  errorMessage?: string;
  valueProp?: string;
  myChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function CommonInput({
  icons,
  control,
  name,
  rules,
  placeholder,
  type,
  errorMessage,
  valueProp,
  myChange,
}: TControl<any>) {
  const {
    field: { onChange, onBlur },
  } = useController({ name, rules, control });
  const [isError, setIsError] = useState(true);
  let {
    field: { value },
  } = useController({ name, rules, control });

  // * valueProp이 넘어오면 value를 사용자의 입력이 아닌 기본 세팅된 입력을 받도록함
  if (value === '' && valueProp !== '') {
    value = valueProp;
  }
  useEffect(() => {
    if (errorMessage === undefined) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  }, [errorMessage]);
  return (
    <>
      <Box borderColor="cyan.800" bgColor="gray.100">
        <InputGroup>
          <InputLeftAddon h="50px" children={icons} outline="none" />
          <Input
            type={type}
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => {
              onChange(e);
              myChange && myChange(e);
            }}
            onBlur={onBlur}
            position="relative"
            width="100%"
            height="50px"
            border="1px solid gray.500"
            borderRadius="4px"
            p={icons ? '0 44px 0 11px' : '0 11px'}
            textDecorationLine={isError ? 'underline' : 'none'}
            textDecorationStyle={isError ? 'dotted' : 'none'}
            textDecorationColor="red"
            fontSize="16px"
            outline="none"
          />
        </InputGroup>
      </Box>

      <Text mb="4px" fontWeight={600} fontSize="xs" color="#d93900">
        {errorMessage}
      </Text>
    </>
  );
}

export default CommonInput;
