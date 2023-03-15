import { dateState } from '@/atom/atom';
import { guestNum, roomState } from '@/atom/registerRoom';
import { RequestPayParams, RequestPayResponse } from '@/lib/type';
import {
  Box,
  Button,
  Card,
  CardBody,
  Text,
  Image,
  Heading,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import PurchaseModal from '../PurchaseModal';
import UpdateModal from '../UpdateModal';
import RegisterFooter from './RegisterFooter';

export type RequestPayResponseCallback = (response: RequestPayResponse) => void;

export interface Iamport {
  init: (accountID: string) => void;
  request_pay: (
    params: RequestPayParams,
    callback?: RequestPayResponseCallback,
  ) => void;
}

declare global {
  interface Window {
    IMP?: Iamport;
  }
}
function RoomRegisterPrice() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onSubmit = () => {
    onOpen();
  };
  const room = useRecoilValue(roomState);
  const date = useRecoilValue(dateState);
  const guest = useRecoilValue(guestNum);
  const diffMSec =
    new Date(date.checkOut).getTime() - new Date(date.checkIn).getTime();
  const diffDate = diffMSec / (24 * 60 * 60 * 1000);
  const location =
    room.country +
    ' ' +
    room.city +
    ' ' +
    room.district +
    ' ' +
    room.political +
    ' ' +
    room.streetAddress +
    ' ' +
    room.postcode;

  return (
    <form>
      <Box p="62px 30px 100px">
        <Text as="h2" fontSize="24px" fontWeight="800" mb="50px">
          결제하기
        </Text>
        <Text as="h3" fontWeight="bold" mb="6px" color="gray.700">
          Step 7.
        </Text>
        <Text
          as="p"
          fontSize="14px"
          maxW="400px"
          mb="24px"
          wordBreak="keep-all"
        >
          선택하신 숙소의 정보입니다.
          <br />
          성인 인당 5만원, 청소년 인당 3만원, 어린이 인당 1만원입니다.
          <br />
          1박당 5만원이 부과됩니다.
        </Text>
        <Card maxW="md">
          <CardBody position="relative">
            <Image w="100%" h="300px" src={room.roomImage} borderRadius="lg" />

            <Heading size="sm" mt="16px">
              방 유형
            </Heading>
            <Text>
              {room.largeBuildingType}, {room.buildingType}
            </Text>
            <Heading size="sm" mt="8px">
              위치
            </Heading>
            <Text>{location}</Text>
            <Heading size="sm" mt="8px">
              방 개수
            </Heading>
            <Text>{room.bedroomCount}개</Text>
            <Heading size="sm" mt="8px">
              침대 개수 및 유형
            </Heading>
            {room.bedList.map((bedroom) => (
              <>
                <Text as="span" key={bedroom.id}>
                  {bedroom.id}번방:{' '}
                </Text>
                {bedroom.beds.map((detail, index) => (
                  <Text as="span" key={index}>
                    {detail.type} {detail.count}개{' '}
                  </Text>
                ))}
                <br />
              </>
            ))}
            <Heading size="sm" mt="8px">
              편의시설
            </Heading>
            {room.amentities.map((amen) => (
              <Text as="span">{amen} </Text>
            ))}
            <Heading size="sm" mt="8px">
              숙박 기간
            </Heading>
            <Text>
              {date.checkIn} ~ {date.checkOut}
            </Text>
            <Heading size="sm" mt="8px">
              숙박 인원
            </Heading>
            <Text>
              성인 {guest.adults}명, 청소년 {guest.teenager}명, 어린이{' '}
              {guest.children}명
            </Text>
          </CardBody>
        </Card>
      </Box>
      {/* <Button
        onClick={() => {
          handlePayment();
          console.log('sdks?');
        }}
      >
        결제
      </Button> */}
      <RegisterFooter
        prevLink="/room/register/description"
        onSubmit={onSubmit}
        isValid={true}
      />
      <PurchaseModal isOpen={isOpen} onClose={onClose} diffDate={diffDate} />
    </form>
  );
}

export default RoomRegisterPrice;
