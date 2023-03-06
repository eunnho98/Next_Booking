import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      res.statusCode = 400;
      return res.send('위치 정보가 없습니다.');
    }
    try {
      // latlng: 위도와 경도의 쌍으로 구성된 값, 좌표 <=> 주소 변환에 사용
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
      const { data } = await axios.get(url);
      const { lat, lng } = data.results[0].geometry.location;
      const addressComponents = data.results[0].address_components;

      // ! 현재 위치가 서울인 경우 district(시)가 없음 -> 경우 나누기 필요
      const results = {
        latitude: lat,
        longitude: lng,
        country: addressComponents[5].long_name,
        city: addressComponents[4].long_name,
        district: addressComponents[3].long_name,
        streetAddress: `${addressComponents[1].long_name} ${addressComponents[0].long_name}`,
        postcode: addressComponents[6].long_name,
        political: addressComponents[2].long_name,
      };
      res.statusCode = 200;
      res.send(results);
    } catch (error) {
      res.statusCode = 404;
      return res.end();
    }
    res.statusCode = 405;

    return res.end();
  }
};
