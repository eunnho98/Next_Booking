import { atom, selector } from 'recoil';
import { BedType } from '@/lib/type';

export type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  bathroomCount: number;
  country: string;
  city: string;
  district: string;
  political: string;
  streetAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
  amentities: string[];
  roomImage: string;
  description: string;
  price: number;
};

export const roomState = atom<RegisterRoomState>({
  key: 'room',
  default: {
    largeBuildingType: null,
    buildingType: null,
    roomType: null,
    bedroomCount: 0,
    bedCount: 0,
    bedList: [],
    bathroomCount: 0,
    country: '',
    city: '',
    district: '', // 시/군/구
    streetAddress: '', // 도로명주소
    postcode: '', // 우편 번호
    latitude: 0, // 위도
    longitude: 0, // 경도
    political: '', // 구
    amentities: [],
    roomImage: '',
    description: '',
    price: 0,
  },
  dangerouslyAllowMutability: true,
});

interface IGuestNum {
  adults: number;
  teenager: number;
  children: number;
}
export const guestNum = atom<IGuestNum>({
  key: 'guest',
  default: {
    adults: 0,
    teenager: 0,
    children: 0,
  },
});
