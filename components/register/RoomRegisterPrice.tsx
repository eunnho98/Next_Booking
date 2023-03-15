import { RequestPayParams, RequestPayResponse } from '@/lib/type';
import { Button } from '@chakra-ui/react';
import React, { useEffect } from 'react';

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
  const { IMP } = window;

  useEffect(() => {
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

  const handlePayment = () => {
    console.log('아');
    IMP?.init('imp70004432');
    IMP?.request_pay(
      {
        // kakaopay
        // html5_inicis

        pg: 'tosspay',
        pay_method: 'card',
        merchant_uid: 'merchant_' + new Date().getTime(),
        name: '결제테스트',
        amount: 100,
        buyer_email: 'iamport@siot.do',
        buyer_name: '구매자',
        buyer_tel: '010-1234-5678',
        buyer_addr: '서울특별시 강남구 삼성동',
        buyer_postcode: '123-456',
      },
      (res: RequestPayResponse) => {
        const { success, error_msg } = res;
        if (success) {
          alert('결제 성공');
        } else {
          alert(`결제 실패, ${error_msg}`);
        }
      },
    );
  };
  return (
    <Button
      onClick={() => {
        handlePayment();
        console.log('sdks?');
      }}
    >
      결제
    </Button>
  );
}

export default RoomRegisterPrice;
