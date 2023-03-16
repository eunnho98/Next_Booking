import Data from '@/lib/data';
import { BedType } from '@/lib/type';
import { NextApiRequest, NextApiResponse } from 'next';

// ? 한 번에 DB에 저장할려고 하니 Bed는 업데이트가 안됨, 이유 나중에 찾기
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log('body', req.body);
    const bedList = req.body;
    if (bedList !== undefined) {
      const result = async (
        list: { id: number; beds: { type: BedType; count: number }[] }[],
      ) => {
        for (let i = 1; i < list.length + 1; i++) {
          for (const bed of list[i - 1].beds) {
            console.log('i', i - 1, list[i - 1]);
            console.log('list', list[i - 1].beds, list[i - 1].id);
            console.log('bed', bed);
            await Data.user.writeBedsDB(i, bed.type, bed.count);
          }
        }
      };

      result(bedList);
      res.json({ bedList });
    } else {
      console.log('??? 머임');
      res.json('왜안되노');
    }
  }
};
