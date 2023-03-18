import { initialState } from '@/atom/atom';
import dynamic from 'next/dynamic';
import { getMeAPI } from '@/lib/api/update';
import { BedType, RequestPayParams, RequestPayResponse } from '@/lib/type';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const PurchaseModal = dynamic(() => import('@/components/PurchaseModal'), {
  ssr: false,
});
interface IRoom {
  id: number;
  userId: number;
  largeBuildingType: string;
  buildingType: string;
  roomType: string;
  bedroomCount: number;
  bedCount: number;
  bedList?: { id: number; beds: { type: BedType; count: number }[] }[];
  bathroomCount: number;
  country: string;
  city: string;
  district: string;
  political: string;
  streetAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
  amentities?: any;
  roomImage: string;
  description?: string;
  price: number;
  checkIn: string;
  checkOut: string;
  adults: number;
  teenager: number;
  children: number;
  purchase: boolean;
}

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

function mypage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userState = useRecoilValue(initialState);
  const [data, setData] = useState<any>({});
  const [room, setRoom] = useState<IRoom[]>([]);
  const diffMSec =
    new Date(room[0]?.checkOut).getTime() -
    new Date(room[0]?.checkIn).getTime();
  const diffDate = diffMSec / (24 * 60 * 60 * 1000);
  const location =
    room[0]?.country +
    ' ' +
    room[0]?.city +
    ' ' +
    room[0]?.district +
    ' ' +
    room[0]?.political +
    ' ' +
    room[0]?.streetAddress +
    ' ' +
    room[0]?.postcode;
  const getMe = async () => {
    const result = await getMeAPI(userState.email);
    setData(result.data);
    setRoom(result.data.room);
  };
  useEffect(() => {
    getMe();
  }, []);
  console.log('data', data);
  if (room[0]?.adults === undefined) {
    console.log('??');
  } else {
    console.log(room[0]?.adults);
  }

  return (
    <Box p="62px 30px 100px" color="myColor.100">
      <Heading textAlign="center" mb="12px">
        예약하신 숙소를 확인하세요!
      </Heading>
      <Card position="relative" boxShadow="0px 4px 8px rgba(0,0,0,0.2)">
        <CardHeader fontSize="2xl" fontWeight="bold">
          {room[0]?.purchase ? '결제 완료' : '결제 대기'}
        </CardHeader>
        <CardBody>
          <Image
            w="100%"
            h="300px"
            src={room[0]?.roomImage}
            borderRadius="lg"
          />

          <Box w="100%" h="1px" bgColor="gray.300" m="14px 0" />
          <Heading size="sm">방 유형</Heading>
          <Text>
            {room[0]?.largeBuildingType}, {room[0]?.buildingType}
          </Text>
          <Heading size="sm" mt="8px">
            위치
          </Heading>
          <Text>{location}</Text>
          <Heading size="sm" mt="8px">
            방 개수
          </Heading>
          <Text>{room[0]?.bedroomCount}개</Text>
          <Heading size="sm" mt="8px">
            침대 개수 및 유형
          </Heading>
          {room[0]?.bedList?.map((bedroom) => (
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

          <Text as="span">{room[0]?.amentities} </Text>

          <Heading size="sm" mt="8px">
            숙박 기간
          </Heading>
          <Text>
            {room[0]?.checkIn} ~ {room[0]?.checkOut}
          </Text>
          <Heading size="sm" mt="8px">
            숙박 인원
          </Heading>
          <Text>
            성인 {room[0]?.adults}명, 청소년 {room[0]?.teenager}명, 어린이{' '}
            {room[0]?.children}명
          </Text>
          {room[0]?.purchase && (
            <Button
              position="absolute"
              right="16px"
              bottom="14px"
              colorScheme="facebook"
              onClick={onOpen}
            >
              결제하기
            </Button>
          )}
        </CardBody>
      </Card>
      <PurchaseModal
        isOpen={isOpen}
        onClose={onClose}
        diffDate={diffDate}
        from="mypage"
        roomId={room[0]?.id}
      />
    </Box>
  );
}

export default mypage;
