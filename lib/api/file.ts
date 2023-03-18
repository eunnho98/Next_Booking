import axios from '.';
import { BedType } from '../type';

export interface IBody {
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

// 파일 업로드
export const uploadFileAPI = (file: FormData) =>
  axios.post('/api/files/upload', file);

// 데이터 저장
export const SaveDataAPI = (body: IBody) =>
  axios.post<IBody>('/api/files/save', body);

// 침대 저장
export const saveBedsAPI = (
  body: { id: number; beds: { type: BedType; count: number }[] }[],
) => axios.post('/api/files/saveBed', body);

export const updatePurchaseAPI = (body: { id: number; purchase: boolean }) =>
  axios.post('/api/files/update', body);
