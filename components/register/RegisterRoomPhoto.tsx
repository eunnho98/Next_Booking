import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { uploadFileAPI } from '@/lib/api/file';

function RegisterRoomPhoto() {
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    // lenght > 0 을 주어 파일 선택 후 취소 시 처리
    if (files && files.length > 0) {
      console.log('files', files);
      const file = files[0];
      const formdata = new FormData();
      formdata.append('file', file);
      try {
        await uploadFileAPI(formdata);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <Box p="62px 30px 100px">
      <Text as="h2" fontSize="24px" fontWeight="800" mb="50px">
        숙소 사진
      </Text>
      <Text as="h3" fontWeight="bold" mb="6px" color="gray.700">
        Step 6.
      </Text>
      <Text as="p" fontSize="14px" maxW="400px" mb="24px" wordBreak="keep-all">
        사진을 보고 숙소의 느낌이 어떤지 간접적으로 느껴보세요.
      </Text>
      <Flex
        w="858px"
        h="433px"
        m="auto"
        position="relative"
        justifyContent="center"
        alignItems="center"
        border="2px dashed gray"
        borderRadius="6px"
      >
        <>
          <Input
            w="100%"
            h="100%"
            position="absolute"
            opacity="0"
            cursor="pointer"
            type="file"
            accept="image/*"
            onChange={uploadImage}
          />
          <Button colorScheme="pink" w="167px">
            사진 업로드
          </Button>
        </>
      </Flex>
    </Box>
  );
}

export default RegisterRoomPhoto;
