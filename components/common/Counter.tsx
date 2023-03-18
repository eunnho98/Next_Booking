import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';
import { getNumber } from '@/lib/utils';

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  value?: number | string;
  minValue?: number;
  increaseNum?: number;
  onChange?: (value: number) => void;
}

function Counter({
  value,
  control,
  name,
  label,
  minValue = 0,
  increaseNum = 1,
  onChange,
  description,
}: IProps<any>) {
  const { field } = useController({ name, control });

  return (
    <Flex
      direction="row"
      w="100%"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Text fontSize="16px" color="myColor.100" fontWeight="600">
        {label}
        {description && (
          <span
            style={{
              display: 'block',
              fontSize: '14px',
              color: 'gray',
            }}
          >
            {description}
          </span>
        )}
      </Text>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        w="120px"
      >
        <Button
          variant="solid"
          type="button"
          color="black"
          fontWeight="bold"
          size="sm"
          borderRadius="50%"
          outline="none"
          colorScheme="gray"
          isDisabled={value === minValue}
          _disabled={{
            opacity: '0.3',
            cursor: 'not-allowed',
          }}
          onClick={() => {
            console.log('아니', value, minValue);
            if (onChange) {
              if (typeof value === 'number') {
                onChange(value - increaseNum);
              }
              if (typeof value === 'string' && value !== '') {
                onChange(+getNumber(value)! - increaseNum);
              }
            }
          }}
        >
          -
        </Button>
        <Text fontWeight="bold">{value}</Text>
        <Button
          variant="solid"
          color="black"
          fontWeight="bold"
          type="button"
          size="sm"
          borderRadius="50%"
          outline="none"
          colorScheme="gray"
          _disabled={{
            opacity: '0.3',
            cursor: 'not-allowed',
          }}
          onClick={() => {
            if (onChange) {
              if (typeof value === 'number') {
                onChange(value + increaseNum);
              }
              if (typeof value === 'string' && value !== '') {
                onChange(+getNumber(value)! + increaseNum);
              }
            }
          }}
        >
          +
        </Button>
      </Stack>
    </Flex>
  );
}

export default Counter;
