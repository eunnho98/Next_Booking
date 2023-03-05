import { roomState } from '@/atom/registerRoom';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  Image,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import Counter from '../common/Counter';
import RegisterFooter from './RegisterFooter';

interface IForm extends FieldValues {
  bath: string;
}

function RegisterBathroom() {
  const { handleSubmit, control } = useForm<IForm>();
  const [room, setRoom] = useRecoilState(roomState);
  const [valid, setValid] = useState(false);

  const onSubmit = () => {};

  const onChangeBathroom = (value: number) => {
    setRoom((prev) => {
      return {
        ...prev,
        bathroomCount: value,
      };
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box p="62px 30px 50px">
        <Text as="h2" fontSize="24px" fontWeight="800" mb="50px">
          욕실 수를 정해주세요.
        </Text>
        <Text as="h3" fontWeight="bold" mb="6px" color="gray.700">
          Step 3.
        </Text>
        <Text as="p" fontSize="14px" maxWidth="400px" mb="24px">
          샤워실 또는 욕조가 없는 욕실은 0.5개, 포함된 욕실은 1개로 간주합니다.
        </Text>
        <Box w="320px" mt="24px" mb="32px">
          <Counter
            control={control}
            name="bath"
            label="욕실 개수"
            value={room.bathroomCount}
            increaseNum={0.5}
            onChange={(value) => {
              onChangeBathroom(value);
              if (value === 0) {
                setValid(false);
              } else {
                setValid(true);
              }
            }}
          />
        </Box>
        <Card
          maxWidth="300px"
          height="380px"
          minWidth="xs"
          boxShadow="0px 4px 8px rgba(0,0,0,0.1)"
        >
          <CardHeader>
            <Heading size="md" textAlign="center">
              욕실
            </Heading>
          </CardHeader>
          <CardBody display="flex" justifyContent="center">
            <Image src="/home/bathroom.jpg" borderRadius="lg" />
          </CardBody>

          <CardFooter bottom="30px" display="flex" justifyContent="center">
            <Text fontSize="14px" color="gray.600">
              사진과 다를 수 있습니다.
            </Text>
          </CardFooter>
        </Card>
      </Box>

      <RegisterFooter
        prevLink="/room/register/bedrooms"
        nextLink="/room/register/location"
        onSubmit={onSubmit}
        isValid={valid}
      />
    </form>
  );
}

export default RegisterBathroom;
