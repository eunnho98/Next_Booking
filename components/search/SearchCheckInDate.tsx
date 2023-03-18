import { Box, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useRecoilState } from 'recoil';
import DatePicker from '../common/DatePicker';
import { dateState } from '@/atom/atom';

function SearchCheckInDate() {
  const [startDate, setStartDate] = useState('');
  const endDate = '';
  const [date, setDate] = useRecoilState(dateState);
  useEffect(() => {
    console.log(date);
  }, [date]);
  return (
    <Box
      position="relative"
      width="100%"
      height="200px"
      border="2px solid transparent"
      borderRadius="12px"
      _hover={{
        bgColor: 'myColor.300',
      }}
    >
      <Box position="absolute" width="calc(100% - 40px)" top="12px" left="20px">
        <Text fontSize="xs" fontWeight="bold" mb="4px">
          체크인
        </Text>
        <DatePicker
          selected={startDate}
          onChange={(update) => {
            setStartDate(update);
            const momentDate = moment(update).format();
            const words = momentDate.split('T')[0];
            setDate({
              checkIn: words,
              checkOut: date.checkOut,
            });
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="날짜 추가"
          customInput={
            <Input
              color="black"
              cursor="pointer"
              w="100%"
              border="0"
              borderRadius="8px"
              outline="none"
              size="xs"
              variant="filled"
              fontWeight="700"
            />
          }
        />
      </Box>
    </Box>
  );
}

export default SearchCheckInDate;
