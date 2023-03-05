import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Box, Button, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { roomState } from '@/atom/registerRoom';
import Counter from '../common/Counter';
import RegisterRoomBedTypes from './RegisterRoomBedTypes';
import RegisterFooter from './RegisterFooter';

interface IForm extends FieldValues {
  bedroom: string;
  beds: string;
}

function RegisterRoomBedrooms() {
  const [room, setRoom] = useRecoilState(roomState);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<IForm>();

  const onChangeBedroom = (value: number) => {
    let bedList = room.bedList;
    setRoom((prev) => {
      if (value < room.bedList.length) {
        bedList = room.bedList.slice(0, value);
      } else {
        for (let i = bedList.length + 1; i < value + 1; i += 1) {
          bedList.push({ id: i, beds: [] });
        }
      }
      return {
        ...prev,
        // 새로운 배열 반환
        bedList: bedList,
        bedroomCount: value,
      };
    });
  };

  const onSubmit = () => {
    let total = 0;
    room.bedList.forEach((bed) => {
      bed.beds.forEach((b) => {
        total += b.count;
      });
    });
    setRoom((prev) => {
      return {
        ...prev,
        bedCount: total,
      };
    });
  };
  return (
    <form
      onSubmit={() => {
        handleSubmit(onSubmit)();
      }}
    >
      <Box p="62px 30px 100px">
        <Text as="h2" fontSize="24px" fontWeight="800" mb="50px">
          침실 및 침대 개수를 고르세요.
        </Text>
        <Text as="h3" fontWeight="bold" mb="6px" color="gray.700">
          Step 2.
        </Text>
        <Text
          as="p"
          fontSize="14px"
          maxW="400px"
          mb="24px"
          wordBreak="keep-all"
        >
          숙소에 들어간 후 침실 및 침대 개수를 반드시 확인하세요.
        </Text>
        <Box w="320px" mt="24px" mb="32px">
          <Counter
            control={control}
            name="bedroom"
            label="침실 개수"
            value={room.bedroomCount}
            onChange={onChangeBedroom}
          />
        </Box>

        <Text as="h4">침대 유형</Text>
        <Text as="p" mt="6px" mb="20px" maxW="400px" wordBreak="keep-all">
          각 침실에 놓인 침대 유형을 선택하세요.
        </Text>
        <UnorderedList w="548px">
          {room.bedList.map((bedroom) => (
            <RegisterRoomBedTypes bedroom={bedroom} />
          ))}
        </UnorderedList>
      </Box>
      <RegisterFooter
        prevLink="/room/register/building"
        nextLink="/room/register/bathroom"
        onSubmit={onSubmit}
        isValid={true}
      />
    </form>
  );
}

export default RegisterRoomBedrooms;
