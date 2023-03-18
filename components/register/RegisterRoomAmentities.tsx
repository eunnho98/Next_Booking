import { roomState } from '@/atom/registerRoom';
import { convinienceList } from '@/lib/staticData';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import CommonCheckBox from '../common/CommonCheckBox';
import RegisterFooter from './RegisterFooter';

interface IForm extends FieldValues {
  conveniences: string;
}
function RegisterRoomAmentities() {
  const [room, setRoom] = useRecoilState(roomState);
  const { handleSubmit, control, watch, getValues } = useForm<IForm>();
  console.log(watch());
  const onSubmit = () => {
    const amentities = getValues('conveniences') as unknown as string[];
    const newArr = amentities.filter((ele) => {
      return ele != null;
    });

    setRoom((prev) => {
      return {
        ...prev,
        amentities: newArr,
      };
    });
  };
  return (
    <form
      onSubmit={() => {
        handleSubmit(onSubmit)();
      }}
    >
      <Box p="62px 30px 100px" color="myColor.100">
        <Text as="h2" fontSize="24px" fontWeight="800" mb="50px">
          편의 시설을 선택해주세요.
        </Text>
        <Text as="h3" fontWeight="bold" mb="6px">
          Step 5.
        </Text>
        <Text
          as="p"
          fontSize="14px"
          maxW="400px"
          mb="42px"
          wordBreak="keep-all"
        >
          묵을 숙소의 편의 시설들을 선택해주세요.
        </Text>

        <CommonCheckBox
          control={control}
          name="conveniences"
          options={convinienceList}
        />
      </Box>
      <RegisterFooter
        prevLink="/room/reigster/geometry"
        nextLink="/room/register/photo"
        onSubmit={onSubmit}
        isValid={true}
      />
    </form>
  );
}

export default RegisterRoomAmentities;
