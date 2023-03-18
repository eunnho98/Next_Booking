import { roomState } from '@/atom/registerRoom';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import CommonTextarea from '../common/CommonTextarea';
import RegisterFooter from './RegisterFooter';

interface IForm extends FieldValues {
  description: string;
}

function RegisterRoomDescription() {
  const { handleSubmit, control, getValues } = useForm<IForm>();
  const setRoom = useSetRecoilState(roomState);
  const onSubmit = () => {
    setRoom((prev) => {
      return {
        ...prev,
        description: getValues('description'),
      };
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box p="62px 30px 100px" color="myColor.100">
        <Text as="h2" fontSize="24px" fontWeight="800" mb="50px">
          추가로 원하시는게 있나요?
        </Text>
        <Text as="h3" fontWeight="bold" mb="6px">
          Step 7.
        </Text>
        <Text
          as="p"
          fontSize="14px"
          maxW="400px"
          mb="24px"
          wordBreak="keep-all"
        >
          숙소에 원하시거나 문의하시고 싶은 점을 써주세요.
        </Text>

        <Box w="548px" mt="32px">
          <CommonTextarea
            control={control}
            name="description"
            placeholder="원하시는 사항을 입력해주세요"
          />
        </Box>
      </Box>
      <RegisterFooter
        prevLink="/room/register/photo"
        nextLink="/room/register/price"
        isValid={true}
        onSubmit={onSubmit}
      />
    </form>
  );
}

export default RegisterRoomDescription;
