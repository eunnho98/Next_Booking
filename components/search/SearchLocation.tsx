import {
  Box,
  Input,
  ListItem,
  Text,
  UnorderedList,
  useOutsideClick,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

function SearchLocation() {
  const [opened, setOpened] = useState(false);
  const ref = useRef();
  useOutsideClick({
    ref,
    handler: () => setOpened(false),
  });
  return (
    <Box
      onClick={() => setOpened(true)}
      position="relative"
      width="100%"
      height="70px"
      border="2px solid transparent"
      borderRadius="12px"
      cursor="pointer"
      _hover={{
        bgColor: 'gray.300',
      }}
    >
      <Box position="absolute" width="calc(100% - 40px)" top="12px" left="20px">
        <Text fontSize="xs" fontWeight="bold" mb="4px">
          여행지
        </Text>
        <Input
          w="100%"
          border="0"
          borderRadius="8px"
          outline="none"
          size="xs"
          placeholder="어디로 가시나요?"
          variant="filled"
        />
      </Box>
      {opened && (
        <UnorderedList
          ref={ref}
          position="absolute"
          bgColor="white"
          top="78px"
          width="500px"
          p="16px 0"
          boxShadow="0 6px 20px rgba(0,0,0,0.2)"
          borderRadius="32px"
          cursor="default"
          overflow="hidden"
          zIndex="10"
        >
          <ListItem
            display="flex"
            alignItems="center"
            height="64px"
            p="8px 32px"
            cursor="pointer"
          >
            근처 추천 장소
          </ListItem>
        </UnorderedList>
      )}
    </Box>
  );
}

export default SearchLocation;
