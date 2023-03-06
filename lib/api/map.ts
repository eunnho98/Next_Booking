import axios from '.';

// 현재 위치 가져오기
export const getLocationInfoAPI = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) =>
  axios.get(`/api/maps/location?latitude=${latitude}&longitude=${longitude}`);
