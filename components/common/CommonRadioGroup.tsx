/* eslint-disable no-unused-expressions */
import { WarningIcon } from '@chakra-ui/icons';
import { Box, Text, RadioGroup, Radio, Stack, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
  useController,
} from 'react-hook-form';

interface IProps<I extends FieldValues> {
  control: Control<I>;
  name: FieldPath<I>;
  rules?: Omit<
    RegisterOptions<I>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  label?: string;
  errorMessage?: string;
  options?: { label: string; value: any; description: string }[];
}

function CommonRadioGroup({
  control,
  name,
  rules,
  label,
  errorMessage,
  options,
}: IProps<any>) {
  const { field } = useController({ name, rules, control });
  const [checked, setChecked] = useState(false);

  return (
    <Box>
      <Text fontSize="16px" fontWeight="600" mb="32px">
        {label}
      </Text>
      <RadioGroup
        _after={{
          display: 'block',
          content: '""',
          clear: 'both',
        }}
      >
        {options?.map((option, index) => (
          <Text
            key={index}
            float="left"
            mb="24px"
            fontSize="16px"
            lineHeight="1.2"
            cursor="pointer"
            _last={{
              mb: '0',
            }}
          >
            <Radio
              mr="12px"
              checked={field.value === option.value}
              value={option.value}
              _hover={{
                bgColor: 'gray.300',
              }}
              colorScheme="gray"
              onChange={(e) => {
                field.onChange(e.target.value);
                setChecked(true);
              }}
            />
            <Text as="span">
              {option.label}
              <Text as="p" mt="5px" ml="28px">
                {option.description}
              </Text>
            </Text>
          </Text>
        ))}
      </RadioGroup>
      {!checked && (
        <Stack direction="row" mt="8px" alignItems="center">
          <Icon as={WarningIcon} />
          <Text as="p" fontSize="12px" color="pink.600" fontWeight="extrabold">
            옵션을 선택해주세요.
          </Text>
        </Stack>
      )}
    </Box>
  );
}

export default React.memo(CommonRadioGroup);
