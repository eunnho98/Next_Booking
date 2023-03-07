import { roomState } from '@/atom/registerRoom';
import { getLocationInfoAPI } from '@/lib/api/map';
import { countryList } from '@/lib/staticData';
import { BellIcon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import CommonInput from '../common/CommonInput';
import CommonSelector from '../common/CommonSelector';
import Email from '../svg/Email';
import Location from '../svg/Location';
import RegisterFooter from './RegisterFooter';

interface IForm extends FieldValues {
  country: string;
  city: string;
  district: string;
  political: string;
  postcode: string;
  streetAddress: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

function RegisterRoomLocation() {
  const [location, setLocation] = useRecoilState(roomState);
  const [loading, setLoading] = useState(false);
  // 단일 false로 하면 한 Input 수정 시 모든 Input이 지워짐
  const [useCurLocation, setUseCurLocation] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (
      location.city === '' ||
      location.country === '' ||
      location.district === '' ||
      location.political === '' ||
      location.postcode === ''
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [location, valid]);

  const onSuccessGetLocation = async ({ coords }: { coords: Coordinates }) => {
    try {
      const { data } = await getLocationInfoAPI({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      setLocation((prev) => {
        return {
          ...prev,
          city: data.city,
          country: data.country,
          district: data.district,
          latitude: data.latitude,
          longitude: data.longitude,
          postcode: data.postcode,
          streetAddress: data.streetAddress,
          political: data.political,
        };
      });
      setLoading(false);
      setUseCurLocation([true, true, true, true, true, true]);
      console.log(location);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickCurrentLocation = () => {
    setLoading(true);
    // getCurrentPosition(성공 시 콜백, 실패 시 콜백)
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      console.log('failed');
    });
  };

  const { handleSubmit, control, watch } = useForm<IForm>({
    defaultValues: {
      country: location.country,
      city: location.city,
      district: location.district,
      political: location.political,
      postcode: location.postcode,
      streetAddress: location.streetAddress,
    },
  });

  const onSubmit = () => {};

  console.log(watch());
  return (
    <form
      onSubmit={() => {
        handleSubmit(onSubmit)();
      }}
    >
      <Box p="62px 30px 100px">
        <Text as="h2" fontSize="24px" fontWeight="800" mb="50px">
          어디서 묵으실 건가요?
        </Text>
        <Text as="h3" fontWeight="bold" mb="6px" color="gray.700">
          Step 4-1.
        </Text>
        <Text
          as="p"
          fontSize="14px"
          maxW="400px"
          mb="24px"
          wordBreak="keep-all"
        >
          설정한 옵션과 유사한 근처 숙소를 소개해드립니다.
        </Text>
        <Box w="176px" mb="24px">
          <Button
            colorScheme="pink"
            variant="solid"
            leftIcon={<BellIcon />}
            onClick={onClickCurrentLocation}
            isLoading={loading}
          >
            {loading ? '불러오는 중...' : '현재 위치 사용'}
          </Button>
        </Box>

        <Box w="385px" mb="24px">
          <CommonSelector
            // Country Select
            placeholder="국가/지역 선택"
            control={control}
            name="country"
            options={countryList}
            valueProp={useCurLocation[0] ? location.country : ''}
            myChange={(e) => {
              const copyUseCurLocation = [...useCurLocation];
              copyUseCurLocation[0] = false;
              setUseCurLocation(copyUseCurLocation);
              setLocation((prev) => {
                return {
                  ...prev,
                  country: e.target.value,
                };
              });
            }}
          />

          <CommonInput
            // 도 선택
            icons={<Location />}
            control={control}
            name="city"
            type="text"
            placeholder="도"
            // * 현재 위치 사용을 클릭하면 자동으로 채워지도록
            valueProp={useCurLocation[1] ? location.city : ''}
            // * input을 바꾸면 현재 위치 사용을 false로 하여 사용자의 입력을 받도록
            myChange={(e) => {
              const copyUseCurLocation = [...useCurLocation];
              copyUseCurLocation[1] = false;
              setUseCurLocation(copyUseCurLocation);
              setLocation((prev) => {
                return {
                  ...prev,
                  city: e.target.value,
                };
              });
            }}
          />

          <Box w="100%" h="8px" />

          <CommonInput
            // 시 선택
            icons={<Location />}
            control={control}
            name="district"
            type="text"
            placeholder="시"
            // * 현재 위치 사용을 클릭하면 자동으로 채워지도록
            valueProp={useCurLocation[2] ? location.district : ''}
            // * input을 바꾸면 현재 위치 사용을 false로 하여 사용자의 입력을 받도록
            myChange={(e) => {
              const copyUseCurLocation = [...useCurLocation];
              copyUseCurLocation[2] = false;
              setUseCurLocation(copyUseCurLocation);
              setLocation((prev) => {
                return {
                  ...prev,
                  district: e.target.value,
                };
              });
            }}
          />

          <Box w="100%" h="8px" />

          <CommonInput
            // 구 선택
            icons={<Location />}
            control={control}
            name="political"
            type="text"
            placeholder="구"
            // * 현재 위치 사용을 클릭하면 자동으로 채워지도록
            valueProp={useCurLocation[3] ? location.political : ''}
            // * input을 바꾸면 현재 위치 사용을 false로 하여 사용자의 입력을 받도록
            myChange={(e) => {
              const copyUseCurLocation = [...useCurLocation];
              copyUseCurLocation[3] = false;
              setUseCurLocation(copyUseCurLocation);
              setLocation((prev) => {
                return {
                  ...prev,
                  political: e.target.value,
                };
              });
            }}
          />

          <Box w="100%" h="8px" />

          <CommonInput
            // 도로명주소
            icons={<Location />}
            control={control}
            name="streetAddress"
            type="text"
            placeholder="도로명주소"
            // * 현재 위치 사용을 클릭하면 자동으로 채워지도록
            valueProp={useCurLocation[4] ? location.streetAddress : ''}
            // * input을 바꾸면 현재 위치 사용을 false로 하여 사용자의 입력을 받도록
            myChange={(e) => {
              const copyUseCurLocation = [...useCurLocation];
              copyUseCurLocation[4] = false;
              setUseCurLocation(copyUseCurLocation);
              setLocation((prev) => {
                return {
                  ...prev,
                  streetAddress: e.target.value,
                };
              });
            }}
          />

          <Box w="100%" h="8px" />

          <CommonInput
            // 우편번호
            icons={<Email />}
            control={control}
            name="postcode"
            type="text"
            placeholder="우편번호"
            // * 현재 위치 사용을 클릭하면 자동으로 채워지도록
            valueProp={useCurLocation[5] ? location.postcode : ''}
            // * input을 바꾸면 현재 위치 사용을 false로 하여 사용자의 입력을 받도록
            myChange={(e) => {
              const copyUseCurLocation = [...useCurLocation];
              copyUseCurLocation[5] = false;
              setUseCurLocation(copyUseCurLocation);
              setLocation((prev) => {
                return {
                  ...prev,
                  postcode: e.target.value,
                };
              });
            }}
          />
        </Box>
        <RegisterFooter
          prevLink="/room/register/bathroom"
          nextLink="/room/register/geometry"
          onSubmit={onSubmit}
          isValid={valid}
        />
        <Text as="p" fontSize="14px">
          현재 특별시 및 광역시는 현재 위치 불러오기가 불가능합니다.
        </Text>
      </Box>
    </form>
  );
}

export default RegisterRoomLocation;
