import { getLocationInfoAPI } from '@/lib/api/map';
import { countryList } from '@/lib/staticData';
import { BellIcon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import CommonSelector from '../common/CommonSelector';

interface IForm extends FieldValues {
  country: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

function RegisterRoomLocation() {
  const onSuccessGetLocation = async ({ coords }: { coords: Coordinates }) => {
    try {
      await getLocationInfoAPI({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onClickCurrentLocation = () => {
    // getCurrentPosition(성공 시 콜백, 실패 시 콜백)
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      console.log('failed');
    });
  };

  const { handleSubmit, control } = useForm<IForm>();
  return (
    <Box p="62px 30px 100px">
      <Text as="h2" fontSize="24px" fontWeight="800" mb="50px">
        어디서 묵으실 건가요?
      </Text>
      <Text as="h3" fontWeight="bold" mb="6px" color="gray.700">
        Step 4.
      </Text>
      <Text as="p" fontSize="14px" maxW="400px" mb="24px" wordBreak="keep-all">
        설정한 옵션과 유사한 근처 숙소를 소개해드립니다.
      </Text>
      <Box w="176px" mb="24px">
        <Button
          colorScheme="pink"
          variant="solid"
          leftIcon={<BellIcon />}
          onClick={onClickCurrentLocation}
        >
          현재 위치 사용
        </Button>
      </Box>
      <Box w="385px" mb="24px">
        <CommonSelector
          placeholder="국가/지역 선택"
          control={control}
          name="country"
          options={countryList}
        />
      </Box>
    </Box>
  );
}

export default RegisterRoomLocation;
