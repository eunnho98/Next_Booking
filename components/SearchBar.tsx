import { Flex, Stack, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import SearchCheckInDate from './search/SearchCheckInDate';
import SearchCheckOutDate from './search/SearchCheckOutDate';
import SearchLocation from './search/SearchLocation';
import SearchRoomGuest from './search/SearchRoomGuest';

function SearchBar() {
  const [dateRange, setDateRange] = useState(['', '']);
  const [startDate, endDate] = dateRange;
  return (
    <Flex
      width="100%"
      height="70px"
      boxShadow="0px 4px 8px rgba(0,0,0,0.08)"
      borderRadius="12px"
    >
      <Stack alignItems="center" width="100%" direction="row">
        <SearchLocation />
        <Box width="1px" height="44px" bgColor="gray.300" />
        <SearchCheckInDate />
        <Box width="1px" height="44px" bgColor="gray.300" />
        <SearchCheckOutDate />
        <Box width="1px" height="44px" bgColor="gray.300" />
        <SearchRoomGuest />
      </Stack>
    </Flex>
  );
}

export default SearchBar;
