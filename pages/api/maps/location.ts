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
      console.log(data);
      console.log(data.results[0].address_components);
    } catch (error) {
      res.statusCode = 404;
      return res.end();
    }
    res.statusCode = 405;

    return res.end();
  }
};
