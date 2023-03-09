import { Checkbox, CheckboxGroup, Stack, Text } from '@chakra-ui/react';
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
  options: string[];
  myChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CommonCheckBox({ control, name, options, myChange }: IProps<any>) {
  const { field } = useController({ name, control });
  const [value, setValue] = useState(field.value || []);

  return (
    <CheckboxGroup colorScheme="gray">
      <Stack direction="column" spacing={5}>
        {options.map((option, idx) => (
          <Stack direction="row">
            <Checkbox
              mr="12px"
              size="lg"
              key={idx}
              onChange={(e) => {
                const valCopy = [...value];

                // checkBox update
                valCopy[idx] = e.target.checked ? e.target.value : null;
                field.onChange(valCopy);
                setValue(valCopy);
              }}
              checked={value.includes(option)}
              value={option}
            />
            <Text as="span" fontWeight="bold">
              {option}
            </Text>
          </Stack>
        ))}
      </Stack>
    </CheckboxGroup>
  );
}

export default CommonCheckBox;
