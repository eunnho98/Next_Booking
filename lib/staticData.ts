import { BedType } from './type';

export const monthList = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

export const yearList = Array.from(Array(124), (_, i) => String(2023 - i));

export const largeBulidingTypeList = ['아파트', '주택', '별채', 'B&B', '호텔'];

export const apartmentBuildingTypeList = [
  '아파트',
  '공동주택',
  '별채',
  '카사 파르티쿨라르(쿠바)',
  '로프트',
  '레지던스',
];

//* 주택 건물유형
export const houseBuildingTypeList = [
  '주택',
  '방갈로',
  '통나무집',
  '카사',
  '파르티쿨라르(쿠바)',
  '살레',
  '전원주택',
  '키클라데스',
  '주택(그리스)',
  '담무소(이탈리아)',
  '돔하우스',
  '땅속의집',
  '농장 체험 숙박',
  '하우스 보트',
  '오두막',
  '등대',
  '팬션(한국)',
  '마차(영국, 프랑스)',
  '초소형주택',
  '타운하우스',
  '트룰로(이탈리아)',
  '저택',
];

//* 별채 건물 유형
export const secondaryUnitBuildingTypeList = [
  '게스트용 별채',
  '게스트 스위트',
  '농장 체험 숙박',
];

//* B&B 건물유형
export const bnbBuildingTypeList = [
  'B&B',
  '카사 파르티쿨라르(쿠바)',
  '농장 체험 숙박',
  '민수 (타이완)',
  '산장',
  '료칸(일본)',
];

//* 부티크 호텔 건물유형
export const hotelBuildingTypeList = [
  '부티크 호텔',
  '아파트 호텔',
  '헤리티지 호텔(인도)',
  '호스텔',
  '호텔',
  '산장',
  '리조트',
  '레지던스',
  '객잔(중국)',
];

// 라디오 컴포넌트
export const roomTypeRadioOptions = [
  {
    label: '집전체',
    value: 'entire',
    description:
      '숙소를 다른 사람과 공유하지 않고 단독으로 이용합니다. 침실, 욕실, 부엌이 포함됩니다.',
  },
  {
    label: '개인실',
    value: 'private',
    description:
      '개인 침실이 제공됩니다. 침실 이외에 다른 공간은 이용할 수 없습니다.',
  },
  {
    label: '다인실',
    value: 'public',
    description: '공용 침실이나 공용 공간에서 숙박합니다.',
  },
];

// 침대 유형
export const bedTypes: BedType[] = [
  '소파',
  '에어 매트릭스',
  '요와 이불',
  '싱글',
  '더블',
  '퀸',
  '이층 침대',
  '바닥용 에어매트릭스',
  '유아 침대',
  '유아용 침대',
  '해먹',
  '물침대',
];
