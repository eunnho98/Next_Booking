import Data from '@/lib/data';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { id, purchase } = req.body;
    if (id || !purchase) {
      res.statusCode = 402;
      res.send('필요한 데이터가 없습니다.');
    }

    Data.user.updatePurchaseDB(id, purchase);
    res.statusCode = 200;
    res.send('수정 완료');
  }
};
