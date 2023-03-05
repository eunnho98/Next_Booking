import { bedTypes } from '@/lib/staticData';
import { BedType } from '@/lib/type';
import { Box, Button, ListItem, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import CommonSelector from '../common/CommonSelector';
import Counter from '../common/Counter';
import { roomState } from '../../atom/registerRoom';

interface IProps {
  bedroom: {
    id: number;
    beds: {
      type: BedType;
      count: number;
    }[];
  };
}

function RegisterRoomBedTypes({ bedroom }: IProps) {
  const [opened, setOpened] = useState(false);
  const [newBedList, setNewBedList] = useRecoilState(roomState);
  const { handleSubmit, control } = useForm();

  // 선택 침대 옵션
  const [activatedBed, setActivatedBed] = useState<BedType[]>([]);

  // 남은 침대 옵션
  const lastBed = useMemo(() => {
    return bedTypes.filter((bedType) => !activatedBed.includes(bedType));
  }, [bedroom, activatedBed]);

  // 총 침대 개수
  const totalBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });

    return total;
  }, [bedroom.beds]);

  useEffect(() => {
    console.log(newBedList);
  }, [newBedList]);
  return (
    <ListItem
      w="100%"
      p="28px 0"
      borderTop="1px solid lightgray"
      _last={{
        borderBottom: '1px solid lightgray',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box mb="28px">
          <Text as="p" fontSize="19px" color="gray.700">
            {bedroom.id}번 침실
          </Text>
          <Text as="p" fontSize="15px">
            침대 {totalBedsCount}개
          </Text>
        </Box>
        <Button
          onClick={() => setOpened((prev) => !prev)}
          colorScheme="gray"
          variant="outline"
        >
          {opened && '완료'}
          {!opened &&
            (totalBedsCount === 0 ? '침대 추가하기' : '침대 수정하기')}
        </Button>
      </Stack>
      {opened && (
        <Box w="320px">
          <Box w="100%" mt="28px">
            {activatedBed.map((type) => (
              <Box w="290px" mb="18px">
                <Counter
                  control={control}
                  name="bedType"
                  label={type}
                  value={
                    bedroom.beds.find((bed) => bed.type === type)?.count || 0
                  }
                  key={type}
                  // ! Need Refactoring
                  onChange={(value: number) => {
                    const nBL = [...newBedList.bedList];
                    const newBeds = [...bedroom.beds];
                    const idx = newBeds.findIndex((bed) => bed.type === type);
                    if (idx === -1) {
                      newBeds.push({ type: type, count: value });
                    } else {
                      newBeds[idx].count = value;
                    }

                    const bedIdx = nBL.findIndex(
                      (bed) => bed.id === bedroom.id,
                    );
                    nBL[bedIdx].beds = newBeds;
                    setNewBedList((prev) => {
                      return {
                        ...prev,
                        bedList: nBL,
                      };
                    });
                  }}
                />
              </Box>
            ))}
          </Box>
          <CommonSelector
            control={control}
            name="bed"
            placeholder="선택해주세요."
            options={lastBed}
            myChange={(e) => {
              setActivatedBed([...activatedBed, e.target.value as BedType]);
            }}
          />
        </Box>
      )}
    </ListItem>
  );
}

export default RegisterRoomBedTypes;
