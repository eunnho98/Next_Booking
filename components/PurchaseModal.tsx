import { dateState, initialState } from '@/atom/atom';
import { guestNum, roomState } from '@/atom/registerRoom';
import { saveBedsAPI, SaveDataAPI } from '@/lib/api/file';
import { RequestPayParams, RequestPayResponse } from '@/lib/type';
import {
  Box,
  Button,
  HStack,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

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

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  diffDate: number;
}

function PurchaseModal({ isOpen, onClose, diffDate }: IProps) {
  const toast = useToast();
  const router = useRouter();
  const { IMP } = window;
  const [room, setRoom] = useRecoilState(roomState);
  const guest = useRecoilValue(guestNum);
  const user = useRecoilValue(initialState);
  const date = useRecoilValue(dateState);
  const price =
    guest.adults * 50000 +
    guest.children * 10000 +
    guest.teenager * 30000 +
    diffDate * 50000;
  const priceString = price.toLocaleString('ko-KR');

  useEffect(() => {
    setRoom((prev) => {
      return {
        ...prev,
        price: price,
      };
    });
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';

    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/v1/iamport.js';

    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);
  const handlePayment = (pgType: 'tosspay' | 'kakaopay' | 'html5_inicis') => {
    IMP?.init('imp70004432');
    IMP?.request_pay(
      {
        // kakaopay
        // html5_inicis

        pg: pgType,
        pay_method: 'card',
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: '결제테스트',
        amount: price,
        buyer_email: user.email,
        buyer_name: user.name,
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
      },
      (res: RequestPayResponse) => {
        const { success, error_msg } = res;
        if (success) {
          if (confirm('결제 성공')) {
            router.push('/');
          }
        } else {
          alert(`결제 실패, ${error_msg}`);
        }
      },
    );
  };

  const onClick = async (purchase: boolean) => {
    try {
      const body = {
        userId: user.id,
        largeBuildingType: room.largeBuildingType!,
        buildingType: room.buildingType!,
        roomType: room.roomType!,
        bedroomCount: room.bedroomCount,
        bedCount: room.bedCount,
        bedList: room.bedList,
        bathroomCount: room.bathroomCount,
        country: room.country,
        city: room.city,
        district: room.district,
        political: room.political,
        streetAddress: room.streetAddress,
        postcode: room.postcode,
        latitude: room.latitude,
        longitude: room.longitude,
        amentities: room.amentities,
        roomImage: room.roomImage,
        description: room.description,
        price: room.price,
        checkIn: date.checkIn,
        checkOut: date.checkOut,
        adults: guest.adults,
        teenager: guest.teenager,
        children: guest.children,
        purchase: purchase,
      };

      await SaveDataAPI(body);

      await saveBedsAPI(room.bedList);

      if (!purchase) {
        toast({
          title: '담기 완료!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form>
          <ModalContent>
            <ModalHeader>결제 페이지</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HStack justifyContent="space-between">
                <Box>
                  <UnorderedList>
                    <ListItem>성인 {guest.adults}명</ListItem>
                    <ListItem>청소년 {guest.teenager}명</ListItem>
                    <ListItem>
                      어린이
                      {guest.children}명
                    </ListItem>
                  </UnorderedList>
                  <Text mt="8px" fontSize="lg" fontWeight="bold">
                    숙박기간: {diffDate}일
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="48px" color="pink.600" fontWeight="bold">
                    {priceString}￦
                  </Text>
                </Box>
              </HStack>
            </ModalBody>
            <ModalFooter justifyContent="space-evenly">
              <Button
                colorScheme="red"
                onClick={() => {
                  handlePayment('html5_inicis');
                  onClick(true);
                }}
              >
                결제하기
              </Button>
              <Button
                backgroundColor="#fae100"
                _hover={{
                  bgColor: 'yellow.400',
                }}
                onClick={() => {
                  handlePayment('kakaopay');
                  onClick(true);
                }}
              >
                카카오페이
              </Button>
              <Button
                bgColor="#0c61eb"
                color="white"
                _hover={{
                  bgColor: '#063a8f',
                }}
                onClick={() => {
                  handlePayment('tosspay');
                  onClick(true);
                }}
              >
                토스페이
              </Button>
            </ModalFooter>
            <ModalFooter>
              <Button
                onClick={() => {
                  onClick(false);
                }}
              >
                담기
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default PurchaseModal;
