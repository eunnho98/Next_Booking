import { Box } from '@chakra-ui/react';
import React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import ko from 'date-fns/locale/ko';

function DatePicker({ ...props }: ReactDatePickerProps) {
  return (
    <Box width="100%" height="100%">
      <ReactDatePicker
        {...props}
        disabledKeyboardNavigation
        locale={ko}
        dateFormat="MM월 dd일"
      />
    </Box>
  );
}

export default DatePicker;
