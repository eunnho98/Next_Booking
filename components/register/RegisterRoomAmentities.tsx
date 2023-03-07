import { roomState } from '@/atom/registerRoom';
import { convinienceList } from '@/lib/staticData';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import CommonCheckBox from '../common/CommonCheckBox';

interface IForm extends FieldValues {
  conveniences: string;
}
function RegisterRoomAmentities() {
  const [room, setRoom] = useRecoilState(roomState);
  const { handleSubmit, control, watch } = useForm<IForm>();
  console.log(watch());
  return (
    <Box p="62px 30px 100px">
      <Text as="h2" fontSize="24px" fontWeight="800" mb="50px">
        편의 시설을 선택해주세요.
      </Text>
      <Text as="h3" fontWeight="bold" mb="6px" color="gray.700">
        Step 5.
      </Text>
      <Text as="p" fontSize="14px" maxW="400px" mb="24px" wordBreak="keep-all">
        묵을 숙소의 편의 시설들을 선택해주세요.
      </Text>

      <CommonCheckBox
        control={control}
        name="conveniences"
        options={convinienceList}
      />
    </Box>
  );
}

export default RegisterRoomAmentities;
