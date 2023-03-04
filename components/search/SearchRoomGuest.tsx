import {
  Box,
  Button,
  Icon,
  Input,
  Stack,
  Text,
  useOutsideClick,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { FieldValues, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import Counter from '../common/Counter';
import { guestNum } from '@/atom/registerRoom';

interface IForm extends FieldValues {
  adults: string;
  teenager: string;
  children: string;
}

function SearchRoomGuest() {
  const [userState, setUserState] = useState<any>({});
  const [guest, setGuest] = useRecoilState(guestNum);
  const [opened, setOpened] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<IForm>();

  // 어른 수 변경
  const onChangeAdults = (value: number) => {
    setGuest((prev) => {
      return {
        ...prev,
        adults: value,
      };
    });
  };

  // 청소년 수 변경
  const onChangeTeenager = (value: number) => {
    setGuest((prev) => {
      return {
        ...prev,
        teenager: value,
      };
    });
  };

  // 유아 수 변경
  const onChangeChildren = (value: number) => {
    setGuest((prev) => {
      return {
        ...prev,
        children: value,
      };
    });
  };
  useEffect(() => {
    console.log(guest);
  }, [guest]);

  useEffect(() => {
    const sessionState = JSON.parse(
      sessionStorage.getItem('userSession') as string,
    );
    setUserState(sessionState || {});
  }, []);

  const { isLogged } = userState.user || false;

  return (
    <Box
      position="relative"
      width="100%"
      height="70px"
      _hover={{
        bgColor: 'gray.300',
      }}
      borderRadius="12px"
    >
      <Box
        onClick={() => setOpened(true)}
        position="relative"
        border="2px solid transparent"
      >
        <Box
          position="absolute"
          width="calc(100% - 40px)"
          top="12px"
          left="20px"
        >
          <Text fontSize="xs" fontWeight="bold" mb="4px">
            인원
          </Text>
          <Input
            cursor="pointer"
            w={isLogged ? '70%' : '45%'}
            border="0"
            borderRadius="8px"
            outline="none"
            size="xs"
            placeholder="몇 명이서 가시나요?"
            variant="filled"
            value={`성인 ${guest.adults}명, 어린이 ${guest.teenager}명, 유아${guest.children}명`}
            fontWeight="600"
          />
        </Box>
        <Link href="/room/register/building">
          <Button
            position="absolute"
            isLoading={!isLogged}
            loadingText="로그인하세요."
            size="md"
            top="14px"
            right="10px"
            colorScheme="pink"
            leftIcon={<SearchIcon />}
          >
            검색
          </Button>
        </Link>
      </Box>
      {opened && (
        <Stack
          alignItems="center"
          position="absolute"
          bgColor="white"
          top="78px"
          width="300px"
          p="16px 0"
          boxShadow="0 6px 20px rgba(0,0,0,0.2)"
          borderRadius="32px"
          cursor="default"
          overflow="hidden"
          zIndex="10"
        >
          <Icon
            boxSize={3}
            color="red.400"
            position="absolute"
            right="24px"
            top="8px"
            as={CloseIcon}
            cursor="pointer"
            _hover={{
              boxSize: 3.5,
            }}
            onClick={() => {
              setOpened(false);
              console.log(opened);
            }}
          />

          <Counter
            control={control}
            name="adults"
            label="성인"
            description="만 13세 이상"
            value={guest.adults}
            onChange={onChangeAdults}
          />
          <Box width="250px" height="1px" bgColor="gray.300" />

          <Counter
            control={control}
            name="teenager"
            label="어린이"
            description="만 2 ~ 12세"
            value={guest.teenager}
            onChange={onChangeTeenager}
          />
          <Box width="250px" height="0.5px" bgColor="gray.300" />

          <Counter
            control={control}
            name="adults"
            label="유아"
            description="만 2세 미만"
            value={guest.children}
            onChange={onChangeChildren}
          />
        </Stack>
      )}
    </Box>
  );
}

export default SearchRoomGuest;
