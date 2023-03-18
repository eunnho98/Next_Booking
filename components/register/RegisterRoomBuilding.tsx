/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable no-case-declarations */
import { Box, FormControl, FormLabel, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import CommonSelector from '../common/CommonSelector';
import CommonRadioGroup from '../common/CommonRadioGroup';
import { RegisterRoomState, roomState } from '@/atom/registerRoom';
import { largeBulidingTypeList, roomTypeRadioOptions } from '@/lib/staticData';
import RegisterFooter from './RegisterFooter';

interface IForm extends FieldValues {
  largeBuildingType: string;
  buildingType: string;
  radioType: string;
}

function RegisterRoomBuilding() {
  const [largeRoom, setLargeRoom] = useRecoilState(roomState);
  const [isValid, setIsValid] = useState(false);
  const [iv, setIv] = useState([false, false, false]);
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<IForm>();

  const largeBuildingType = watch('largeBuildingType');
  const buildingType = watch('buildingType');

  const radioValid = largeBuildingType && buildingType;

  console.log(watch());
  useEffect(() => {
    setIsValid(!iv.includes(false));
    console.log('iv', iv);
  }, [isValid, iv]);

  const onSubmit = (data: IForm) => {
    const newRoom: RegisterRoomState = { ...largeRoom };
    newRoom.largeBuildingType = watch('largeBuildingType');
    newRoom.buildingType = watch('buildingType');
    newRoom.roomType = watch('radioType');
    setLargeRoom(newRoom);
  };
  const getDetailOption = (): string[] => {
    switch (watch('largeBuildingType')) {
      case '아파트':
        const { apartmentBuildingTypeList } = require('../../lib/staticData');
        return apartmentBuildingTypeList;
      case '주택':
        const { houseBuildingTypeList } = require('../../lib/staticData');
        return houseBuildingTypeList;
      case '별채':
        const {
          secondaryUnitBuildingTypeList,
        } = require('../../lib/staticData');
        return secondaryUnitBuildingTypeList;

      case 'B&B':
        const { bnbBuildingTypeList } = require('../../lib/staticData');
        console.log(bnbBuildingTypeList);
        return bnbBuildingTypeList;

      case '호텔':
        const { hotelBuildingTypeList } = require('../../lib/staticData');
        console.log(hotelBuildingTypeList);
        return hotelBuildingTypeList;

      default:
        return [];
    }
  };

  return (
    <form
      onSubmit={() => {
        handleSubmit(onSubmit)();
      }}
    >
      <Box p="62px 30px 100px" color="myColor.100">
        <Text as="h2" fontSize="24px" fontWeight="800" mb="50px">
          등록할 숙소 종류는 무엇인가요?
        </Text>
        <Text as="h3" fontWeight="bold" mb="6px">
          Step 1.
        </Text>

        <FormControl w="320px" mb="40px">
          <FormLabel>우선 범위를 좁혀볼까요?</FormLabel>
          <CommonSelector
            name="largeBuildingType"
            rules={{ required: '하나를 선택하세요.' }}
            control={control}
            options={largeBulidingTypeList}
            errorMessage={errors.largeBuildingType?.message as string}
            placeholder="선택해주세요."
            myChange={(e) => {
              if (e.target.value !== '') {
                const newValid = [...iv];
                newValid[0] = true;
                setIv(newValid);
              } else {
                const newValid = [...iv];
                newValid[0] = false;
                setIv(newValid);
              }
            }}
          />
        </FormControl>
        <FormControl w="320px" mb="40px">
          <FormLabel>건물 유형을 선택하세요.</FormLabel>
          <CommonSelector
            name="buildingType"
            rules={{ required: '하나를 선택하세요.' }}
            control={control}
            options={getDetailOption()}
            errorMessage={errors.buildingType?.message as string}
            placeholder="선택해주세요."
            myChange={(e) => {
              if (e.target.value !== '') {
                const newValid = [...iv];
                newValid[1] = true;
                setIv(newValid);
              } else {
                const newValid = [...iv];
                newValid[1] = false;
                setIv(newValid);
              }
            }}
          />
        </FormControl>
        {radioValid && (
          <Box
            maxWidth="485px"
            mb="50px"
            onChange={() => {
              const newValid = [...iv];
              newValid[2] = true;
              setIv(newValid);
            }}
          >
            <CommonRadioGroup
              name="radioType"
              control={control}
              label="숙소 유형을 선택해주세요."
              options={roomTypeRadioOptions}
            />
          </Box>
        )}
      </Box>
      <RegisterFooter
        prevLink="/home"
        nextLink="/room/register/bedrooms"
        onSubmit={onSubmit}
        isValid={isValid}
      />
    </form>
  );
}

export default RegisterRoomBuilding;
