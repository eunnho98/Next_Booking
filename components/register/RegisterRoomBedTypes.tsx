import { BedType } from '@/lib/type';
import { Box, Button, ListItem, Stack, Text } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import CommonSelector from '../common/CommonSelector';

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

  const { handleSubmit, control } = useForm();

  // 총 침대 개수
  const totalBedsCount = useMemo(() => {
    let total = 0;
    bedroom.beds.forEach((bed) => {
      total += bed.count;
    });
    return total;
  }, [bedroom]);
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
          <CommonSelector
            control={control}
            name="bed"
            placeholder="선택해주세요."
            options={['gsg']}
          />
        </Box>
      )}
    </ListItem>
  );
}

export default RegisterRoomBedTypes;
