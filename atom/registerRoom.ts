import { atom } from 'recoil';
import { BedType } from '@/lib/type';

export type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
};

export const roomState = atom<RegisterRoomState>({
  key: 'room',
  default: {
    largeBuildingType: null,
    buildingType: null,
    roomType: null,
    bedroomCount: 0,
    bedCount: 1,
    bedList: [],
    publicBedList: [],
  },
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
