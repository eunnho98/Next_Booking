import axios from '.';

interface GetLocationInfo {
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
  political: string;
}
// 현재 위치 가져오기
export const getLocationInfoAPI = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) =>
  axios.get<GetLocationInfo>(
    `/api/maps/location?latitude=${latitude}&longitude=${longitude}`,
  );
